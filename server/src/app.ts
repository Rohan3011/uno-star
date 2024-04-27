import cors from "cors";
import dotenv from "dotenv";
import express, { Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { distributeCards } from "./utils/game";
import { gameRouter } from "./routes/gameRoutes";

// Load Environment variables
dotenv.config();

const port = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:3000";
const corsOptions = {
  origin: CLIENT_URL,
};

// Init app instance
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", gameRouter);

app.get("/health", (_, res: Response) => {
  res.send("OK");
});

// Init Websocket
const httpServer = createServer(app);
export const io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> = new Server(httpServer, {
  cors: corsOptions,
});

export type AppServer = typeof io;
export type AppSocket = typeof Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export const activeGames: Record<string, GameState> = {};

io.on("connection", (socket) => {
  socket.on("ping", () => {
    console.log(`[${new Date().toISOString()}]: Ping by ${socket.id}`);
    socket.emit("pong", "connected successfully");
  });

  socket.on("game:join", (gameId, playerName) => {
    const playerId = socket.id;

    // Find the game by its ID
    const game = activeGames[gameId];

    console.log("GAMES: ", activeGames);

    if (!game) {
      socket.emit("message:error", {
        message: "Joining Failed! Game not found",
      });
      return;
    }

    // Check if the game is in progress
    if (game.status === GameStatus.InProgress) {
      socket.emit("message:error", {
        message: "Game in progress. Cannot join now.",
      });
      return;
    }

    // Create a new player object
    const newPlayer = {
      id: playerId,
      name: playerName ?? "no-name",
      hand: [],
      score: 0,
      // Other player-specific properties
    } satisfies Player;

    // Add the player to the game
    game.players.push(newPlayer);

    // Join the game
    socket.join(gameId);
    console.log(`New player joined in ${gameId}\n`, newPlayer);
    // Send the player ID as the response
    socket.to(gameId).emit("game:join", playerName);
  });

  // 🔴
  // socket.on("game:init", (game) => {
  //   console.log(`Game init with ${game.roomId}`);

  //   try {
  //     // Set socket data
  //     socket.data.userId = socket.data.userId;
  //     socket.data.userName = socket.data.userName;
  //     socket.data.roomId = game.roomId;

  //     socket.emit("game:init", game);
  //   } catch (err) {
  //     socket.emit("message:error", { message: JSON.stringify(err) });
  //   }
  // });

  socket.on("game:start", (gameId) => {
    console.log(`Game started with ID: ${gameId}`);

    const game = activeGames[gameId];

    console.log("ROOMS", io.sockets.adapter.rooms);

    if (!game) {
      socket.in(gameId).emit("message:error", { message: "Game not found" });
      return;
    }

    game.status = GameStatus.InProgress;
    socket.to(gameId).emit("game:start", game);

    // const numPlayers = game.players.length;
    // if (numPlayers < 2 || numPlayers > 7) {
    //   socket
    //     .in(gameId)
    //     .emit("message:error", { message: "Wait for others to join" });
    // } else {
    //   // Update the game status to "in-progress"
    //   game.status = GameStatus.InProgress;
    //   socket.emit("game:start", game);
    // }
  });

  // socket.on("game:update", (gameState) => {
  //   const user = getUser(socket.id);
  //   if (user) io.to(user.roomId).emit("game:update", gameState);
  // });
});

// Serve and Listen
httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// utility Methods
function doesRoomExist(roomId: string) {
  return Boolean(io.sockets.adapter.rooms.get(roomId));
}

function numClientsInRoom(roomId: string) {
  const rooms = io.of("/").adapter.rooms;
  const roomSockets = rooms.get(roomId);
  if (roomSockets) return roomSockets.size;
  else return 0;
}

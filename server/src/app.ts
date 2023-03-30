import cors from "cors";
import dotenv from "dotenv";
import express, { Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { getUser } from "./utils/user";

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
app.use(express.static("public"));

app.get("/healthcheck", (_, res: Response) => {
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

io.on("connection", (socket) => {
  socket.on("ping", () => {
    console.log(`[${new Date().toISOString()}]: Ping by ${socket.id}`);
    socket.emit("pong", "connected successfully");
  });

  socket.on("player:init", (userName) => {
    socket.data.userName = userName;
    socket.data.userId = socket.id;
    socket.data.roomId = undefined;
    socket.emit("player:status", { message: "Player setup completed!" });
  });

  socket.on("player:info", () => {
    socket.emit("player:info", {
      userName: socket.data.userName,
      userId: socket.data.userId,
      roomId: socket.data.roomId,
    });
  });

  socket.on("game:join", (roomId) => {
    if (!doesRoomExist(roomId)) {
      socket.emit("message:error", { message: "No Room Exist!" });
    }
    try {
      socket.join(roomId);
    } catch (err) {
      socket.emit("message:error", {
        message: "Failed to join! please try again",
      });
    }
  });

  socket.on("game:init", (gameState) => {
    console.log(`Game init with ${gameState.roomId}`);
    socket.join(gameState.roomId);

    // Set socket data
    socket.data.userId = socket.data.userId;
    socket.data.userName = socket.data.userName;
    socket.data.roomId = gameState.roomId;

    socket
      .in(gameState.roomId)
      .emit("message:send", { message: "Game started Successfully" });
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

function NumClientsInRoom(roomId: string) {
  const rooms = io.of("/").adapter.rooms;
  const roomSockets = rooms.get(roomId);
  if (roomSockets) return roomSockets.size;
  else return 0;
}

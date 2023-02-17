import express, { Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Socket, Server, Namespace } from "socket.io";
import { roomHandler } from "./handlers/room.handler";
import { playerHandler } from "./handlers/player.handler";
import { globalHandler } from "./handlers/global.handler";

function main() {
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
  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  // Namespaces
  const GlobalNamespace: Namespace<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  > = io.of("/socket-global");

  const roomNamespace: Namespace<
    RoomClientToServerEvents,
    RoomServerToClientEvents,
    RoomInterServerEvents,
    RoomSocketData
  > = io.of("/socket-rooms");

  const playerNamespace: Namespace<
    PlayerClientToServerEvents,
    PlayerServerToClientEvents,
    PlayerInterServerEvents,
    PlayerSocketData
  > = io.of("/socket-players");

  const onConnection = (socket: Socket) => {
    // globalHandler(GlobalNamespace, socket);
    // roomHandler(roomNamespace, socket);
    // playerHandler(playerNamespace, socket);
  };

  GlobalNamespace.on("connection", (socket) => {
    socket.on("ping", () => {
      console.log(`[${new Date().toISOString()}]: Ping by ${socket.id}`);
      socket.emit("pong", "connected successfully");
    });
  });

  io.on("connection", onConnection);

  // Serve and Listen
  httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main();

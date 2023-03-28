import cors from "cors";
import dotenv from "dotenv";
import express, { Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { getUser } from "./utils/user";

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
  const io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  > = new Server(httpServer, {
    cors: corsOptions,
  });

  io.on("connection", (socket) => {
    socket.on("ping", () => {
      console.log(`[${new Date().toISOString()}]: Ping by ${socket.id}`);
      socket.emit("pong", "connected successfully");
    });

    socket.on("game:join", () => {});

    socket.on("game:init", (gameState) => {
      const user = getUser(socket.id);
      if (user) {
        io.to(user.roomId).emit("game:init", gameState);
      }
    });

    socket.on("game:update", (gameState) => {
      const user = getUser(socket.id);
      if (user) io.to(user.roomId).emit("game:update", gameState);
    });
  });

  // Serve and Listen
  httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main();

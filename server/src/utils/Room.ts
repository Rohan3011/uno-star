import { v4 as uuidv4 } from "uuid";
import { AppServer, AppSocket } from "../app";
import { Player } from "./Player";

enum RoomEvents {
  join = "room:join",
}

export class Room {
  private io: AppServer;
  private socket: AppSocket;
  private id: string;
  private playersCount: number;
  private players: string[];
  private host: Player;

  ROOM_SIZE_LIMIT = 2;

  constructor(
    io: AppServer,
    socket: AppSocket,
    host: Player,
    players: number = 0
  ) {
    this.io = io;
    this.socket = socket;
    this.host = host;
    this.playersCount = players;
    this.players = [];
    this.id = uuidv4();
  }
  joinRoom = (p: Player) => {
    if (this.playersCount >= this.ROOM_SIZE_LIMIT) {
    }
  };
  readRoom = (payload: any) => {};

  // Socket Events
  eventsListener = () => {};
}

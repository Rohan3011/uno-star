import { Server } from "http";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

enum RoomEvents {
  create = "room:create",
  read = "room:read",
}

export class Room {
  public io;
  public socket: Socket;
  public name;
  public playersCount: number;
  public players: string[];

  constructor(io: Server, socket: Socket, players: number = 0) {
    this.io = io;
    this.socket = socket;
    this.playersCount = players;
    this.players = [];
    this.name = uuidv4();
  }
  createRoom = (payload: any) => {};
  readRoom = (payload: any) => {};

  // Socket Events
  eventsListener = () => {
    this.socket.on(RoomEvents.create, this.createRoom);
    this.socket.on(RoomEvents.read, this.readRoom);
  };
}

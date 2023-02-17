import { Socket, Namespace } from "socket.io";

export enum RoomEvents {
  create = "room:create",
  read = "room:read",
  join = "room:join",
  destroy = "room:destroy",
  code = "room:code",
}

export const roomHandler = (io: Namespace, socket: Socket) => {
  const createRoom = (payload: any) => {};
  const readRoom = (payload: any) => {};

  // Socket Events
  socket.on(RoomEvents.create, createRoom);
  socket.on(RoomEvents.read, readRoom);
};

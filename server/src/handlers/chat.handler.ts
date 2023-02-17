import { Socket, Server, Namespace } from "socket.io";

export enum ChatEvents {
  create = "chat:create",
  read = "chat:read",
  join = "chat:join",
  destroy = "chat:destroy",
}

export const ChatHandler = (io: Namespace, socket: Socket) => {
  const createChat = (payload: any) => {};
  const readChat = (payload: any) => {};

  // Socket Events
  socket.on(ChatEvents.create, createChat);
  socket.on(ChatEvents.read, readChat);
};

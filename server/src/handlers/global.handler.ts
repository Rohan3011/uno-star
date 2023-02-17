import { Socket, Namespace } from "socket.io";

export enum GlobalEvents {
  create = "global:create",
  read = "global:read",
  join = "global:join",
  destroy = "global:destroy",
  code = "global:code",
}

export const globalHandler = (io: Namespace, socket: Socket) => {
  const createGlobal = (payload: any) => {};
  const readGlobal = (payload: any) => {};

  // Socket Events
  socket.on(GlobalEvents.create, createGlobal);
  socket.on(GlobalEvents.read, readGlobal);
};

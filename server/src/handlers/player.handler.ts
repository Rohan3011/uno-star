import { Socket, Server, Namespace } from "socket.io";

export enum PlayerEvents {
  create = "player:create",
  read = "player:read",
  join = "player:join",
  destroy = "player:destroy",
  ping = "player:ping",
  pong = "player:pong",
}

export interface Player {
  id: string;
  name: string;
  room?: string;
}

const players: Player[] = [];
export const playerHandler = (io: Namespace, socket: Socket) => {
  const createPlayer = (playerDetails: Player) => {
    const PlayersCount = players.filter(
      (player) => player.room === playerDetails.room
    ).length;

    if (PlayersCount === 2) {
      return { error: "Room is full!" };
    }

    const newPlayer = playerDetails;
    players.push(newPlayer);
    return { message: "Player created successfully", data: newPlayer };
  };
  const readPlayer = (payload: any) => {};

  // Socket Events
  socket.on(PlayerEvents.create, createPlayer);
  socket.on(PlayerEvents.read, readPlayer);
  socket.on(PlayerEvents.ping, (s) => {
    console.log("ping");
    socket.emit("Ping");
  });
};

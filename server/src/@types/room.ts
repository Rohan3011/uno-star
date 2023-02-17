interface RoomServerToClientEvents {
  //   createRoom: () => void;
  //   joinRoom: () => void;
  //   destroyRoom: () => void;
}

interface RoomClientToServerEvents {
  createRoom: () => void;
  joinRoom: () => void;
  destroyRoom: () => void;
}

interface RoomInterServerEvents {
  ping: () => void;
}

interface RoomSocketData {
  name: string;
  age: number;
}

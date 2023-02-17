interface PlayerServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface PlayerClientToServerEvents {
  hello: () => void;
}

interface PlayerInterServerEvents {
  ping: () => void;
}

interface PlayerSocketData {
  name: string;
  age: number;
}

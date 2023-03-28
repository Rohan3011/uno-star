interface ServerToClientEvents {
  pong: (message: string) => string;
  "message:error": (payload: PlayLoad, callback?: Function) => void;
  "game:init": (gameState: Game) => void;
  "game:update": (gameState: Game) => void;
  "game:end": (payload: PlayLoad, callback: Function) => void;
  "message:send": (payload: PlayLoad, callback: Function) => void;
}

interface ClientToServerEvents {
  ping: () => void;
  "game:join": (roomID: string, callback?: Function) => void;
  "game:init": (gameState: Game) => void;
  "game:update": (gameState: Game) => void;
  "game:end": (payload: PlayLoad, callback: Function) => void;
  "message:send": (payload: PlayLoad, callback: Function) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId: string;
  userName: string;
  roomId: string;
}

interface Game {}

interface ResponseMessage {
  error?: string;
  data?: Object | string;
  success?: string;
}

interface PlayLoad {
  message: string;
}

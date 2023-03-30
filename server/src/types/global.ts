interface ServerToClientEvents {
  pong: (message: string) => string;
  "message:error": (payload: PlayLoad, callback?: Function) => void;
  "game:init": (gameState: Game) => void;
  "game:update": (gameState: Game) => void;
  "game:end": (payload: PlayLoad, callback?: Function) => void;
  "message:send": (payload: PlayLoad, callback?: Function) => void;
  "player:status": (payload: PlayLoad) => void;
  "player:info": (payload: { userName?: string; userId?: string }) => void;
}

interface ClientToServerEvents {
  ping: () => void;
  "player:init": (userName: string) => void;
  "player:info": () => void;
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

interface Game {
  roomId: string;
  cards: Card[];
  player1Cards: Card[];
  player2Cards: Card[];
  isOver: boolean;
  winner?: Player;
  turn?: Player;
  activeCard?: Card;
  playedCard?: Card;
}

interface ResponseMessage {
  error?: string;
  data?: Object | string;
  success?: string;
}

interface PlayLoad {
  message?: string;
  data?: Object;
}

interface Card {}

interface Player {}

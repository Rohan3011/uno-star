interface ServerToClientEvents {
  pong: (message: string) => string;
  "message:error": (payload: PlayLoad, callback?: Function) => void;
  "game:init": (gameState: Game) => void;
  "game:start": (gameState: Game) => void;
  "game:join": (data: number) => void;
  "game:update": (gameState: Game) => void;
  "game:end": (payload: PlayLoad, callback?: Function) => void;
  "message:send": (payload: PlayLoad, callback?: Function) => void;
  "player:status": (payload: PlayLoad) => void;
  "player:info": (payload: SocketData) => void;
}

interface ClientToServerEvents {
  ping: () => void;
  "player:init": (userName: string) => void;
  "player:info": () => void;
  "game:join": (roomID: string, callback?: Function) => void;
  "game:init": (gameState: Game) => void;
  "game:start": (gameState: Game) => void;
  "game:update": (gameState: Game) => void;
  "game:end": (payload: PlayLoad, callback: Function) => void;
  "message:send": (payload: PlayLoad, callback: Function) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId?: string;
  userName?: string;
  roomId?: string;
}

interface Game {
  hostId: string;
  roomId: string;
  cards: Card[];
  players: Map<string, Card[] | null>;
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

/**
 * Represents a player in the Uno game.
 */
interface Player {
  /**
   * The unique identifier of the player.
   */
  id: string;

  /**
   * The name of the player.
   */
  name: string;

  /**
   * The cards held by the player.
   */
  hand: Card[];

  /**
   * The score of the player in the game.
   */
  score: number;
}

/**
 * Represents a card in the Uno game.
 */
interface Card {
  /**
   * The color of the card.
   */
  color: string;

  /**
   * The value or special action of the card.
   */
  value: string;
}

/**
 * Represents the game state of the Uno game.
 */
interface GameState {
  /**
   * The unique identifier of the game.
   */
  id: string;

  /**
   * The list of players participating in the game.
   */
  players: Player[];

  /**
   * The current player whose turn it is.
   */
  currentPlayer: Player | null;

  /**
   * The cards played and currently on the discard pile.
   */
  discardPile: Card[];

  /**
   * The remaining cards in the draw pile.
   *
   */
  deck: Card[];

  /**
   * The currently active color (if a wild card has been played).
   */
  activeColor: string | null;

  status: GameStatus;
}

enum GameStatus {
  Waiting = "waiting",
  InProgress = "in-progress",
  Finished = "finished",
}

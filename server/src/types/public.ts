/**
 * Represents a player in the Uno game.
 */
export interface Player {
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
export interface Card {
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
export interface GameState {
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
  host: string;
  status: GameStatus;
}

export enum GameStatus {
  Waiting = "waiting",
  InProgress = "in-progress",
  Finished = "finished",
}

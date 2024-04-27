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
  hand: Card[] | null;

  /**
   * The score of the player in the game.
   */
  score: number;
}

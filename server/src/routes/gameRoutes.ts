import { Request, Response, Router } from "express";
import { GameHelper, generateGameId, generatePlayerId } from "../lib/utils";

const router = Router();

const activeGames: Record<string, GameState> = {};

/** 
 * Create a new game.
 *  Request body: None
    Response: Returns the generated game ID and other relevant information.
 */
router.post("/games", (req: Request, res: Response) => {
  // Generate a unique game ID
  const gameId = generateGameId();

  // Create a new game object
  const newGame = {
    id: gameId,
    status: GameStatus.Waiting,
    players: [],
    currentPlayer: null,
    discardPile: [],
    deck: GameHelper.createDeck(),
    activeColor: null,
  } satisfies GameState;

  // Shuffle the deck of cards
  GameHelper.shuffleDeck(newGame.deck);

  // Add the game to a list of active games
  activeGames[gameId] = newGame;

  // Send the game ID as the response
  res.json({ gameId });
});

/**
 * GET /api/games/:gameId: Get the details of a specific game.

    Request parameters: gameId (string)
    Response: Returns the game state and other relevant information.
 */
router.get("/games/:gameId", (req: Request, res: Response) => {});

/**
 * POST /api/games/:gameId/join: Join an existing game.

    Request parameters: gameId (string)
    Request body: Player's name
    Response: Returns the player ID and other relevant information.
 */
router.post("/games/:gameId/join", (req: Request, res: Response) => {
  const gameId = req.params.gameId;
  const playerId = generatePlayerId();

  // Find the game by its ID
  const game = activeGames[gameId];

  if (!game) {
    // Game not found
    return res.status(404).json({ error: "Game not found" });
  }

  // Check if the game is in progress
  if (game.status === GameStatus.InProgress) {
    return res
      .status(403)
      .json({ error: "Game in progress. Cannot join now." });
  }

  // Create a new player object
  const newPlayer = {
    id: playerId,
    name: req.body.name,
    hand: [],
    score: 0,
    // Other player-specific properties
  } satisfies Player;

  // Add the player to the game
  game.players.push(newPlayer);

  // Send the player ID as the response
  res.json({ playerId });
});

/**
 *     GET /api/games/:gameId/socket: Establish a WebSocket connection for a specific game.
        Request parameters: gameId (string)
        Response: Upgrade the connection to a WebSocket connection.
 */
router.post("/games/:gameId/socket", (req: Request, res: Response) => {});

export { router as GameRouter };

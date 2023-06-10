import { Request, Response, Router } from "express";
import { GameHelper, generateGameId, generatePlayerId } from "../lib/utils";
import { GameState, GameStatus } from "../types/public";
import { activeGames } from "../app";

const router = Router();

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

    host: "",
  } satisfies GameState;

  // Shuffle the deck of cards
  GameHelper.shuffleDeck(newGame.deck);

  // Add the game to a list of active games
  activeGames[gameId] = newGame;

  // Send the game ID as the response
  res.json({ gameId });
});

router.get("/games", (req: Request, res: Response) => {
  const allGames = Object.keys(activeGames);
  res.json({ Games: allGames });
});

router.get("/games/:gameId", (req: Request, res: Response) => {
  const gameId = req.params.gameId;

  const game = activeGames[gameId];

  if (!game) {
    // Game not found
    return res.status(404).json({ error: "Game not found" });
  }

  // Check if the game is in progress
  if (game.status === GameStatus.Finished) {
    return res
      .status(403)
      .json({ error: "Game has Finished. Cannot join now." });
  }

  res.send(game);
});

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
    name: req.body?.name ?? "no-name",
    hand: [],
    score: 0,
    // Other player-specific properties
  } satisfies Player;

  // Add the player to the game
  game.players.push(newPlayer);

  // Send the player ID as the response
  res.json({ playerId });
});

router.post("/games/:gameId/start", (req: Request, res: Response) => {
  const gameId = req.params.gameId;
  const game = activeGames[gameId];

  if (!game) {
    // Game not found
    return false;
  }
  const numPlayers = game.players.length;

  if (!game) {
    res.status(400).send({ error: "Game could not be started" });
  } else if (numPlayers < 2 || numPlayers > 7) {
    res.status(400).send({
      error: `INSUFFICIENT PLAYERS! Min 2 players are required, but only ${numPlayers} are present`,
    });
  } else {
    // Update the game status to "in-progress"
    game.status = GameStatus.InProgress;
    res.send({ message: "Game started" });
  }
});

export { router as gameRouter };

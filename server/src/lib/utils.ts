export function generateGameId(): string {
  // Generate a unique game ID
  // Implementation goes here
  return "unique_game_id";
}

export function generatePlayerId(): string {
  // Generate a unique player ID
  // Implementation goes here
  return "unique_player_id";
}

export namespace GameHelper {
  export function createDeck(): Card[] {
    const deck: Card[] = [];

    // Generate cards for each color and value combination
    for (const color of cardColors) {
      for (const value of cardValues) {
        // Skip zero cards for colors other than wild
        if (value === CardValue.Zero && color !== CardColor.Wild) {
          continue;
        }

        // Add the card to the deck
        deck.push({ color, value });
      }
    }

    return deck;
  }

  export function shuffleDeck(deck: Card[]): void {
    // Shuffle the deck of cards
    // Implementation goes here
    for (let i = deck.length - 1; i >= 0; i--) {
      let randomIdx = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[randomIdx]] = [deck[randomIdx], deck[i]];
    }
  }

  export function distributeCards(game: GameState): void {
    const numPlayers = game.players.length;
    const numCardsPerPlayer = 7; // Adjust as per game rules

    for (let i = 0; i < numPlayers; i++) {
      const player = game.players[i];
      if (player.hand.length === 0)
        player.hand = game.deck.splice(0, numCardsPerPlayer);
    }
  }
}

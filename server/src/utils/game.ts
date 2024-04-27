export function distributeCards(game: GameState) {
  // shuffle the cards
  let cards = shuffleCards(game.deck);

  // distribute the cards
  for (const player of game.players) {
    player.hand = cards.splice(0, 7);
  }

  //   set active card
  game.activeCard = cards.shift();

  // place remaining in deck
  game.deck = cards;

  game.currentPlayer = game.players[0];
}

export function pickRandomCard(deck: Card[]) {
  let randomIdx = Math.floor(Math.random() * deck.length);
  return deck.at(randomIdx)!;
}

export function shuffleCards(deck: Card[]) {
  for (let i = deck.length - 1; i >= 0; i--) {
    let randomIdx = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIdx]] = [deck[randomIdx], deck[i]];
  }
  return deck;
}

export function packOfCards(deck: Card[], packSize: number = 7) {
  const pack = [];
  for (let i = 0; i < packSize; i++) {
    pack.push(pickRandomCard(deck));
  }
  return pack;
}

export function makeId() {
  return Math.random().toString(36).slice(2, 7);
}

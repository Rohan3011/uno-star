import { CardType } from "@src/types/card";

export function pickRandomCard(deck: CardType[]) {
  let randomIdx = Math.floor(Math.random() * deck.length);
  return deck.at(randomIdx)!;
}

export function shuffleCards(deck: CardType[]) {
  for (let i = deck.length - 1; i >= 0; i--) {
    let randomIdx = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIdx]] = [deck[randomIdx], deck[i]];
  }
  return deck;
}

export function packOfCards(deck: CardType[], packSize: number = 7) {
  const pack = [];
  for (let i = 0; i < packSize; i++) {
    pack.push(pickRandomCard(deck));
  }
  return pack;
}

export function initGameHelper(deck: CardType[], packSize: number = 7) {
  const cards = shuffleCards(deck);
  return {
    remainingCards: cards.slice(packSize),
    playerCards: cards.slice(0, packSize),
  };
}

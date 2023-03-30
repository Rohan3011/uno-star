import { CardType } from "@src/types/card";
import { GameState } from "@src/redux/slices/gameSlice";

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
  let cards = shuffleCards(deck);
  return {
    player1Cards: cards.slice(0, packSize),
    player2Cards: cards.slice(packSize, packSize * 2),
    cards: cards.slice(packSize * 2 + 1),
    activeCard: cards.at(packSize * 2),
  } as GameState;
}

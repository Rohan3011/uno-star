import { Card } from "@src/types/card";
import { GameState } from "@src/redux/slices/gameSlice";

export const PACK_SIZE = 7;

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

export function packOfCards(deck: Card[]) {
  const pack = [];
  for (let i = 0; i < PACK_SIZE; i++) {
    pack.push(pickRandomCard(deck));
  }
  return pack;
}

export function startGameHelper(game: GameState) {
  // shuffle the cards
  let cards = shuffleCards(game.cards);

  // distribute the cards
  for (const player of game.players) {
    const playerCards = cards.splice(0, 7);
    game.players.set(player[0], playerCards);
  }

  //   set active card
  game.activeCard = cards.shift();

  // place remaining in deck
  game.cards = cards;

  return game;
}

export function makeGameHelper(cards: Card[]) {
  const roomId = makeId();
  const players = new Map<string, Card[]>();
  const isOver = false;

  return {
    roomId,
    cards,
    players,
    isOver,
  } satisfies GameState;
}

export function makeId() {
  return Math.random().toString(36).slice(2, 7);
}

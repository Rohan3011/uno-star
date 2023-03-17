import { atom } from "recoil";
import { CardType } from "../types/card";
import { PlayerType } from "../types/player";

export const gameOverState = atom({
  key: "GameOver",
  default: false,
});

export const winnerState = atom<PlayerType>({
  key: "Winner",
  default: undefined,
});

export const turnState = atom<PlayerType>({
  key: "Turn",
  default: undefined,
});

export const player1DeckState = atom<CardType[]>({
  key: "Player1Deck",
  default: [],
});

export const player2DeckState = atom<CardType[]>({
  key: "Player2Deck",
  default: [],
});

export const cardDeckState = atom<CardType[]>({
  key: "CardDeck",
  default: undefined,
});

// Card on top of deck
export const activeCardState = atom<CardType>({
  key: "ActiveCard",
  default: undefined,
});

export const playedCardState = atom<CardType>({
  key: "PlayedCard",
  default: undefined,
});

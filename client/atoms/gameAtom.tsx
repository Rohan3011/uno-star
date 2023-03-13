import { atom } from "recoil";
import { CardType } from "../@types/card";
import { PlayerType } from "../@types/player";

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

export const player1DeckState = atom({
  key: "Player1Deck",
  default: [],
});

export const player2DeckState = atom({
  key: "Player2Deck",
  default: [],
});

export const activeCardState = atom<CardType>({
  key: "ActiveCard",
  default: undefined,
});

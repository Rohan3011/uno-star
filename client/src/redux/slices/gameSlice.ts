import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "@src/types/card";
import { PlayerType } from "@src/types/player";

export type GameState = {
  roomId: string;
  cards: CardType[];
  player1Cards: CardType[];
  player2Cards: CardType[];
  isOver: boolean;
  winner?: PlayerType;
  turn?: PlayerType;
  activeCard?: CardType;
  playedCard?: CardType;
};

const initialState: GameState = {
  roomId: "",
  isOver: false,
  winner: undefined,
  turn: undefined,
  cards: [],
  player1Cards: [],
  player2Cards: [],
  activeCard: undefined,
  playedCard: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initGameState: (state, action: PayloadAction<GameState>) => {
      state.roomId = action.payload.roomId;
      state.cards = action.payload.cards;
      state.player1Cards = action.payload.player1Cards;
      state.player2Cards = action.payload.player2Cards;
    },
  },
});

export const { initGameState } = gameSlice.actions;

export default gameSlice.reducer;

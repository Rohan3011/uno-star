import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Card } from "@src/types/card";
import { PlayerType } from "@src/types/player";

export type GameState = {
  roomId: string;
  cards: Card[];
  players: Map<string, Card[]>;
  isOver: boolean;
  winner?: PlayerType;
  turn?: PlayerType;
  activeCard?: Card;
  playedCard?: Card;
};

const initialState: GameState = {
  roomId: "",
  isOver: false,
  winner: undefined,
  turn: undefined,
  cards: [],
  players: new Map<string, Card[]>(),
  activeCard: undefined,
  playedCard: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initGameState: (state, action: PayloadAction<GameState>) => {
      // state.roomId = action.payload.roomId;
      // state.
      // state.cards = action.payload.cards;
      // state.players = action.payload.players;
      state = action.payload;
    },

    startGame: (state, action: PayloadAction<GameState>) => {
      state = action.payload;
    },
  },
});

export const { initGameState, startGame } = gameSlice.actions;

export default gameSlice.reducer;

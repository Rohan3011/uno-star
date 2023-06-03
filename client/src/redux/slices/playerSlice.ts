import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "@src/types/card";

export type PlayerState = {
  cards: Card[] | undefined;
};

const initialState: PlayerState = {
  cards: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    pickCard: (state) => {},
    dropCard: (state) => {},
  },
});

export const { setPlayerCards, pickCard, dropCard } = playerSlice.actions;

export default playerSlice.reducer;

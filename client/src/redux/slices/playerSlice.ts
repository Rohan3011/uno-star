import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardType} from '@src/types/card';

export type PlayerState = {
  cards: CardType[]|undefined,
}

const initialState: PlayerState = {
  cards: []
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerCards: (state, action: PayloadAction<CardType[]>) => {
        state.cards = action.payload},
    pickCard: (state) => {

    },
    dropCard: (state) => {

    }
  }
})

export const {setPlayerCards, pickCard, dropCard} = playerSlice.actions;

export default playerSlice.reducer;

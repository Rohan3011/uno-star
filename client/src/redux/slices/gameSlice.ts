import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {CardType} from '@src/types/card';
import {PlayerType} from '@src/types/player';

export type GameState = {
  cards: CardType[],
  isOver: boolean,
  winner?: PlayerType,
  turn?: PlayerType,
  activeCard?: CardType,
  playedCard?: CardType,
}

const initialState: GameState = {
  isOver: false,
  winner: undefined,
  turn: undefined,
  cards: [],
  activeCard: undefined,
  playedCard: undefined
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {

    setCardDeck: (state, action: PayloadAction<CardType[]>) => {
        state.cards = action.payload},


  }
})

export const {setCardDeck} = gameSlice.actions;

export default gameSlice.reducer;
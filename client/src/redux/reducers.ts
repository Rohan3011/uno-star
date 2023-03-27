import {combineReducers} from '@reduxjs/toolkit';

import gameSlice from './slices/gameSlice';
import playerSlice from './slices/playerSlice';

const rootReducer = combineReducers({
  game: gameSlice,
  player: playerSlice,
})

export default rootReducer;
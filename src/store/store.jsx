import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import transcribeReducer from './transcribeSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    transcribe: transcribeReducer,
  },
});

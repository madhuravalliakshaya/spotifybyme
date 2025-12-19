import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    theme: themeReducer,
    user: userReducer,
  },
});

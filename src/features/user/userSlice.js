import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('user')) || {
  lastPlayed: null,
  favoriteGenre: 'Pop',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLastPlayed: (state, action) => {
      state.lastPlayed = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
    setGenre: (state, action) => {
      state.favoriteGenre = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
  },
});

export const { setLastPlayed, setGenre } = userSlice.actions;
export default userSlice.reducer;

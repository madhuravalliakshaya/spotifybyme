import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';

export default function ThemeSwitch() {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);

  return (
    <button
      className="px-4 py-2 bg-black  rounded border-none hover:bg-white transition mb-4"
      onClick={() => dispatch(toggleTheme())}
    >
       {mode === 'light' ? '☀️' : '🌙'}
    </button>
  );
}

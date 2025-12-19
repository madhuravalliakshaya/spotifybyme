import React from 'react';
import SongList from '../components/SongList';
import ThemeSwitch from '../components/ThemeSwitch';
import { useSelector } from 'react-redux';

export default function Home() {
  const mode = useSelector(state => state.theme.mode);
  return (
    <div className={mode === 'dark' ? 'bg-gray-900 text-white min-h-screen p-8 transition-colors' : 'bg-white text-black min-h-screen p-8 transition-colors'}>
      <h1 className="text-3xl mb-4">Spotify By ME</h1>
      <ThemeSwitch />
      <SongList />
    </div>
  );
}

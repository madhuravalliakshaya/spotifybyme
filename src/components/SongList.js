import React from 'react';
import { useDispatch } from 'react-redux';
import { playSong } from '../features/player/playerSlice';
import { setLastPlayed } from '../features/user/userSlice';

const songs = [
  {
    id: 1,
    title: 'BLUE',
    artist: 'YUNG KAI',
    genre: 'Pop',
    url: '/audio/song1.mp3',
    img: 'https://i.scdn.co/image/ab67616d00001e022c78500833c22279f8bef841',
  },
  {
    id: 2,
    title: '..BLUE..',
    artist: 'YUNG KAI',
    genre: 'Rock',
    url: '/audio/song1.mp3',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR680c4ET1zxD1Aal4lD2wUrvjfdM6pJKcShw&s',
  },
  {
    id: 3,
    title: 'BLUE!!',
    artist: 'YUNG KAI',
    genre: 'Jazz',
    url: '/audio/song1.mp3',
    img: 'https://i.pinimg.com/736x/39/93/de/3993de32f395ab580f4fd68cd3b10d0d.jpg',
  },
];

export default function SongList() {
  const dispatch = useDispatch();

  const play = (song) => {
    dispatch(playSong(song));
    dispatch(setLastPlayed(song));
  };

   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {songs.map((song) => (
        <div
          key={song.id}
          onClick={() => play(song)}
          className="group relative bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          {/* IMAGE */}
          <div className="relative">
            <img
              src={song.img}
              alt={song.title}
              className="w-full h-56 object-cover"
            />

            {/* PLAY OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black text-2xl scale-75 group-hover:scale-100 transition">
                ▶
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="p-4">
            <h2 className="text-lg font-semibold truncate">
              {song.title}
            </h2>
            <p className="text-sm text-gray-400">
              {song.artist}
            </p>

            <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">
              {song.genre}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
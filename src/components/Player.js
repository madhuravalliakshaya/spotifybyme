import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePlay, stop } from "../features/player/playerSlice";

export default function Player() {
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, currentSong]);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    dispatch(stop());
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 w-full bg-black text-white p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <img src={currentSong.img} className="w-12 h-12 rounded" />
        <div>
          <p className="font-bold">{currentSong.title}</p>
          <p className="text-sm">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => dispatch(togglePlay())}
          className="px-4 py-1 bg-green-500 rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={handleStop}
          className="px-4 py-1 bg-red-500 rounded"
        >
          Stop
        </button>
      </div>

    
      <audio
        key={currentSong.id}
        ref={audioRef}
        src={currentSong.url}
      />
    </div>
  );
}

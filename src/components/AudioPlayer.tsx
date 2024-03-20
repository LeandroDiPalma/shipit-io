import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAudio } from "../utils/audioContext";
import {
  faHeart,
  faHeartCirclePlus,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = () => {
  const {
    isPlaying,
    currentPlayingUrl,
    play,
    currentEpisode,
    favorites,
    toggleFavorite,
  } = useAudio();

  if (!currentPlayingUrl || !currentEpisode) return null;
  const isFavorited = favorites.includes(currentPlayingUrl);

  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto px-4 bg-[#343434]">
      <div className="flex justify-between items-center h-20">
        <div className="flex justify-between items-center text-grey">
          <img
            className="w-16 h-16  rounded"
            src={currentEpisode.images[1].url}
            alt="Episode cover"
          />
          <div className="px-3">{currentEpisode.name}</div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => play(currentPlayingUrl)}
            className="bg-transparent text-white p-2"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button
            onClick={() => toggleFavorite(currentPlayingUrl)}
            className="bg-transparent text-white p-2"
          >
            <FontAwesomeIcon icon={isFavorited ? faHeart : faHeartCirclePlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

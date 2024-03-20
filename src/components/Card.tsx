import Play from "../assets/play.png";
import Pause from "../assets/pause.png";
import { useAudio } from "../utils/audioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  name: string;
  image: string;
  preview_url: string;
  className?: string;
}

export const Card = ({ className, name, image, preview_url }: CardProps) => {
  const { isPlaying, play, currentPlayingUrl, favorites, toggleFavorite } =
    useAudio();

  const isCurrentPlaying = currentPlayingUrl === preview_url && isPlaying;
  const isFavorited = favorites.includes(preview_url);

 
  return (
    <div
      className={`${className} bg-[#343434] h-24 hover:shadow-md flex cursor-pointer max-w-md`}
    >
      <img className="h-full w-24" src={image} alt="Episode cover" />
      <div className="px-3 py-1 flex items-center justify-between w-full">
        <div className="font-bold w-3/4">{name}</div>
        <div
          className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={() => play(preview_url)}
        >
          <img src={isCurrentPlaying ? Pause : Play} alt="Play/Pause" />
        </div>
        <div
          className="rounded-full bg-green-500 w-10 h-10 flex justify-center items-center cursor-pointer"
          onClick={() => toggleFavorite(preview_url)}
        >
          <FontAwesomeIcon icon={isFavorited ? faHeart : faHeartCirclePlus} />
        </div>
      </div>
    </div>
  );
};

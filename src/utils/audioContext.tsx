import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { getEpisodes } from "../api/getEpisodes";
import { Episode } from "../types/episode";

type AudioContextType = {
  isPlaying: boolean;
  play: (url: string) => void;
  currentPlayingUrl: string | null;
  favorites: string[];
  toggleFavorite: (episodeId: string) => void;
  currentEpisode: Episode | null;
  episodes: Episode[];
};

export const MyAudioContext = createContext<AudioContextType | undefined>(
  undefined
);

export const useAudio = () => {
  const context = useContext(MyAudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string | null>(
    null
  );
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const localData = localStorage.getItem("favorites");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    !localStorage.getItem("access_token")
      ? navigate("/login")
      : fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const data = await getEpisodes();
      setEpisodes(data);
    } catch (error) {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (url: string) => {
    const isFavorited = favorites.includes(url);
    const updatedFavorites = isFavorited
      ? favorites.filter((id) => id !== url)
      : [...favorites, url];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const play = useCallback(
    (url: string) => {
      const episodeToPlay = episodes.find((e) => e.audio_preview_url === url) || null;
      setCurrentEpisode(episodeToPlay);
  
      if (currentPlayingUrl === url) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play();
          setIsPlaying(true);
        }
      } else {
        audio.src = url;
        audio.play();
        setCurrentPlayingUrl(url);
        setIsPlaying(true);
      }
    },
    [audio, currentPlayingUrl, isPlaying, episodes]
  );

  return (
    <MyAudioContext.Provider
      value={{
        isPlaying,
        play,
        currentPlayingUrl,
        favorites,
        toggleFavorite,
        currentEpisode,
        episodes,
      }}
    >
      {children}
    </MyAudioContext.Provider>
  );
};

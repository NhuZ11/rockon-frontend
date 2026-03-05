import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Song } from "../types";
import { buildStreamUrl } from "../api/songs";
import { loadFromStorage, saveToStorage } from "../utils/storage";

type PlayerState = {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  isExpanded: boolean;
};

type PlayerContextValue = PlayerState & {
  playSong: (song: Song, queue?: Song[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setVolume: (value: number) => void;
  registerAudioElement: (el: HTMLAudioElement | null) => void;
  setExpanded: (value: boolean) => void;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

const STORAGE_KEY = "player-state";

type StoredState = {
  currentSong: Song | null;
  volume: number;
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage<StoredState | null>(STORAGE_KEY, null);
    if (stored) {
      setCurrentSong(stored.currentSong);
      setVolumeState(stored.volume);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
    if (currentSong) {
      saveToStorage<StoredState>(STORAGE_KEY, {
        currentSong,
        volume,
      });
    }
  }, [currentSong, volume]);

  const registerAudioElement = useCallback(
    (el: HTMLAudioElement | null) => {
      audioRef.current = el;
      if (el) {
        el.volume = volume;
      }
    },
    [volume]
  );

  const playSong = useCallback(
    (song: Song, newQueue?: Song[]) => {
      setCurrentSong(song);
      if (newQueue) setQueue(newQueue);
      setIsPlaying(true);
    },
    []
  );

  const playNext = useCallback(() => {
    if (!currentSong || queue.length <= 1) return;
    const index = queue.findIndex((s) => s.id === currentSong.id);
    if (index === -1) return;
    const next = queue[index + 1];
    if (!next) return;
    setCurrentSong(next);
    setIsPlaying(true);
  }, [currentSong, queue]);

  const playPrevious = useCallback(() => {
    if (!currentSong || queue.length === 0) return;
    const index = queue.findIndex((s) => s.id === currentSong.id);
    const prev = queue[index - 1];
    if (prev) {
      setCurrentSong(prev);
      setIsPlaying(true);
    }
  }, [currentSong, queue]);

  const togglePlay = useCallback(() => {
    if (!currentSong) {
      if (queue[0]) {
        setCurrentSong(queue[0]);
        setIsPlaying(true);
      }
      return;
    }
    setIsPlaying((prev) => !prev);
  }, [currentSong, queue]);

  const setVolume = useCallback((value: number) => {
    const next = Math.min(1, Math.max(0, value));
    setVolumeState(next);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    audio.src = buildStreamUrl(currentSong.id);
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      playNext();
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      currentSong,
      queue,
      isPlaying,
      volume,
      isExpanded,
      playSong,
      playNext,
      playPrevious,
      togglePlay,
      setVolume,
      registerAudioElement,
      setExpanded: setIsExpanded,
    }),
    [
      currentSong,
      queue,
      isPlaying,
      volume,
      isExpanded,
      playSong,
      playNext,
      playPrevious,
      togglePlay,
      setVolume,
      registerAudioElement,
      setIsExpanded,
    ]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return ctx;
}


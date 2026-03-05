import type { Song } from "../../types";
import { SongListItem } from "./SongListItem";

type Props = {
  songs: Song[];
  favorites?: Record<string, boolean>;
  onToggleFavorite?: (song: Song) => void;
};

export function SongList({ songs, favorites, onToggleFavorite }: Props) {
  if (songs.length === 0) {
    return (
      <div className="song-list-empty">
        No songs yet. Import from YouTube to get started.
      </div>
    );
  }

  return (
    <div className="song-list">
      {songs.map((song) => (
        <SongListItem
          key={song.id}
          queue={songs}
          song={song}
          isFavorite={favorites?.[song.id]}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}


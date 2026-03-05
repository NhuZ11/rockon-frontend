import type { Song } from "../../types";
import { formatDuration } from "../../utils/formatDuration";
import { IconButton } from "../common/IconButton";
import { usePlayer } from "../../contexts/PlayerContext";
import { getSongThumbnailUrl } from "../../utils/getSongThumbnailUrl";
import { buildStreamUrl } from "../../api/songs";
import { Download } from "lucide-react";

type Props = {
  queue?: Song[];
  song: Song;
  isFavorite?: boolean;
  onToggleFavorite?: (song: Song) => void;
};

export function SongListItem({
  queue,
  song,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const { playSong, setExpanded } = usePlayer();
  const thumbnailUrl = getSongThumbnailUrl(song);
  const streamUrl = buildStreamUrl(song.id);

  return (
    <div className="card song-item">
      <div className="song-item-thumbnail">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=""
            loading="lazy"
          />
        ) : (
          <div className="song-item-thumbnail-fallback">
            <span>♪</span>
          </div>
        )}
      </div>
      <button
        className="song-item-main"
        onClick={() => {
          playSong(song, queue);
          setExpanded(true);
        }}
      >
        <div className="song-item-title truncate">
          {song.title}
        </div>
        <div className="song-item-meta">
          <span className="truncate">{song.artist ?? "Unknown artist"}</span>
          <span>•</span>
          <span>{formatDuration(song.duration_sec)}</span>
        </div>
      </button>
      {onToggleFavorite && (
        <IconButton
          aria-label={isFavorite ? "Unfavorite" : "Favorite"}
          active={isFavorite}
          onClick={() => onToggleFavorite(song)}
        >
          {isFavorite ? "★" : "☆"}
        </IconButton>
      )}
      <a
        className="icon-button song-item-download-button"
        href={streamUrl}
        download={`${song.title}.mp3`}
        aria-label={`Download ${song.title}`}
      >
        <Download size={16} />
      </a>
    </div>
  );
}


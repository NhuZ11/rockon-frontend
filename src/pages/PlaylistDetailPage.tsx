import { useParams } from "react-router-dom";
import { usePlaylistDetail } from "../hooks/usePlaylists";
import { Loader } from "../components/common/Loader";
import { Button } from "../components/common/Button";
import { usePlayer } from "../contexts/PlayerContext";
import { formatDuration } from "../utils/formatDuration";

export function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { playlist, items, loading, error } = usePlaylistDetail(id);
  const { playSong } = usePlayer();

  if (loading) return <Loader />;

  if (error || !playlist) {
    return (
      <p className="mt-3 text-sm text-red-400">
        {error ?? "Playlist not found"}
      </p>
    );
  }

  return (
    <div className="stack-spacing">
      <section className="card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <h1 className="text-base font-semibold text-slate-50">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="mt-1 text-xs text-slate-400">{playlist.description}</p>
          )}
        </div>
        <Button onClick={() => items[0] && playSong(items[0] as any)}>
          Play
        </Button>
      </section>

      <div className="song-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="card song-item"
          >
            <div className="song-item-main">
              <div className="song-item-title truncate">
                #{item.position} • {item.song_id}
              </div>
              {item.added_at && (
                <div className="song-item-meta truncate">
                  Added {new Date(item.added_at).toLocaleDateString()}
                </div>
              )}
            </div>
            <span className="text-xs text-slate-400">
              {formatDuration(undefined)}
            </span>
          </div>
        ))}
        {items.length === 0 && (
          <p className="mt-3 text-center text-sm text-slate-400">
            This playlist is empty.
          </p>
        )}
      </div>
    </div>
  );
}


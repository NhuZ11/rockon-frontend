import { Link } from "react-router-dom";
import { usePlaylists } from "../hooks/usePlaylists";
import { Loader } from "../components/common/Loader";
import { Button } from "../components/common/Button";

export function PlaylistPage() {
  const { data, loading, error } = usePlaylists();

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
          <h1 className="text-base font-semibold text-slate-50">Playlists</h1>
          <p className="mt-1 text-xs text-slate-400">
            Organize your library into focused queues.
          </p>
        </div>
        <Button as="a" href="#create" variant="ghost">
          + New
        </Button>
      </section>

      {loading && <Loader />}
      {error && !loading && (
        <p className="mt-3 text-xs text-red-400">{error}</p>
      )}

      <div className="song-list">
        {data.map((pl) => (
          <Link
            key={pl.id}
            to={`/playlists/${pl.id}`}
            className="card"
          >
            <div>
              <div className="song-item-title truncate">
                {pl.name}
              </div>
              {pl.description && (
                <div className="song-item-meta truncate">{pl.description}</div>
              )}
            </div>
            <span className="pill">Open</span>
          </Link>
        ))}
        {data.length === 0 && !loading && (
          <p className="mt-3 text-center text-sm text-slate-400">
            No playlists yet.
          </p>
        )}
      </div>
    </div>
  );
}


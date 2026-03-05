import { useState } from "react";
import { useSongs } from "../hooks/useSongs";
import { useFavorites } from "../hooks/useFavorites";
import { Input } from "../components/common/Input";
import { Loader } from "../components/common/Loader";
import { SongList } from "../components/songs/SongList";

export function LibraryPage() {
  const [search, setSearch] = useState("");
  const { data: songs, loading, error, setParams } = useSongs({
    limit: 25,
  });
  const favorites = useFavorites();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setParams((prev) => ({ ...prev, search, page: 1 }));
  }

  return (
    <div className="stack-spacing">
      <section className="card library-card">
        <div className="library-card-header">
          <h2 className="text-sm font-semibold text-slate-50">Your library</h2>
          <form onSubmit={handleSearchSubmit}>
            <Input
              placeholder="Search songs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {error && !loading && (
            <p className="mt-2 text-xs text-red-400">{error}</p>
          )}
        </div>
        <div className="library-card-body">
          {loading ? (
            <Loader />
          ) : (
            <SongList
              songs={songs}
              favorites={favorites.favorites}
              onToggleFavorite={(song) =>
                favorites.toggle(song.id).catch(() => {})
              }
            />
          )}
        </div>
      </section>
    </div>
  );
}


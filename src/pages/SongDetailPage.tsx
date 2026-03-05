import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Song } from "../types";
import { getSong, buildStreamUrl } from "../api/songs";
import { usePlayer } from "../contexts/PlayerContext";
import { Loader } from "../components/common/Loader";
import { Button } from "../components/common/Button";
import { getSongThumbnailUrl } from "../utils/getSongThumbnailUrl";

export function SongDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getSong(id)
      .then((res) => {
        if (!res.success || !res.data) {
          setError(res.message ?? "Song not found");
          setSong(null);
        } else {
          setSong(res.data);
        }
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Failed to load song details"
        );
        setSong(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  if (error || !song) {
    return (
      <div className="song-detail-page">
        <button
          className="song-detail-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <p className="mt-3 text-sm text-red-400">
          {error ?? "Song not found"}
        </p>
      </div>
    );
  }

  const thumbnailUrl = getSongThumbnailUrl(song);
  const streamUrl = buildStreamUrl(song.id);

  return (
    <div className="song-detail-page">
      <button
        className="song-detail-back"
        onClick={() => navigate(-1)}
      >
        ← Back to library
      </button>

      <section className="card song-detail-hero">
        <div className="song-detail-artwork">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={song.title}
              loading="lazy"
            />
          ) : (
            <div className="song-detail-artwork-fallback">
              <span>♪</span>
            </div>
          )}
        </div>
        <div className="song-detail-header">
          <span className="song-detail-label">Song</span>
          <h1 className="song-detail-title">{song.title}</h1>
          <p className="song-detail-artist">
            {song.artist ?? "Unknown artist"}
          </p>
          <div className="song-detail-tags">
            <span className="pill border border-slate-600 bg-slate-900/60">
              {song.source === "youtube" ? "YouTube" : "Local source"}
            </span>
            {song.source_id && song.source === "youtube" && (
              <a
                href={`https://www.youtube.com/watch?v=${song.source_id}`}
                target="_blank"
                rel="noreferrer"
                className="song-detail-link"
              >
                Open on YouTube ↗
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="card song-detail-body">
        <div className="song-detail-actions">
          <Button
            type="button"
            onClick={() => playSong(song)}
            fullWidth
          >
            ▶ Play song
          </Button>
          <a
            className="song-detail-download"
            href={streamUrl}
            download={`${song.title}.mp3`}
          >
            ⬇ Download
          </a>
        </div>

        <div className="song-detail-meta-grid">
          <div className="song-detail-meta-item">
            <span className="song-detail-meta-label">Source</span>
            <span className="song-detail-meta-value">
              {song.source ?? "Unknown"}
            </span>
          </div>
          <div className="song-detail-meta-item">
            <span className="song-detail-meta-label">Storage path</span>
            <span className="song-detail-meta-value truncate">
              {song.storage_path}
            </span>
          </div>
          {song.mime_type && (
            <div className="song-detail-meta-item">
              <span className="song-detail-meta-label">Format</span>
              <span className="song-detail-meta-value">{song.mime_type}</span>
            </div>
          )}
          {song.file_size != null && (
            <div className="song-detail-meta-item">
              <span className="song-detail-meta-label">File size</span>
              <span className="song-detail-meta-value">
                {(song.file_size / 1024 / 1024).toFixed(1)} MB
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


import { usePlayer } from "../../contexts/PlayerContext";
import { PlayerControls } from "./PlayerControls";
import { formatDuration } from "../../utils/formatDuration";
import { getSongThumbnailUrl } from "../../utils/getSongThumbnailUrl";
import { buildStreamUrl } from "../../api/songs";

export function NowPlayingBar() {
  const { currentSong, registerAudioElement, isExpanded, setExpanded } =
    usePlayer();
  const thumbnailUrl = currentSong ? getSongThumbnailUrl(currentSong) : null;
  const streamUrl = currentSong ? buildStreamUrl(currentSong.id) : "";

  return (
    <>
      {currentSong && isExpanded && (
        <div className="player-overlay">
          <div className="player-overlay-inner">
            <div className="player-overlay-topbar">
              <button
                type="button"
                className="player-overlay-back"
                onClick={() => setExpanded(false)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="player-overlay-menu"
                aria-label="More options"
              >
                ⋯
              </button>
            </div>
            <div className="player-overlay-artwork">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={currentSong.title}
                  loading="lazy"
                />
              ) : (
                <div className="player-overlay-artwork-fallback">
                  <span>♪</span>
                </div>
              )}
            </div>
            <div className="player-overlay-header">
              <span className="player-overlay-label">Now playing</span>
              <h2 className="player-overlay-title">{currentSong.title}</h2>
              <p className="player-overlay-artist">
                {currentSong.artist ?? "Unknown artist"}
              </p>
            </div>
            <div className="player-overlay-audio">
              <audio
                ref={registerAudioElement}
                className="player-overlay-audio-element"
                src={streamUrl}
                controls
              />
            </div>
            <div className="player-overlay-controls">
              <div className="player-overlay-controls-row">
                <PlayerControls />
              </div>
              <div className="player-overlay-extra">
                <button
                  type="button"
                  className="player-overlay-extra-button"
                >
                  Shuffle
                </button>
                <button
                  type="button"
                  className="player-overlay-extra-button"
                >
                  Repeat
                </button>
              </div>
              <div className="player-overlay-actions">
                <a
                  className="now-playing-download"
                  href={streamUrl}
                  download={`${currentSong.title}.mp3`}
                >
                  ⬇️ Download
                </a>
                <button
                  type="button"
                  className="player-overlay-minimize"
                  onClick={() => setExpanded(false)}
                >
                  Collapse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-player">
        <button
          type="button"
          className="now-playing-main"
          onClick={() => currentSong && setExpanded(true)}
        >
          <div className="now-playing-info">
            <div className="now-playing-header">
              {thumbnailUrl ? (
                <div className="now-playing-thumbnail">
                  <img
                    src={thumbnailUrl}
                    alt=""
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="now-playing-thumbnail now-playing-thumbnail--fallback">
                  <span>♪</span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
                  <span className="inline-block h-1 w-1 rounded-full bg-emerald-400" />
                  <span>Now playing</span>
                </div>
                {currentSong ? (
                  <>
                    <div className="truncate text-[0.9rem] font-semibold text-slate-50">
                      {currentSong.title}
                    </div>
                    <div className="truncate text-[0.75rem] text-slate-400">
                      {currentSong.artist ?? "Unknown artist"} •{" "}
                      {formatDuration(currentSong.duration_sec)}
                    </div>
                  </>
                ) : (
                  <div className="text-[0.75rem] text-slate-500">
                    Tap a song to start playing
                  </div>
                )}
              </div>
            </div>
          </div>
        </button>
        <PlayerControls />
      </div>
    </>
  );
}


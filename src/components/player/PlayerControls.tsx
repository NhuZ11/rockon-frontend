import { IconButton } from "../common/IconButton";
import { usePlayer } from "../../contexts/PlayerContext";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";

export function PlayerControls() {
  const { isPlaying, togglePlay, playNext, playPrevious } = usePlayer();

  return (
    <div className="player-controls">
      <IconButton onClick={playPrevious} aria-label="Previous">
        <SkipBack size={18} />
      </IconButton>
      <IconButton
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        active
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </IconButton>
      <IconButton onClick={playNext} aria-label="Next">
        <SkipForward size={18} />
      </IconButton>
    </div>
  );
}


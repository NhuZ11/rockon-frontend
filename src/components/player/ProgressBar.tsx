import { usePlayer } from "../../contexts/PlayerContext";
import { formatDuration } from "../../utils/formatDuration";

type Props = {
  expanded?: boolean;
};

export function ProgressBar({ expanded }: Props) {
  const { currentTime, duration, seek } = usePlayer();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  if (!expanded) {
    return (
      <div className="mini-progress-container">
        <div className="mini-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    );
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-time-row">
        <span>{formatDuration(currentTime)}</span>
        <span>{formatDuration(duration)}</span>
      </div>
      <div className="progress-slider-wrapper">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="progress-slider"
        />
        <div
          className="progress-slider-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

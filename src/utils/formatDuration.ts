export function formatDuration(seconds?: number | null): string {
  if (seconds == null || Number.isNaN(seconds)) return "--:--";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}


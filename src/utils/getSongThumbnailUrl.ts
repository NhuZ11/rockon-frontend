import type { Song } from "../types";

function extractYoutubeId(url?: string | null): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    const vParam = parsed.searchParams.get("v");
    if (vParam) return vParam;

    // Short URL: https://youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      return id || null;
    }

    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname.startsWith("/embed/")
    ) {
      const id = parsed.pathname.replace("/embed/", "");
      return id || null;
    }
  } catch {
    // Fallback for non-URL strings (very rare)
    const match = url.match(
      /(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
    );
    if (match?.[1]) return match[1];
  }

  return null;
}

export function getSongThumbnailUrl(song: Song): string | null {
  const videoId =
    song.source_id && song.source === "youtube"
      ? song.source_id
      : extractYoutubeId(song.youtube_url);

  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}


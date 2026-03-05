import { useState } from "react";
import { toggleFavorite } from "../api/favorites";

export function useFavorites(initialFavorites: Record<string, boolean> = {}) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    initialFavorites
  );

  async function toggle(songId: string) {
    const res = await toggleFavorite(songId);
    if (!res.success || !res.data) {
      throw new Error(res.success ? "Failed to toggle favorite" : res.message);
    }
    setFavorites((prev) => ({
      ...prev,
      [songId]: res.data!.isFavorite,
    }));
    return res.data.isFavorite;
  }

  return { favorites, toggle };
}


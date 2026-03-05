import { apiClient } from "./client";

type ToggleFavoriteResponse = {
  isFavorite: boolean;
};

export function toggleFavorite(songId: string) {
  return apiClient.post<ToggleFavoriteResponse>(
    `/api/favorites/${songId}/toggle`
  );
}


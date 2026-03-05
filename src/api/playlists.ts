import { apiClient } from "./client";
import type { ApiResponse, Playlist, PlaylistItem } from "../types";

type PlaylistWithItems = {
  playlist: Playlist;
  items: PlaylistItem[];
};

export function listPlaylists() {
  return apiClient.get<Playlist[]>("/api/playlists");
}

export function createPlaylist(body: {
  name: string;
  description?: string;
}) {
  return apiClient.post<Playlist>("/api/playlists", body);
}

export function getPlaylistWithItems(id: string) {
  return apiClient.get<PlaylistWithItems>(`/api/playlists/${id}`);
}

export function addSongToPlaylist(id: string, songId: string) {
  return apiClient.post<PlaylistItem>(`/api/playlists/${id}/items`, {
    songId,
  });
}

export function reorderPlaylistItems(id: string, itemIds: string[]) {
  return apiClient.patch<null>(`/api/playlists/${id}/reorder`, { itemIds });
}

export function removePlaylistItem(id: string, itemId: string) {
  return apiClient.delete<null>(`/api/playlists/${id}/items/${itemId}`);
}


import { apiClient, API_BASE_URL } from "./client";
import type { ApiResponse, Pagination, Song } from "../types";

export type ListSongsParams = {
  search?: string;
  page?: number;
  limit?: number;
  favoriteOnly?: boolean;
};

export type ListSongsResponse = ApiResponse<Song[]> & {
  pagination?: Pagination;
};

export function buildStreamUrl(songId: string) {
  return `${API_BASE_URL}/stream/${songId}`;
}

export async function listSongs(
  params: ListSongsParams = {}
): Promise<ListSongsResponse> {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("search", params.search);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.favoriteOnly) searchParams.set("favoriteOnly", "true");

  const query = searchParams.toString();
  const path = `/api/songs${query ? `?${query}` : ""}`;

  return apiClient.get<Song[]>(path) as Promise<ListSongsResponse>;
}

export function getSong(id: string) {
  return apiClient.get<Song>(`/api/songs/${id}`);
}

export function deleteSong(id: string) {
  return apiClient.delete<null>(`/api/songs/${id}`);
}


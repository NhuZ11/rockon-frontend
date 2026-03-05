import { apiClient } from "./client";
import type { Song } from "../types";

export function importFromYoutube(url: string) {
  return apiClient.post<Song>("/api/import/youtube", { url });
}


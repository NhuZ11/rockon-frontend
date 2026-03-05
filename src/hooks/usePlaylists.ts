import { useEffect, useState } from "react";
import type { Playlist, PlaylistItem } from "../types";
import {
  listPlaylists,
  getPlaylistWithItems,
  addSongToPlaylist,
  removePlaylistItem,
  reorderPlaylistItems,
} from "../api/playlists";

type ListState = {
  data: Playlist[];
  loading: boolean;
  error?: string;
};

export function usePlaylists() {
  const [state, setState] = useState<ListState>({ data: [], loading: true });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    listPlaylists()
      .then((res) => {
        if (cancelled) return;
        if (!res.success) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: res.message,
          }));
        } else {
          setState({ data: res.data ?? [], loading: false });
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load playlists",
        }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

type DetailState = {
  playlist?: Playlist;
  items: PlaylistItem[];
  loading: boolean;
  error?: string;
};

export function usePlaylistDetail(id: string | undefined) {
  const [state, setState] = useState<DetailState>({
    items: [],
    loading: true,
  });

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    getPlaylistWithItems(id)
      .then((res) => {
        if (cancelled) return;
        if (!res.success) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: res.message,
          }));
        } else if (res.data) {
          setState({
            playlist: res.data.playlist,
            items: res.data.items,
            loading: false,
          });
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            err instanceof Error ? err.message : "Failed to load playlist detail",
        }));
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return {
    ...state,
    addSong: (songId: string) => addSongToPlaylist(id!, songId),
    removeItem: (itemId: string) => removePlaylistItem(id!, itemId),
    reorder: (itemIds: string[]) => reorderPlaylistItems(id!, itemIds),
  };
}


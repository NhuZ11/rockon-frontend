import { useEffect, useState } from "react";
import type { Song, Pagination } from "../types";
import { listSongs, type ListSongsParams } from "../api/songs";

type State = {
  data: Song[];
  pagination?: Pagination;
  loading: boolean;
  error?: string;
};

export function useSongs(initialParams: ListSongsParams = {}) {
  const [params, setParams] = useState<ListSongsParams>(initialParams);
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    listSongs(params)
      .then((res) => {
        if (cancelled) return;
        if (!res.success) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: res.message,
          }));
        } else {
          setState({
            data: res.data ?? [],
            pagination: res.pagination,
            loading: false,
          });
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load songs",
        }));
      });
    return () => {
      cancelled = true;
    };
  }, [params]);

  return {
    ...state,
    params,
    setParams,
  };
}


import { useState } from "react";
import { importFromYoutube } from "../api/import";
import type { Song } from "../types";

type State = {
  loading: boolean;
  error?: string;
  lastImported?: Song;
};

export function useImportYoutube() {
  const [state, setState] = useState<State>({ loading: false });

  async function importUrl(url: string) {
    setState({ loading: true });
    const res = await importFromYoutube(url);
    if (!res.success) {
      setState({ loading: false, error: res.message });
      return res;
    }
    setState({ loading: false, lastImported: res.data });
    return res;
  }

  return {
    ...state,
    importUrl,
  };
}


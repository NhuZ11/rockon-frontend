import { useState } from "react";
import { useImportYoutube } from "../hooks/useImportYoutube";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export function ImportPage() {
  const importer = useImportYoutube();
  const [url, setUrl] = useState("");

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    const res = await importer.importUrl(url.trim());
    if (res.success) {
      setUrl("");
    }
  }

  return (
    <div className="stack-spacing">
      <section className="card">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div>
            <h1 className="text-base font-semibold text-slate-50">
              Import from YouTube
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Drop in any YouTube link and RockOn will save the audio into your
              personal library.
            </p>
          </div>
          <div className="import-badges">
            <span className="pill border border-emerald-500/40 bg-emerald-500/10">
              Fast yt-dlp import
            </span>
            <span className="pill border border-slate-600 bg-slate-900/60">
              Private by design
            </span>
          </div>
        </div>

        <form
          onSubmit={handleImport}
          style={{
            marginTop: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            type="submit"
            disabled={importer.loading}
            fullWidth
          >
            {importer.loading ? "Importing..." : "Import track"}
          </Button>
        </form>
        {importer.error && (
          <p className="mt-2 text-xs text-red-400">{importer.error}</p>
        )}
      </section>
    </div>
  );
}


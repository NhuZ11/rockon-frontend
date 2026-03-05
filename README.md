rockon-frontend/
  ├─ public/
  │   ├─ favicon.svg
  │   ├─ manifest.webmanifest      # PWA manifest
  │   └─ icons/                    # PWA icons for Capacitor + manifest
  ├─ src/
  │   ├─ api/
  │   │   ├─ client.ts             # base fetch wrapper (Api-Key, base URL)
  │   │   ├─ songs.ts              # /api/songs + /stream helpers
  │   │   ├─ playlists.ts          # /api/playlists endpoints
  │   │   ├─ favorites.ts          # /api/favorites endpoints
  │   │   └─ import.ts             # /api/import/youtube
  │   │
  │   ├─ components/
  │   │   ├─ layout/
  │   │   │   ├─ AppShell.tsx      # main shell (header, nav, NowPlayingBar)
  │   │   │   └─ Sidebar.tsx       # optional: library / playlists navigation
  │   │   ├─ player/
  │   │   │   ├─ NowPlayingBar.tsx # bottom docked player
  │   │   │   └─ PlayerControls.tsx
  │   │   ├─ songs/
  │   │   │   ├─ SongList.tsx
  │   │   │   └─ SongListItem.tsx
  │   │   ├─ playlists/
  │   │   │   ├─ PlaylistList.tsx
  │   │   │   ├─ PlaylistListItem.tsx
  │   │   │   └─ PlaylistDetailView.tsx
  │   │   └─ common/
  │   │       ├─ Button.tsx
  │   │       ├─ Input.tsx
  │   │       ├─ TextArea.tsx
  │   │       ├─ IconButton.tsx
  │   │       └─ Loader.tsx
  │   │
  │   ├─ contexts/
  │   │   ├─ PlayerContext.tsx     # global audio player state (current song, play/pause)
  │   │   └─ ThemeContext.tsx      # optional: dark/light toggles
  │   │
  │   ├─ hooks/
  │   │   ├─ useSongs.ts           # uses api/songs.ts + react-query/swr
  │   │   ├─ usePlaylists.ts
  │   │   ├─ useFavorites.ts
  │   │   └─ useImportYoutube.ts
  │   │
  │   ├─ pages/
  │   │   ├─ LibraryPage.tsx       # import box + all songs list
  │   │   ├─ PlaylistPage.tsx      # list all playlists
  │   │   └─ PlaylistDetailPage.tsx# one playlist, reordering, add/remove
  │   │
  │   ├─ router/
  │   │   └─ index.tsx             # React Router config
  │   │
  │   ├─ types/
  │   │   └─ index.ts              # Song, Playlist, PlaylistItem, Pagination, API responses
  │   │
  │   ├─ styles/
  │   │   ├─ globals.css           # tailwind or global styles
  │   │   └─ theme.css             # color tokens, typography, etc.
  │   │
  │   ├─ utils/
  │   │   ├─ formatDuration.ts     # seconds → mm:ss
  │   │   ├─ storage.ts            # localStorage helpers (settings, last playlist)
  │   │   └─ pwa.ts                # optional PWA helpers (notifications, etc.)
  │   │
  │   ├─ App.tsx
  │   ├─ main.tsx
  │   └─ vite-env.d.ts
  │
  ├─ package.json
  ├─ tsconfig.json
  ├─ vite.config.ts
  └─ README.md
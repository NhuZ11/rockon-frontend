import { createBrowserRouter, Outlet } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { LibraryPage } from "../pages/LibraryPage";
import { PlaylistPage } from "../pages/PlaylistPage";
import { PlaylistDetailPage } from "../pages/PlaylistDetailPage";
import { SongDetailPage } from "../pages/SongDetailPage";
import { ImportPage } from "../pages/ImportPage";

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LibraryPage /> },
      { path: "import", element: <ImportPage /> },
      { path: "songs/:id", element: <SongDetailPage /> },
      { path: "playlists", element: <PlaylistPage /> },
      { path: "playlists/:id", element: <PlaylistDetailPage /> },
    ],
  },
]);


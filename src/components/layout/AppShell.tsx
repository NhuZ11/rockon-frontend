import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { NowPlayingBar } from "../player/NowPlayingBar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="brand-badge">R</span>
            <div className="brand-text">
              <div className="brand-title">RockOn</div>
              <div className="brand-subtitle">Personal streaming • Dev</div>
            </div>
          </div>
          <nav className="app-header-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Library
            </NavLink>
            <NavLink
              to="/playlists"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Playlists
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>

      {/* Mobile bottom nav (Spotify-style) */}
      <nav className="bottom-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bottom-nav-item bottom-nav-item--active"
              : "bottom-nav-item"
          }
        >
          <span className="bottom-nav-icon">🏠</span>
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/import"
          className={({ isActive }) =>
            isActive
              ? "bottom-nav-item bottom-nav-item--active"
              : "bottom-nav-item"
          }
        >
          <span className="bottom-nav-icon">＋</span>
          <span>Import</span>
        </NavLink>
        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            isActive
              ? "bottom-nav-item bottom-nav-item--active"
              : "bottom-nav-item"
          }
        >
          <span className="bottom-nav-icon">🎵</span>
          <span>Playlists</span>
        </NavLink>
      </nav>

      <NowPlayingBar />
    </div>
  );
}


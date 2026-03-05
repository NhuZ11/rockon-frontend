export type Song = {
  id: string;
  title: string;
  artist?: string | null;
  album?: string | null;
  duration_sec?: number | null;
  source: string;
  source_id?: string | null;
  youtube_url?: string | null;
  storage_path: string;
  file_size?: number | null;
  mime_type?: string | null;
};

export type Playlist = {
  id: string;
  name: string;
  description?: string | null;
};

export type PlaylistItem = {
  id: string;
  playlist_id: string;
  song_id: string;
  position: number;
  added_at?: string;
};

export type Pagination = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize?: number;
};

export type ApiSuccess<T> = {
  success: true;
  data?: T;
  pagination?: Pagination;
  message?: string;
};

export type ApiError = {
  success: false;
  message: string;
  errors?: unknown;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;


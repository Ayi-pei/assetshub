export interface ShortLink {
  id: string;
  originalUrl: string;
  createdAt: number;
  updatedAt: number;
  refreshInterval: number | null; // in milliseconds, null means no auto-refresh
  nextRefreshAt: number | null; // timestamp for next refresh
  accessCount: number; // 访问次数统计
}

export interface ShortLinkFormData {
  originalUrl: string;
  refreshInterval: string; // "none" or number in minutes
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}
import type { ApiResponse } from "../types";

const DEFAULT_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? DEFAULT_BASE_URL;

const API_KEY = import.meta.env.VITE_ROCKON_API_KEY;

if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "[RockOn] VITE_ROCKON_API_KEY is not set. API requests will fail."
  );
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
};

async function request<T>(
  path: string,
  { method = "GET", body, signal }: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const isJson = method === "POST" || method === "PATCH";

  const headers: HeadersInit = {};

  if (path.startsWith("/api/")) {
    if (API_KEY) {
      headers["Api-Key"] = API_KEY;
    }
    if (isJson) {
      headers["Content-Type"] = "application/json";
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: isJson && body ? JSON.stringify(body) : undefined,
    signal,
  });

  const contentType = res.headers.get("Content-Type") ?? "";

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    return {
      success: false,
      message: text || `Unexpected response from server (${res.status})`,
    };
  }

  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok || json.success === false) {
    if (!json.success) {
      return json;
    }
    return {
      success: false,
      message: json.message || `Request failed with status ${res.status}`,
    };
  }

  return json;
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
};

export { API_BASE_URL };


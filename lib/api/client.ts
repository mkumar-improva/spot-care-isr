import type { FetchOptions } from './types';

export class ApiError extends Error {
  status: number;
  statusText: string;
  requestUrl: string;

  constructor(message: string, response: Response | { status: number; statusText?: string }, requestUrl: string) {
    super(message);
    this.name = 'ApiError';
    this.status = response.status;
    this.statusText = response.statusText ?? '';
    this.requestUrl = requestUrl;
  }
}

const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  // Helpful at dev time without breaking Next.js during import
  // eslint-disable-next-line no-console
  console.warn('API_BASE_URL is not set. Configure it in your environment.');
}

export async function apiFetch<T>(pathWithQuery: string, options: FetchOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('Missing API_BASE_URL');
  }

  const url = new URL(pathWithQuery, API_BASE_URL).toString();
  const { revalidate = 3600, tags, cache = 'force-cache' } = options;

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    cache,
    next: { revalidate, tags },
  } as RequestInit);

  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.status} ${response.statusText}`, response, url);
  }

  return response.json() as Promise<T>;
}

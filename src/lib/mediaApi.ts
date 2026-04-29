const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type MediaType = 'image' | 'video' | 'document' | 'audio';

export type MediaItem = {
  id: number;
  name: string;
  url: string;
  type: MediaType;
  size: number;
  mimeType: string;
  dimensions: string | null;
  title: string;
  altText: string;
  caption: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePayload = {
  title?: string;
  altText?: string;
  caption?: string;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchMedia(params?: {
  type?: MediaType;
  search?: string;
}): Promise<MediaItem[]> {
  const qs = new URLSearchParams();
  if (params?.type) qs.set('type', params.type);
  if (params?.search) qs.set('search', params.search);
  const res = await fetch(`${BASE}/media?${qs}`, { cache: 'no-store' });
  return handle<MediaItem[]>(res);
}

export async function uploadMedia(
  file: File,
  meta?: { title?: string; altText?: string; caption?: string; dimensions?: string },
): Promise<MediaItem> {
  const form = new FormData();
  form.append('file', file);
  if (meta?.title) form.append('title', meta.title);
  if (meta?.altText) form.append('altText', meta.altText);
  if (meta?.caption) form.append('caption', meta.caption);
  if (meta?.dimensions) form.append('dimensions', meta.dimensions);

  const res = await fetch(`${BASE}/media/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  });
  return handle<MediaItem>(res);
}

export async function updateMedia(
  id: number,
  payload: UpdatePayload,
): Promise<MediaItem> {
  const res = await fetch(`${BASE}/media/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<MediaItem>(res);
}

export async function deleteMedia(id: number): Promise<void> {
  const res = await fetch(`${BASE}/media/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

export async function bulkDeleteMedia(ids: number[]): Promise<void> {
  const res = await fetch(`${BASE}/media/bulk`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ ids }),
  });
  await handle<unknown>(res);
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const backendBase = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? 'http://localhost:3001';
  // Route /uploads/ through /api/uploads/ so reverse-proxy forwards it to NestJS
  if (url.startsWith('/uploads/')) {
    return `${backendBase}/api${url}`;
  }
  return `${backendBase}${url}`;
}

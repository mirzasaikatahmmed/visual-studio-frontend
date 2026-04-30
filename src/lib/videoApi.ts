const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export type Video = {
  id: number;
  title: string;
  category: string | null;
  platform: 'YouTube' | 'Vimeo';
  embedUrl: string;
  thumbnailUrl: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VideoPayload = {
  title: string;
  category?: string;
  platform: 'YouTube' | 'Vimeo';
  embedUrl: string;
  thumbnailUrl?: string;
  featured?: boolean;
};

export async function fetchVideos(featured?: boolean): Promise<Video[]> {
  const qs = featured !== undefined ? `?featured=${featured}` : '';
  const res = await fetch(`${BASE}/videos${qs}`, { cache: 'no-store' });
  return handle<Video[]>(res);
}

export async function createVideo(payload: VideoPayload): Promise<Video> {
  const res = await fetch(`${BASE}/videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Video>(res);
}

export async function updateVideo(id: number, payload: Partial<VideoPayload>): Promise<Video> {
  const res = await fetch(`${BASE}/videos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Video>(res);
}

export async function deleteVideo(id: number): Promise<void> {
  const res = await fetch(`${BASE}/videos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

export async function uploadThumbnail(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${BASE}/uploads`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  });
  const data = await handle<{ url: string }>(res);
  return data.url;
}

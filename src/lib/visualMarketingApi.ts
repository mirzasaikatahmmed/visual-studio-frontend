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

export type VisualMarketingWork = {
  id: number;
  title: string;
  tag: string | null;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type VisualMarketingWorkPayload = {
  title: string;
  tag?: string;
  imageUrl: string;
  sortOrder?: number;
};

export async function fetchWorks(): Promise<VisualMarketingWork[]> {
  const res = await fetch(`${BASE}/visual-marketing`, { cache: 'no-store' });
  return handle<VisualMarketingWork[]>(res);
}

export async function createWork(payload: VisualMarketingWorkPayload): Promise<VisualMarketingWork> {
  const res = await fetch(`${BASE}/visual-marketing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<VisualMarketingWork>(res);
}

export async function updateWork(
  id: number,
  payload: Partial<VisualMarketingWorkPayload>,
): Promise<VisualMarketingWork> {
  const res = await fetch(`${BASE}/visual-marketing/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<VisualMarketingWork>(res);
}

export async function deleteWork(id: number): Promise<void> {
  const res = await fetch(`${BASE}/visual-marketing/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

export async function uploadWorkImage(file: File): Promise<string> {
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

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

export type Subscriber = {
  id: number;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  updatedAt: string;
};

export async function subscribe(email: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return handle<{ message: string }>(res);
}

export async function fetchSubscribers(): Promise<Subscriber[]> {
  const res = await fetch(`${BASE}/newsletter/subscribers`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  return handle<Subscriber[]>(res);
}

export async function deleteSubscriber(id: number): Promise<void> {
  const res = await fetch(`${BASE}/newsletter/subscribers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

export function getExportUrl(): string {
  const token = getToken();
  return `${BASE}/newsletter/export${token ? `?token=${token}` : ''}`;
}

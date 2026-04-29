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

export type Service = {
  id: number;
  title: string;
  url: string | null;
  imageUrl: string;
  label: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ServicePayload = {
  title: string;
  url?: string;
  imageUrl: string;
  label?: string;
  sortOrder?: number;
};

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${BASE}/services`, { cache: 'no-store' });
  return handle<Service[]>(res);
}

export async function createService(payload: ServicePayload): Promise<Service> {
  const res = await fetch(`${BASE}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Service>(res);
}

export async function updateService(id: number, payload: Partial<ServicePayload>): Promise<Service> {
  const res = await fetch(`${BASE}/services/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Service>(res);
}

export async function deleteService(id: number): Promise<void> {
  const res = await fetch(`${BASE}/services/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

export async function uploadServiceImage(file: File): Promise<string> {
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

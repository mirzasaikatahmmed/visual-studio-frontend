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

export type VisionCraftItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VisionCraftPayload = {
  title: string;
  description: string;
  imageUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
};

export async function fetchVisionCraftItems(activeOnly = false): Promise<VisionCraftItem[]> {
  const url = activeOnly
    ? `${BASE}/vision-craft?activeOnly=true`
    : `${BASE}/vision-craft`;
  const res = await fetch(url, { cache: 'no-store' });
  return handle<VisionCraftItem[]>(res);
}

export async function createVisionCraftItem(payload: VisionCraftPayload): Promise<VisionCraftItem> {
  const res = await fetch(`${BASE}/vision-craft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<VisionCraftItem>(res);
}

export async function updateVisionCraftItem(
  id: number,
  payload: Partial<VisionCraftPayload>,
): Promise<VisionCraftItem> {
  const res = await fetch(`${BASE}/vision-craft/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<VisionCraftItem>(res);
}

export async function deleteVisionCraftItem(id: number): Promise<void> {
  const res = await fetch(`${BASE}/vision-craft/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

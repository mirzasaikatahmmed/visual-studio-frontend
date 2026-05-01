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

export type StoreCategory = {
  id: number;
  name: string;
  image: string;
  sortOrder: number;
  whatsappMessage: string;
  createdAt: string;
  updatedAt: string;
};

export type StoreCategoryPayload = {
  name: string;
  image: string;
  sortOrder?: number;
  whatsappMessage?: string;
};

export type StoreSettings = {
  whatsappNumber: string;
};

export function fetchCategories(): Promise<StoreCategory[]> {
  return fetch(`${BASE}/store/categories`, { cache: 'no-store' }).then(r => handle<StoreCategory[]>(r));
}

export function createCategory(payload: StoreCategoryPayload): Promise<StoreCategory> {
  return fetch(`${BASE}/store/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  }).then(r => handle<StoreCategory>(r));
}

export function updateCategory(id: number, payload: Partial<StoreCategoryPayload>): Promise<StoreCategory> {
  return fetch(`${BASE}/store/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  }).then(r => handle<StoreCategory>(r));
}

export function deleteCategory(id: number): Promise<void> {
  return fetch(`${BASE}/store/categories/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(r => handle<unknown>(r)) as Promise<void>;
}

export function uploadCategoryImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  return fetch(`${BASE}/uploads`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  }).then(r => handle<{ url: string }>(r)).then(d => d.url);
}

export function fetchSettings(): Promise<StoreSettings> {
  return fetch(`${BASE}/store/settings`, { cache: 'no-store' }).then(r => handle<StoreSettings>(r));
}

export function updateSettings(whatsappNumber: string): Promise<StoreSettings> {
  return fetch(`${BASE}/store/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ whatsappNumber }),
  }).then(r => handle<StoreSettings>(r));
}

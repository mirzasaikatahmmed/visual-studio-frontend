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

export type PortfolioCategory = {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  count: number;
  createdAt: string;
  updatedAt: string;
};

export type Portfolio = {
  id: number;
  title: string;
  url: string;
  alt: string;
  featured: boolean;
  sortOrder: number;
  categoryId: number | null;
  category: Pick<PortfolioCategory, 'id' | 'name' | 'slug'> | null;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioPayload = {
  title: string;
  url: string;
  alt?: string;
  featured?: boolean;
  categoryId?: number;
  sortOrder?: number;
};

export type CategoryPayload = {
  name: string;
  slug: string;
  sortOrder?: number;
};

export async function fetchPortfolios(categoryId?: number): Promise<Portfolio[]> {
  const qs = categoryId ? `?categoryId=${categoryId}` : '';
  const res = await fetch(`${BASE}/portfolios${qs}`, { cache: 'no-store' });
  return handle<Portfolio[]>(res);
}

export async function fetchCategories(): Promise<PortfolioCategory[]> {
  const res = await fetch(`${BASE}/portfolios/categories`, { cache: 'no-store' });
  return handle<PortfolioCategory[]>(res);
}

export async function createPortfolio(payload: PortfolioPayload): Promise<Portfolio> {
  const res = await fetch(`${BASE}/portfolios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Portfolio>(res);
}

export async function updatePortfolio(id: number, payload: Partial<PortfolioPayload>): Promise<Portfolio> {
  const res = await fetch(`${BASE}/portfolios/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Portfolio>(res);
}

export async function deletePortfolio(id: number): Promise<void> {
  const res = await fetch(`${BASE}/portfolios/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

export async function createCategory(payload: CategoryPayload): Promise<PortfolioCategory> {
  const res = await fetch(`${BASE}/portfolios/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<PortfolioCategory>(res);
}

export async function updateCategory(id: number, payload: Partial<CategoryPayload>): Promise<PortfolioCategory> {
  const res = await fetch(`${BASE}/portfolios/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<PortfolioCategory>(res);
}

export async function reorderCategories(items: { id: number; sortOrder: number }[]): Promise<void> {
  const res = await fetch(`${BASE}/portfolios/categories/reorder`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ items }),
  });
  await handle<unknown>(res);
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${BASE}/portfolios/categories/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

export async function uploadImage(file: File): Promise<string> {
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

export function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const backendBase = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? 'http://localhost:3001';
  if (url.startsWith('/uploads/')) return `${backendBase}/api${url}`;
  return `${backendBase}${url}`;
}

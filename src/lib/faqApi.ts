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

export type Faq = {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type FaqPayload = {
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
};

export async function fetchFaqs(): Promise<Faq[]> {
  const res = await fetch(`${BASE}/faqs`, { cache: 'no-store' });
  return handle<Faq[]>(res);
}

export async function createFaq(payload: FaqPayload): Promise<Faq> {
  const res = await fetch(`${BASE}/faqs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Faq>(res);
}

export async function updateFaq(id: number, payload: Partial<FaqPayload>): Promise<Faq> {
  const res = await fetch(`${BASE}/faqs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<Faq>(res);
}

export async function deleteFaq(id: number): Promise<void> {
  const res = await fetch(`${BASE}/faqs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  await handle<unknown>(res);
}

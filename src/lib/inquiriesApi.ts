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

export type InquiryStatus = 'Pending' | 'Replied' | 'Booked' | 'Closed';

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  message: string;
  eventDate: string | null;
  status: InquiryStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateInquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  eventDate?: string;
};

export type UpdateInquiryPayload = {
  status?: InquiryStatus;
  notes?: string;
};

export function createInquiry(payload: CreateInquiryPayload): Promise<Inquiry> {
  return fetch(`${BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(r => handle<Inquiry>(r));
}

export function fetchInquiries(): Promise<Inquiry[]> {
  return fetch(`${BASE}/inquiries`, {
    headers: authHeaders(),
    cache: 'no-store',
  }).then(r => handle<Inquiry[]>(r));
}

export function updateInquiry(id: number, payload: UpdateInquiryPayload): Promise<Inquiry> {
  return fetch(`${BASE}/inquiries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  }).then(r => handle<Inquiry>(r));
}

export function deleteInquiry(id: number): Promise<void> {
  return fetch(`${BASE}/inquiries/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(r => handle<unknown>(r)) as Promise<void>;
}

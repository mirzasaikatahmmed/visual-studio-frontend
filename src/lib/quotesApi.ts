import { type Inquiry, updateInquiry, deleteInquiry } from './inquiriesApi';

export { updateInquiry, deleteInquiry };
export type { Inquiry };

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
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { message?: string }).message ?? `Request failed: ${res.status}`);
  }
  return (body?.data ?? body) as T;
}

export function fetchQuotes(): Promise<Inquiry[]> {
  return fetch(`${BASE}/quotes`, {
    headers: authHeaders(),
    cache: 'no-store',
  }).then(r => handle<Inquiry[]>(r));
}

export interface CreateQuotePayload {
  // Package selections
  coverage: 'photo' | 'video' | 'photo_video';
  hours: number;
  dayHours: number[];
  days: number;
  addons: string[];
  secondPhotographerHours: number;
  secondVideographerHours: number;
  crewPreference: 'standard' | 'female' | 'mixed';
  usbCount: number;
  printCount: number;
  estimateLow: number;
  estimateHigh: number;
  // Contact details
  coupleName: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  notes?: string;
}

export async function submitQuote(payload: CreateQuotePayload): Promise<void> {
  const res = await fetch(`${BASE}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ?? `Request failed: ${res.status}`,
    );
  }
}

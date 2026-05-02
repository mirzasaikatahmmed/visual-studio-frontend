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

export type MonthlyActivity = { month: string; inquiries: number; bookings: number };

export type RecentInquiry = {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
  createdAt: string;
};

export type DashboardStats = {
  inquiries: { total: number; pending: number; replied: number; booked: number; closed: number };
  portfolioPhotos: number;
  newsletters: { total: number; active: number };
  storeOrders: { total: number; needsQuote: number };
  monthlyActivity: MonthlyActivity[];
  recentInquiries: RecentInquiry[];
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${BASE}/dashboard/stats`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  return handle<DashboardStats>(res);
}

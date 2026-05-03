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
    const msg = Array.isArray(body?.message)
      ? body.message[0]
      : (body?.message ?? `Request failed: ${res.status}`);
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export type SettingItem = { key: string; value: string; group?: string };

export async function fetchSettingsMap(): Promise<Record<string, string>> {
  const res = await fetch(`${BASE}/settings/map`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  return handle<Record<string, string>>(res);
}

export async function bulkSaveSettings(settings: SettingItem[]): Promise<void> {
  const res = await fetch(`${BASE}/settings/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ settings }),
  });
  await handle<unknown>(res);
}

export type UpdateProfilePayload = { firstName?: string; lastName?: string };
export type ProfileResponse = {
  id: number; email: string; firstName: string; lastName: string;
  role: string; isActive: boolean;
};

export async function updateAdminProfile(payload: UpdateProfilePayload): Promise<ProfileResponse> {
  const res = await fetch(`${BASE}/auth/profile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<ProfileResponse>(res);
}

export async function changeAdminPassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  const res = await fetch(`${BASE}/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  await handle<unknown>(res);
}

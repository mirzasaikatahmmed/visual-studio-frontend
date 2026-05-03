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

export type AboutContent = {
  id: number;
  titlePart1: string;
  titlePart2: string;
  quoteText: string;
  storyParagraphs: string;
  whatWeDoTitle: string;
  whatWeDoDescription: string;
  updatedAt: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string | null;
  bio: string | null;
  imagePosition: 'left' | 'right';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type TeamMemberPayload = {
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string;
  imagePosition?: 'left' | 'right';
  sortOrder?: number;
};

export async function fetchAboutContent(): Promise<AboutContent> {
  const res = await fetch(`${BASE}/about/content`, { cache: 'no-store' });
  return handle<AboutContent>(res);
}

export async function updateAboutContent(
  payload: Partial<Omit<AboutContent, 'id' | 'updatedAt'>>,
): Promise<AboutContent> {
  const res = await fetch(`${BASE}/about/content`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<AboutContent>(res);
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${BASE}/about/team`, { cache: 'no-store' });
  return handle<TeamMember[]>(res);
}

export async function createTeamMember(payload: TeamMemberPayload): Promise<TeamMember> {
  const res = await fetch(`${BASE}/about/team`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<TeamMember>(res);
}

export async function updateTeamMember(
  id: number,
  payload: Partial<TeamMemberPayload>,
): Promise<TeamMember> {
  const res = await fetch(`${BASE}/about/team/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handle<TeamMember>(res);
}

export async function deleteTeamMember(id: number): Promise<void> {
  const res = await fetch(`${BASE}/about/team/${id}`, {
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
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const backendBase =
    process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? 'http://localhost:3001';
  if (url.startsWith('/uploads/')) return `${backendBase}/api${url}`;
  return `${backendBase}${url}`;
}

const KEY = 'krinova.admin.session';
export const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

function storage(remember) {
  return remember ? localStorage : sessionStorage;
}

function readSession() {
  try {
    const raw = localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function adminToken() {
  return readSession()?.token || '';
}

export function isAdminAuthed() {
  return Boolean(adminToken());
}

export function adminEmail() {
  return readSession()?.email || '';
}

export async function loginAdmin({ email, password, remember }) {
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok || !data.token) {
      return { ok: false, error: data.error || 'Could not sign in.' };
    }
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
    storage(remember).setItem(
      KEY,
      JSON.stringify({
        token: data.token,
        email: data.admin?.email || email.trim().toLowerCase(),
        at: Date.now(),
      })
    );
    return { ok: true };
  } catch {
    return { ok: false, error: 'Cannot reach the studio server. Is the API running?' };
  }
}

export function logoutAdmin() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}

export async function fetchAdminMe() {
  const token = adminToken();
  if (!token) return null;
  const res = await fetch(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    logoutAdmin();
    return null;
  }
  const data = await res.json();
  return data.admin || null;
}

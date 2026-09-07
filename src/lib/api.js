import { adminToken, logoutAdmin, API } from './adminAuth';

export const API_ORIGIN = API.replace(/\/api\/?$/, '');

export function assetUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

export async function publicFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}

export async function adminFetch(path, options = {}) {
  const token = adminToken();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    logoutAdmin();
    window.location.assign('/admin/login');
  }
  return { res, data };
}

export async function adminUpload(path, formData) {
  const token = adminToken();
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    logoutAdmin();
    window.location.assign('/admin/login');
  }
  return { res, data };
}

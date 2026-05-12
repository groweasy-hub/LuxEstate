import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://localhost:5001/api';
const AUTH_TOKEN_KEY = 'luxestate_admin_token';
const DEFAULT_TIMEOUT_MS = 10000;
const UPLOAD_TIMEOUT_MS = 120000;

export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token) {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  else window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function clearAuthToken() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getRequestErrorMessage(error, fallbackMessage) {
  if (error?.code === 'ECONNABORTED' || /timeout/i.test(error?.message || '')) {
    return 'Upload timed out. Please try again or use a smaller image.';
  }

  return error?.response?.data?.message || fallbackMessage;
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: DEFAULT_TIMEOUT_MS,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth ──────────────────────────────────────────────────
export const authAPI = {
  login:    (data)  => api.post('/auth/login', data),
  logout:   ()      => api.post('/auth/logout'),
  me:       ()      => api.get('/auth/me'),
  register: (data)  => api.post('/auth/register', data),
};

// ── Projects ──────────────────────────────────────────────
export const projectsAPI = {
  getAll:     (params) => api.get('/projects', { params }),
  getFeatured:()       => api.get('/projects/featured'),
  getOne:     (id)     => api.get(`/projects/${id}`),
  getRelated: (id)     => api.get(`/projects/${id}/related`),
  create:     (data)   => api.post('/projects', data),
  update:     (id, data) => api.put(`/projects/${id}`, data),
  remove:     (id)     => api.delete(`/projects/${id}`),
};

// ── Offers ────────────────────────────────────────────────
export const offersAPI = {
  getAll:     (params) => api.get('/offers', { params }),
  getFeatured:()       => api.get('/offers/featured'),
  getOne:     (id)     => api.get(`/offers/${id}`),
  create:     (data)   => api.post('/offers', data),
  update:     (id, data) => api.put(`/offers/${id}`, data),
  remove:     (id)     => api.delete(`/offers/${id}`),
};

// ── Leads ─────────────────────────────────────────────────
export const leadsAPI = {
  submit:       (data)         => api.post('/leads', data),
  getAll:       (params)       => api.get('/leads', { params }),
  getStats:     ()             => api.get('/leads/stats'),
  getOne:       (id)           => api.get(`/leads/${id}`),
  updateStatus: (id, data)     => api.patch(`/leads/${id}/status`, data),
  remove:       (id)           => api.delete(`/leads/${id}`),
  exportCSV:    ()             => api.get('/leads/export', { responseType: 'blob' }),
};

// ── Upload ────────────────────────────────────────────────
export const uploadAPI = {
  single:   (file)  => {
    const fd = new FormData();
    fd.append('file', file);
    return api.post('/upload', fd, { timeout: UPLOAD_TIMEOUT_MS });
  },
  multiple: (files) => {
    const fd = new FormData();
    files.forEach((f) => fd.append('files', f));
    return api.post('/upload/multiple', fd, { timeout: UPLOAD_TIMEOUT_MS });
  },
  remove:   (pid)   => api.delete(`/upload/${pid}`),
};

export default api;

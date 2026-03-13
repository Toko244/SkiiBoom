import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, '');

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 15000,
  });

  client.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const language = localStorage.getItem('preferredLanguage') || 'en';
      if (config.headers) {
        config.headers['Accept-Language'] = language;
      }

      // Fetch CSRF cookie before state-changing requests
      const method = config.method?.toLowerCase();
      if (method === 'post' || method === 'patch' || method === 'put' || method === 'delete') {
        await axios.get(`${API_ORIGIN}/sanctum/csrf-cookie`, { withCredentials: true });
        // Read the XSRF-TOKEN cookie and set the header
        const xsrfToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1];
        if (xsrfToken && config.headers) {
          config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
        }
      }
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      // Coerce null image/avatar fields to empty strings for UI compatibility
      if (response.data?.data) {
        const coerceNulls = (obj: Record<string, unknown>) => {
          const imageKeys = ['image', 'image_path', 'authorAvatar', 'author_avatar', 'logo', 'logo_path'];
          for (const key of imageKeys) {
            if (key in obj && obj[key] === null) {
              obj[key] = '';
            }
          }
        };
        if (Array.isArray(response.data.data)) {
          response.data.data.forEach((item: Record<string, unknown>) => {
            if (item && typeof item === 'object') coerceNulls(item);
          });
        } else if (typeof response.data.data === 'object' && response.data.data !== null) {
          coerceNulls(response.data.data as Record<string, unknown>);
        }
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      return Promise.reject(error);
    }
  );

  return client;
}

const apiClient = createApiClient();

export default apiClient;
export { API_BASE_URL };

import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL || '/api';
const api = axios.create({ baseURL, timeout: 15000 });
export const lista = datos => Array.isArray(datos) ? datos : datos?.results || [];
export function avisar(mensaje) { window.dispatchEvent(new CustomEvent('aviso', { detail: mensaje })); }
const esPanel = config => /^\/?panel\//.test(config.url || '');
let renovacion;
api.interceptors.request.use(config => {
  if (esPanel(config)) {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  const bot = localStorage.getItem('bot_token');
  // El formulario humano excluye expresamente la credencial del navegador.
  if (bot && !config.humano) config.headers['X-Bot-Token'] = bot;
  return config;
});
api.interceptors.response.use(respuesta => respuesta, async error => {
  const config = error.config;
  if (error.response?.status === 401 && config && esPanel(config) && !config._reintento) {
    config._reintento = true;
    const refresh = localStorage.getItem('refresh_token');
    if (refresh) {
      try {
        renovacion ||= axios.post(`${baseURL.replace(/\/$/, '')}/token/refresh/`, { refresh }).then(({ data }) => {
          localStorage.setItem('access_token', data.access);
          if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
          return data.access;
        }).finally(() => { renovacion = null; });
        config.headers.Authorization = `Bearer ${await renovacion}`;
        return await api(config);
      } catch { /* La sesión se limpia al fallar la renovación. */ }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.dispatchEvent(new Event('sesion-vencida'));
  }
  if (!axios.isCancel(error)) avisar(error.response?.data?.error || 'No se pudo completar la solicitud. Revisa la conexión y la configuración de la API.');
  return Promise.reject(error);
});
export default api;

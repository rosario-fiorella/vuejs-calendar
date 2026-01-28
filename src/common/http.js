const BASE_URL = import.meta.env.VITE_API_URL || ''; 
const API_KEY = import.meta.env.VITE_API_KEY || '';

const HEADERS = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY
};

export const API = {
  async _handleResponse(response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Errore API: ${response.status} - ${error}`);
    }
    return response.json();
  },

  fetchAppData: async () => {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'GET',
      headers: HEADERS
    });
    return API._handleResponse(response);
  },

  filterEntities: async (param = {}) => {
    const { sort = 'asc', page = 1, per_page: perPage, ...rest } = param;
    const query = encodeURIComponent(JSON.stringify(rest));
    const targetUrl = BASE_URL.startsWith('http') 
      ? new URL(BASE_URL) 
      : new URL(window.location.origin + BASE_URL);

    targetUrl.searchParams.append('q', query);
    targetUrl.searchParams.append('sort', sort);
    targetUrl.searchParams.append('page', page);
    if (perPage) targetUrl.searchParams.append('per_page', perPage);

    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: HEADERS
    });
    return API._handleResponse(response);
  },

  tryToBook: async (data) => {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data)
    });
    return API._handleResponse(response);
  }
};

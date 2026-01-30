import i18n from '@/i18n'

const CONFIG = Object.freeze({
  BASE_URL: import.meta.env.VITE_API_URL || '',
  API_KEY: import.meta.env.VITE_API_KEY || '',
  HEADERS: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY || '',
    'Accept': 'application/json'
  }
});

const _activeLocks = new Set();

const _createResponse = (success, messageKey, data = null, status = 200) => ({
  success,
  message: i18n.t(messageKey),
  data,
  status,
  timestamp: Date.now()
});

export const API = {
  async fetchRentals(filters = {}) {
    const LOCK_KEY = 'fetch_rentals';

    if (_activeLocks.has(LOCK_KEY)) {
      return _createResponse(false, 'errors.locked', null, 429);
    }

    _activeLocks.add(LOCK_KEY);

    try {
      const response = await fetch(`${CONFIG.BASE_URL}/rentals/list`, {
        method: 'POST',
        headers: CONFIG.HEADERS,
        body: JSON.stringify(filters)
      });

      if (!response.ok) {
        throw response;
      }

      const json = await response.json();
      return _createResponse(true, 'success.data_loaded', json);

    } catch (error) {
      if (error instanceof Response) {
        const detail = await error.json().catch(() => ({}));
        console.error(`[SERVER_ERROR][${error.status}]:`, { url: error.url, details: detail, filters });
      } else {
        console.error(`[FATAL_EXCEPTION][${LOCK_KEY}]:`, { message: error.message, stack: error.stack });
      }

      return _createResponse(false, 'errors.server', null, 500);

    } finally {
      _activeLocks.delete(LOCK_KEY);
    }
  }
};

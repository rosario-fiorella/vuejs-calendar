import i18n from '@/i18n'

const CONFIG = Object.freeze({
  BASE_URL: import.meta.env.VITE_API_URL || '',
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
        const error = await response.json().catch(() => ({}));
        console.error(error);
        return _createResponse(false, 'errors.server', null, response.status);
      }

      const json = await response.json();
      const responseData = json.data || json;
      return _createResponse(true, 'success.data_loaded', responseData);
    } catch (error) {
      console.error(error);
      return _createResponse(false, 'errors.network', null, 500);
    } finally {
      _activeLocks.delete(LOCK_KEY);
    }
  }
};

import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '@/api'
import i18n from '@/i18n'
import { Entity } from '@/models/Entity'

Vue.use(Vuex)

const formatToZulu = (dateInput, timeStr) => {
  if (!dateInput || !timeStr) {
    return null;
  }

  let y, m, d;
  if (typeof dateInput === 'string') {
    [y, m, d] = dateInput.split('-').map(Number);
  } else {
    y = dateInput.getFullYear();
    m = dateInput.getMonth() + 1;
    d = dateInput.getDate();
  }

  const [hh, mm] = timeStr.split(':').map(Number);
  const localDate = new Date(y, m - 1, d, hh, mm);
  return localDate.toISOString();
};


export default new Vuex.Store({
  state: {
    appReady: false,
    bootError: null,
    lastUpdate: null,
    config: {
      limits: {
        minPrice: 0,
        maxPrice: 0,
        minDate: '',
        maxDate: '',
        minTime: '00:00',
        maxTime: '23:59',
        step: 30,
        disabledDates: [],
      },
      catalog: {},
      tagGroups: [],
      sortByOptions: [],
      currencies: [],
      languages: [],
      legalChecks: []
    },
    query: {
      dates: [],
      startTime: '08:00',
      endTime: '18:00',
      priceRange: [0, 0],
      selectedTags: {},
      sortBy: 'asc',
      currency: 'EUR',
      locale: 'it_IT',
      page: 1,
      per_page: 12
    },
    catalog: {
      availability: {},
      selectedSlot: null
    },
    userForm: {
      email: '',
      consents: {}
    }
  },

  mutations: {
    SET_APP_READY(state, status) {
      state.appReady = status;
    },
    SET_BOOT_ERROR(state, error) {
      state.bootError = error;
    },
    SET_LAST_UPDATE(state) {
      state.lastUpdate = new Date().toISOString();
    },
    SET_RENTALS_DATA(state, data) {
      if (data.min_time) state.config.limits.minTime = data.min_time;
      if (data.max_time) state.config.limits.maxTime = data.max_time;
      if (data.step_minutes) state.config.limits.step = data.step_minutes;
      if (data.min_date) state.config.limits.minDate = data.min_date;
      if (data.max_date) state.config.limits.maxDate = data.max_date;
      if (data.disabled_dates) state.config.limits.disabledDates = data.disabled_dates;
      if (data.min_price !== undefined) state.config.limits.minPrice = data.min_price;
      if (data.max_price !== undefined) state.config.limits.maxPrice = data.max_price;
      if (data.tag_groups) state.config.tagGroups = data.tag_groups;
      if (data.sort_by_options) state.config.sortByOptions = data.sort_by_options;
      if (data.currencies) state.config.currencies = data.currencies;
      if (data.languages) state.config.languages = data.languages;
      if (data.legal_checks) state.config.legalChecks = data.legal_checks;

      if (state.query.priceRange[0] === 0 && state.query.priceRange[1] === 0 && data.max_price) {
        state.query.priceRange = [data.min_price || 0, data.max_price];
      }

      if (data.catalog) {
        const mappedCatalog = {};
        Object.keys(data.catalog).forEach(slug => {
          mappedCatalog[slug] = new Entity(slug, data.catalog[slug]);
        });
        state.config.catalog = mappedCatalog;
      }

      if (data.tag_groups) {
        const currentTags = { ...state.query.selectedTags };
        data.tag_groups.forEach(group => {
          if (!Object.prototype.hasOwnProperty.call(currentTags, group.id)) {
            Vue.set(currentTags, group.id, []);
          }
        });
        state.query.selectedTags = currentTags;
      }

      if (data.availability) {
        state.catalog.availability = data.availability;
      }
    },
    SET_SELECTED_SLOT(state, slotPayload) {
      state.catalog.selectedSlot = slotPayload ? { ...slotPayload } : null;
    },
    SET_QUERY_DATES(state, dates) {
      state.query.dates = dates;
    },
    SET_QUERY_PRICE_RANGE(state, range) {
      state.query.priceRange = range;
    },
    SET_QUERY_SORT(state, sortValue) {
      state.query.sortBy = sortValue;
    },
    SET_QUERY_TIME(state, { key, value }) {
      state.query[key] = value;
    },
    SET_TAG_SELECTION(state, { groupId, tags }) {
      state.query.selectedTags = {
        ...state.query.selectedTags,
        [groupId]: tags
      };
    },
    SET_LOCALE(state, locale) {
      state.query.locale = locale;
      i18n.locale = locale;
    },
    SET_CURRENCY(state, currency) {
      state.query.currency = currency;
    },
    SET_USER_FIELD(state, { field, value }) {
      state.userForm[field] = value;
    },
    SET_CONSENT(state, { id, val }) {
      Vue.set(state.userForm.consents, id, !!val);
    },
    RESET_FILTERS(state) {
      state.query.priceRange = [state.config.limits.minPrice, state.config.limits.maxPrice];
      state.query.sortBy = 'asc';
      state.query.dates = [];

      const resetTags = {};
      Object.keys(state.query.selectedTags).forEach(key => {
        resetTags[key] = [];
      });
      state.query.selectedTags = resetTags;

      state.userForm.email = '';
      state.userForm.consents = {};
      state.catalog.selectedSlot = null;
    }
  },

  getters: {
    apiPayload: (state) => {
      const [startDate, endDate] = (state.query.dates && state.query.dates.length === 2)
        ? [...state.query.dates].sort()
        : [null, null];

      const flatTags = Object.values(state.query.selectedTags)
        .flat()
        .filter(tag => tag)
        .join(',');

      return {
        language: state.query.locale,
        currency: state.query.currency,
        price_min: state.query.priceRange[0],
        price_max: state.query.priceRange[1],
        sort: state.query.sortBy,
        tags: flatTags,
        page: state.query.page,
        per_page: state.query.per_page,
        utc_datetime_start: formatToZulu(startDate, state.query.startTime),
        utc_datetime_end: formatToZulu(endDate, state.query.endTime)
      };
    },
    allProducts: state => state.catalog.availability,
    selectedProduct: state => state.catalog.selectedSlot
  },

  actions: {
    async initApp({ commit, getters }, externalPayload = {}) {
      try {
        const payload = { ...getters.apiPayload, ...externalPayload };

        if (!externalPayload.fetch_config && (!payload.utc_datetime_start || !payload.utc_datetime_end)) {
          return;
        }

        const response = await API.fetchRentals(payload);

        if (response.success) {
          commit('SET_RENTALS_DATA', response.data);
          commit('SET_LAST_UPDATE');
          commit('SET_APP_READY', true);
          commit('SET_BOOT_ERROR', null);
        } else {
          commit('SET_BOOT_ERROR', response.message);
        }
      } catch (error) {
        commit('SET_BOOT_ERROR', error.message);
      }
    }
  }
});

import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '@/api'
import i18n from '@/i18n'
import { Entity } from '@/models/Entity'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    businessConfig: {
      minTime: '',
      maxTime: '',
      step: 0,
      minDate: '',
      maxDate: '',
      disabledDates: [],
      minPrice: 0,
      maxPrice: 0,
      sortByOptions: [],
      tagGroups: [],
      legalChecks: [],
      currencies: [],
      languages: [],
      rentals: [
        {
          slug: "monolocale",
          type: "rent",
          _selected: false,
          content: {
            slug: "monolocale",
            name: "Monolocale",
            description: "Accogliente monolocale in centro città",
            excerpt: "Ideale per coppie",
            note: "Check-in disponibile dalle 14:00"
          },
          price: {
            price: 85.00,
            price_currency: "€",
            tax_included: true,
            tax: [
              { slug: "tassa-di-soggiorno", title: "tassa di soggiorno", value: "2.00", currency: "EUR" },
              { slug: "iva-22", title: "iva 22%", value: "22.00", currency: "EUR" }
            ]
          },
          terms: {
            features: [
              { slug: "1-bagno", name: "1 bagno" },
              { slug: "aria-condizionata", name: "Aria condizionata" }
            ],
            rental_types: [{ slug: "affitto-breve", name: "Affitto breve" }],
            product_types: [{ slug: "monolocale", name: "Monolocale" }]
          },
          media: {
            images: [{ url: "http://localhost:5173/uploads/rental-1.jpg" }],
            thumbnail: { url: "http://localhost:5173/uploads/rental-2.jpg" }
          }
        }
      ]
    },
    appReady: false,
    bootError: null,
    lastUpdate: null,
    selectedDates: [],
    page: 0,
    per_page: 0,

    selectedFilters: {},
    rentalForm: {
      startTime: '08:00',
      endTime: '18:00',
      email: ''
    },
    selectedLocale: 'it_IT',
    selectedCurrency: 'EUR',
    filters: {
      sortBy: 'asc',
      priceRange: [0, 0],
    },
    consents: {}
  },

  mutations: {
    SET_APP_READY(state, status) {
      state.appReady = status
    },
    SET_BOOT_ERROR(state, error) {
      state.bootError = error
    },
    SET_LAST_UPDATE(state) {
      state.lastUpdate = new Date().toISOString()
    },
    SET_CURRENCY(state, currencyKey) {
      state.selectedCurrency = currencyKey
    },
    SET_LOCALE(state, localeCode) {
      state.selectedLocale = localeCode;
      i18n.locale = localeCode;
    },
    SET_RENTALS(state, data) {
      // update businessConfig
      if (data.min_time) {
        state.businessConfig.minTime = data.min_time;
      }
      if (data.max_time) {
        state.businessConfig.maxTime = data.max_time;
      }
      if (data.step_minutes) {
        state.businessConfig.step = data.step_minutes;
      }
      if (data.min_date) {
        state.businessConfig.minDate = data.min_date;
      }
      if (data.max_date) {
        state.businessConfig.maxDate = data.max_date;
      }
      if (data.disabled_dates) {
        state.businessConfig.disabledDates = data.disabled_dates;
      }
      if (data.min_price) {
        state.businessConfig.minPrice = data.min_price;
      }
      if (data.max_price) {
        state.businessConfig.maxPrice = data.max_price;
      }
      if (data.sort_by_options) {
        state.businessConfig.sortByOptions = data.sort_by_options;
      }
      if (data.tag_groups) {
        state.businessConfig.tagGroups = data.tag_groups;
      }
      if (data.legal_checks) {
        state.businessConfig.legalChecks = data.legal_checks;
      }
      if (data.currencies) {
        state.businessConfig.currencies = data.currencies;
      }
      if (data.languages) {
        state.businessConfig.languages = data.languages.map(lang => ({
          ...lang,
          code: lang.code.replace('_', '-')
        }));
      }

      // update filters
      if (state.filters.priceRange[0] === 0 && state.filters.priceRange[1] === 0) {
        state.filters.priceRange = [data.min_price, data.max_price];
      }

      if (data.tag_groups) {
        data.tag_groups.forEach(group => {
          if (!Object.prototype.hasOwnProperty.call(state.selectedFilters, group.slug)) {
            Vue.set(state.selectedFilters, group.slug, []);
          }
        });
      }

      if (data.catalog) {
        const currentSelectedSlug = state.businessConfig.rentals.find(r => r._selected)?.slug;
        state.businessConfig.rentals = Object.keys(data.catalog).map(slug => {
          const entity = new Entity(slug, data.catalog[slug]);
          entity._selected = (slug === currentSelectedSlug);
          return entity;
        });
      }
    },
    SET_RENTAL_TIME(state, { key, val }) {
      state.rentalForm[key] = val
    },
    SET_SELECTED_DATES(state, dates) {
      state.selectedDates = dates
    },
    SET_SORT_FILTER(state, value) {
      state.filters.sortBy = value
    },
    SET_PRICE_RANGE(state, range) {
      state.filters.priceRange = range
    },
    SET_DYNAMIC_TAGS(state, { groupId, tags }) {
      Vue.set(state.selectedFilters, groupId, tags)
    },
    SET_PRODUCT_SELECTION(state, slug) {
      state.businessConfig.rentals = state.businessConfig.rentals.map(item => ({
        ...item,
        _selected: item.slug === slug ? !item._selected : false
      }))
    },
    SET_RENTAL_FORM_FIELD(state, { key, val }) {
      if (Object.prototype.hasOwnProperty.call(state.rentalForm, key)) {
        state.rentalForm[key] = val;
      } else {
        Vue.set(state.rentalForm, key, val);
      }
    },
    SET_CONSENT(state, { id, val }) {
      Vue.set(state.consents, id, val)
    },
    RESET_FORM(state) {
      state.rentalForm.email = ''
      state.consents = {}
      state.selectedDates = []
      state.businessConfig.rentals.forEach(r => {
        r._selected = false
      })
    }
  },

  getters: {
    selectedProduct: state => state.businessConfig.rentals.find(r => r._selected) || null,
    allProducts: state => state.businessConfig.rentals
  },

  actions: {
    toggleProductSelection({ commit }, productSlug) {
      commit('SET_PRODUCT_SELECTION', productSlug)
    },
    async initApp({ commit }, payload = {}) {
      try {
        const response = await API.fetchRentals(payload);
        if (response.data) {
          commit('SET_RENTALS', response.data);
          commit('SET_LAST_UPDATE');
        }
      } catch (error) {
        commit('SET_BOOT_ERROR', error.message);
      } finally {
        commit('SET_APP_READY', true);
      }
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '@/api'
import i18n from '@/i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appReady: false,
    bootError: null,
    lastUpdate: null,
    rentals: [],
    selectedDates: [],
    businessConfig: {
      minTime: '08:00',
      maxTime: '22:00',
      step: 15,
      minDate: new Date().toISOString().split('T')[0],
      maxDate: '2027-12-31',
      disabledDates: [],
      minPrice: 0,
      maxPrice: 2000,
      sortByOptions: [
        { value: 'price_asc', text: 'rentals.sort_price_asc' },
        { value: 'price_desc', text: 'rentals.sort_price_desc' },
        { value: 'name_asc', text: 'rentals.sort_name_asc' }
      ],
      tagGroups: [
        {
          id: 'rent_type',
          label: 'rentals.tag_product_type',
          icon: 'mdi-car-key',
          items: [
            { id: 101, text: 'rentals.tag_daily' },
            { id: 102, text: 'rentals.tag_long_term' }
          ]
        },
        {
          id: 'product_type',
          label: 'rentals.tag_product_type',
          icon: 'mdi-car-side',
          items: [
            { id: 201, text: 'rentals.tag_electric' },
            { id: 202, text: 'rentals.tag_hybrid' }
          ]
        }
      ],
      legalChecks: [
        { id: 'privacy', label: 'I accept the <a href="/privacy" target="_blank">Privacy Policy</a>', required: true },
        { id: 'terms', label: 'I accept the <a href="/terms" target="_blank">Terms of Service</a>', required: true },
        { id: 'marketing', label: 'Subscribe to newsletter', required: false }
      ],
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
      ],
      currencies: [
        {
          "key": "AUD",
          "label": "Australian Dollar",
          "symbol": "A$"
        },
        {
          "key": "CAD",
          "label": "Canadian Dollar",
          "symbol": "CA$"
        },
        {
          "key": "CHF",
          "label": "Swiss Franc",
          "symbol": "CHF"
        },
        {
          "key": "CNY",
          "label": "Chinese Yuan",
          "symbol": "\u00a5"
        },
        {
          "key": "EUR",
          "label": "Euro",
          "symbol": "\u20ac"
        },
        {
          "key": "GBP",
          "label": "British Pound",
          "symbol": "\u00a3"
        },
        {
          "key": "INR",
          "label": "Indian Rupee",
          "symbol": "\u20b9"
        },
        {
          "key": "JPY",
          "label": "Japanese Yen",
          "symbol": "\u00a5"
        },
        {
          "key": "USD",
          "label": "US Dollar",
          "symbol": "$"
        }
      ],
      languages: [
        { code: 'it-IT', label: 'Italiano', flag: 'it' },
        { code: 'en-US', label: 'English', flag: 'gb' },
        { code: 'fr-FR', label: 'Français', flag: 'fr' },
        { code: 'de-DE', label: 'Deutsch', flag: 'de' }
      ]
    },
    selectedFilters: {},
    rentalForm: {
      startTime: '08:00',
      endTime: '18:00',
      email: ''
    },
    selectedLocale: 'en',
    selectedCurrency: 'EUR',
    filters: {
      sortBy: 'price_asc',
      priceRange: [0, 2000],
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
      const currentSelectedSlug = state.businessConfig.rentals.find(r => r._selected)?.slug;
      state.businessConfig.rentals = data.map(item => ({
        ...item,
        _selected: item.slug === currentSelectedSlug
      }));
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
    SET_PRODUCT_SELECTION(state, slugRicevuto) {
      state.businessConfig.rentals = state.businessConfig.rentals.map(item => ({
        ...item,
        _selected: item.slug === slugRicevuto ? !item._selected : false
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
        if (response.success) {
          commit('SET_RENTALS', response.data);
          commit('SET_LAST_UPDATE');
        } else if (response.status !== 429) {
          throw new Error(response.message);
        }
      } catch (error) {
        commit('SET_BOOT_ERROR', error.message);
      } finally {
        commit('SET_APP_READY', true);
      }
    }
  }
})

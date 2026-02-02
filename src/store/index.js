import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '@/api'

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
        { value: 'price_asc', text: 'Price (Low to High)' },
        { value: 'price_desc', text: 'Price (High to Low)' },
        { value: 'name_asc', text: 'Name (A-Z)' }
      ],
      tagGroups: [
        {
          id: 'rent_type',
          label: 'Rental Category',
          icon: 'mdi-car-key',
          items: [
            { id: 101, text: 'Daily Rental' },
            { id: 102, text: 'Long Term' },
            { id: 103, text: 'Leasing' }
          ]
        },
        {
          id: 'product_type',
          label: 'Product Type',
          icon: 'mdi-car-side',
          items: [
            { id: 201, text: 'Electric' },
            { id: 202, text: 'Hybrid' },
            { id: 203, text: 'Luxury Sedan' },
            { id: 204, text: 'SUV' }
          ]
        },
        {
          id: 'features',
          label: 'Product Features',
          icon: 'mdi-shield-check',
          items: [
            { id: 301, text: 'Full Insurance' },
            { id: 302, text: 'GPS Included' },
            { id: 303, text: 'Child Seat' },
            { id: 304, text: 'Additional Driver' }
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
            price_currency: "EUR",
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
            images: [{ url: "https://picsum.photos/200/300?grayscale" }],
            thumbnail: { url: "https://picsum.photos/200/300?grayscale" }
          }
        }
      ]
    },
    selectedFilters: {},
    rentalForm: {
      startTime: '08:00',
      endTime: '18:00',
      email: ''
    },
    filters: {
      sortBy: 'price_asc',
      priceRange: [0, 1000],
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
    SET_RENTALS(state, data) {
      state.rentals = data.map(item => ({ ...item, _selected: false }))
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
    SET_RENTAL_FORM_FIELD(state, { key, val }) {
      state.rentalForm[key] = val
    },
    SET_PRODUCT_SELECTION(state, slugRicevuto) {
      state.businessConfig.rentals = state.businessConfig.rentals.map(item => {
        const isTarget = item.slug === slugRicevuto
        return {
          ...item,
          _selected: isTarget ? !item._selected : false
        }
      })
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
          commit('SET_BOOT_ERROR', null);
        } else if (response.status !== 429) {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error(`[Store Action initApp]: ${error.message}`);
        commit('SET_BOOT_ERROR', error.message);
      } finally {
        commit('SET_APP_READY', true);
      }
    }
  }
})

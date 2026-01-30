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
          label: 'Vehicle Type',
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
      ]
    },
    selectedFilters: {},
    rentalForm: {
      startTime: '08:00',
      endTime: '18:00'
    },
    filters: {
      sortBy: 'price_asc',
      priceRange: [0, 1000],
    },
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
      state.rentals = data
    },
    SET_RENTAL_TIME(state, { key, val }) {
      state.rentalForm[key] = val;
    },
    SET_SELECTED_DATES(state, dates) {
      state.selectedDates = dates
    },
    SET_SORT_FILTER(state, value) {
      state.filters.sortBy = value;
    },
    SET_PRICE_RANGE(state, range) {
      state.filters.priceRange = range;
    },
    SET_DYNAMIC_TAGS(state, { groupId, tags }) {
      Vue.set(state.selectedFilters, groupId, tags);
    }
  },

  actions: {
    async initApp({ commit }, payload = {}) {
      commit('SET_APP_READY', true);

      // try {
      //   // Se non passiamo date (es. al boot), l'API userà i default del server
      //   const response = await API.fetchRentals(payload);

      //   if (response.success) {
      //     commit('SET_RENTALS', response.data);
      //     commit('SET_LAST_UPDATE');
      //     commit('SET_BOOT_ERROR', null);
      //     commit('SET_APP_READY', true);
      //   } else {
      //     // Gestione Locking (429): se è lockato non facciamo nulla,
      //     // la richiesta precedente aggiornerà lo stato al termine.
      //     if (response.status !== 429) {
      //       throw new Error(response.message);
      //     }
      //   }
      // } catch (error) {
      //   console.error(`[Store Action initApp]: ${error.message}`);
      //   commit('SET_BOOT_ERROR', error.message);
      //   // Al primo boot, se fallisce, non mostriamo l'app rotta
      //   // Se è un refresh, l'app rimane visibile ma con l'errore loggato
      // }
    }
  }
})

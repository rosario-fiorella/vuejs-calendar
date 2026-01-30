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
      sortByOptions: [
        { value: 'price_asc', text: 'Price (asc)' }
      ],
      defaultSort: 'date_asc'
    },
    rentalForm: {
      startTime: '08:00',
      endTime: '18:00'
    },
    filters: {
      sortBy: 'price_asc'
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
    }
  },

  actions: {
    /**
     * Carica i noleggi con supporto Zulu UTC per PHP
     * @param {Object} payload - { from: "ISO_ZULU", to: "ISO_ZULU" }
     */
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

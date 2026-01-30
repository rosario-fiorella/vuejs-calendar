import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appReady: false,
    bootError: null,
    lastUpdate: null
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
    }
  },

  actions: {
    async initApp({ commit }) {
      try {
        const response = await API.fetchRentals()

        if (response.success) {
          commit('SET_LAST_UPDATE')
          commit('SET_APP_READY', true)
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        console.error(error.message)
        commit('SET_BOOT_ERROR', error.message)
        commit('SET_APP_READY', true)
        alert(error.message)
      }
    }
  }
})

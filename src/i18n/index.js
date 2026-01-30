import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    errors: {
      locked: 'Request in progress...',
      server: 'Server error',
      network: 'Network error'
    }
  }
}

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

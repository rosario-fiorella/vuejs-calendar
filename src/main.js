import Vue from 'vue'
import axios from 'axios'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
require('dotenv').config()

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4CAF50',
        secondary: '#388E3C',
        accent: '#8BC34A',
        background: '#F1F8E9',
        surface: '#FFFFFF',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#D32F2F',
        anchor: '#2E7D32'
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#F44336',
        secondary: '#4E342E',
        accent: '#1E293B',
        background: '#FFF8F1',
        surface: '#FFFFFF',
        info: '#03A9F4',
        success: '#4CAF50',
        warning: '#FB8C00',
        error: '#FF5252',
        anchor: '#E65100',
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})

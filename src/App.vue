<template>
  <v-app>
    <v-main app>
      <v-container fill-height>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
  #app >>> header.v-toolbar {
    overflow-x: auto;
    overflow-y: hidden;
  }
  #app >>> .v-bottom-sheet.v-dialog.v-dialog--active {
    overflow: auto;
  }
</style>

<script>
import './assets/load.css'
import { I18N } from './common/locale.js'

export default {
  name: 'App',
  created () {
    if (typeof (Storage) === 'undefined') {
      alert(I18N.load().common.browserNotSupported)
    }
  },
  data () {
    return {}
  }
}
</script>

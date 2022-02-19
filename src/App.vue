<template>
  <v-app>
    <v-app-bar app :color="colors.primary" dark :src="site.bg">
      <v-avatar :size="site.logo.size" class="mr-2" :color="colors.secondary">
        <v-icon dark>{{ site.logo.src }}</v-icon>
      </v-avatar>
      <v-toolbar-title>{{ site.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tab small v-for="(item, s) in site.list" :key="s" :to="item.url">
        <v-icon left small>{{ item.icon }}</v-icon> {{ item.text }}
      </v-tab>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>{{ languages.icon.translate }}</v-icon>
            <v-icon>{{ languages.icon.arrowDown }}</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group :color="colors.primary">
            <v-list-item v-for="(item, i) in languages.list" :key="i" v-on:click="switchLangues(i, item.url)">
              <v-list-item-content>
                <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <template v-slot:extension>
        <v-tabs centered :background-color="colors.primary" dark v-model="navigation.selected">
          <v-tab v-for="(item, n) in navigation.list" :key="n" :to="item.url">
            <v-icon left small>{{ item.icon }}</v-icon> {{ item.text}}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main app>
      <v-container fill-height>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <template>
          <v-bottom-sheet inset v-model="sheet">
            <template v-slot:activator="{on, attrs}">
              <v-btn dark :color="colors.secondary" v-show="!sheet" small fab fixed bottom right v-bind="attrs" v-on="on">
                <v-icon>{{ notices.icon.open }}</v-icon>
              </v-btn>
            </template>
            <v-sheet>
              <v-alert :type="notices.type" colored-border prominent border="left" v-for="(item, i) in notices.list" :key="i">
                <v-card flat>
                  <v-card-title>{{ item.title }}</v-card-title>
                  <v-card-subtitle>
                    <v-icon small>{{ item.date.icon }}</v-icon> {{ item.date.start }} - {{ item.date.end }}
                  </v-card-subtitle>
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </v-alert>
            </v-sheet>
          </v-bottom-sheet>
        </template>
      </v-container>
    </v-main>
    <v-footer dark padless>
      <v-card :color="colors.primary" tile width="100%" class="text-center">
        <v-card-actions class="justify-center">
          <v-btn icon v-for="(social, i) in footer.nav" :key="i" :href="social.url" target="_blank">
            <v-icon>{{ social.icon }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>{{ footer.note }}</v-card-text>
        <v-divider></v-divider>
        <v-card-text>{{ footer.copyright }}</v-card-text>
      </v-card>
    </v-footer>
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
import { COLORS } from './common/colors.js'
import { I18N } from './common/locale.js'
import { TEST } from './components/models/test.js'

export default {
  name: 'App',
  created () {
    if (typeof (Storage) === 'undefined') {
      alert(I18N.load().common.browserNotSupported)
    }
    this.fetchData()
  },
  data () {
    return {
      sheet: false,
      navigation: {},
      notices: {},
      site: {},
      languages: {},
      footer: {},
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary
      }
    }
  },
  methods: {
    switchLangues (i, e) {
      this.$router.push(e)
    },
    fetchData () {
      this.site = TEST.site()
      this.navigation = TEST.navigation()
      this.languages = TEST.languages()
      this.notices = TEST.notices()
      this.footer = TEST.footer()
      if (this.notices.list.length > 0) {
        this.sheet = true
      }
    }
  }
}
</script>

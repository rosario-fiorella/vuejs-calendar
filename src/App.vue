<template>
  <v-app>
    <v-app-bar app :color="colors.primary" dark :src="toolbar.bg">
      <v-avatar :size="site.logo.size" class="mr-2">
        <v-img :src="site.logo.src"></v-img>
      </v-avatar>
      <v-toolbar-title>{{ site.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
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
        <v-tabs :background-color="colors.primary" dark v-model="navigation.selected">
          <v-tab v-for="(item, i) in navigation.list" :key="i" :to="item.url">
            <v-icon left small>{{ item.icon }}</v-icon> {{ item.text}}
          </v-tab>
          <v-spacer></v-spacer>
          <v-tab small v-for="(item, i) in site.list" :key="i" :to="item.url">
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
              <v-alert :type="notify.type" colored-border prominent border="left" v-for="(item, i) in notify.list" :key="i">
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
  header.v-toolbar {
    overflow-x: auto;
    overflow-y: hidden;
  }
  .v-bottom-sheet.v-dialog.v-dialog--active {
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
      toolbar: {},
      notices: {},
      notify: {},
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
      console.log('i', i)
      console.log('e', e)
    },
    fetchData () {
      this.site = TEST.site()
      this.navigation = TEST.navigation()
      this.toolbar = TEST.toolbar()
      this.languages = TEST.languages()
      this.notices = TEST.notices()
      this.notify = TEST.notify()
      this.footer = TEST.footer()
      if (this.notices.list.length > 0) {
        this.sheet = true
      }
    }
  }
}
</script>

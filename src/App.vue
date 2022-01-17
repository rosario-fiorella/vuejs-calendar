<template>
  <v-app>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="toggleDrawer()">
        <v-icon>{{ toolbar.icon.menu }}</v-icon>
      </v-app-bar-nav-icon>
      <v-avatar class="mr-2" :size="toolbar.logo.size" v-if="toolbar.logo.src">
        <v-img :src="toolbar.logo.src"></v-img>
      </v-avatar>
      <v-toolbar-title>{{ toolbar.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small text :color="toolbar.btn.color" v-for="(item, i) in toolbar.list" :key="i" :href="item.url">
        <v-icon small>{{ item.icon }}</v-icon> {{ item.text }}
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>{{ languages.icon.translate }}</v-icon>
            <v-icon>{{ languages.icon.arrowDown }}</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item-group :color="languages.btn.color">
            <v-list-item v-for="(item, i) in languages.list" :key="i" v-on:click="switchLangues(i, item.url)">
              <v-list-item-content>
                <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer left app v-model="drawer">
      <v-list dense tile>
        <v-list-item-group>
          <v-list-item link>
            <v-list-item-avatar :size="site.logo.size">
              <v-img :src="site.logo.src"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">{{ site.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ site.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link v-for="(item, i) in site.list" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon right small>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list dense tile>
        <v-list-item-group v-model="navigation.selected" :color="navigation.color">
          <v-list-item link v-for="(item, i) in navigation.list" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon right small>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main app>
      <v-container fluid>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <template>
          <v-bottom-sheet inset v-model="sheet">
            <template v-slot:activator="{on, attrs}">
              <v-btn :color="notices.btn.color" v-show="!sheet" small fab fixed bottom right v-bind="attrs" v-on="on">
                <v-icon :color="notices.icon.color">{{ notices.icon.open }}</v-icon>
              </v-btn>
            </template>
            <v-sheet>
              <v-alert type="info" colored-border prominent border="left" v-for="(item, i) in notices.list" :key="i">
                <v-card flat>
                  <v-card-title>{{ item.title }}</v-card-title>
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </v-alert>
            </v-sheet>
          </v-bottom-sheet>
        </template>
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<style>
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
      drawer: true,
      navigation: {},
      toolbar: {},
      notices: {},
      site: {},
      languages: {}
    }
  },
  methods: {
    switchLangues (i, e) {
      console.log('i', i)
      console.log('e', e)
    },
    toggleDrawer () {
      this.drawer = !this.drawer
      this.toolbar.title = !this.drawer ? this.site.title : ''
      this.toolbar.logo.src = !this.drawer ? this.site.logo.src : ''
    },
    fetchData () {
      this.site = TEST.site()
      this.navigation = TEST.navigation()
      this.toolbar = TEST.toolbar()
      this.languages = TEST.languages()
      this.notices = TEST.notices()
      if (this.notices.list.length > 0) {
        this.sheet = true
      }
    }
  }
}
</script>

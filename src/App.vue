<template>
  <v-app>
    <v-navigation-drawer left app v-model="drawer">
      <v-layout wrap drawer-header justify-space-around align-center>
          <v-img v-bind:src="site.logo.src" v-bind:alt="site.logo.description" max-height="100" max-width="100" />
      </v-layout>
      <v-list nav dense>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              {{ site.title }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ site.description }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ site.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="navigation.selected" :color="navigation.color">
          <v-list-item v-for="(item, i) in navigation.list" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>{{ toolbar.icon.menu }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ site.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small text :color="toolbar.btn.color" v-for="(item, i) in toolbar.list" :key="i" :href="item.url">
        <v-icon class="mr-2">{{ item.icon }}</v-icon>
        {{ item.text }}
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>{{ languages.icon.translate }}</v-icon>
            <v-icon>{{ languages.icon.arrowDown }}</v-icon>
          </v-btn>
        </template>
        <v-list link>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in languages.list" :key="i" v-on:click="switchLangues(i, item.url)">
              <v-list-item-icon v-if="item.icon">
                <v-icon small v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
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
              <v-btn
                :color="notices.btn.color"
                v-show="!sheet"
                small
                fab
                fixed
                bottom
                right
                v-bind="attrs"
                v-on="on">
                <v-icon :color="notices.icon.color">{{ notices.icon.open }}</v-icon>
              </v-btn>
            </template>
            <v-sheet class="text-center">
              <v-btn style="margin-top: -28px;" elevation="0" fab @click="sheet = !sheet">
                <v-icon :color="notices.icon.color">{{ notices.icon.close }}</v-icon>
              </v-btn>
              <v-alert class="my-0" v-for="(item, i) in notices.list" :key="i">
                <span class="text-h6">{{ item.title }}</span> {{ item.description }}
              </v-alert>
            </v-sheet>
          </v-bottom-sheet>
        </template>
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import './assets/load.css'
import { COLORS } from './common/colors.js'
import { API } from './common/http.js'
import { ICONS } from './common/icons'
import { I18N } from './common/locale.js'

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
      navigation: {
        select: '',
        color: COLORS.primary,
        list: []
      },
      toolbar: {
        select: '',
        list: [],
        btn: {
          color: COLORS.primary
        },
        icon: {
          menu: ICONS.menu
        }
      },
      notices: {
        list: [],
        btn: {
          color: COLORS.white
        },
        icon: {
          color: COLORS.orange,
          open: ICONS.add,
          close: ICONS.close
        }
      },
      site: {
        logo: {
          src: null
        },
        title: null,
        description: null,
        email: null
      },
      languages: {
        icon: {
          translate: ICONS.translate,
          arrowDown: ICONS.arrowDown
        },
        selected: '',
        default: navigator.language,
        list: []
      }
    }
  },
  methods: {
    switchLangues (i, e) {
      console.log('i', i)
      console.log('e', e)
    },
    fetchData () {
      API.getAppData()
        .then((r) => {
          const site = r.info.entities[0].attributes[0]
          try {
            for (const i in site.list) {
              if (site.list[i].name === 'site.name') {
                this.site.title = site.list[i].value[0].attribute_value || ''
              }
              if (site.list[i].name === 'site.description') {
                this.site.description = site.list[i].value[0].attribute_value || ''
              }
              if (site.list[i].name === 'site.email') {
                this.site.email = site.list[i].value[0].attribute_value || ''
              }
              if (site.list[i].name === 'site.logo') {
                this.site.logo.src = site.list[i].value[0].attribute_value || ''
              }
            }
          } catch (e) {
            console.error(e)
          }
          const navigation = r.navigation.entities
          const navPrimary = []
          const selectLang = this.languages.selected || this.languages.list[0] || this.languages.default
          sessionStorage.setItem('selectedLanguage', selectLang)
          for (const i in navigation.primary) {
            sessionStorage.setItem(
              navigation.primary[i].menu_entity.contents[0].content_slug,
              JSON.stringify(navigation.primary[i].menu_entity.contents[0])
            )
            navPrimary.push({
              text: navigation.primary[i].menu_entity.contents[0].content_name || '',
              icon: navigation.primary[i].menu_icon || '',
              url: '/' + selectLang + '/' + navigation.primary[i].menu_entity.contents[0].content_slug || ''
            })
          }
          this.navigation.list = navPrimary
          const navSecondary = []
          for (const i in navigation.secondary) {
            navSecondary.push({
              text: navigation.secondary[i].menu_entity.resources[0].resource_name || '',
              icon: navigation.secondary[i].menu_icon || '',
              url: navigation.secondary[i].menu_entity.resources[0].resource_url || ''
            })
          }
          this.toolbar.list = navSecondary
          const languages = r.languages
          const navLanguages = []
          for (const i in languages) {
            navLanguages.push({
              text: languages[i].lang,
              icon: '',
              url: '/' + languages[i].lang
            })
          }
          this.languages.list = navLanguages
          const notices = r.notices.entities
          for (const i in notices) {
            this.notices.list.push({
              title: notices[i].contents[0].content_name,
              description: notices[i].contents[0].content_description,
              note: notices[i].contents[0].content_note,
              checkbox: false
            })
          }
          if (this.notices.list.length > 0) {
            this.sheet = true
          }
        }).catch((e) => {
          console.error(e)
        })
    }
  }
}
</script>

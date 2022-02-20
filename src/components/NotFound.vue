<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card flat>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>{{ description }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { I18N } from '../common/locale.js'

export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  created () {
    this.init()
  },
  watch: {
    $route: 'init'
  },
  methods: {
    init () {
      this.title = I18N.load().common.notFound
      this.description = ''
    }
  }
}
</script>

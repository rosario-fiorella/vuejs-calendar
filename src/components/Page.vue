<template>
  <v-row>
    <v-col md="3" offset-md="2">
      <v-card flat>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle v-html="subtitle"></v-card-subtitle>
        <v-card-text v-html="short_description"></v-card-text>
      </v-card>
    </v-col>
    <v-col md="5">
      <v-card flat>
        <v-card-text v-html="description"></v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { TEST } from './models/test.js'

export default {
  data () {
    return {
      title: '',
      subtitle: '',
      description: '',
      short_description: '',
      excerpt: '',
      note: ''
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
      this.title = TEST.page().title
      this.subtitle = TEST.page().subtitle
      this.description = TEST.page().description
      this.short_description = TEST.page().short_description
      this.excerpt = TEST.page().excerpt
      this.note = TEST.page().note
    }
  }
}
</script>

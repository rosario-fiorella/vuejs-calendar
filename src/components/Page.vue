<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-card flat>
        <v-card-title>{{ title }}</v-card-title>
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
      this.description = TEST.page().description
      this.short_description = TEST.page().short_description
      this.excerpt = TEST.page().excerpt
      this.note = TEST.page().note
    }
  }
}
</script>

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
import { API } from '../common/http'

export default {
  data () {
    return {
      loading: false,
      title: '',
      subtitle: '',
      description: '',
      short_description: '',
      excerpt: '',
      note: ''
    }
  },
  created () {
    this.getPage()
  },
  watch: {
    $route: 'getPage'
  },
  methods: {
    getPage () {
      const data = this.$route.params
      let t = null
      if (this.loading) {
        return
      }
      this.loading = true
      this.t = true
      t = setTimeout(() => {
        API.fetchContent(data)
          .then((r) => {
            this.title = r.title
            this.subtitle = r.subtitle
            this.description = r.description
            this.short_description = r.short_description
            this.excerpt = r.excerpt
            this.note = r.note
            clearTimeout(t)
            this.loading = false
          }).catch((e) => {
            this.showDialogError(e)
            clearTimeout(t)
            this.loading = false
          })
      }, 500)
    }
  }
}
</script>

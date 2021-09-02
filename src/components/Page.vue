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
      const slug = this.$route.params.slug
      const lang = sessionStorage.getItem('selectedLanguage')
      let content = sessionStorage.getItem(slug)
      if (content) {
        content = JSON.parse(content)
        this.title = content.content_name
        this.description = content.content_description
        this.short_description = content.content_short_description
        this.excerpt = content.content_excerpt
        this.note = content.content_note
      } else {
        this.$router.push({
          name: 'notFound',
          params: {
            lang: lang
          }
        }).catch(e => e)
      }
    }
  }
}
</script>

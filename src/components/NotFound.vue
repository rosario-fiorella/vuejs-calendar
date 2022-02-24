<template>
  <v-card flat>
    <v-card-title>{{ title }}</v-card-title>
  </v-card>
</template>

<script>
import { I18N } from '../common/locale.js'

export default {
  data () {
    return {
      title: I18N.load().common.notFound
    }
  }
}
</script>

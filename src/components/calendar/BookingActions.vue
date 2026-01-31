<template>
  <div class="d-flex align-center justify-space-between mt-6">
    <v-btn text @click="$emit('reset')">
      {{ $t('common.reset') }}
    </v-btn>

    <v-btn color="primary" type="submit" :disabled="!formValid" elevation="2">
      <v-icon v-text="accept"></v-icon>
      {{ $t('common.submit') }}
    </v-btn>
  </div>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'BookingActions',
  props: {
    formValid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      accept: ICONS.accept
    }
  }
}
</script>

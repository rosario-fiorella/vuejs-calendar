<template>
  <div class="d-flex align-center justify-space-between mt-6">
    <v-btn text @click="$emit('reset')" color="grey darken-1">
      {{ $t('common.reset') }}
    </v-btn>
    <v-btn color="primary" type="submit" :disabled="!isReadyToBook" elevation="2" class="px-6">
      <v-icon left>{{ acceptIcon }}</v-icon>
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
  computed: {
    isReadyToBook() {
      const isProductSelected = !!this.$store.getters.selectedProduct;
      return this.formValid && isProductSelected;
    },

    acceptIcon() {
      return ICONS.accept || 'mdi-check';
    }
  }
}
</script>

<template>
  <div class="d-flex align-center justify-space-between mt-6">
    <v-btn text @click="$emit('reset')">
      {{ $t('common.reset') }}
    </v-btn>

    <v-btn color="primary" type="submit" :disabled="!formValid" elevation="2">
      <v-icon left>mdi-check</v-icon>
      {{ $t('common.submit') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'BookingActions',
  props: {
    formValid: {
      type: Boolean,
      default: false
    }
  }
}
</script>

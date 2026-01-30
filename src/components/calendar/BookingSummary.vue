<template>
  <v-card outlined class="pa-4 grey lighten-5">
    <!-- Header -->
    <div class="d-flex align-center mb-4">
      <v-icon color="primary" class="mr-2">{{ ICONS.summary }}</v-icon>
      <span class="text-h6 font-weight-bold">{{ $t('booking.summary_title') }}</span>
    </div>

    <div class="booking-summary-container mb-4">
      <v-text-field :value="selectedProductName" :label="$t('booking.selected_vehicle')" prepend-inner-icon="mdi-car"
        readonly filled dense hide-details="auto" :hint="!selectedProductName ? $t('booking.please_select') : ''"
        :persistent-hint="!selectedProductName"></v-text-field>
    </div>

    <v-alert border="left" colored-border color="primary" elevation="2" class="mb-4 py-2 bg-white">
      <div class="d-flex justify-space-between align-center">
        <div>
          <div class="text-caption grey--text text--darken-1">{{ $t('booking.period_label') }}</div>
          <div class="text-body-2 font-weight-medium">
            {{ formattedPeriod }}
          </div>
        </div>
        <v-icon small color="grey lighten-1">{{ ICONS.calendar }}</v-icon>
      </div>
    </v-alert>

    <v-text-field v-model="email" :label="$t('booking.email_label')" :prepend-inner-icon="ICONS.email"
      :rules="emailRules" outlined dense background-color="white" hide-details="auto" required></v-text-field>
  </v-card>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'BookingSummary',
  data() {
    return {
      ICONS
    }
  },
  computed: {
    emailRules() {
      return [
        v => !!v || this.$t('errors.email_required'),
        v => /.+@.+\..+/.test(v) || this.$t('errors.email_invalid'),
      ]
    },
    email: {
      get() { return this.$store.state.rentalForm.email },
      set(val) { this.$store.commit('SET_RENTAL_FORM_FIELD', { key: 'email', val }) }
    },
    formattedPeriod() {
      const dates = this.$store.state.selectedDates;
      const { startTime, endTime } = this.$store.state.rentalForm;

      if (!dates || dates.length < 2) return this.$t('booking.no_period_selected');

      const [start, end] = [...dates].sort();
      return `${start} ${startTime} — ${end} ${endTime}`;
    },
    selectedProductName() {
      const product = this.$store.getters.selectedProduct;
      return product ? product._content.name : '';
    }
  }
}
</script>

<style scoped>
.bg-white {
  background-color: white !important;
}
</style>

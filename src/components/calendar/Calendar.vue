<template>
  <v-container>
    <v-row justify="center">
      <!-- Search and Filters Column -->
      <v-col cols="12" md="5" class="v-card--form">
        <v-form ref="bookingForm" v-model="formValid" lazy-validation @submit.prevent="handleSubmit">
          <DatePickerRange />
          <TimePickerRange />
          <RentalSortSelector />
          <PriceRangeSelector />
          <DynamicTagFilters />
          <BookingSummary />
          <LegalConsents />

          <!-- Shared Action Buttons -->
          <BookingActions :form-valid="formValid" @reset="resetAll" />
        </v-form>
      </v-col>

      <!-- Results Column -->
      <v-col cols="12" md="7" class="v-card--list">
        <template v-if="rentals && rentals.length">
          <RentalCard v-for="item in rentals" :key="item.id" :product="item" />
        </template>
        <v-alert v-else type="info" outlined class="mt-4">
          {{ $t('rentals.no_results') }}
        </v-alert>
      </v-col>
    </v-row>

    <!-- Externalized Confirmation Dialog -->
    <BookingConfirmDialog v-model="showConfirmDialog" :payload="lastPayload" @confirm="onFinalConfirm" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DatePickerRange from '@/components/calendar/DatePickerRange.vue'
import TimePickerRange from '@/components/calendar/TimePickerRange.vue'
import RentalSortSelector from '@/components/calendar/RentalSortSelector.vue'
import PriceRangeSelector from '@/components/calendar/PriceRangeSelector.vue'
import DynamicTagFilters from '@/components/calendar/DynamicTagFilters.vue'
import BookingSummary from '@/components/calendar/BookingSummary.vue'
import LegalConsents from '@/components/calendar/LegalConsents.vue'
import BookingActions from '@/components/calendar/BookingActions.vue'
import RentalCard from '@/components/calendar/RentalCard.vue'
import BookingConfirmDialog from '@/components/calendar/BookingConfirmDialog.vue'

export default {
  name: 'CalendarView',
  components: {
    DatePickerRange,
    TimePickerRange,
    RentalSortSelector,
    PriceRangeSelector,
    DynamicTagFilters,
    BookingSummary,
    LegalConsents,
    BookingActions,
    RentalCard,
    BookingConfirmDialog
  },
  data: () => ({
    formValid: false,
    showConfirmDialog: false,
    lastPayload: null
  }),
  computed: {
    ...mapState([
      'consents',
      'selectedDates',
      'rentalForm',
      'filters',
      'selectedFilters'
    ]),

    rentals() {
      return this.$store.state.businessConfig.rentals || [];
    },

    businessConfig() {
      return this.$store.state.businessConfig || {};
    }
  },

  methods: {
    resetAll() {
      console.log("Resetting form...");
      if (this.$refs.bookingForm) {
        this.$refs.bookingForm.reset();
      }
      this.$store.commit('RESET_FORM');
    },

    formatToZulu(dateStr, timeStr) {
      if (!dateStr || !timeStr) return null;
      const [y, m, d] = dateStr.split('-').map(Number);
      const [hh, mm] = timeStr.split(':').map(Number);
      return new Date(Date.UTC(y, m - 1, d, hh, mm)).toISOString();
    },

    handleSubmit() {
      const isValid = this.$refs.bookingForm.validate();
      const selectedProduct = this.$store.getters.selectedProduct;

      if (!isValid) return;

      if (!selectedProduct) {
        alert(this.$t('errors.no_vehicle_selected', 'Please select a vehicle before submitting.'));
        return;
      }

      const [startDate, endDate] = this.selectedDates;
      const { startTime, endTime, email } = this.rentalForm;

      this.lastPayload = {
        datetime_start: this.formatToZulu(startDate, startTime),
        datetime_end: this.formatToZulu(endDate, endTime),
        customer_email: email,
        selected_vehicle: {
          id: selectedProduct.id,
          name: selectedProduct._content.name,
          price: selectedProduct._ecommerce.price_current
        },
        tags: this.selectedFilters,
        legal_consents: this.consents,
        submitted_at: new Date().toISOString()
      };

      this.showConfirmDialog = true;
    },

    onFinalConfirm() {
      console.log("Final payload for PHP API:", this.lastPayload);
      this.showConfirmDialog = false;
      alert(this.$t('booking.success_message'));
    }
  }
}
</script>

<style scoped>
.v-card--form {
  position: sticky;
  top: 24px;
  align-self: flex-start;
}

.v-card--list {
  min-height: 400px;
}
</style>

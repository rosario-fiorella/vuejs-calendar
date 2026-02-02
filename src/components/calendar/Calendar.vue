<template>
  <v-container>
    <v-row justify="center">

      <v-col lg="4" md="6" class="v-card--form">
        <v-form ref="bookingForm" v-model="formValid" lazy-validation @submit.prevent="handleSubmit">

          <v-card tile flat>
            <v-card-title>{{ $t('booking.period.title') }}</v-card-title>
            <v-card-subtitle>{{ $t('booking.period.subtitle') }}</v-card-subtitle>
            <v-card-text>
              <DatePickerRange />
              <TimePickerRange />
            </v-card-text>
          </v-card>

          <v-card tile flat>
            <v-card-title>{{ $t('filters.title') }}</v-card-title>
            <v-card-subtitle>{{ $t('filters.subtitle') }}</v-card-subtitle>
            <v-card-text>
              <div class="mb-4">
                <PriceRangeSelector />
              </div>
              <div class="mb-4">
                <DynamicTagFilters label-color="secondary--text" bg-color="#E8F5E9" chip-color="white" />
              </div>
              <div class="mb-4">
                <RentalSortSelector />
              </div>
            </v-card-text>
          </v-card>

          <v-card tile flat>
            <v-card-title>{{ $t('booking.summary.title') }}</v-card-title>
            <v-card-subtitle>{{ $t('booking.summary.subtitle') }}</v-card-subtitle>
            <v-card-text>
              <BookingSummary />
            </v-card-text>
          </v-card>

          <v-card tile flat>
            <v-card-title>{{ $t('booking.legal.title') }}</v-card-title>
            <v-card-subtitle>{{ $t('booking.legal.subtitle') }}</v-card-subtitle>
            <v-card-text>
              <LegalConsents />
              <BookingActions :form-valid="formValid" @reset="resetAll" />
            </v-card-text>
          </v-card>

        </v-form>
      </v-col>

      <v-col lg="5" md="6" class="v-card--list">
        <template v-if="allProducts && allProducts.length">
          <RentalCardList :products="allProducts" :colors="themeColors" />
        </template>
        <v-alert v-else type="info" outlined class="mt-4">{{ $t('rentals.no_results') }}</v-alert>
      </v-col>
    </v-row>

    <BookingConfirmDialog v-model="showConfirmDialog" :payload="lastPayload" @confirm="onFinalConfirm" />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import DatePickerRange from '@/components/calendar/DatePickerRange.vue'
import TimePickerRange from '@/components/calendar/TimePickerRange.vue'
import RentalSortSelector from '@/components/calendar/RentalSortSelector.vue'
import PriceRangeSelector from '@/components/calendar/PriceRangeSelector.vue'
import DynamicTagFilters from '@/components/calendar/DynamicTagFilters.vue'
import BookingSummary from '@/components/calendar/BookingSummary.vue'
import LegalConsents from '@/components/calendar/LegalConsents.vue'
import BookingActions from '@/components/calendar/BookingActions.vue'
import RentalCardList from './RentalCard.vue'
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
    RentalCardList,
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
    ...mapGetters(['allProducts', 'selectedProduct']),

    themeColors() {
      return { primary: '#4CAF50', secondary: '#388E3C' };
    }
  },

  methods: {
    resetAll() {
      if (this.$refs.bookingForm) {
        this.$refs.bookingForm.resetValidation();
      }
      this.$store.commit('RESET_FORM');
    },

    formatToZulu(dateStr, timeStr) {
      if (!dateStr || !timeStr) return null;
      try {
        const [y, m, d] = dateStr.split('-').map(Number);
        const [hh, mm] = timeStr.split(':').map(Number);
        return new Date(Date.UTC(y, m - 1, d, hh, mm)).toISOString();
      } catch (e) {
        console.error("Zulu Formatting Error:", e);
        return null;
      }
    },

    handleSubmit() {
      const isFormValid = this.$refs.bookingForm.validate();

      if (!this.selectedDates || this.selectedDates.length < 2) {
        alert(this.$t('errors.select_full_range'));
        return;
      }

      const selected = this.selectedProduct;

      if (!isFormValid) return;

      if (!selected) {
        alert(this.$t('errors.no_product_selected'));
        return;
      }

      const [startDate, endDate] = [...this.selectedDates].sort();
      const { startTime, endTime, email } = this.rentalForm;

      this.lastPayload = {
        datetime_start: this.formatToZulu(startDate, startTime),
        datetime_end: this.formatToZulu(endDate, endTime),
        customer_email: email,
        selected_product: {
          slug: selected.slug,
          name: selected.content.name,
          price: selected.price.price
        },
        tags: this.selectedFilters,
        legal_consents: this.consents,
        submitted_at: new Date().toISOString()
      };

      this.showConfirmDialog = true;
    },

    onFinalConfirm() {
      console.log("Payload finale per API PHP:", this.lastPayload);
      this.showConfirmDialog = false;
      alert(this.$t('booking.success_message'));
      this.resetAll();
    }
  }
}
</script>

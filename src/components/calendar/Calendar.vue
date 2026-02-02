<template>
  <v-container style="max-width: 1180px;">
    <v-row justify="center">
      <v-col lg="4" md="6" class="v-card--form">
        <v-form ref="bookingForm" v-model="formValid" lazy-validation @submit.prevent="handleSubmit">

          <v-card tile flat>
            <v-card-title>{{ $t('booking.period_title') }}</v-card-title>
            <v-card-subtitle>{{ $t('booking.period_subtitle') }}</v-card-subtitle>
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
                <DynamicTagFilters label-color="secondary--text" bg-color="transparent" />
              </div>
              <div class="mb-4">
                <RentalSortSelector />
              </div>
            </v-card-text>
          </v-card>

          <v-card tile flat>
            <v-card-title>{{ $t('booking.summary_title') }}</v-card-title>
            <v-card-subtitle>{{ $t('booking.summary_subtitle') }}</v-card-subtitle>
            <v-card-text>
              <BookingSummary />
            </v-card-text>
          </v-card>

          <v-card tile flat>
            <v-card-title>{{ $t('booking.legal_title') }}</v-card-title>
            <v-card-subtitle>{{ $t('booking.legal_subtitle') }}</v-card-subtitle>
            <v-card-text>
              <LegalConsents />
              <BookingActions :form-valid="formValid" @reset="resetAll" @submit="handleSubmit" />
            </v-card-text>
          </v-card>

        </v-form>
      </v-col>

      <v-col lg="5" md="6" class="v-card--list" style="position: relative;">
        <v-progress-linear v-if="isSearching" indeterminate color="primary" absolute top></v-progress-linear>

        <template v-if="allProducts && allProducts.length">
          <RentalCardList :products="allProducts" />
        </template>
        <v-alert v-else type="info" outlined class="mt-4">
          {{ $t('rentals.no_results') }}
        </v-alert>
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
import RentalCardList from '@/components/calendar/RentalCardList.vue'
import BookingConfirmDialog from '@/components/calendar/BookingConfirmDialog.vue'

export default {
  name: 'CalendarView',
  components: {
    DatePickerRange, TimePickerRange, RentalSortSelector,
    PriceRangeSelector, DynamicTagFilters, BookingSummary,
    LegalConsents, BookingActions, RentalCardList, BookingConfirmDialog
  },
  data: () => ({
    formValid: false,
    showConfirmDialog: false,
    lastPayload: null,
    isSearching: false,
    apiDebounceTimer: null
  }),
  computed: {
    ...mapState(['consents', 'selectedDates', 'rentalForm', 'filters', 'selectedFilters']),
    ...mapGetters(['allProducts', 'selectedProduct']),
  },
  watch: {
    selectedDates: { handler() { this.triggerSearch() } },
    selectedFilters: { deep: true, handler() { this.triggerSearch() } },
    'filters.priceRange': { handler() { this.triggerSearch() } },
    'filters.sortBy': { handler() { this.triggerSearch() } },
    'rentalForm.startTime': { handler() { this.triggerSearch() } },
    'rentalForm.endTime': { handler() { this.triggerSearch() } }
  },
  methods: {
    triggerSearch() {
      if (this.apiDebounceTimer) clearTimeout(this.apiDebounceTimer);

      this.apiDebounceTimer = setTimeout(async () => {
        if (!this.selectedDates || this.selectedDates.length < 2) return;

        this.isSearching = true;
        try {
          const [startDate, endDate] = [...this.selectedDates].sort();
          await this.$store.dispatch('initApp', {
            from: this.formatToZulu(startDate, this.rentalForm.startTime),
            to: this.formatToZulu(endDate, this.rentalForm.endTime),
            price_min: this.filters.priceRange[0],
            price_max: this.filters.priceRange[1],
            sort: this.filters.sortBy,
            tags: this.selectedFilters
          });
        } catch (e) {
          console.error("Search Error:", e);
        } finally {
          this.isSearching = false;
        }
      }, 400);
    },

    resetAll() {
      if (this.$refs.bookingForm) this.$refs.bookingForm.resetValidation();
      this.$store.commit('RESET_FORM');
    },

    formatToZulu(dateStr, timeStr) {
      if (!dateStr || !timeStr) return null;
      const [y, m, d] = dateStr.split('-').map(Number);
      const [hh, mm] = timeStr.split(':').map(Number);
      return new Date(Date.UTC(y, m - 1, d, hh, mm)).toISOString();
    },

    handleSubmit() {
      const isFormValid = this.$refs.bookingForm.validate();

      if (!this.selectedDates || this.selectedDates.length < 2) {
        alert(this.$t('errors.select_full_range'));
        return;
      }

      const { startTime, endTime, email } = this.rentalForm;
      if (startTime && endTime && endTime <= startTime) {
        alert(this.$t('errors.invalid_time_range'));
        return;
      }

      const selected = this.selectedProduct;
      if (!selected) {
        alert(this.$t('errors.no_product_selected'));
        return;
      }

      if (!isFormValid) return;

      const [startDate, endDate] = [...this.selectedDates].sort();
      this.lastPayload = {
        datetime_start: this.formatToZulu(startDate, startTime),
        datetime_end: this.formatToZulu(endDate, endTime),
        customer_email: email,
        selected_product: {
          slug: selected.slug,
          name: selected.content.name,
          price: selected.price.price
        },
        tags: { ...this.selectedFilters },
        legal_consents: { ...this.consents },
        submitted_at: new Date().toISOString()
      };

      this.showConfirmDialog = true;
    },

    onFinalConfirm() {
      this.showConfirmDialog = false;
      alert(this.$t('booking.success_message'));
      this.resetAll();
    }
  }
}
</script>

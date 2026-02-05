<template>
  <v-container style="max-width: 1280px;">
    <v-row justify="center">
      <v-col lg="4" md="6" class="v-card--form">
        <v-form ref="bookingForm" v-model="formValid" lazy-validation @submit.prevent="handleSubmit">

          <v-card tile flat class="mb-4">
            <v-card-title>{{ $t('booking.period_title') }}</v-card-title>
            <v-card-subtitle>{{ $t('booking.period_subtitle') }}</v-card-subtitle>
            <v-card-text>
              <DatePickerRange />
              <TimePickerRange />
            </v-card-text>
          </v-card>

          <v-card tile flat class="mb-4">
            <v-card-title>{{ $t('filters.title') }}</v-card-title>
            <v-card-subtitle>{{ $t('filters.subtitle') }}</v-card-subtitle>
            <v-card-text>
              <div class="mb-4">
                <PriceRangeSelector />
              </div>
              <div class="mb-4">
                <DynamicTagFilters label-color="secondary--text" bg-color="transparent" chip-color="blue lighten-5" />
              </div>
              <div class="mb-4">
                <RentalSortSelector />
              </div>
            </v-card-text>
          </v-card>

          <v-card tile flat class="mb-4">
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
        <div class="d-flex justify-end align-center mb-4">
          <LanguageSelector class="mr-2" @change="onLocaleChange" />
          <CurrencySelector @change="handleCurrencyChange" />
        </div>

        <v-progress-linear v-if="isSearching" indeterminate color="primary" absolute top />

        <template v-if="allProducts && allProducts.length">
          <RentalCardList :products="allProducts" />
        </template>

        <v-alert v-else-if="!isSearching" type="info" outlined class="mt-4">
          {{ $t('rentals.no_results') }}
        </v-alert>
      </v-col>
    </v-row>

    <BookingConfirmDialog v-model="showConfirmDialog" :payload="lastPayload" @confirm="onFinalConfirm" />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import LanguageSelector from '@/components/calendar/LanguageSelector.vue'
import CurrencySelector from '@/components/calendar/CurrencySelector.vue'
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
    LanguageSelector,
    CurrencySelector,
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
  beforeDestroy() {
    if (this.apiDebounceTimer) clearTimeout(this.apiDebounceTimer);
  },
  data: () => ({
    formValid: false,
    showConfirmDialog: false,
    lastPayload: null,
    isSearching: false,
    apiDebounceTimer: null,
  }),
  computed: {
    ...mapState([
      'consents',
      'selectedDates',
      'rentalForm',
      'filters',
      'selectedFilters',
      'selectedCurrency',
      'selectedLocale'
    ]),
    ...mapGetters(['allProducts', 'selectedProduct']),
  },
  watch: {
    selectedLocale: { handler() { this.triggerSearch() } },
    selectedCurrency: { handler() { this.triggerSearch() } },
    selectedDates: { handler() { this.triggerSearch() } },
    selectedFilters: { deep: true, handler() { this.triggerSearch() } },
    'filters.priceRange': { handler() { this.triggerSearch() } },
    'filters.sortBy': { handler() { this.triggerSearch() } },
    'rentalForm.startTime': { handler() { this.triggerSearch() } },
    'rentalForm.endTime': { handler() { this.triggerSearch() } }
  },
  methods: {
    handleCurrencyChange() {
      this.triggerSearch();
    },
    onLocaleChange(newLocale) {
      this.triggerSearch();
    },
    triggerSearch() {
      if (this.apiDebounceTimer) clearTimeout(this.apiDebounceTimer);

      this.apiDebounceTimer = setTimeout(async () => {
        if (!this.selectedDates || this.selectedDates.length < 2) {
          return;
        }

        this.isSearching = true;
        try {
          const [startDate, endDate] = [...this.selectedDates].sort();
          const flatTags = Object.values(this.selectedFilters).flat().join(',');

          const playload = {
            currency: this.selectedCurrency,
            language: this.selectedLocale,
            utc_datetime_start: this.formatToZulu(startDate, this.rentalForm.startTime),
            utc_datetime_end: this.formatToZulu(endDate, this.rentalForm.endTime),
            fetch_config: 0,
            page: this.page,
            per_page: this.per_page,
            price_min: this.filters.priceRange[0],
            price_max: this.filters.priceRange[1],
            tags: flatTags,
            sort: this.filters.sortBy
          }

          await this.$store.dispatch('initApp', playload);
        } catch (e) {
          console.error("Search Error:", e);
        } finally {
          this.isSearching = false;
        }
      }, 400);
    },

    formatToZulu(dateStr, timeStr) {
      if (!dateStr || !timeStr) {
        return null;
      }
      const [y, m, d] = dateStr.split('-').map(Number);
      const [hh, mm] = timeStr.split(':').map(Number);
      return new Date(Date.UTC(y, m - 1, d, hh, mm)).toISOString();
    },

    resetAll() {
      if (this.$refs.bookingForm) this.$refs.bookingForm.resetValidation();
      this.$store.commit('RESET_FORM');
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

      if (!isFormValid) {
        return;
      }

      const [startDate, endDate] = [...this.selectedDates].sort();
      this.lastPayload = {
        datetime_start: this.formatToZulu(startDate, startTime),
        datetime_end: this.formatToZulu(endDate, endTime),
        customer_email: email,
        selected_product: {
          slug: selected.slug,
          name: selected.content.name,
          price: selected.price.price,
          currency: this.selectedCurrency
        },
        lang: this.selectedLocale,
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

<style scoped>
.v-card--list {
  min-height: 400px;
}
</style>

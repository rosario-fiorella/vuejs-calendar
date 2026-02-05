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
              <v-divider class="my-4"></v-divider>
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

        <template v-if="allProducts && Object.keys(allProducts).length > 0">
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
  data: () => ({
    formValid: false,
    showConfirmDialog: false,
    lastPayload: null,
    isSearching: false,
    apiDebounceTimer: null,
  }),
  beforeDestroy() {
    if (this.apiDebounceTimer) clearTimeout(this.apiDebounceTimer);
  },
  computed: {
    ...mapState({
      query: state => state.query,
      userForm: state => state.userForm,
      catalogAnagraphic: state => state.config.catalog
    }),
    ...mapGetters(['allProducts', 'selectedProduct', 'apiPayload']),
  },
  watch: {
    'query.dates': {
      handler(val) {
        if (val && val.length === 2) this.triggerSearch();
      }
    },
    'query.startTime': 'triggerSearch',
    'query.endTime': 'triggerSearch',
    'query.sortBy': 'triggerSearch',
    'query.currency': 'triggerSearch',
    'query.locale': 'triggerSearch',
    'query.priceRange': {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.triggerSearch();
        }
      }
    },
    'query.selectedTags': {
      deep: true,
      handler() {
        this.triggerSearch();
      }
    }
  },
  methods: {
    handleCurrencyChange() {
      this.triggerSearch();
    },
    onLocaleChange() {
      this.triggerSearch();
    },
    triggerSearch() {
      if (this.apiDebounceTimer) {
        clearTimeout(this.apiDebounceTimer);
      }

      this.apiDebounceTimer = setTimeout(async () => {
        if (!this.query.dates || this.query.dates.length < 2) {
          return;
        }
        this.isSearching = true;

        try {
          await this.$store.dispatch('initApp', { fetch_config: 0 });
        } catch (e) {
          console.error("Errore durante la ricerca API:", e);
        } finally {
          this.isSearching = false;
        }
      }, 400);
    },

    formatToZulu(dateStr, timeStr) {
      if (!dateStr || !timeStr) {
        return null;
      }

      try {
        const [y, m, d] = dateStr.split('-').map(Number);
        const [hh, mm] = timeStr.split(':').map(Number);
        const dateObj = new Date(y, m - 1, d, hh, mm);

        return isNaN(dateObj.getTime()) ? null : dateObj.toISOString();
      } catch (error) {
        console.error("Errore conversione locale to UTC:", error);
        return null;
      }
    },

    resetAll() {
      if (this.$refs.bookingForm) {
        this.$refs.bookingForm.resetValidation();
      }
      this.$store.commit('RESET_FILTERS');
      this.triggerSearch();
    },

    handleSubmit() {
      const isFormValid = this.$refs.bookingForm ? this.$refs.bookingForm.validate() : false;
      const selected = this.selectedProduct;
      if (!this.query.dates || this.query.dates.length < 2) {
        return;
      }
      if (!selected || !isFormValid) {
        return;
      }

      const [startDate, endDate] = [...this.query.dates].sort();
      const entityInfo = this.catalogAnagraphic[selected.slug];

      this.lastPayload = {
        datetime_start: this.formatToZulu(startDate, this.query.startTime),
        datetime_end: this.formatToZulu(endDate, this.query.endTime),
        customer_email: this.userForm.email,
        selected_product: {
          slug: selected.slug,
          name: entityInfo ? entityInfo.content.name : selected.slug,
          price: selected.slot.price,
          currency: this.query.currency
        },
        lang: this.query.locale,
        tags: { ...this.query.selectedTags },
        legal_consents: { ...this.userForm.consents },
        submitted_at: new Date().toISOString()
      };

      this.showConfirmDialog = true;
    },

    async onFinalConfirm() {
      this.showConfirmDialog = false;
      this.isSearching = true;

      try {
        // 3. ESEMPIO DI CHIAMATA API (da implementare nel tuo api/index.js se necessario)
        // const response = await API.confirmBooking(this.lastPayload);
        // Per ora simuliamo un log del payload pronto per il server
        console.log("Invio prenotazione al server...", this.lastPayload);
        // 4. Feedback all'utente (opzionale: potresti usare una snackbar o un alert)
        // alert(this.$t('booking.success_message'));
        // 5. Opzionale: Resetta tutto dopo il successo
        // this.resetAll();
      } catch (error) {
        console.error("Errore durante la conferma finale:", error);
      } finally {
        this.isSearching = false;
      }
    }

  }
}
</script>
<style scoped>
.v-card--form {
  max-width: 500px;
  width: 100%;
}

.v-card--list {
  position: relative;
  min-height: 400px;
}

@media (min-width: 1264px) {
  .v-card--form {
    position: sticky;
    top: 24px;
    align-self: flex-start;
  }
}

.v-card--list {
  transition: opacity 0.3s ease-in-out;
}

.v-card-title {
  word-break: break-word;
  line-height: 1.2;
}

@media (max-width: 600px) {
  .container {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>

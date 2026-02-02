<template>
  <div class="booking-summary-fields">
    <v-text-field :value="selectedProductName" :label="$t('booking.selected_product')" :hint="productHint"
      :persistent-hint="!selectedProductName" :prepend-inner-icon="ICONS.cart" readonly disabled outlined dense
      :background-color="bgDisabled" />

    <v-text-field :value="formattedPeriod" :label="$t('booking.period_label')" :prepend-inner-icon="ICONS.dateRange"
      readonly disabled outlined dense :background-color="bgDisabled" />

    <v-text-field v-model="email" :label="$t('booking.email_label')" :prepend-inner-icon="ICONS.email"
      :rules="emailRules" outlined dense required validate-on-blur :background-color="bgColor" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { ICONS } from '@/assets/icons';

export default {
  name: 'BookingSummary',

  props: {
    bgDisabled: {
      type: String,
      default: 'grey lighten-4'
    },
    bgColor: {
      type: String,
      default: 'white'
    }
  },

  data: () => ({
    ICONS
  }),

  computed: {
    ...mapState({
      rentalEmail: state => state.rentalForm.email,
      selectedDates: state => state.selectedDates,
      startTime: state => state.rentalForm.startTime,
      endTime: state => state.rentalForm.endTime,
    }),

    ...mapGetters(['selectedProduct']),

    email: {
      get() {
        return this.rentalEmail
      },
      set(val) {
        this.$store.commit('SET_RENTAL_FORM_FIELD', { key: 'email', val })
      }
    },

    selectedProductName() {
      return this.selectedProduct?.content?.name || '';
    },

    productHint() {
      return !this.selectedProductName ? this.$t('booking.please_select') : '';
    },

    formattedPeriod() {
      const dates = this.selectedDates;
      if (!dates || dates.length < 2) {
        return this.$t('booking.no_period_selected');
      }

      const [start, end] = [...dates].sort();
      return `${start} ${this.startTime} — ${end} ${this.endTime}`;
    },

    emailRules() {
      return [
        v => !!v || this.$t('errors.email_required'),
        v => /.+@.+\..+/.test(v) || this.$t('errors.email_invalid'),
      ];
    }
  }
}
</script>

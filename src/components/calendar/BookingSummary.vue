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
import { mapState } from 'vuex';
import { ICONS } from '@/assets/icons';

export default {
  name: 'BookingSummary',

  props: {
    bgDisabled: { type: String, default: 'grey lighten-4' },
    bgColor: { type: String, default: 'white' }
  },

  data: () => ({
    ICONS
  }),

  computed: {
    ...mapState({
      rentalEmail: state => state.userForm.email,
      selectedSlot: state => state.catalog.selectedSlot,
      catalogAnagraphic: state => state.config.catalog
    }),

    email: {
      get() { return this.rentalEmail },
      set(value) { this.$store.commit('SET_USER_FIELD', { field: 'email', value }) }
    },

    selectedProductName() {
      if (!this.selectedSlot || !this.catalogAnagraphic) return '';
      const entity = this.catalogAnagraphic[this.selectedSlot.slug];
      return entity ? entity.content.name : '';
    },

    productHint() {
      return !this.selectedSlot ? this.$t('booking.please_select') : '';
    },

    formattedPeriod() {
      if (!this.selectedSlot || !this.selectedSlot.date || !this.selectedSlot.slot) {
        return this.$t('booking.no_period_selected');
      }

      const { date, slot } = this.selectedSlot;

      const [y, m, d] = date.split('-').map(Number);
      const displayDate = new Date(y, m - 1, d).toLocaleDateString(this.$i18n.locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const start = slot.time_start ? slot.time_start.substring(0, 5) : '--:--';
      const end = slot.time_end ? slot.time_end.substring(0, 5) : '--:--';

      return `${displayDate} | ${start} - ${end}`;
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

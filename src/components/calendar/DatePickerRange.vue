<template>
  <v-date-picker v-model="dateRange" full-width range :prev-icon="icons.arrowLeft" :next-icon="icons.arrowRight"
    :max="toLocal(limitTo)" :min="toLocal(limitFrom)" :allowed-dates="isDateAllowed" :color="bgColor"
    @input="handleSelection"></v-date-picker>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'DatePickerRange',

  props: {
    bgColor: {
      type: String,
      default: 'primary'
    }
  },

  data: () => ({
    icons: {
      arrowLeft: ICONS.arrowLeft,
      arrowRight: ICONS.arrowRight
    }
  }),

  computed: {
    dateRange: {
      get() {
        return this.$store.state.selectedDates || []
      },
      set(val) {
        this.$store.commit('SET_SELECTED_DATES', val)
      }
    },

    limitTo() {
      return this.$store.state.businessConfig?.maxDate
    },
    limitFrom() {
      return this.$store.state.businessConfig?.minDate
    },
    disabledDatesSet() {
      const dates = this.$store.state.businessConfig?.disabledDates || [];
      return new Set(dates.map(d => (typeof d === 'string' ? d.split('T')[0] : d)));
    }
  },

  methods: {
    toLocal(zuluStr) {
      if (!zuluStr) return null;
      return zuluStr.split('T')[0];
    },

    formatToZulu(dateStr, timeStr) {
      if (!dateStr || !timeStr) return null;
      const [y, m, d] = dateStr.split('-').map(Number);
      const [hh, mm] = timeStr.split(':').map(Number);
      return new Date(Date.UTC(y, m - 1, d, hh, mm, 0)).toISOString();
    },

    isDateAllowed(date) {
      return !this.disabledDatesSet.has(date);
    },

    async handleSelection(dates) {
      if (dates.length !== 2) return;

      const sortedDates = [...dates].sort((a, b) => new Date(a) - new Date(b));
      const [start, end] = sortedDates;

      if (this.hasDisabledDatesInRange(start, end)) {
        alert(this.$t('errors.disabled_date_in_range'));
        this.dateRange = [];
        return;
      }

      this.dateRange = sortedDates;

      const { startTime, endTime } = this.$store.state.rentalForm;
      try {
        await this.$store.dispatch('initApp', {
          from: this.formatToZulu(start, startTime),
          to: this.formatToZulu(end, endTime)
        });
      } catch (error) {
        console.error("[DatePicker Sync Error]:", error.message);
      }
    },

    hasDisabledDatesInRange(start, end) {
      const disabledRaw = this.$store.state.businessConfig?.disabledDates || [];
      return disabledRaw.some(d => {
        const target = d.split('T')[0];
        return target >= start && target <= end;
      });
    }
  }
}
</script>

<style scoped>
.v-date-picker {
  user-select: none;
}
</style>

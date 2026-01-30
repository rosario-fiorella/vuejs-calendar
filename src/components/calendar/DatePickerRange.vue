<template>
  <v-date-picker v-model="dateRange" full-width range :prev-icon="icons.arrowLeft" :next-icon="icons.arrowRight"
    :max="toLocal(limitTo)" :min="toLocal(limitFrom)" :allowed-dates="isDateAllowed"
    @input="handleSelection"></v-date-picker>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'DatePickerRange',

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
      return new Set(dates.map(d => d.split('T')[0]));
    }
  },

  methods: {
    toLocal(zuluStr) {
      if (!zuluStr) {
        return null;
      }
      return zuluStr.split('T')[0];
    },

    formatToZulu(dateStr, timeStr) {
      if (!dateStr || !timeStr) {
        return null;
      }
      const [y, m, d] = dateStr.split('-');
      const [hh, mm] = timeStr.split(':');
      const date = new Date(y, m - 1, d, hh, mm, 0);
      return date.toISOString();
    },

    isDateAllowed(date) {
      return !this.disabledDatesSet.has(date);
    },

    async handleSelection(dates) {
      if (dates.length !== 2) {
        return;
      }

      const [start, end] = [...dates].sort();
      const { startTime, endTime } = this.$store.state.rentalForm;

      if (this.hasDisabledDatesInRange(start, end)) {
        this.dateRange = [];
        return;
      }

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
      const s = new Date(start);
      const e = new Date(end);
      const disabledRaw = this.$store.state.businessConfig?.disabledDates || [];

      return disabledRaw.some(d => {
        const target = new Date(d.split('T')[0]);
        return target >= s && target <= e;
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

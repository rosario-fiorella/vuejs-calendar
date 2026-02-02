<template>
  <v-card flat color="transparent">
    <v-sheet color="primary" class="pa-4" dark tile rounded>
      <div class="text-overline mb-1" style="line-height: 1.2">{{ $t('calendar.selection_subtitle') }}</div>
      <div class="text-h6">{{ formattedRangeTitle }}</div>
    </v-sheet>

    <v-date-picker v-model="dateRange" full-width range no-title :locale="$i18n.locale" :prev-icon="icons.arrowLeft"
      :next-icon="icons.arrowRight" :max="toLocal(limitTo)" :min="toLocal(limitFrom)" :allowed-dates="isDateAllowed"
      :color="bgColor" @input="handleSelection"></v-date-picker>
  </v-card>
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

    formattedRangeTitle() {
      if (!this.dateRange || this.dateRange.length === 0) {
        return this.$t('calendar.selection_title');
      }

      const sorted = [...this.dateRange].sort();
      if (sorted.length === 1) {
        return this.formatReadableDate(sorted[0]);
      }

      return `${this.formatReadableDate(sorted[0])} — ${this.formatReadableDate(sorted[1])}`;
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
    formatReadableDate(dateStr) {
      if (!dateStr) return '';
      const [y, m, d] = dateStr.split('-');
      return `${d}/${m}`;
    },

    toLocal(zuluStr) {
      if (!zuluStr) return null;
      return zuluStr.split('T')[0];
    },

    isDateAllowed(date) {
      return !this.disabledDatesSet.has(date);
    },

    handleSelection(dates) {
      if (dates.length !== 2) return;

      const sortedDates = [...dates].sort((a, b) => new Date(a) - new Date(b));
      const [start, end] = sortedDates;

      if (this.hasDisabledDatesInRange(start, end)) {
        alert(this.$t('errors.disabled_date_in_range'));
        this.dateRange = [];
        return;
      }

      this.dateRange = sortedDates;
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

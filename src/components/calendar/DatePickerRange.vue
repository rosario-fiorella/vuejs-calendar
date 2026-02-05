<template>
  <v-card flat color="transparent">
    <v-sheet color="primary" class="pa-4" dark tile rounded>
      <div class="text-overline mb-1" style="line-height: 1.2">
        {{ $t('calendar.selection_subtitle') }}
      </div>
      <div class="text-h6">{{ formattedRangeTitle }}</div>
    </v-sheet>

    <v-date-picker v-model="internalDateRange" full-width range no-title :locale="$i18n.locale"
      :prev-icon="icons.arrowLeft" :next-icon="icons.arrowRight" :max="toLocal(limitTo)" :min="toLocal(limitFrom)"
      :allowed-dates="isDateAllowed" :color="bgColor" @input="handleSelection"></v-date-picker>
  </v-card>
</template>
<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'DatePickerRange',
  props: {
    bgColor: { type: String, default: 'primary' }
  },
  data: () => ({
    icons: {
      arrowLeft: ICONS.arrowLeft,
      arrowRight: ICONS.arrowRight
    },
    internalDateRange: []
  }),
  watch: {
    '$store.state.query.dates': {
      immediate: true,
      handler(newDates) {
        this.internalDateRange = newDates ? [...newDates] : [];
      }
    }
  },
  computed: {
    formattedRangeTitle() {
      if (!this.internalDateRange || this.internalDateRange.length === 0) {
        return this.$t('calendar.selection_title');
      }
      const sorted = [...this.internalDateRange].sort();
      if (sorted.length === 1) {
        return this.formatReadableDate(sorted[0]);
      }
      return `${this.formatReadableDate(sorted[0])} — ${this.formatReadableDate(sorted[1])}`;
    },
    limitTo() { return this.$store.state.config.limits.maxDate },
    limitFrom() { return this.$store.state.config.limits.minDate },
    disabledDatesSet() {
      const dates = this.$store.state.config.limits.disabledDates || [];
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

      const sortedDates = [...dates].sort();
      const [start, end] = sortedDates;

      if (this.hasDisabledDatesInRange(start, end)) {
        alert(this.$t('errors.disabled_date_in_range'));
        this.internalDateRange = [];
        this.$store.commit('SET_QUERY_DATES', []);
        return;
      }

      this.$store.commit('SET_QUERY_DATES', sortedDates);
    },

    hasDisabledDatesInRange(start, end) {
      const disabledRaw = this.$store.state.config.limits.disabledDates || [];
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

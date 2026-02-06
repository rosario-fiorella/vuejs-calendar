<template>
  <v-card flat color="transparent">
    <v-sheet color="primary" class="pa-4" dark tile rounded>
      <div class="text-overline mb-1" style="line-height: 1.2">
        {{ $t('calendar.selection_subtitle') }}
      </div>
      <div class="text-h6">{{ formattedRangeTitle }}</div>
    </v-sheet>

    <v-date-picker v-model="internalDateRange" full-width range no-title :locale="pickerLocale"
      :prev-icon="icons.arrowLeft" :next-icon="icons.arrowRight" :max="limitToFormatted" :min="limitFromFormatted"
      :allowed-dates="isDateAllowed" :color="bgColor" @input="handleSelection"></v-date-picker>
  </v-card>
</template>
<script>
import { ICONS } from '@/assets/icons'
import DateTransformer from '@/utils/DateTransformer'

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
        if (JSON.stringify(newDates) !== JSON.stringify(this.internalDateRange)) {
          this.internalDateRange = newDates ? [...newDates] : [];
        }
      }
    }
  },
  computed: {
    pickerLocale() {
      return this.$i18n.locale ? this.$i18n.locale.replace('_', '-').toLowerCase() : 'en-us';
    },
    limitTo() {
      return this.$store.state.config.limits.maxDate
    },
    limitFrom() {
      return this.$store.state.config.limits.minDate
    },
    limitToFormatted() {
      return this.limitTo ? this.limitTo.substring(0, 10) : undefined
    },
    limitFromFormatted() {
      return this.limitFrom ? this.limitFrom.substring(0, 10) : undefined
    },
    formattedRangeTitle() {
      if (!this.internalDateRange?.length) {
        return this.$t('calendar.selection_title');
      }

      return this.internalDateRange
        .slice()
        .sort()
        .map(this.formatReadableDate)
        .join(' — ');
    },
    disabledDatesSet() {
      const limits = this.$store.state.config?.limits;
      const dates = limits?.disabledDates || [];
      return new Set(dates.map(d => (typeof d === 'string' ? d.substring(0, 10) : d)));
    }
  },
  methods: {
    formatReadableDate(dateStr) {
      if (!dateStr) return ''
      const [y, m, d] = dateStr.split('-');
      return `${d}/${m}`;
    },

    toLocal(zuluStr) {
      return DateTransformer.toISODate(zuluStr)
    },

    isDateAllowed(date) {
      return !this.disabledDatesSet.has(date);
    },

    handleSelection(dates) {
      if (!dates || dates.length === 0) return;

      const sorted = [...dates].sort((a, b) => new Date(a) - new Date(b));

      if (sorted.length === 2) {
        if (this.hasDisabledDatesInRange(sorted[0], sorted[1])) {
          this.notifyError(this.$t('errors.disabled_date_in_range'));
          const lastPicked = dates[dates.length - 1];
          this.updateDates([lastPicked]);
          return;
        }
      }

      this.updateDates(sorted);
    },

    updateDates(val) {
      this.$store.commit('SET_QUERY_DATES', val);
    },

    notifyError(msg) {
      this.$store.commit('SHOW_SNACKBAR', {
        message: msg,
        color: 'error'
      });
    },

    hasDisabledDatesInRange(start, end) {
      return Array.from(this.disabledDatesSet).some(disabledDate => {
        return disabledDate >= start && disabledDate <= end;
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

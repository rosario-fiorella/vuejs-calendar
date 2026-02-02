<template>
  <v-select v-model="sortValue" :items="translatedSortOptions" :prepend-inner-icon="icons.sort"
    :label="$t('rentals.sort_label')" item-value="value" item-text="text" outlined dense hide-details></v-select>
</template>

<script>
import { ICONS } from '@/assets/icons';

export default {
  name: 'RentalSortSelector',

  data: () => ({
    icons: {
      sort: ICONS.alpha || 'mdi-sort-variant'
    }
  }),

  computed: {
    translatedSortOptions() {
      const options = this.$store.state.businessConfig?.sortByOptions || [];
      return options.map(opt => ({
        ...opt,
        text: this.$t(opt.text)
      }));
    },

    sortValue: {
      get() {
        return this.$store.state.filters.sortBy;
      },
      set(value) {
        this.$store.commit('SET_SORT_FILTER', value);
      }
    }
  }
}
</script>

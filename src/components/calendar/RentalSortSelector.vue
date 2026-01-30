<template>
  <v-select v-model="sortValue" :items="sortOptions" :prepend-icon="icons.sort" :label="$t('rentals.sort_label')"
    item-value="value" item-text="text" outlined dense hide-details @change="handleSortChange"></v-select>
</template>

<script>
import { ICONS } from '@/assets/icons';

export default {
  name: 'RentalSortSelector',
  data: () => ({
    icons: {
      sort: ICONS.sort
    }
  }),
  computed: {
    sortOptions() {
      return this.$store.state.businessConfig.sortByOptions;
    },
    sortValue: {
      get() {
        return this.$store.state.filters.sortBy;
      },
      set(value) {
        this.$store.commit('SET_SORT_FILTER', value);
      }
    }
  },
  methods: {
    async handleSortChange(newSortValue) {
      const currentFilters = this.$store.state.filters;

      try {
        await this.$store.dispatch('initApp', {
          sort: newSortValue
        });
      } catch (error) {
        alert(error.message);
      }
    }
  }
}
</script>

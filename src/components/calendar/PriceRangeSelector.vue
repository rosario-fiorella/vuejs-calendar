<template>
  <v-range-slider v-model="internalRange" :max="maxLimit" :min="minLimit" @change="syncWithApi" hide-details
    class="align-center">
    <template #prepend>
      <v-text-field :value="range[0]" type="number" dense outlined hide-details @change="updateRange(0, $event)" />
    </template>

    <template #append>
      <v-text-field :value="range[1]" type="number" dense outlined hide-details @change="updateRange(1, $event)" />
    </template>
  </v-range-slider>
</template>

<script>
import { ICONS } from '@/assets/icons'
import { mapState } from 'vuex'

export default {
  name: 'PriceRangeSelector',

  data: () => ({ ICONS }),

  computed: {
    ...mapState({
      minLimit: state => state.businessConfig?.minPrice ?? 0,
      maxLimit: state => state.businessConfig?.maxPrice ?? 1000,
    }),

    internalRange: {
      get() {
        return this.$store.state.filters.priceRange || [this.minLimit, this.maxLimit]
      },
      set(val) {
        this.$store.commit('SET_PRICE_RANGE', val)
      }
    },

    range() {
      return this.internalRange
    }
  },

  methods: {
    updateRange(index, value) {
      const newRange = [...this.range];
      newRange[index] = Number(value);
      this.internalRange = newRange;
      this.syncWithApi();
    },

    async syncWithApi() {
      try {
        await this.$store.dispatch('initApp', {
          minPrice: this.range[0],
          maxPrice: this.range[1]
        });
      } catch (error) {
        console.error("[PriceRange Sync Error]", error);
      }
    }
  }
}
</script>

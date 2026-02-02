<template>
  <div class="price-range-selector mt-2">
    <v-range-slider v-model="internalRange" :max="maxLimit" :min="minLimit" :step="10" hide-details
      class="align-center">
      <template #prepend>
        <v-text-field :value="internalRange[0]" type="number" dense outlined hide-details style="width: 80px"
          @change="updateRange(0, $event)" />
      </template>
      <template #append>
        <v-text-field :value="internalRange[1]" type="number" dense outlined hide-details style="width: 80px"
          @change="updateRange(1, $event)" />
      </template>
    </v-range-slider>
    <div class="text-caption grey--text text-center mt-1">
      {{ $t('rentals.price_range_label') }}:
      {{ $n(internalRange[0], 'currency') }} - {{ $n(internalRange[1], 'currency') }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PriceRangeSelector',

  computed: {
    ...mapState({
      minLimit: state => state.businessConfig?.minPrice ?? 0,
      maxLimit: state => state.businessConfig?.maxPrice ?? 2000,
    }),

    internalRange: {
      get() {
        return this.$store.state.filters.priceRange || [this.minLimit, this.maxLimit];
      },
      set(val) {
        this.$store.commit('SET_PRICE_RANGE', val);
      }
    }
  },

  methods: {
    updateRange(index, value) {
      let numValue = Number(value);
      const newRange = [...this.internalRange];

      if (index === 0) {
        numValue = Math.max(this.minLimit, Math.min(numValue, newRange[1]));
      } else {
        numValue = Math.min(this.maxLimit, Math.max(numValue, newRange[0]));
      }

      newRange[index] = numValue;
      this.internalRange = newRange;
    }
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<template>
  <div v-if="currency && internalRange" class="price-range-selector mt-2" :key="currency">
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
      {{ $t('rentals.price_range_label') }}: {{ currency }} {{ internalRange[0] }} - {{ currency }} {{ internalRange[1] }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PriceRangeSelector',

  computed: {
    ...mapState({
      currency: state => state.selectedCurrency || null,
      minLimit: state => state.businessConfig?.minPrice ?? 0,
      maxLimit: state => state.businessConfig?.maxPrice ?? 2000,
    }),

    internalRange: {
      get() {
        const range = this.$store.state.filters.priceRange;
        return range && range.length === 2 ? range : [this.minLimit, this.maxLimit];
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

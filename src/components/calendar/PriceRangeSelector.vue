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
      {{ $t('rentals.price_range_label') }}: {{ currency }} {{ internalRange[0] }} - {{ currency }} {{ internalRange[1]
      }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PriceRangeSelector',
  data: () => ({
    internalRange: [0, 0]
  }),
  computed: {
    ...mapState({
      currency: state => state.query.currency,
      minLimit: state => state.config.limits.minPrice,
      maxLimit: state => state.config.limits.maxPrice,
      storeRange: state => state.query.priceRange
    })
  },
  watch: {
    storeRange: {
      immediate: true,
      handler(val) {
        this.internalRange = [...val];
      }
    },
    internalRange(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.storeRange)) {
        this.$store.commit('SET_QUERY_PRICE_RANGE', val);
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
      this.$set(this.internalRange, index, numValue);
    }
  }
}
</script>

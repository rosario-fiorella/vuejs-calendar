<template>
  <div class="price-range-container">
    <div class="d-flex align-center mb-2">
      <v-icon small class="mr-2" color="primary">{{ ICONS.price }}</v-icon>
      <span class="text-subtitle-2 grey--text text--darken-2">
        {{ $t('rentals.price_range_label') }}
      </span>
      <v-spacer></v-spacer>
      <v-chip x-small outlined color="primary" class="font-weight-bold">
        {{ range[0] }}€ - {{ range[1] }}€
      </v-chip>
    </div>

    <v-range-slider v-if="range" v-model="range" :max="maxLimit" :min="minLimit" hide-details
      track-color="grey lighten-2" @change="syncWithApi">
      <template v-slot:prepend>
        <v-text-field :value="range[0]" type="number" dense outlined hide-details class="price-input"
          @change="updateRange(0, $event)"></v-text-field>
      </template>

      <template v-slot:append>
        <v-text-field :value="range[1]" type="number" dense outlined hide-details class="price-input"
          @change="updateRange(1, $event)"></v-text-field>
      </template>
    </v-range-slider>
  </div>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'PriceRangeSelector',
  data: () => ({ ICONS }),
  computed: {
    minLimit() { return this.$store.state.businessConfig.minPrice ?? 0 },
    maxLimit() { return this.$store.state.businessConfig.maxPrice ?? 1000 },
    range: {
      get() { return this.$store.state.filters.priceRange || [0, 1000] },
      set(val) { this.$store.commit('SET_PRICE_RANGE', val) }
    }
  },
  methods: {
    updateRange(index, value) {
      const newRange = [...this.range];
      newRange[index] = Number(value);
      this.range = newRange;
      this.syncWithApi();
    },

    async syncWithApi() {
      try {
        await this.$store.dispatch('initApp', {
          minPrice: this.range[0],
          maxPrice: this.range[1]
        });
      } catch (error) {
        console.error("[PriceRange Sync Error]", error.message);
      }
    }
  }
}
</script>

<style scoped>
.price-input {
  width: 80px;
}

.price-input :deep(input) {
  font-size: 0.875rem;
  text-align: center;
  padding: 0;
}

.price-range-container {
  padding: 8px 0;
}
</style>

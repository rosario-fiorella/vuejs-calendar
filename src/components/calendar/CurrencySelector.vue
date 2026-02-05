<template>
  <v-select v-model="currency" :items="availableCurrencies" item-text="label" item-value="key"
    :label="$t('common.currency')" outlined dense hide-details class="currency-selector" @change="handleCurrencyChange">
    <template v-slot:selection="{ item }">
      <span class="font-weight-bold primary--text mr-1">{{ item.symbol }}</span>
      <span>{{ item.key }}</span>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title>
          <span class="grey--text text--darken-1 mr-2">{{ item.symbol }}</span> {{ $t(item.label) }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
  </v-select>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'CurrencySelector',
  computed: {
    availableCurrencies() {
      return this.$store.state.config.currencies || [];
    },
    currency: {
      get() {
        return this.$store.state.query.currency;
      },
      set(val) {
        this.$store.commit('SET_CURRENCY', val);
      }
    }
  },
  methods: {
    handleCurrencyChange(newVal) {
      this.$emit('change', newVal);
    }
  },
  data() {
    return {
      ICONS
    }
  }
}
</script>

<style scoped>
.currency-selector {
  max-width: 150px;
}
</style>

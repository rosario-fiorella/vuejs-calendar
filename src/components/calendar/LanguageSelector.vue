<template>
  <v-select v-model="locale" :items="availableLanguages" item-text="label" item-value="code"
    :label="$t('common.language')" outlined dense hide-details class="language-selector">
    <template v-slot:selection="{ item }">
      <div class="d-flex align-center">
        <span class="mr-1">{{ getFlagEmoji(item.flag) }}</span>
        <span class="text-uppercase font-weight-bold small grey--text text--darken-2">
          {{ item.code }}
        </span>
      </div>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title>
          <span class="mr-2">{{ getFlagEmoji(item.flag) }}</span>
          {{ item.label }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'LanguageSelector',
  computed: {
    availableLanguages() {
      return this.$store.state.businessConfig.languages || [];
    },
    locale: {
      get() {
        return this.$store.state.selectedLocale;
      },
      set(val) {
        this.$store.commit('SET_LOCALE', val);
        this.$emit('change', val);
      }
    }
  },
  methods: {
    getFlagEmoji(countryCode) {
      if (!countryCode) return '🌐';
      const code = countryCode.toLowerCase() === 'en' ? 'gb' : countryCode;

      return code
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
    }
  }
}
</script>

<style scoped>
.language-selector {
  max-width: 120px;
}

.small {
  font-size: 0.75rem;
}
</style>

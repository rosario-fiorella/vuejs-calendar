<template>
  <v-select v-model="locale" :items="availableLanguages" item-text="label" item-value="code"
    :label="$t('common.language')" outlined dense hide-details class="language-selector">

    <template v-slot:selection="{ item }">
      <div class="d-flex align-center">
        <span :class="['fi', `fi-${getCountryCode(item.code || item.flag)}`, 'mr-2']"></span>
        <span class="text-uppercase font-weight-bold small grey--text text--darken-2">
          {{ formatDisplayCode(item.code) }}
        </span>
      </div>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title class="d-flex align-center">
          <span :class="['fi', `fi-${getCountryCode(item.code || item.flag)}`, 'mr-2']"></span>
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
    getCountryCode(code) {
      if (!code) return 'un';
      let c = code.includes('-') ? code.split('-')[1].toLowerCase() : code.toLowerCase();
      return c === 'en' ? 'gb' : c;
    },
    formatDisplayCode(code) {
      if (!code) return '';
      return code.split('-')[0].toUpperCase();
    }
  }
}
</script>

<style scoped>
.language-selector {
  max-width: 140px;
}

.small {
  font-size: 0.75rem;
}

.fi {
  width: 20px !important;
  line-height: 1em;
  display: inline-block;
}
</style>

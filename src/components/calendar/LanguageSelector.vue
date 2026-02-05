<template>
  <v-select v-model="locale" :items="availableLanguages" item-text="label" item-value="code"
    :label="$t('common.language')" outlined dense hide-details class="language-selector">
    <template v-slot:selection="{ item }">
      <div class="d-flex align-center">
        <span :class="['fi', `fi-${getCountryCode(item.code)}`, 'mr-2']"></span>
        <span class="text-uppercase font-weight-bold small grey--text text--darken-2">
          {{ formatDisplayCode(item.code) }}
        </span>
      </div>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title class="d-flex align-center">
          <span :class="['fi', `fi-${getCountryCode(item.code)}`, 'mr-2']"></span>
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
      return this.$store.state.config.languages || [];
    },
    locale: {
      get() { return this.$store.state.query.locale },
      set(val) {
        this.$store.commit('SET_LOCALE', val);
        this.$i18n.locale = val;
        this.$emit('change', val);
      }
    }
  },
  methods: {
    getCountryCode(code) {
      if (!code) return 'un';
      let c = code.includes('_') ? code.split('_')[1] : code.includes('-') ? code.split('-')[1] : code;
      c = c.toLowerCase();
      return c === 'en' ? 'gb' : c;
    },
    formatDisplayCode(code) {
      return code ? code.split(/[-_]/)[0].toUpperCase() : '';
    }
  }
}
</script>
<style scoped>
.language-selector {
  max-width: 140px;
}

.fi {
  width: 20px !important;
  display: inline-block;
}
</style>

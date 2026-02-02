<template>
  <div v-if="hasLegalChecks" class="legal-consents-container">
    <v-checkbox v-for="check in legalChecks" :key="check.id" :input-value="!!consents[check.id]"
      :rules="getRules(check)" dense @change="updateConsent(check.id, $event)">
      <template v-slot:label>
        <span class="text-caption" v-html="$t(check.label)" />
      </template>
    </v-checkbox>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LegalConsents',

  computed: {
    ...mapState(['consents']),

    legalChecks() {
      return this.$store.state.businessConfig?.legalChecks || [];
    },

    hasLegalChecks() {
      return this.legalChecks.length > 0;
    }
  },

  methods: {
    getRules(check) {
      if (!check.required) return [];
      return [v => !!v || this.$t('errors.required_field')];
    },

    updateConsent(id, val) {
      this.$store.commit('SET_CONSENT', { id, val: !!val });
    }
  }
}
</script>

<style scoped>
.legal-consents-container {
  margin-top: 10px;
}

:deep(a) {
  text-decoration: none;
  font-weight: bold;
  color: var(--v-anchor-base);
}

:deep(a:hover) {
  text-decoration: underline;
}
</style>

<template>
  <div v-if="hasLegalChecks" class="legal-consents-container">
    <v-checkbox v-for="check in legalChecks" :key="check.id" :input-value="consents[check.id]" :rules="getRules(check)"
      :label="check.label" dense @change="updateConsent(check.id, $event)">

      <template v-slot:label>
        <span v-html="check.label" />
      </template>
    </v-checkbox>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
      this.$store.commit('SET_CONSENT', { id, val });
    }
  }
}
</script>

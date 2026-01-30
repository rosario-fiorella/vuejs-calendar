<template>
  <div v-if="legalChecks.length" class="legal-consents-wrapper mt-6">
    <div class="text-caption grey--text text--darken-1 mb-2">
      {{ $t('booking.legal_notice') }}
    </div>

    <v-checkbox v-for="check in legalChecks" :key="check.id" :input-value="consents[check.id]"
      :rules="check.required ? [v => !!v || $t('errors.required_field')] : []" dense class="mt-0 custom-legal-checkbox"
      @change="updateConsent(check.id, $event)">
      <template v-slot:label>
        <span class="text-body-2" v-html="check.label"></span>
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
      return this.$store.state.businessConfig.legalChecks || [];
    }
  },
  methods: {
    updateConsent(id, val) {
      this.$store.commit('SET_CONSENT', { id, val });
    }
  }
}
</script>

<style scoped>
.legal-consents-wrapper {
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
  padding-top: 16px;
}

.custom-legal-checkbox :deep(a) {
  color: #1976D2;
  text-decoration: none;
  font-weight: 600;
}

.custom-legal-checkbox :deep(a:hover) {
  text-decoration: underline;
}
</style>

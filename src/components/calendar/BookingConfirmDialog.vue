<template>
  <v-dialog :value="value" max-width="600px" @input="$emit('input', $event)" persistent>
    <v-card v-if="payload">
      <v-card-title class="headline primary white--text">
        {{ $t('booking.confirm_title') }}
      </v-card-title>

      <v-card-text class="pa-4">
        <v-list two-line subheader>

          <v-list-item v-if="payload.selected_product">
            <v-list-item-icon>
              <v-icon color="primary">{{ ICONS.cart }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-caption">{{ $t('booking.product') }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold primary--text text-body-1">
                {{ payload.selected_product.name }} — {{ $n(payload.selected_product.price, 'currency') }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">{{ ICONS.dateRange }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-caption">{{ $t('booking.period_label') }}</v-list-item-title>
              <v-list-item-subtitle class="text-body-2">
                <strong>{{ formatDate(payload.datetime_start) }}</strong>
                <v-icon x-small class="mx-1">mdi-arrow-right</v-icon>
                <strong>{{ formatDate(payload.datetime_end) }}</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">{{ ICONS.email }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-caption">{{ $t('booking.email_label') }}</v-list-item-title>
              <v-list-item-subtitle class="text-body-1">{{ payload.customer_email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div v-if="hasTags" class="mt-2 px-4">
          <div class="text-caption mb-1 font-weight-bold grey--text text-uppercase">
            {{ $t('booking.applied_filters') }}
          </div>
          <v-chip-group column>
            <v-chip v-for="(tagName, index) in allTagNames" :key="index" x-small color="primary" outlined>
              {{ $t(tagName) }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="$emit('input', false)">
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn :color="bgColorSubmit" class="px-6" dark depressed @click="$emit('confirm')">
          {{ $t('common.confirm_final') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'BookingConfirmDialog',
  props: {
    value: Boolean,
    payload: {
      type: Object,
      default: null
    },
    bgColorSubmit: {
      type: String,
      default: 'primary'
    }
  },
  data: () => ({
    ICONS
  }),
  computed: {
    hasTags() {
      return this.allTagNames.length > 0;
    },
    allTagNames() {
      if (!this.payload || !this.payload.tags) return [];

      const tagGroups = this.$store.state.config.tagGroups || [];
      const selectedMap = this.payload.tags;
      let keys = [];

      Object.keys(selectedMap).forEach(groupId => {
        const group = tagGroups.find(g => g.id === groupId);
        if (group && Array.isArray(selectedMap[groupId])) {
          selectedMap[groupId].forEach(tagId => {
            const item = group.items.find(i => i.id === tagId);
            if (item) keys.push(item.text);
          });
        }
      });

      return keys;
    }
  },
  methods: {
    formatDate(isoStr) {
      if (!isoStr) return '';
      const d = new Date(isoStr);
      return d.toLocaleString(this.$i18n.locale, {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
  }
}
</script>

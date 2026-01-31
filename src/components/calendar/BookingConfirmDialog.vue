<template>
  <v-dialog :value="value" max-width="600px" @input="$emit('input', $event)" persistent>
    <v-card v-if="payload">
      <v-card-title class="headline primary white--text">
        {{ $t('booking.confirm_title', 'Booking Summary') }}
      </v-card-title>

      <v-card-text class="pa-4">
        <v-list two-line>

          <v-list-item v-if="payload.selected_product">
            <v-list-item-icon>
              <v-icon color="primary">mdi-car-side</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('booking.product', 'product') }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold primary--text">
                {{ payload.selected_product.name }} ({{ payload.selected_product.price }} €)
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-calendar-range</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('booking.period', 'Period') }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ payload.datetime_start }} <br /> {{ payload.datetime_end }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="primary">mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('booking.email', 'Email') }}</v-list-item-title>
              <v-list-item-subtitle>{{ payload.customer_email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div v-if="hasTags" class="mt-2 px-4">
          <div class="text-caption mb-1 font-weight-bold grey--text">
            {{ $t('booking.applied_filters', 'Applied Filters') }}
          </div>
          <v-chip-group column>
            <v-chip v-for="(tagName, index) in allTagNames" :key="index" x-small color="grey lighten-2">
              {{ tagName }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="$emit('input', false)">
          {{ $t('common.cancel', 'Cancel') }}
        </v-btn>
        <v-btn color="primary" depressed @click="$emit('confirm')">
          {{ $t('common.confirm_final', 'Confirm Booking') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BookingConfirmDialog',
  props: {
    value: Boolean,
    payload: {
      type: Object,
      default: null
    }
  },
  computed: {
    hasTags() {
      return this.allTagNames.length > 0;
    },
    allTagNames() {
      if (!this.payload || !this.payload.tags) return [];

      const tagGroups = this.$store.state.businessConfig.tagGroups || [];
      const selectedMap = this.payload.tags;
      let names = [];

      Object.keys(selectedMap).forEach(groupId => {
        const group = tagGroups.find(g => g.id === groupId);
        if (group) {
          selectedMap[groupId].forEach(tagId => {
            const item = group.items.find(i => i.id === tagId);
            if (item) names.push(item.text);
          });
        }
      });

      return names;
    }
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="5" class="v-card--form">

        <v-card tile flat class="mb-4">
          <v-card-title>{{ $t('calendar.selection_title') }}</v-card-title>
          <v-card-subtitle>{{ $t('calendar.selection_subtitle') }}</v-card-subtitle>
          <v-card-text>
            <DatePickerRange />
            <TimePickerRange />
          </v-card-text>
        </v-card>

        <v-card tile flat>
          <v-card-title>{{ $t('filters.title') }}</v-card-title>
          <v-card-subtitle>{{ $t('filters.subtitle') }}</v-card-subtitle>
          <v-card-text>
            <RentalSortSelector />
          </v-card-text>
        </v-card>

      </v-col>

      <v-col cols="12" md="7" class="v-card--list">
        <template v-if="rentals.length">
          <v-card v-for="item in rentals" :key="item.id" elevation="20" tile class="mb-4">
            <v-card-title>{{ item.name }}</v-card-title>
            <!-- -->
          </v-card>
        </template>
        <template v-else>
          <v-alert type="info" text tile>
            {{ $t('rentals.no_results') }}
          </v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatePickerRange from '@/components/calendar/DatePickerRange.vue'
import TimePickerRange from '@/components/calendar/TimePickerRange.vue'
import RentalSortSelector from '@/components/calendar/RentalSortSelector.vue'

export default {
  components: {
    DatePickerRange,
    TimePickerRange,
    RentalSortSelector
  },
  computed: {
    rentals() {
      return this.$store.state.rentals
    }
  }
}
</script>

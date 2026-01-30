<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" class="v-card--form">
        <DatePickerRange />
        <TimePickerRange />
      </v-col>
      <v-col cols="12" md="6" class="v-card--list">
        <template v-if="rentals.length">
          <v-card v-for="item in rentals" :key="item.id" elevation="20" tile class="mb-4">
            <!-- -->
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatePickerRange from '@/components/calendar/DatePickerRange.vue'
import TimePickerRange from '@/components/calendar/TimePickerRange.vue'

export default {
  components: {
    DatePickerRange,
    TimePickerRange
  },
  computed: {
    rentals() {
      return this.$store.state.rentals
    }
  }
}
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-menu ref="menuStart" v-model="menuStart" :close-on-content-click="false" transition="scale-transition" offset-y
        min-width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="startTime" :label="$t('rental.start_time')" :prepend-inner-icon="ICONS.accessTime"
            readonly outlined dense v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-time-picker v-if="menuStart" v-model="startTime" full-width format="24hr" :locale="$i18n.locale"
          :min="apiMinTime" :max="apiMaxTime" :allowed-minutes="allowedSteps"
          @input="menuStart = false"></v-time-picker>
      </v-menu>
    </v-col>

    <v-col cols="12" sm="6">
      <v-menu ref="menuEnd" v-model="menuEnd" :close-on-content-click="false" transition="scale-transition" offset-y
        min-width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="endTime" :label="$t('rental.end_time')" :prepend-inner-icon="ICONS.accessTime" readonly
            outlined dense :error-messages="timeError" v-bind="attrs" v-on="on"></v-text-field>
        </template>
        <v-time-picker v-if="menuEnd" v-model="endTime" full-width format="24hr" :locale="$i18n.locale"
          :min="dynamicMinEndTime" :max="apiMaxTime" :allowed-minutes="allowedSteps"
          @input="menuEnd = false"></v-time-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import { ICONS } from '@/assets/icons'

export default {
  name: 'TimePickerRange',
  data: () => ({
    menuStart: false,
    menuEnd: false,
    ICONS
  }),
  computed: {
    apiMinTime() { return this.$store.state.businessConfig.minTime },
    apiMaxTime() { return this.$store.state.businessConfig.maxTime },
    apiStep() { return this.$store.state.businessConfig.step || 15 },
    allowedSteps() { return (m) => m % this.apiStep === 0 },

    startTime: {
      get() { return this.$store.state.rentalForm.startTime },
      set(val) {
        this.$store.commit('SET_RENTAL_TIME', { key: 'startTime', val });
        if (this.endTime && val >= this.endTime) {
          this.$store.commit('SET_RENTAL_TIME', { key: 'endTime', val: '' });
        }
      }
    },
    endTime: {
      get() { return this.$store.state.rentalForm.endTime },
      set(val) {
        this.$store.commit('SET_RENTAL_TIME', { key: 'endTime', val });
      }
    },

    dynamicMinEndTime() {
      if (!this.startTime) return this.apiMinTime;
      return this.startTime > this.apiMinTime ? this.startTime : this.apiMinTime;
    },

    timeError() {
      if (this.startTime && this.endTime && this.endTime <= this.startTime) {
        return this.$t('errors.invalid_time_range');
      }
      return '';
    }
  }
}
</script>

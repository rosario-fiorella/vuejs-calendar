import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    calendar: {
      selection_title: "Rental Period",
      selection_subtitle: "Select dates and times to check real-time availability",
    },
    rental: {
      start_time: "Pick-up Time",
      end_time: "Drop-off Time",
    },
    rentals: {
      sort_label: "Sort results by",
      no_results: "No rentals available for the selected period.",
    },
    filters: {
      title: "Filters & Sorting",
      subtitle: "Customize how you view available vehicles",
    },
    errors: {
      locked: "Request in progress, please wait...",
      server: "Server communication error",
      network: "Network connection unavailable",
      invalid_time_range: "Drop-off time must be after pick-up time",
      parsing: "Data processing error"
    },
    success: {
      data_loaded: "Availability updated",
      saved: "Booking confirmed"
    },
    common: {
      ok: "Confirm",
      cancel: "Cancel"
    }
  }
};

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

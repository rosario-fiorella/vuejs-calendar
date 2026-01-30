import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    common: {
      others: "others",
      reset: "Reset Filters",
      submit: "Book Now",
      ok: "Confirm",
      cancel: "Cancel",
      close: "Close",
      view_details: "View Details",
      confirm_final: "Confirm Booking"
    },
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
      dynamic_filters_title: "Additional Options",
      price_range_label: "Budget",
      features: "Features",
      notices: "Important Notices"
    },
    filters: {
      title: "Filters & Sorting",
      subtitle: "Customize how you view available vehicles",
    },
    booking: {
      summary_title: "Booking Summary",
      period_label: "Selected Period",
      email_label: "Your Email Address",
      no_period_selected: "Please select dates and times",
      legal_notice: "Legal Agreements",
      confirm_title: "Booking Recap",
      selected_vehicle: "Selected Vehicle",
      please_select: "Please select a vehicle from the list",
      vehicle: "Vehicle",
      period: "Period",
      email: "Email",
      applied_filters: "Applied Filters",
      success_message: "Booking request sent successfully!"
    },
    errors: {
      email_required: "Email is required to proceed",
      email_invalid: "Please enter a valid email address",
      locked: "Request in progress, please wait...",
      server: "Server communication error",
      network: "Network connection unavailable",
      invalid_time_range: "Drop-off time must be after pick-up time",
      parsing: "Data processing error",
      required_field: "This field is required",
      no_vehicle_selected: "Please select a vehicle before submitting."
    },
    success: {
      data_loaded: "Availability updated",
      saved: "Booking confirmed"
    }
  }
};

export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

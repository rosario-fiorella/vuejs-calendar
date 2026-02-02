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
      selection_title: "Stay Period",
      selection_subtitle: "Select dates to check availability for your stay",
    },
    rental: {
      start_time: "Check-in Time",
      end_time: "Check-out Time",
    },
    rentals: {
      list_title: "Available Accommodations",
      available_count: "properties found",
      sort_label: "Sort results by",
      no_results: "No accommodations available for the selected period.",
      dynamic_filters_title: "Additional Options",
      price_range_label: "Budget",
      features: "Amenities",
      notices: "Important Information",
      tax_included: "Taxes included",
      taxes: "Taxes & Fees"
    },
    filters: {
      title: "Filters & Sorting",
      subtitle: "Customize how you view available properties",
    },
    booking: {
      period: {
        title: "Stay Dates",
        subtitle: "Tell us when you want to arrive and leave"
      },
      summary: {
        title: "Reservation Summary",
        subtitle: "Check your stay details and provide contact info"
      },
      legal: {
        title: "Terms & Conditions",
        subtitle: "Agreement to our rental terms and privacy policy"
      },
      summary_title: "Booking Summary",
      period_label: "Selected Period",
      email_label: "Your Email Address",
      selected_product: "Selected Accommodation",
      no_period_selected: "Please select arrival and departure dates",
      legal_notice: "Legal Agreements",
      confirm_title: "Booking Recap",
      please_select: "Please select an accommodation from the list",
      product: "Accommodation",
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
      invalid_time_range: "Check-out must be after Check-in",
      parsing: "Data processing error",
      required_field: "This field is required",
      no_product_selected: "Please select an accommodation before submitting.",
      disabled_date_in_range: "Selected range contains unavailable dates",
      select_full_range: "Please select both start and end dates",
      check_form_and_selection: "Please complete the form and select a product"
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

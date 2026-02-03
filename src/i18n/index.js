import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    booking: {
      applied_filters: "Applied Filters",
      confirm_title: "Booking Recap",
      email_label: "Your Email Address",
      legal_subtitle: "Agreement to our rental terms and privacy policy",
      legal_title: "Terms & Conditions",
      no_period_selected: "Please select arrival and departure dates",
      period_label: "Selected Period",
      period_subtitle: "Tell us when you want to arrive and leave",
      period_title: "Stay Dates",
      please_select: "Please select an accommodation from the list",
      product: "Accommodation",
      selected_product: "Selected Accommodation",
      success_message: "Booking request sent successfully!",
      summary_subtitle: "Check your stay details and provide contact info",
      summary_title: "Booking Summary"
    },
    calendar: {
      selection_subtitle: "Select dates to check availability",
      selection_title: "Stay Period"
    },
    common: {
      cancel: "Cancel",
      confirm_final: "Confirm Booking",
      reset: "Reset Filters",
      submit: "Book Now",
      view_details: "View Details",
      currency: "Valuta",
      language: "Lingua"
    },
    errors: {
      disabled_date_in_range: "Selected range contains unavailable dates",
      email_invalid: "Please enter a valid email address",
      email_required: "Email is required to proceed",
      invalid_time_range: "Check-out must be after Check-in",
      no_product_selected: "Please select an accommodation before submitting",
      required_field: "This field is required",
      select_full_range: "Please select both start and end dates"
    },
    filters: {
      subtitle: "Customize how you view available properties",
      title: "Filters & Sorting"
    },
    rental: {
      end_time: "Check-out Time",
      start_time: "Check-in Time"
    },
    rentals: {
      features: "Amenities",
      no_results: "No accommodations available for the selected period",
      notices: "Important Information",
      price_range_label: "Budget",
      sort_label: "Sort results by",
      tag_electric: "Electric",
      tag_hybrid: "Hybrid",
      tag_product_type: "Product Type"
    }
  }
};

const i18nInstance = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  numberFormats: {
    'en': {
      currency: {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      }
    }
  }
})

export default i18nInstance
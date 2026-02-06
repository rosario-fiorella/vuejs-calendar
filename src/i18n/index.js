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
      close: "Close",
      cancel: "Cancel",
      confirm_final: "Confirm Booking",
      reset: "Reset Filters",
      submit: "Book Now",
      view_details: "View Details",
      currency: "Currency",
      language: "Language"
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
  },
  it: {
    booking: {
      applied_filters: "Filtri Applicati",
      confirm_title: "Riepilogo Prenotazione",
      email_label: "Tuo Indirizzo Email",
      legal_subtitle: "Accettazione dei termini di noleggio e privacy",
      legal_title: "Termini e Condizioni",
      no_period_selected: "Seleziona le date di arrivo e partenza",
      period_label: "Periodo Selezionato",
      period_subtitle: "Dicci quando vuoi arrivare e partire",
      period_title: "Date del Soggiorno",
      please_select: "Seleziona un alloggio dalla lista",
      product: "Alloggio",
      selected_product: "Alloggio Selezionato",
      success_message: "Richiesta di prenotazione inviata con successo!",
      summary_subtitle: "Controlla i dettagli del soggiorno e fornisci i contatti",
      summary_title: "Riepilogo Prenotazione"
    },
    calendar: {
      selection_subtitle: "Seleziona le date per verificare la disponibilità",
      selection_title: "Periodo di Soggiorno"
    },
    common: {
      cancel: "Annulla",
      confirm_final: "Conferma Prenotazione",
      reset: "Reset Filtri",
      submit: "Prenota Ora",
      view_details: "Vedi Dettagli",
      currency: "Valuta",
      language: "Lingua"
    },
    errors: {
      disabled_date_in_range: "Il periodo selezionato contiene date non disponibili",
      email_invalid: "Inserisci un indirizzo email valido",
      email_required: "L'email è obbligatoria per procedere",
      invalid_time_range: "Il check-out deve essere dopo il check-in",
      no_product_selected: "Seleziona un alloggio prima di inviare",
      required_field: "Campo obbligatorio",
      select_full_range: "Seleziona sia la data d'inizio che quella di fine"
    },
    filters: {
      subtitle: "Personalizza la visualizzazione delle proprietà",
      title: "Filtri e Ordinamento"
    },
    rental: {
      end_time: "Orario Check-out",
      start_time: "Orario Check-in"
    },
    rentals: {
      features: "Servizi",
      no_results: "Nessun alloggio disponibile per il periodo selezionato",
      notices: "Informazioni Importanti",
      price_range_label: "Budget",
      sort_label: "Ordina i risultati per",
      tag_electric: "Elettrico",
      tag_hybrid: "Ibrido",
      tag_product_type: "Tipo Prodotto"
    }
  }
};

const i18nInstance = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  numberFormats: {
    'en': {
      currency: { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }
    },
    'it': {
      currency: { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }
    }
  }
})

export default i18nInstance

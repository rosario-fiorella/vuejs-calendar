export const I18N = {
  /**
   * @param {string} locale
   * @returns {object}
   */
  load: (locale = null) => {
    locale = locale || 'it'
    const lang = locale.toLowerCase()
    return I18N[lang] || {}
  },

  /**
   * @param {string} locale
   * @param {string} property
   * @returns {object}
   */
  getProperty: (locale, property) => {
    const langObj = I18N.load(locale)
    return langObj[property] || {}
  },

  getIso: (locale = null) => {
    locale = locale || 'it'
    const lang = locale.toLowerCase()
    return I18N.iso[lang] || ''
  },

  iso: {
    it: 'it-IT'
  },
  it: {
    common: {
      id: 'Id',
      lang: 'Lingua',
      status: 'Stato',
      note: 'Note',
      yes: 'Si',
      no: 'No',
      notAvaible: 'Nessuna disponibilità',
      notFound: 'La pagina richiesta non è stata trovata',
      browserNotSupported: 'Questo browser non supporta la persistenza dei dati, si consiglia di provare un altro browser.',
      conditions: 'Condizioni',
      terms: 'Termini'
    },
    actions: {
      ok: 'Ok',
      add: 'Aggiungi',
      remove: 'Rimuovi',
      reset: 'Cancella',
      send: 'Invia',
      sendRequest: 'Invia richiesta',
      success: 'Operazione eseguita con successo!',
      error: 'Operazione annullata, si sono verificati errori!',
      booking: {
        success: 'Ti sarà inviata una mail con il riepilogo della prenotazione'
      }
    },
    user: {
      email: 'E-mail',
      fullName: 'Nome e cognome',
      firstName: 'Nome',
      lastName: 'Cognome',
      guestType: 'Tipologia di ospite',
      family: 'Famiglia',
      couple: 'Coppia',
      friends: 'Amici'
    },
    form: {
      autoFilled: 'Campo compilato in automatico',
      calendar: {
        in_booking: 'In prenotazione',
        n_adults: 'Numero adulti',
        n_kids: 'Numero bambini'
      },
      validation: {
        required: 'Campo obbligatorio',
        badChar: 'Caratteri non validi',
        error: {
          email: 'Inserisci un indirizzo E-mail valido',
          required: 'Verificare i campi obbligatori',
          productsNotSelected: 'Aggiungi almeno 1 prodotto per prenotare'
        },
        minLength: (n) => {
          return 'Inserisci almeno a ' + Number(n) + ' caratteri'
        },
        maxLength: (n) => {
          return 'Inserisci fino a ' + Number(n) + ' caratteri'
        }
      }
    },
    privacy: {
      condition: 'Accetta le condizioni per continuare',
      terms: 'Accetta i termini per continuare'
    },
    contents: {
      slug: 'Url',
      name: 'Nome',
      title: 'Titolo',
      description: 'Descrizione',
      short_description: 'Descrizione breve',
      excerpt: 'Riassunto',
      note: 'Note'
    },
    ecommerce: {
      price: 'Prezzo',
      price_reduction: 'Riduzione del prezzo',
      tax: 'Tasse',
      tax_included: 'Tasse incluse',
      min_spent: 'Minima spesa',
      min_person: 'N. minimo di persone richieste',
      min_tim: 'Tempo minimo di permanenza',
      expired_time: 'Scadenza',
      currency: 'Valuta',
      unit: 'Valutazione unitaria'
    },
    calendars: {
      day: 'Giorno',
      date_start: 'Data di arrivo',
      date_end: 'Data di partenza',
      time_start: 'Orario di arrivo',
      time_end: 'Orario di partenza'
    }
  }
}

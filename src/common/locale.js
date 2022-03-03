export const I18N = {
  load: (locale = null) => {
    locale = locale || I18N.getIso(locale)
    return I18N[locale] || {}
  },

  getIso: (locale = null) => {
    return (locale || window.navigator.language || 'it-IT')
  },

  'it-IT': {
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
      lastUpdate: 'Ultimi aggiornamenti',
      notices: 'Avvisi',
      notify: 'Notifiche',
      features: 'Caratteristiche specifiche',
      includedServices: 'Servizi inclusi',
      tag: 'Tag',
      services: 'Servizi',
      ok: 'Ok',
      add: 'Aggiungi',
      remove: 'Rimuovi',
      reset: 'Cancella',
      send: 'Invia',
      sendRequest: 'Invia richiesta',
      success: 'Operazione eseguita con successo!',
      error: 'Operazione annullata, si sono verificati errori!',
      email: 'E-mail',
      fullName: 'Nome e cognome',
      firstName: 'Nome',
      lastName: 'Cognome',
      guestType: 'Tipologia di ospite',
      family: 'Famiglia',
      couple: 'Coppia',
      friends: 'Amici',
      terms: 'Accetta i termini e le condizioni sul trattamento dei dati per continuare',
      autoFilled: 'Campo compilato in automatico',
      signin: 'Iscriviti',
      confirm: 'Riceverai una email per confermare l\'iscrizione',
      slug: 'Url',
      name: 'Nome',
      title: 'Titolo',
      description: 'Descrizione',
      shortDescription: 'Descrizione breve',
      excerpt: 'Riassunto',
      price: 'Prezzo',
      tax: 'Tasse',
      taxIncluded: 'Tasse incluse',
      minSpent: 'Minima spesa',
      minPerson: 'N. minimo di persone richieste',
      minTime: 'Tempo minimo di permanenza',
      currency: 'Valuta',
      unit: 'Valutazione unitaria',
      day: 'Giorno',
      dateStart: 'Data di arrivo',
      dateEnd: 'Data di partenza',
      timeStart: 'Orario di arrivo',
      timeEnd: 'Orario di partenza',
      dateFrom: 'Dal',
      cart: 'Prenotazioni che hai scelto',
      nAdults: 'Numero adulti',
      nKids: 'Numero bambini',
      nRecord: 'Numero di risultati',
      productsList: 'Prodotti'
    },
    form: {
      booking: {
        title: 'Booking',
        caption: 'Scegli una data per prenotare'
      },
      filter: {
        title: 'Filtri di ricerca',
        caption: 'Ricerca disponibilità usando i filtri',
        input: 'Cerca per nome del prodotto',
        sortBy: 'Ordina per'
      },
      signUp: {
        title: 'Inserisci i tuoi contatti per completare la prenotazione',
        caption: 'Riceverai una email di conferma'
      }
    },
    unit: {
      d: 'al giorno',
      h: 'all\'ora',
      m: 'al minuto',
      cad: 'a persona'
    },
    actions: {
      booking: {
        success: 'Ti sarà inviata una mail con il riepilogo della prenotazione'
      }
    },
    validation: {
      required: 'Campo obbligatorio',
      badChar: 'Caratteri non validi',
      error: {
        email: 'Inserisci un indirizzo E-mail valido',
        requiredFields: 'Verificare i campi obbligatori',
        productsNotSelected: 'Aggiungi almeno 1 prodotto per prenotare'
      },
      minLength: (n) => {
        return 'Inserisci almeno a ' + Number(n) + ' caratteri'
      },
      maxLength: (n) => {
        return 'Inserisci fino a ' + Number(n) + ' caratteri'
      }
    }
  }
}

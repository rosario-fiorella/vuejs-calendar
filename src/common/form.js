import { I18N } from './locale'
import { ICONS } from './icons'
import { REGEX } from './regex'

export const USER = {
  maxlength: 30,
  label: I18N.load().common.fullName,
  icon: ICONS.person,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().validation.required,
    v => v.length <= 30 || I18N.load().validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().validation.badChar
  ]
}

export const FIRST_NAME = {
  maxlength: 30,
  label: I18N.load().common.firstName,
  icon: ICONS.person,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().validation.required,
    v => v.length <= 30 || I18N.load().validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().validation.badChar
  ]
}

export const LAST_NAME = {
  maxlength: 30,
  label: I18N.load().common.lastName,
  icon: ICONS.person,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().validation.required,
    v => v.length <= 30 || I18N.load().validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().validation.badChar
  ]
}

export const GUEST_TYPE = {
  maxlength: 30,
  label: I18N.load().common.guestType,
  icon: ICONS.person,
  required: true,
  value: I18N.load().common.family,
  default: I18N.load().common.family,
  items: [
    I18N.load().common.family,
    I18N.load().common.couple,
    I18N.load().common.friends
  ],
  rules: [
    v => !!v || I18N.load().validation.required,
    v => v.length <= 30 || I18N.load().validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().validation.badChar
  ]
}

export const EMAIL = {
  maxlength: 30,
  label: I18N.load().common.email,
  icon: ICONS.email,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().validation.required,
    v => v.length <= 30 || I18N.load().validation.maxlength(30),
    v => REGEX.pattern.email(v) || I18N.load().validation.error.email
  ]
}

export const ADULTS = {
  min: 1,
  max: 6,
  default: 1,
  icon: ICONS.people,
  label: I18N.load().common.n_adults,
  value: 1
}

export const KIDS = {
  min: 0,
  max: 6,
  default: 0,
  label: I18N.load().common.n_kids,
  icon: ICONS.people,
  value: 0
}

export const PRODUCT_SELECTED = {
  label: I18N.load().common.in_booking,
  icon: ICONS.cart,
  hint: I18N.load().common.autoFilled,
  selected: [],
  value: [],
  required: true
}

export const NOTE = {
  maxlength: 200,
  min: 0,
  max: 200,
  icon: ICONS.note,
  label: I18N.load().common.note,
  value: ''
}

export const CHECKIN_DATE = {
  value: '',
  label: I18N.load().common.date_start,
  icon: ICONS.dateRange,
  hint: I18N.load().common.autoFilled
}

export const CHECKIN_TIME = {
  value: '',
  default: '',
  range: [],
  label: I18N.load().common.time_start,
  icon: ICONS.accessTime
}

export const CALENDAR_RANGE = {
  notAvaibleDate: ['2021-12-24', '2021-12-25', '2021-12-26'],
  from: '2019-01-01',
  to: '2022-01-01'
}

export const RESET = {
  label: I18N.load().common.reset
}

export const SUBMIT = {
  label: I18N.load().common.sendRequest
}

export const FILTER_SEARCH = {
  icon: 'search',
  label: 'Cerca per nome del prodotto',
  value: null,
  list: [
    'Name',
    'Calories',
    'Fat',
    'Carbs',
    'Protein',
    'Sodium',
    'Calcium',
    'Iron'
  ]
}

export const SORT_BY = {
  icon: {
    alpha: 'sort_by_alpha',
    orderDesc: 'arrow_upward',
    orderAsc: 'arrow_downward'
  },
  label: 'Ordina per',
  value: null,
  list: [
    'titolo',
    'prezzo'
  ]
}

export const CHECKBOX_PRIVACY = [
  {
    href: process.env.VUE_APP_LINK_PRIVACY_TERM,
    label: I18N.load().common.terms,
    text: I18N.load().common.terms,
    checkbox: false,
    required: true,
    rules: [
      v => !!v || I18N.load().validation.required
    ]
  },
  {
    href: process.env.VUE_APP_LINK_PRIVACY_CONDITION,
    label: I18N.load().common.conditions,
    text: I18N.load().common.condition,
    checkbox: false,
    required: true,
    rules: [
      v => !!v || I18N.load().validation.required
    ]
  }
]

export const DIALOG = (textSuccess, textError) => {
  return {
    show: false,
    current: {
      title: null,
      text: null,
      actions: {
        label: null
      }
    },
    done: {
      title: I18N.load().common.success,
      text: textSuccess || '',
      actions: {
        label: I18N.load().common.ok
      }
    },
    error: {
      title: I18N.load().common.error,
      text: textError || I18N.load().validation.error.required,
      actions: {
        label: I18N.load().common.ok
      }
    }
  }
}

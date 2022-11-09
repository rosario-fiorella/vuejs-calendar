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
  label: I18N.load().common.nAdults,
  value: 1
}

export const KIDS = {
  min: 0,
  max: 6,
  default: 0,
  label: I18N.load().common.nKids,
  icon: ICONS.people,
  value: 0
}

export const PRODUCT_SELECTED = {
  label: I18N.load().common.cart,
  icon: ICONS.cart,
  hint: I18N.load().common.autoFilled,
  selected: [],
  value: [],
  required: true
}

export const RANGE_NUMBER = {
  min: 0,
  max: 1000,
  range: [0, 1000],
  label: I18N.load().common.cart,
  icon: ICONS.euro
}

export const SERVICES_SELECTED = {
  label: I18N.load().common.services,
  icon: ICONS.settings,
  hint: I18N.load().common.autoFilled,
  selected: [],
  value: [],
  required: true
}

export const OPTIONALS_SELECTED = {
  label: I18N.load().common.optionals,
  icon: ICONS.settings,
  hint: I18N.load().common.autoFilled,
  selected: [],
  value: [],
  required: true
}

export const TAGS_SELECTED = {
  label: I18N.load().common.tag,
  icon: ICONS.tag,
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
  label: I18N.load().common.dateStart,
  icon: ICONS.dateRange,
  hint: I18N.load().common.autoFilled,
  show: false
}

export const CHECKIN_TIME = {
  value: '',
  default: '',
  range: [],
  label: I18N.load().common.timeStart,
  icon: ICONS.accessTime
}

export const CHECKOUT_TIME = {
  value: '',
  default: '',
  range: [],
  label: I18N.load().common.timeEnd,
  icon: ICONS.accessTime
}

export const CALENDAR_RANGE = {
  notAvaibleDate: [],
  from: `${((new Date()).getFullYear() - 5)}-01-01`,
  to: `${((new Date()).getFullYear() + 5)}-01-01`
}

export const RESET = {
  label: I18N.load().common.reset
}

export const SUBMIT = {
  label: I18N.load().common.sendRequest
}

export const FILTER_SEARCH = {
  icon: ICONS.search,
  label: I18N.load().form.filter.input,
  value: null,
  list: []
}

export const SORT_BY = {
  icon: {
    alpha: ICONS.alpha,
    orderDesc: ICONS.upward,
    orderAsc: ICONS.downward
  },
  label: I18N.load().form.filter.sortBy,
  value: null,
  list: [
    {
      text: I18N.load().common.sortAsc,
      value: 'asc'
    },
    {
      text: I18N.load().common.sortDesc,
      value: 'desc'
    }
  ]
}

export const CHECKBOX_PRIVACY = [
  {
    href: process.env.VUE_APP_LINK_PRIVACY_TERM,
    label: I18N.load().common.terms,
    text: '',
    checkbox: false,
    required: true,
    rules: [
      v => !!v || I18N.load().validation.required
    ]
  }
]

export const DIALOG = (show, title, text, label) => {
  return {
    show: show || false,
    title: title || '',
    text: text || '',
    actions: {
      label: label || I18N.load().common.ok || ''
    }
  }
}

import { I18N } from './locale'
import { ICONS } from './icons'
import { REGEX } from './regex'

export const USER = {
  maxlength: 30,
  label: I18N.load().user.fullName,
  icon: ICONS.person,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().form.validation.required,
    v => v.length <= 30 || I18N.load().form.validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().form.validation.badChar
  ]
}

export const FIRST_NAME = {
  maxlength: 30,
  label: I18N.load().user.firstName,
  icon: ICONS.person,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().form.validation.required,
    v => v.length <= 30 || I18N.load().form.validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().form.validation.badChar
  ]
}

export const LAST_NAME = {
  maxlength: 30,
  label: I18N.load().user.lastName,
  icon: ICONS.person,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().form.validation.required,
    v => v.length <= 30 || I18N.load().form.validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().form.validation.badChar
  ]
}

export const GUEST_TYPE = {
  maxlength: 30,
  label: I18N.load().user.guestType,
  icon: ICONS.person,
  required: true,
  value: I18N.load().user.family,
  default: I18N.load().user.family,
  items: [
    I18N.load().user.family,
    I18N.load().user.couple,
    I18N.load().user.friends
  ],
  rules: [
    v => !!v || I18N.load().form.validation.required,
    v => v.length <= 30 || I18N.load().form.validation.maxlength(30),
    v => REGEX.pattern.username(v) || I18N.load().form.validation.badChar
  ]
}

export const EMAIL = {
  maxlength: 30,
  label: I18N.load().user.email,
  icon: ICONS.email,
  required: true,
  value: '',
  rules: [
    v => !!v || I18N.load().form.validation.required,
    v => v.length <= 30 || I18N.load().form.validation.maxlength(30),
    v => REGEX.pattern.email(v) || I18N.load().form.validation.error.email
  ]
}

export const ADULTS = {
  min: 1,
  max: 6,
  default: 1,
  icon: ICONS.people,
  label: I18N.load().form.calendar.n_adults,
  value: 1
}

export const KIDS = {
  min: 0,
  max: 6,
  default: 0,
  label: I18N.load().form.calendar.n_kids,
  icon: ICONS.people,
  value: 0
}

export const PRODUCT_SELECTED = {
  label: I18N.load().form.calendar.in_booking,
  icon: ICONS.add,
  hint: I18N.load().form.autoFilled,
  selected: [],
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
  label: I18N.load().calendars.date_start,
  icon: ICONS.dateRange,
  hint: I18N.load().form.autoFilled
}

export const CHECKIN_TIME = {
  value: '',
  default: '',
  range: [],
  label: I18N.load().calendars.time_start,
  icon: ICONS.accessTime
}

export const CHECKBOX_PRIVACY = [
  {
    href: process.env.VUE_APP_LINK_PRIVACY_TERM,
    label: I18N.load().common.terms,
    text: I18N.load().privacy.terms,
    checkbox: false,
    required: true,
    rules: [
      v => !!v || I18N.load().form.validation.required
    ]
  },
  {
    href: process.env.VUE_APP_LINK_PRIVACY_CONDITION,
    label: I18N.load().common.conditions,
    text: I18N.load().privacy.condition,
    checkbox: false,
    required: true,
    rules: [
      v => !!v || I18N.load().form.validation.required
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
      title: I18N.load().actions.success,
      text: textSuccess || '',
      actions: {
        label: I18N.load().actions.ok
      }
    },
    error: {
      title: I18N.load().actions.error,
      text: textError || I18N.load().form.validation.error.required,
      actions: {
        label: I18N.load().actions.ok
      }
    }
  }
}

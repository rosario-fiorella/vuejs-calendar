import { I18N } from '../../common/locale'

export class Entity {
  _attributes = []
  _calendar = {}
  _content = {}
  _ecommerce = {}
  _media = []
  _notices = []
  _resources = []
  _services = []
  _optionals = []
  _tags = []
  _selected = false
  _id = null

  get id () {
    return this._id
  }

  set id (s) {
    this._id = s
  }

  get attributes () {
    return this._attributes || []
  }

  set attributes (o) {
    this._attributes = o
  }

  get calendar () {
    return this._calendar || {}
  }

  set calendar (o) {
    this._calendar = o
  }

  get content () {
    return this._content || {}
  }

  set content (o) {
    this._content = o
  }

  get ecommerce () {
    return this._ecommerce || {}
  }

  set ecommerce (o) {
    this._ecommerce = o
  }

  get media () {
    return this._media || []
  }

  get notices () {
    return this._notices || []
  }

  set notices (o) {
    this._notices = o
  }

  set media (o) {
    this._media = o
  }

  get resources () {
    return this._resources || []
  }

  set resources (o) {
    this._resources = o
  }

  get services () {
    return this._services || []
  }

  set services (o) {
    this._services = o
  }

  get optionals () {
    return this._optionals || []
  }

  set optionals (o) {
    this._optionals = o
  }

  get tags () {
    return this._tags || []
  }

  set tags (o) {
    this._tags = o
  }

  get selected () {
    return this._selected || false
  }

  set selected (bool) {
    this._selected = bool
  }

  constructor (entity) {
    this.id = entity.id
    this.selected = false
    this.attributes = this.attributesMap(entity.groups)
    this.calendar = this.calendarMap(entity.calendar)
    this.content = this.contentMap(entity.content)
    this.ecommerce = this.ecommerceMap(entity.ecommerce)
    this.media = this.mediaMap(entity.media)
    this.notices = this.noticeMap(entity.notices)
    this.resources = this.resourcesMap(entity.resources)
    this.services = this.servicesMap(entity.services)
    this.optionals = this.optionalsMap(entity.optionals)
    this.tags = this.tagsMap(entity.tags)
  }

  attributesMap = (entity) => {
    if (!entity || (entity.length === 0)) {
      return []
    }

    return entity.length === 0 ? [] : entity.map(i => {
      return {
        id: i.id,
        name: i.name,
        lang: i.lang,
        attributes: (i.attributes.length === 0) ? [] : i.attributes.map(a => {
          return {
            id: a.id,
            name: a.name,
            values: (a.values.length === 0) ? [] : a.values.map(o => {
              return {
                value: o.value,
                unit: o.unit,
                currency: o.currency
              }
            })
          }
        })
      }
    })
  }

  calendarMap = (entity) => {
    if (!entity) {
      return {}
    }

    const dateStart = new Date(entity.datetime_start)
    const dateEnd = new Date(entity.datetime_end)

    return {
      entity_id: entity.entity_id,
      id: entity.id,
      status_code: entity.status_code,
      date_start: dateStart.toLocaleDateString(I18N.getIso()),
      date_end: dateEnd.toLocaleDateString(I18N.getIso()),
      time_start: `${dateStart.getHours()}:${dateStart.getMinutes()}`,
      time_end: `${dateEnd.getHours()}:${dateEnd.getMinutes()}`
    }
  }

  contentMap = (entity) => {
    if (!entity) {
      return {}
    }

    return {
      entity_id: entity.entity_id,
      id: entity.id,
      slug: entity.slug,
      name: entity.name,
      description: entity.description,
      short_description: entity.short_description,
      excerpt: entity.excerpt,
      note: entity.note,
      lang: entity.lang
    }
  }

  ecommerceMap = (entity) => {
    if (!entity) {
      return {}
    }

    let taxIncluded = (Number(entity.tax_included) > 0) ? I18N.load().common.yes : I18N.load().common.no
    taxIncluded = `${I18N.load().common.taxIncluded}: ${taxIncluded}`

    return {
      entity_id: entity.entity_id,
      id: entity.id,
      price_original: entity.price_original,
      price_reduction: entity.price_reduction,
      price_current: entity.price_current,
      tax: entity.tax,
      tax_included: taxIncluded,
      expired_time: entity.expired_time,
      currency: entity.currency,
      unit: entity.unit,
      lang: entity.lang
    }
  }

  mediaMap = (entity) => {
    return this.resourcesMap(entity)
  }

  resourcesMap = (entity) => {
    if (!entity || (entity.length === 0)) {
      return []
    }

    return entity.map(o => {
      return {
        entity_id: o.entity_id,
        id: o.id,
        name: o.name,
        alternative_name: o.alternative_name,
        type: o.type,
        url: o.url,
        lang: o.lang
      }
    })
  }

  servicesMap = (entity) => {
    if (!entity || (entity.length === 0)) {
      return []
    }

    return entity.map(o => {
      return {
        calendar: this.calendarMap(o.calendar),
        content: this.contentMap(o.content),
        ecommerce: this.ecommerceMap(o.ecommerce),
        notices: this.noticeMap(o.notices),
        media: this.mediaMap(o.media),
        resources: this.resourcesMap(o.resources)
      }
    })
  }

  optionalsMap = (entity) => {
    if (!entity || (entity.length === 0)) {
      return []
    }

    return entity.map(o => {
      return {
        calendar: this.calendarMap(o.calendar),
        content: this.contentMap(o.content),
        ecommerce: this.ecommerceMap(o.ecommerce),
        notices: this.noticeMap(o.notices),
        media: this.mediaMap(o.media),
        resources: this.resourcesMap(o.resources)
      }
    })
  }

  tagsMap = (entity) => {
    if (!entity || (entity.length === 0)) {
      return []
    }

    return entity.map(o => {
      return {
        entity_id: o.entity_id,
        id: o.id,
        slug: o.slug,
        name: o.name,
        icon: o.icon,
        lang: entity.lang
      }
    })
  }

  noticeMap = (entity) => {
    if (!entity || (entity.length === 0)) {
      return []
    }

    return entity.map(o => {
      return {
        calendar: this.calendarMap(o.calendar),
        content: this.contentMap(o.content)
      }
    })
  }
}

export class EntityAttributes {
  static INCLUDE = 'include'
  static EXCLUDE = 'exclude'
  static HIGHER = 'higher'
  static HIGHER_OR_EQUAL = 'higher_or_equal'
  static LOWER = 'lower'
  static LOWER_OR_EQUAL = 'lower_or_equal'

  _field = null
  _value = null
  _operator = null

  get field () {
    return this._field
  }

  set field (v) {
    this._field = v
  }

  get value () {
    return this._value
  }

  set value (v) {
    this._value = v
  }

  get operator () {
    return this._operator
  }

  set operator (v) {
    this._operator = v
  }

  constructor (f, v, o) {
    this.field = f
    this.value = Array.isArray(v) ? v : [v]
    this.operator = o
  }
}

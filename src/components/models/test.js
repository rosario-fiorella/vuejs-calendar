import { COLORS } from '../../common/colors'
import { ICONS } from '../../common/icons'
import { I18N } from '../../common/locale'
import { Entity } from './entity'
import { faker } from '@faker-js/faker'

var randomLogo = faker.image.avatar()
var randomBg = faker.image.imageUrl(1900, 320)
var randomImageUrl = faker.image.imageUrl(300, 240)

class EntityFactory {
  _id = null

  get id () {
    return this._id
  }

  set id (s) {
    this._id = s
  }

  constructor (entity) {
    this._id = entity
  }

  createEcommerce = () => {
    const priceOriginal = faker.datatype.float({ min: 100, max: 1000, precision: 2 })
    const priceReduction = faker.datatype.float({ min: 10, max: 100, precision: 2 })
    const priceCurrent = priceOriginal - priceReduction
    const priceDiscount = ((priceReduction / priceOriginal) * 100).toFixed(2)
    const taxIncluded = faker.datatype.boolean()
    const taxValue = faker.datatype.float({ min: 1, max: 22, precision: 2 })

    return {
      id: faker.datatype.number(1000),
      entity_id: this.id,
      price_original: priceOriginal,
      price_reduction: `-${priceDiscount}%`,
      price_current: priceCurrent,
      tax_included: taxIncluded,
      tax: taxValue,
      min_spent: faker.datatype.float({ min: 10, max: 100, precision: 2 }),
      min_person: faker.datatype.number(),
      min_time: 0,
      expired_time: `${faker.datatype.number({ min: 10, max: 23 })}:00`,
      currency: '€',
      unit: 'd',
      lang: faker.locale
    }
  }

  createCalendar = () => {
    const statusId = faker.datatype.number(3)
    const dateStart = faker.date.future().toISOString().split('T')[0]
    const dateEnd = faker.date.future().toISOString().split('T')[0]
    const timeStart = faker.date.future().toISOString().split('T')[1].substring(0, 5)
    const timeEnd = faker.date.future().toISOString().split('T')[1].substring(0, 5)

    return {
      id: faker.datatype.number(1000),
      entity_id: this.id,
      status_code: statusId,
      date_start: dateStart,
      date_end: dateEnd,
      time_start: timeStart,
      time_end: timeEnd
    }
  }

  createMedia = (n) => {
    const medias = []
    n = n > 0 ? n : faker.datatype.number(3)
    for (let i = 0; i < n; ++i) {
      medias.push({
        id: faker.datatype.number(1000) + i,
        entity_id: this.id,
        name: faker.lorem.lines(1),
        alternative_name: faker.lorem.lines(1),
        type: 'image/jpeg',
        url: randomImageUrl,
        lang: faker.locale
      })
    }

    return medias
  }

  createTags = (n) => {
    const tags = []
    n = n > 0 ? n : faker.datatype.number(10)
    for (let i = 0; i < n; ++i) {
      tags.push({
        id: faker.datatype.number(1000) + i,
        entity_id: this.id,
        name: faker.lorem.words(1),
        lang: faker.locale,
        icon: 'edit'
      })
    }

    return tags
  }

  createContent = () => {
    return {
      id: faker.datatype.number(1000),
      entity_id: this.id,
      slug: faker.lorem.slug(),
      name: faker.lorem.lines(1),
      description: faker.lorem.paragraphs(3, '<br/>'),
      short_description: faker.lorem.paragraph(),
      excerpt: faker.lorem.paragraph(),
      note: faker.lorem.lines(1),
      lang: faker.locale
    }
  }

  createResources = (n) => {
    const list = []
    n = n > 0 ? n : faker.datatype.number(10)
    for (let i = 0; i < n; ++i) {
      list.push({
        id: faker.datatype.number(1000) + i,
        entity_id: this.id,
        name: faker.lorem.lines(1),
        alternative_name: faker.lorem.lines(1),
        url: faker.internet.url(),
        lang: faker.locale
      })
    }

    return list
  }

  createAttributes = (_g, _a, _v, u, c) => {
    _g = _g > 0 ? _g : faker.datatype.number(5)
    _a = _a > 0 ? _a : faker.datatype.number(5)
    _v = _v > 0 ? _v : faker.datatype.number(5)
    u = u || 'd'
    c = c || null

    const groups = []
    for (let g = 0; g < _g; ++g) {
      const attributes = []
      for (let a = 0; a < _a; ++a) {
        const values = []
        for (let v = 0; v < _v; ++v) {
          values.push({
            value: faker.lorem.words(2),
            unit: u,
            currency: c
          })
        }

        attributes.push({
          id: faker.datatype.number(10000),
          name: faker.lorem.words(3),
          values: values
        })
      }

      groups.push({
        id: g,
        name: faker.lorem.words(3),
        lang: faker.locale,
        attributes: attributes
      })
    }

    return groups
  }

  createNotices = (n) => {
    n = n > 0 ? n : faker.datatype.number(2)
    const list = []
    for (let i = 0; i < n; ++i) {
      list.push({
        calendar: this.createCalendar(),
        content: this.createContent()
      })
    }

    return list
  }

  createServices = (n) => {
    n = n > 0 ? n : faker.datatype.number(10)
    const list = []
    for (let i = 0; i < n; ++i) {
      list.push({
        calendar: this.createCalendar(),
        content: this.createContent(),
        ecommerce: this.createEcommerce(),
        resources: this.createResources(),
        notices: this.createNotices()
      })
    }

    return list
  }
}

export const TEST = {
  dateRange: () => {
    const dates = []
    const n = faker.datatype.number(20)
    const now = new Date()
    const yFrom = now.getFullYear() - 5
    const yTo = now.getFullYear() + 5
    for (let i = 0; i < n; ++i) {
      dates.push(faker.date.future().toISOString().split('T')[0])
    }

    return {
      notAvaibleDate: dates,
      from: `${yFrom}-01-01`,
      to: `${yTo}-01-01`
    }
  },
  timeRange: () => {
    const times = []
    const n = faker.datatype.number(20)
    for (let i = 0; i < n; ++i) {
      times.push(faker.date.future().toISOString().split('T')[1].substring(0, 5))
    }

    return {
      range: times,
      default: times[0],
      value: times[0],
      label: I18N.load().common.time_start,
      icon: ICONS.accessTime
    }
  },
  page: () => {
    return {
      title: faker.lorem.lines(),
      subtitle: faker.lorem.lines(),
      description: faker.lorem.paragraphs(6, '<br/>'),
      short_description: faker.lorem.paragraph(),
      excerpt: faker.lorem.paragraph(),
      note: faker.lorem.paragraph()
    }
  },
  navigation: () => {
    const list = []
    let i
    i = 1
    for (i; i < 5; ++i) {
      list.push({
        text: faker.lorem.words(1),
        icon: i === 1 ? 'home' : '',
        url: i === 1 ? '/' : '/it/' + faker.lorem.slug()
      })
    }

    return {
      select: '',
      color: COLORS.primary,
      list: list
    }
  },
  notices: () => {
    const list = []
    for (let i = 1; i < 4; ++i) {
      const from = faker.date.future()
      const to = faker.date.future()
      list.push({
        title: faker.lorem.lines(1),
        subtitle: faker.lorem.lines(1),
        description: faker.lorem.paragraph(1),
        date: {
          start: `dal ${from.getDay()}/${from.getMonth()}/${from.getFullYear()}`,
          end: `al ${to.getDay()}/${to.getMonth()}/${to.getFullYear()}`,
          icon: ICONS.dateRange
        }
      })
    }

    return {
      list: list,
      type: 'info',
      icon: {
        color: COLORS.primary,
        open: ICONS.notify,
        close: ICONS.close
      }
    }
  },
  languages: () => {
    const list = [
      {
        text: 'Italiano',
        url: '/it/'
      },
      {
        text: 'Inglese',
        url: '/en/'
      }
    ]

    return {
      btn: {
        color: COLORS.primary
      },
      icon: {
        translate: ICONS.translate,
        arrowDown: ICONS.arrowDown
      },
      selected: '',
      default: navigator.language,
      list: list
    }
  },
  site: () => {
    const email = faker.internet.email()
    const phone = faker.phone.phoneNumber()
    const list = [
      {
        title: 'E-mail',
        text: email,
        icon: ICONS.email,
        url: `mailto:${email}`
      },
      {
        title: 'Telefono',
        text: phone,
        icon: ICONS.phone,
        url: `tel:${phone}`
      }
    ]

    return {
      title: faker.lorem.words(4),
      subtitle: faker.lorem.lines(),
      list: list,
      bg: randomBg,
      logo: {
        src: randomLogo,
        size: '50'
      }
    }
  },
  footer: () => {
    const date = new Date()
    const year = date.getFullYear()
    const nav = [
      {
        text: 'Facebook',
        icon: 'facebook',
        url: faker.internet.url()
      }
    ]

    return {
      nav: nav,
      copyright: `${year} - ${faker.lorem.words(2)}`,
      note: faker.lorem.lines(1)
    }
  },
  entities: () => {
    const list = []
    for (let i = 0; i < faker.datatype.number(10); ++i) {
      const entityId = faker.datatype.number(1000) + faker.datatype.number(10)
      const selected = faker.datatype.boolean()
      const entityFactory = new EntityFactory(entityId)

      const entity = new Entity({
        id: entityId,
        selected: selected,
        calendar: entityFactory.createCalendar(),
        content: entityFactory.createContent(),
        ecommerce: entityFactory.createEcommerce(),
        groups: entityFactory.createAttributes(),
        media: entityFactory.createMedia(),
        tags: entityFactory.createTags(),
        resources: entityFactory.createResources(),
        notices: entityFactory.createNotices(),
        services: entityFactory.createServices()
      })

      list.push(entity)
    }

    return list
  }
}

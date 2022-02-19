import { faker } from '@faker-js/faker'

export class EntityFactory {
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
      id: faker.datatype.number({ min: 100, max: 1000 }),
      entity_id: this.id,
      price_original: priceOriginal,
      price_reduction: `-${priceDiscount}%`,
      price_current: priceCurrent,
      tax_included: taxIncluded,
      tax: taxValue,
      min_spent: faker.datatype.float({ min: 10, max: 100, precision: 2 }),
      min_person: faker.datatype.number({ min: 1, max: 6 }),
      min_time: 0,
      expired_time: `${faker.datatype.number({ min: 10, max: 23 })}:00`,
      currency: '€',
      unit: 'd',
      lang: faker.locale
    }
  }

  createCalendar = () => {
    const statusId = faker.datatype.number({ min: 1, max: 3 })
    const dateStart = faker.date.future().toISOString().split('T')[0]
    const dateEnd = faker.date.future().toISOString().split('T')[0]
    const timeStart = faker.date.future().toISOString().split('T')[1].substring(0, 5)
    const timeEnd = faker.date.future().toISOString().split('T')[1].substring(0, 5)

    return {
      id: faker.datatype.number({ min: 100, max: 1000 }),
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
    n = n > 0 ? n : faker.datatype.number({ min: 2, max: 4 })
    for (let i = 0; i < n; ++i) {
      medias.push({
        id: faker.datatype.number({ min: 100, max: 1000 }) + i,
        entity_id: this.id,
        name: faker.lorem.lines(1),
        alternative_name: faker.lorem.lines(1),
        type: 'image/jpeg',
        url: `uploads/${faker.datatype.number({ min: 1, max: 5 })}.jpg`,
        lang: faker.locale
      })
    }

    return medias
  }

  createTags = (n) => {
    const tags = []
    n = n > 0 ? n : faker.datatype.number({ min: 5, max: 15 })
    for (let i = 0; i < n; ++i) {
      tags.push({
        id: faker.datatype.number({ min: 100, max: 1000 }) + i,
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
      id: faker.datatype.number({ min: 100, max: 1000 }),
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
    n = n > 0 ? n : faker.datatype.number({ min: 2, max: 5 })
    for (let i = 0; i < n; ++i) {
      list.push({
        id: faker.datatype.number({ min: 100, max: 1000 }) + i,
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
    _g = _g > 0 ? _g : faker.datatype.number({ min: 2, max: 5 })
    _a = _a > 0 ? _a : faker.datatype.number({ min: 2, max: 5 })
    _v = _v > 0 ? _v : faker.datatype.number({ min: 2, max: 5 })
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
          id: faker.datatype.number({ min: 100, max: 1000 }),
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
    n = n > 0 ? n : faker.datatype.number({ min: 1, max: 2 })
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
    n = n > 0 ? n : faker.datatype.number({ min: 1, max: 5 })
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

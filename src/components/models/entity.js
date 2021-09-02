import { I18N } from '../../common/locale'

export class Entity {
  _vo = {}

  get vo () {
    return this._vo || {}
  }

  set vo (o) {
    if (typeof o === 'object') {
      this._vo = o
    }
  }

  /**
   * @param {object} entity
   */
  constructor (entity) {
    const contents = this.contents(entity)
    let ecommerce = this.ecommerce(entity)
    const calendars = this.calendars(entity)
    const resources = this.resources(entity)
    const attributes = this.attributes(entity)
    const relations = this.relations(entity)
    let media = ''

    // overwrite ecommerce price if defined in relations
    if (Object.keys(relations).length > 0) {
      const entityId = ecommerce.entity_id
      for (const i in relations) {
        if (i === 'price.market') {
          const priceEntityId = relations[i][0].ecommerce.entity_id
          ecommerce = relations[i][0].ecommerce
          relations[i][0].ecommerce = {
            relation_entity_id: priceEntityId,
            original_entity_id: entityId,
            replaceDefaultPrice: true
          }
        }
        if (i === 'media') {
          if (relations[i][0] && relations[i][0].resources && relations[i][0].resources.url) {
            media = relations[i][0].resources.url || ''
          }
        }
      }
    }

    this.vo = {
      id: entity.entity_id,
      contents: contents,
      ecommerce: ecommerce,
      calendars: calendars,
      resources: resources,
      attributes: attributes,
      relations: relations,
      media: media
    }
  }

  /**
   * @param {object} entity
   * @returns {object}
   */
  contents = (entity) => {
    const data = entity.contents[0]
    if (!data) {
      return {}
    }

    return {
      entity_id: data.entity_id,
      id: data.content_id,
      slug: data.content_slug,
      name: data.content_name,
      description: data.content_description,
      short_description: data.content_short_description,
      excerpt: data.content_excerpt,
      note: data.content_note,
      lang: data.content_lang
    }
  }

  /**
   * @param {object} entity
   * @returns {object}
   */
  ecommerce = (entity) => {
    const data = entity.ecommerce[0]
    if (!data) {
      return {}
    }

    let priceReduction = ''
    if (Number(data.ecommerce_price_reduction) > 0) {
      priceReduction = '-' + Number(data.ecommerce_price_reduction) + ' %'
    }

    let taxIncluded = Number(data.ecommerce_tax_included) > 0 ? I18N.load().common.yes : I18N.load().common.no
    taxIncluded = I18N.load().ecommerce.tax_included + ': ' + taxIncluded
    const taxValue = I18N.load().ecommerce.tax + ': ' + Number(data.ecommerce_tax) + ' %'

    return {
      entity_id: data.entity_id,
      id: data.ecommerce_id,
      price: Number(data.ecommerce_price),
      price_reduction: priceReduction,
      tax: taxValue,
      tax_included: taxIncluded,
      min_spent: Number(data.ecommerce_min_spent),
      min_person: Number(data.ecommerce_min_person),
      min_time: data.ecommerce_min_time,
      expired_time: data.ecommerce_expired_time,
      currency: data.ecommerce_currency,
      unit: data.ecommerce_unit,
      lang: data.ecommerce_lang
    }
  }

  /**
   * @param {object} entity
   * @returns {object}
   */
  calendars = (entity) => {
    const data = entity.calendars[0]
    if (!data) {
      return {}
    }
    const dateStart = new Date(data.calendar_date_start + ' ' + data.calendar_time_start)
    const dateEnd = new Date(data.calendar_date_end + ' ' + data.calendar_time_end)

    return {
      entity_id: data.entity_id,
      id: data.calendar_id,
      day: data.calendar_day,
      date_start: dateStart.toLocaleDateString(I18N.getIso()),
      date_end: dateEnd.toLocaleDateString(I18N.getIso()),
      time_start: dateStart.getHours() + ':' + (dateStart.getMinutes() || '00'),
      time_end: dateEnd.getHours() + ':' + (dateEnd.getMinutes() || '00'),
      status_code: data.calendar_status_code
    }
  }

  /**
   * @param {object} entity
   * @returns {object}
   */
  resources = (entity) => {
    const data = entity.resources[0]
    if (!data) {
      return {}
    }

    return {
      entity_id: data.entity_id,
      id: data.resource_id,
      name: data.resource_name,
      alternative_name: data.resource_alternative_name,
      type: data.resource_type,
      url: data.resource_url,
      lang: data.resource_lang
    }
  }

  /**
   * @param {object} entity
   * @returns {array}
   */
  attributes = (entity) => {
    const attributes = entity.attributes
    const list = []
    if (!attributes) {
      return []
    }

    for (const group in attributes) {
      const attrObj = {}
      attrObj.group_id = attributes[group].group_id
      attrObj.list = []
      for (const item in attributes[group].list) {
        const attrItem = attributes[group].list[item]
        let attrValues = []
        if (attrItem.value) {
          attrValues = attrItem.value.map(o => {
            return {
              value: o.attribute_value,
              unit: o.attribute_value_unit,
              lang: o.attribute_value_lang,
              type: o.attribute_value_type,
              currency: o.attribute_value_currency
            }
          })
        }
        attrObj.list.push({
          id: attrItem.id,
          name: attrItem.name,
          value: attrValues
        })
      }

      list.push(attrObj)
    }

    return list
  }

  /**
   * @param {object} entity
   * @returns {object}
   */
  relations = (entity) => {
    const relations = entity.relations
    if (Object.keys(relations).length === 0) {
      return {}
    }

    const entities = {}
    for (const i in relations) {
      if (relations[i].length === 0) {
        continue
      }

      const vo = relations[i].map(o => {
        return new Entity(o).vo
      })

      if (vo) {
        entities[i] = vo
      }
    }

    return entities
  }
}

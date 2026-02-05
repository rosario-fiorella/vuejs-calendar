export class Entity {
  constructor(slug, data) {
    this._slug = slug
    this._type = data.type || 'rent'
    this._selected = false

    this.content = this.contentMap(data.content)
    this.priceRules = this.priceRulesMap(data.price)
    this.terms = this.termsMap(data.terms)
    this.media = this.mediaMap(data.media)
    this.prices = this.pricesMap(data.prices)
  }

  contentMap(content) {
    return {
      slug: content?.slug || '',
      name: content?.name || '',
      description: content?.description || '',
      excerpt: content?.excerpt || ''
    }
  }

  priceRulesMap(priceData) {
    if (!priceData?.tax) return []
    return priceData.tax.map(t => ({
      ...t,
      value: parseFloat(t.value)
    }))
  }

  termsMap(terms) {
    return {
      rental_types: terms?.rental_types || [],
      product_types: terms?.product_types || [],
      features: terms?.features || []
    }
  }

  mediaMap(media) {
    const mapRes = (r) => ({
      slug: r.slug,
      title: r.title,
      url: r.url,
      type: r.type
    })

    return {
      images: (media?.images || []).map(mapRes),
      attachments: (media?.attachments || []).map(mapRes),
      thumbnail: media?.thumbnail ? mapRes(media.thumbnail) : { url: require('@/assets/img/placeholder.png') }
    }
  }

  pricesMap(prices) {
    if (!Array.isArray(prices)) return []

    const currentLocale = i18n.locale
    return prices.map(p => {
      const start = new Date(p.datetime_start)
      const end = new Date(p.datetime_end)

      return {
        value: parseFloat(p.price),
        currency: p.currency,
        tax_included: Boolean(Number(p.tax_included)),
        date_display: start.toLocaleDateString(currentLocale),
        time_start: start.toLocaleTimeString(currentLocale, { hour: '2-digit', minute: '2-digit' }),
        time_end: end.toLocaleTimeString(currentLocale, { hour: '2-digit', minute: '2-digit' }),
        raw_start: start,
        raw_end: end
      }
    })
  }

  formatCurrency(value) {
    return i18n.n(value, 'currency')
  }

  get priceLabel() {
    if (!this.prices.length) return ''
    return this.formatCurrency(this.prices[0].value)
  }
}

export class Entity {
  constructor(slug, data) {
    this.slug = slug
    this.type = data.type || 'rent'
    this.selected = false

    this.content = {
      name: data.content?.name || '',
      description: data.content?.description || '',
      excerpt: data.content?.excerpt || '',
      slug: data.content?.slug || slug
    }

    this.price = {
      price: parseFloat(data.price?.price || 0),
      tax: (data.price?.tax || []).map(t => ({
        ...t,
        value: parseFloat(t.value || 0)
      }))
    }

    this.taxes = this.price.tax

    this.terms = {
      rental_types: data.terms?.rental_types || [],
      product_types: data.terms?.product_types || [],
      features: data.terms?.features || []
    }

    this.media = this._mapMedia(data.media)
  }

  _mapMedia(media) {
    const mapItem = (r) => ({
      slug: r?.slug || '',
      title: r?.title || '',
      url: r?.url || '',
      type: r?.type || 'image'
    })

    return {
      images: (media?.images || []).map(mapItem),
      attachments: (media?.attachments || []).map(mapItem),
      thumbnail: media?.thumbnail
        ? mapItem(media.thumbnail)
        : { url: '/placeholder.png' }
    }
  }

  formatPrice(value, currency, i18nInstance) {
    if (i18nInstance) {
      return i18nInstance.n(value, 'currency', { currency: currency || 'EUR' })
    }
    return `${currency || 'EUR'} ${value.toFixed(2)}`
  }
}

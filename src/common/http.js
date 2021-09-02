import axios from 'axios'

export const HTTP = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxx'
  }
}

export const API = {
  getAppData: async (param = null) => {
    const localize = (param && param.localize) || 1
    let query = 'Entities?domain=info,navigation,notices&localize=__LOCALIZE__&dateRange=___DATERANGE__&timeRange=___TIMERANGE__'
    query = query.replace('__LOCALIZE__', localize)
    query = query.replace('___DATERANGE__', 1)
    query = query.replace('___TIMERANGE__', 1)

    const response = await axios.get(HTTP.baseURL + query, HTTP.headers)
    return response.data
  },
  getAvaibleProducts: async (param = null) => {
    const date = (param && param.date) || null
    const time = (param && param.time) || null
    const localize = (param && param.localize) || 0
    const lang = (param && param.language) || ''
    let query = 'Entities?domain=products&localize=__LOCALIZE__&lang=__LANG__&date=__DATE__&time=__TIME__&dateRange=___DATERANGE__&timeRange=___TIMERANGE__'

    if (date && time) {
      query = query
        .replace('__LOCALIZE__', localize)
        .replace('__LANG__', lang)
        .replace('__DATE__', date)
        .replace('__TIME__', time)
        .replace('___DATERANGE__', 1)
        .replace('___TIMERANGE__', 1)
    } else {
      query = query
        .replace('__LOCALIZE__', localize)
        .replace('__LANG__', lang)
        .replace('__DATE__', '')
        .replace('__TIME__', '')
        .replace('___DATERANGE__', 1)
        .replace('___TIMERANGE__', 1)
    }
    const response = await axios.get(HTTP.baseURL + query, HTTP.headers)
    return response.data
  },
  sendBookingRequest: async (data) => {
    const query = 'Orders'
    const response = await axios.post(
      HTTP.baseURL + query,
      JSON.stringify(data),
      HTTP.headers
    )

    return response.data
  }
}

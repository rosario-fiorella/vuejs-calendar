import axios from 'axios'

export const HTTP = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer 1234567890',
    'X-API-Key': process.env.VUE_APP_API_KEY
  }
}

export const API = {
  fetchAppData: async () => {
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_DATA}`
    const r = await axios.get(endpoint, HTTP.headers)
    return r.data
  },
  filterEntities: async (param = null) => {
    if (!param) {
      param = {}
    }
    const sort = param.sort || 'asc'
    const page = param.page || 1
    const perPage = param.per_page || process.env.VUE_APP_API_PER_PAGE
    delete param.sort
    delete param.page
    delete param.per_page
    let query = ''
    if (param) {
      query = encodeURIComponent(JSON.stringify(param))
    }
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_ENTITIES}`
    const s = `${endpoint}?q=${query}&sort=${sort}&page=${page}&per_page=${perPage}`

    const r = await axios.get(s, HTTP.headers)
    return r.data
  },
  tryToBook: async (data) => {
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_BOOKING}`
    const r = await axios.post(endpoint, data, HTTP.headers)
    return r.data
  }
}

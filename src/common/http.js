import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TEST } from '../components/models/test'
import { EnvEnum } from './enum'

export const HTTP = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer 1234567890',
    'X-API-Key': process.env.VUE_APP_API_KEY
  }
}

export const API = {
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

    if (process.env.VUE_APP_NODE_ENV !== EnvEnum.PRODUCTION) {
      const mock = new MockAdapter(axios)
      mock.onGet(new RegExp(`${process.env.VUE_APP_API_ENTITIES}.+`)).reply(200, TEST.entities())
    }

    const r = await axios.get(s, HTTP.headers)
    return r.data
  },
  listEntities: async (data) => {
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_LIST}`

    if (process.env.VUE_APP_NODE_ENV !== EnvEnum.PRODUCTION) {
      const mock = new MockAdapter(axios)
      mock.onGet(new RegExp(`${endpoint}`)).reply(200, TEST.listEntities())
    }

    const r = await axios.get(endpoint, HTTP.headers)
    return r.data
  },
  tryToBook: async (data) => {
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_BOOKING}`

    if (process.env.VUE_APP_NODE_ENV !== EnvEnum.PRODUCTION) {
      const mock = new MockAdapter(axios)
      mock.onPost(new RegExp(`${endpoint}`)).reply(200, TEST.booking(data))
    }

    const r = await axios.post(endpoint, data, HTTP.headers)
    return r.data
  },
  fetchContent: async (data) => {
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_CONTENTS}`

    if (process.env.VUE_APP_NODE_ENV !== EnvEnum.PRODUCTION) {
      const mock = new MockAdapter(axios)
      mock.onPost(new RegExp(`${endpoint}`)).reply(200, TEST.page())
    }

    const r = await axios.post(endpoint, data, HTTP.headers)
    return r.data
  },
  fetchData: async (data) => {
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_DATA}`

    if (process.env.VUE_APP_NODE_ENV !== EnvEnum.PRODUCTION) {
      const mock = new MockAdapter(axios)
      mock.onPost(new RegExp(`${endpoint}`)).reply(200, {
        site: TEST.site(),
        navigation: TEST.navigation(),
        languages: TEST.languages(),
        notices: TEST.notices(),
        footer: TEST.footer()
      })
    }

    const r = await axios.post(endpoint, data, HTTP.headers)
    return r.data
  }
}

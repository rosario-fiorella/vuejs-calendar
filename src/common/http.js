import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TEST } from '../components/models/test'

export const HTTP = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer ',
    'X-API-Key': process.env.VUE_APP_API_KEY
  }
}

export const API = {
  filterEntities: async (param = null) => {
    const sort = param.sort || 'asc'
    const page = param.page || 1
    const perPage = param.per_page || 10
    delete param.sort
    delete param.page
    delete param.per_page
    const query = encodeURIComponent(JSON.stringify(param))
    const endpoint = `${HTTP.baseURL}${process.env.VUE_APP_API_ENTITIES}`
    const s = `${endpoint}?q=${query}&sort=${sort}&page=${page}&per_page=${perPage}`

    const mock = new MockAdapter(axios)
    mock.onGet(new RegExp(`${process.env.VUE_APP_API_ENTITIES}.+`)).reply(200, TEST.entities())

    const r = await axios.get(s, HTTP.headers)
    return r.data
  }
}

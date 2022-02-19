import { COLORS } from '../../common/colors'
import { ICONS } from '../../common/icons'
import { I18N } from '../../common/locale'
import { Entity } from './entity'
import { EntityFactory } from './factory'
import { faker } from '@faker-js/faker'

var randomLogo = faker.image.avatar()
var randomBg = faker.image.imageUrl(1900, 320)

export const TEST = {
  dateRange: () => {
    const dates = []
    const n = faker.datatype.number({ min: 10, max: 20 })
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
    const n = faker.datatype.number({ min: 10, max: 20 })
    for (let i = 0; i < n; ++i) {
      times.push(faker.date.future().toISOString().split('T')[1].substring(0, 5))
    }

    return {
      range: times,
      default: times[0],
      value: times[0],
      label: I18N.load().common.timeStart,
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
    for (let i = 0; i < faker.datatype.number({ min: 10, max: 20 }); ++i) {
      const entityId = faker.datatype.number({ min: 10, max: 1000 }) + faker.datatype.number({ min: 10, max: 1000 })
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
  },
  booking: (data) => {
    const products = []
    for (let i = 0; i < faker.datatype.number({ min: 1, max: 10 }); ++i) {
      products.push({
        id: faker.datatype.number({ min: 1, max: 100 }),
        text: faker.lorem.words(3)
      })
    }

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      adults: data.adults,
      kids: data.kids,
      note: data.note,
      entities: products,
      date_start: data.date_start.replace('T', ' '),
      date_end: data.date_end.replace('T', ' ')
    }
  }
}

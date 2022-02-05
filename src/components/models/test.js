import { COLORS } from '../../common/colors'
import { ICONS } from '../../common/icons'
import { I18N } from '../../common/locale'
import { Entity } from './entity'

export const TEST = {
  dateRange: () => {
    return {
      notAvaibleDate: ['2021-12-24', '2021-12-25', '2021-12-26'],
      from: '2019-01-01',
      to: '2022-01-01'
    }
  },
  timeRange: () => {
    return {
      range: ['09:00', '10:00', '11:00'],
      default: '10:00',
      value: '11:00',
      label: I18N.load().common.time_start,
      icon: ICONS.accessTime
    }
  },
  page: () => {
    return {
      title: 'Titolo duis arcu tortor',
      subtitle: 'Duis arcu tortor, suscipit eget, imperdiet nec',
      description: 'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. Nullam vel sem. Pellentesque dapibus hendrerit tortor. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. <br /> Nullam vel sem. Pellentesque dapibus hendrerit tortor. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum.<br />Nullam vel sem. Pellentesque dapibus hendrerit tortor',
      short_description: 'Duis arcu tortor, suscipit eget, imperdiet nec.',
      excerpt: 'Riassunto',
      note: 'Note'
    }
  },
  navigation: () => {
    const list = []
    let i
    i = 1
    for (i; i < 5; ++i) {
      list.push({
        text: 'Pagina - ' + i,
        icon: i === 1 ? 'home' : 'edit',
        url: i === 1 ? '/' : '/it/page-' + i
      })
    }

    return {
      select: '',
      color: COLORS.primary,
      bgColor: 'blue-grey darken-4',
      list: list
    }
  },
  toolbar: () => {
    const list = []
    let i
    i = 1
    for (i; i < 6; ++i) {
      list.push({
        text: 'Link - ' + i,
        icon: 'edit',
        url: '/it/page-' + i
      })
    }

    return {
      title: '',
      select: '',
      logo: {
        src: '',
        size: '40'
      },
      bg: 'https://picsum.photos/1920/1080?random',
      color: COLORS.primary,
      list: list,
      btn: {
        color: COLORS.primary
      },
      icon: {
        menu: ICONS.menu
      }
    }
  },
  notices: () => {
    const list = []
    let i
    i = 1
    for (i; i < 4; ++i) {
      list.push({
        title: 'Titolo - ' + i,
        description: ' Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. Nullam vel sem. Pellentesque dapibus hendrerit tortor. ',
        note: 'Note - ' + i
      })
    }

    return {
      list: list,
      btn: {
        color: COLORS.white
      },
      icon: {
        color: COLORS.primary,
        open: ICONS.notify,
        close: ICONS.close
      }
    }
  },
  notify: () => {
    const list = []
    let i
    i = 1
    for (i; i < 4; ++i) {
      list.push({
        title: 'Avviso - ' + i,
        description: 'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. Nullam vel sem. Pellentesque dapibus hendrerit tortor.',
        date: {
          start: 'dal 12-12-2021 ore: 12:00',
          end: 'al 16-12-2021 ore: 15:00',
          icon: ICONS.dateRange
        }
      })
    }

    return {
      type: 'info',
      list: list
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
    const list = [
      {
        title: 'E-mail',
        text: 'email@info.it',
        icon: ICONS.email,
        url: 'mailto:email@info.it'
      },
      {
        title: 'Telefono',
        text: '+39 333333333',
        icon: ICONS.phone,
        url: 'tel:39333333333'
      }
    ]

    return {
      title: 'Titolo del sito',
      subtitle: 'Slogan del sito',
      list: list,
      logo: {
        src: 'uploads/logo.png',
        size: '50'
      }
    }
  },
  footer: () => {
    const nav = []
    for (let i = 0; i < 5; ++i) {
      nav.push({
        text: 'Social - ' + i,
        icon: 'home',
        url: 'http://facebook/prova'
      })
    }

    return {
      bgColor: 'blue-grey darken-4',
      nav: nav,
      copyright: '2022 - CalendarFE',
      note: 'lorem ipsum'
    }
  },
  entities: () => {
    const list = []
    let i
    i = 1
    for (i; i < 6; ++i) {
      const entity = new Entity({
        id: 123 + i,
        selected: false,
        calendar: {
          entity_id: i,
          id: i,
          day: i < 6 ? i : '1',
          status_code: 1,
          date_start: '2021-12-15',
          date_end: '2021-12-15',
          time_start: '10:00',
          time_end: '12:00'
        },
        content: {
          entity_id: i,
          id: i,
          slug: 'prodotto-' + i,
          name: 'Prodotto - ' + i,
          description: 'Descrizione - ' + i,
          short_description: 'Breve descrizione - ' + i,
          excerpt: 'Riassunto - ' + i,
          note: 'Note - ' + i,
          lang: 'it'
        },
        ecommerce: {
          entity_id: i,
          id: i,
          price_original: Number(i + '0.00'),
          price_reduction: '-' + i + '0.00 %',
          price_current: i + '0.00',
          tax_included: true,
          tax: '1.2' + i,
          min_spent: 0,
          min_person: 1,
          min_time: 0,
          expired_time: '23:59',
          currency: '€',
          unit: 'd',
          lang: 'it'
        },
        groups: [
          {
            id: i,
            name: 'Nome del gruppo - ' + i,
            lang: 'it',
            attributes: [
              {
                id: i,
                name: 'Nome attributo - ' + i,
                values: [
                  {
                    value: 'Valore attributo 1',
                    unit: 'd',
                    type: 'TEXT',
                    currency: null
                  },
                  {
                    value: 'Valore attributo 2',
                    unit: 'd',
                    type: 'TEXT',
                    currency: null
                  },
                  {
                    value: 'Valore attributo 3',
                    unit: 'd',
                    type: 'TEXT',
                    currency: null
                  }
                ]
              }
            ]
          },
          {
            id: i,
            name: 'Nome del gruppo - ' + i,
            lang: 'it',
            attributes: [
              {
                id: i,
                name: 'Nome attributo - ' + i,
                values: [
                  {
                    value: 'Valore attributo',
                    unit: 'd',
                    type: 'TEXT',
                    currency: null
                  }
                ]
              }
            ]
          }
        ],
        media: [
          {
            entity_id: i,
            id: i,
            name: 'Nome - ' + i,
            alternative_name: 'Altro nome - ' + i,
            type: 'image/jpeg',
            url: 'uploads/img-' + (i > 7 ? 1 : i) + '.jpg',
            lang: 'it'
          },
          {
            entity_id: i,
            id: i,
            name: 'Nome - ' + i,
            alternative_name: 'Altro nome - ' + i,
            type: 'image/jpeg',
            url: 'uploads/img-' + (i > 7 ? 1 : (i + 1)) + '.jpg',
            lang: 'it'
          }
        ],
        notices: [
          {
            calendar: {
              entity_id: i,
              id: i,
              day: i < 6 ? i : '1',
              status_code: 1,
              date_start: '2021-12-15',
              date_end: '2021-12-15',
              time_start: '10:00',
              time_end: '12:00'
            },
            content: {
              entity_id: i,
              id: i,
              slug: 'avviso -' + i,
              name: 'Avviso - ' + i,
              description: 'Descrizione - ' + i,
              short_description: 'Breve descrizione - ' + i,
              excerpt: 'Riassunto - ' + i,
              note: 'Note - ' + i,
              lang: 'it'
            }
          }
        ],
        resources: [
          {
            entity_id: i,
            id: i,
            name: 'Nome - ' + i,
            alternative_name: 'Altro nome - ' + i,
            url: 'http://localhost/' + i,
            lang: 'it'
          }
        ],
        services: [
          {
            calendar: {
              entity_id: i,
              id: i,
              day: i < 6 ? i : '1',
              status_code: 1,
              date_start: '2021-12-15',
              date_end: '2021-12-15',
              time_start: '10:00',
              time_end: '12:00'
            },
            content: {
              entity_id: i,
              id: i,
              slug: 'services-' + i,
              name: 'services - ' + i,
              description: 'Descrizione - ' + i,
              short_description: 'Breve descrizione - ' + i,
              excerpt: 'Riassunto - ' + i,
              note: 'Note - ' + i,
              lang: 'it'
            },
            ecommerce: {
              entity_id: i,
              id: i,
              price_original: Number(i + '0.00'),
              price_reduction: '-' + i + '0.00 %',
              price_current: i + '0.00',
              tax_included: true,
              tax: '1.2' + i,
              min_spent: 0,
              min_person: 1,
              min_time: 0,
              expired_time: '23:59',
              currency: '€',
              unit: 'd',
              lang: 'it'
            },
            notices: [
              {
                calendar: {
                  entity_id: i,
                  id: i,
                  day: i < 6 ? i : '1',
                  status_code: 1,
                  date_start: '2021-12-15',
                  date_end: '2021-12-15',
                  time_start: '10:00',
                  time_end: '12:00'
                },
                content: {
                  entity_id: i,
                  id: i,
                  slug: 'avviso -' + i,
                  name: 'Avviso - ' + i,
                  description: 'Descrizione - ' + i,
                  short_description: 'Breve descrizione - ' + i,
                  excerpt: 'Riassunto - ' + i,
                  note: 'Note - ' + i,
                  lang: 'it'
                }
              }
            ],
            resources: [
              {
                entity_id: i,
                id: i,
                name: 'Nome - ' + i,
                alternative_name: 'Altro nome - ' + i,
                url: 'http://localhost/' + i,
                lang: 'it'
              }
            ]
          },
          {
            calendar: {
              entity_id: i,
              id: i,
              day: i < 6 ? i : '1',
              status_code: 1,
              date_start: '2021-12-15',
              date_end: '2021-12-15',
              time_start: '10:00',
              time_end: '12:00'
            },
            content: {
              entity_id: i,
              id: i,
              slug: 'services-' + i,
              name: 'services - ' + i,
              description: 'Descrizione - ' + i,
              short_description: 'Breve descrizione - ' + i,
              excerpt: 'Riassunto - ' + i,
              note: 'Note - ' + i,
              lang: 'it'
            },
            ecommerce: {
              entity_id: i,
              id: i,
              price_original: Number(i + '0.00'),
              price_reduction: '-' + i + '0.00 %',
              price_current: i + '0.00',
              tax_included: true,
              tax: '1.2' + i,
              min_spent: 0,
              min_person: 1,
              min_time: 0,
              expired_time: '23:59',
              currency: '€',
              unit: 'd',
              lang: 'it'
            },
            notices: [
              {
                calendar: {
                  entity_id: i,
                  id: i,
                  day: i < 6 ? i : '1',
                  status_code: 1,
                  date_start: '2021-12-15',
                  date_end: '2021-12-15',
                  time_start: '10:00',
                  time_end: '12:00'
                },
                content: {
                  entity_id: i,
                  id: i,
                  slug: 'avviso -' + i,
                  name: 'Avviso - ' + i,
                  description: 'Descrizione - ' + i,
                  short_description: 'Breve descrizione - ' + i,
                  excerpt: 'Riassunto - ' + i,
                  note: 'Note - ' + i,
                  lang: 'it'
                }
              }
            ],
            resources: [
              {
                entity_id: i,
                id: i,
                name: 'Nome - ' + i,
                alternative_name: 'Altro nome - ' + i,
                url: 'http://localhost/' + i,
                lang: 'it'
              }
            ]
          },
          {
            calendar: {
              entity_id: i,
              id: i,
              day: i < 6 ? i : '1',
              status_code: 1,
              date_start: '2021-12-15',
              date_end: '2021-12-15',
              time_start: '10:00',
              time_end: '12:00'
            },
            content: {
              entity_id: i,
              id: i,
              slug: 'services-' + i,
              name: 'services - ' + i,
              description: 'Descrizione - ' + i,
              short_description: 'Breve descrizione - ' + i,
              excerpt: 'Riassunto - ' + i,
              note: 'Note - ' + i,
              lang: 'it'
            },
            ecommerce: {
              entity_id: i,
              id: i,
              price_original: Number(i + '0.00'),
              price_reduction: '-' + i + '0.00 %',
              price_current: i + '0.00',
              tax_included: true,
              tax: '1.2' + i,
              min_spent: 0,
              min_person: 1,
              min_time: 0,
              expired_time: '23:59',
              currency: '€',
              unit: 'd',
              lang: 'it'
            },
            notices: [
              {
                calendar: {
                  entity_id: i,
                  id: i,
                  day: i < 6 ? i : '1',
                  status_code: 1,
                  date_start: '2021-12-15',
                  date_end: '2021-12-15',
                  time_start: '10:00',
                  time_end: '12:00'
                },
                content: {
                  entity_id: i,
                  id: i,
                  slug: 'avviso -' + i,
                  name: 'Avviso - ' + i,
                  description: 'Descrizione - ' + i,
                  short_description: 'Breve descrizione - ' + i,
                  excerpt: 'Riassunto - ' + i,
                  note: 'Note - ' + i,
                  lang: 'it'
                }
              }
            ],
            resources: [
              {
                entity_id: i,
                id: i,
                name: 'Nome - ' + i,
                alternative_name: 'Altro nome - ' + i,
                url: 'http://localhost/' + i,
                lang: 'it'
              }
            ]
          }
        ],
        tags: [
          {
            entity_id: i,
            id: i,
            name: 'tag - ' + i,
            lang: 'it',
            icon: 'edit'
          }
        ]
      })
      list.push(entity)
    }
    return list
  }
}

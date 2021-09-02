import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Page from '@/components/Page'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Calendar
    },
    {
      path: '/:lang',
      component: Calendar
    },
    {
      path: '/:lang/:slug',
      component: Page
    },
    {
      path: '*',
      component: NotFound,
      name: 'notFound'
    }
  ]
})

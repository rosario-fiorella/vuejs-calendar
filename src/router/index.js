import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/calendar/Calendar.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: Calendar,
      name: 'Calendar'
    }
  ]
})

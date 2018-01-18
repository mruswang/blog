import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ziList from '@/components/zi-list'
import ziInterest from '@/components/zi-interest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/zi-list',
      name: 'ziList',
      component: ziList
    },
    {
      path: '/zi-interest',
      name: 'ziInterest',
      component: ziInterest
    }
  ]
})

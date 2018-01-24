import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import imgList from '@/components/img-list'
import imgCategory from '@/components/img-category'
import imgAdd from '@/components/img-add'
import adminAdd from '@/components/admin-add'
import adminList from '@/components/admin-list'
import adminPass from '@/components/admin-pass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/img-list',
      name: 'imgList',
      component: imgList
    },
    {
      path: '/img-category',
      name: 'imgCategory',
      component: imgCategory
    },
    {
      path: '/img-add/:id',
      name: 'imgAdd',
      component: imgAdd
    },
    {
      path: '/admin-list',
      name: 'adminList',
      component: adminList
    },
    {
      path: '/admin-pass',
      name: 'adminPass',
      component: adminPass
    },
    {
      path: '/admin-add/:id',
      name: 'adminAdd',
      component: adminAdd
    }
  ]
})

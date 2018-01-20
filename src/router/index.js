import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import imgList from '@/components/img-list'
import imgCategory from '@/components/img-category'
import imgAdd from '@/components/img-add'

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
      path: '/img-add',
      name: 'imgAdd',
      component: imgAdd
    }
  ]
})

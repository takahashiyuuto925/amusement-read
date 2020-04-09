import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/bookmall'
  },
  {
    path: '/ebook',
    name: 'Ebook',
    component: () => import('../views/ebook'),
    children: [
      {
        path: ':fileName',
        component: () => import('../components/ebook/EbookReader')
      }
    ]
  },
  {
    path: '/bookmall',
    name: 'Bookmall',
    component: () => import('../views/bookmall/index'),
    redirect: '/bookmall/shelf',
    children: [
      {
        path: 'home',
        component: () => import('../views/bookmall/bookmallHome')
      },
      {
        path: 'shelf',
        component: () => import('../views/bookmall/BookmallShelf')
      },
      {
        path: 'category',
        component: () => import('../views/bookmall/BookmallCategory')
      },
      {
        path: 'list',
        component: () => import('../views/bookmall/BookmallList')
      },
      {
        path: 'detail',
        component: () => import('../views/bookmall/BookmallDetail')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

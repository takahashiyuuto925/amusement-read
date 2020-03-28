import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ebook'
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
  }
]

const router = new VueRouter({
  routes
})

export default router

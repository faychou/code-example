import { createRouter, createWebHistory } from 'vue-router'
import WaterfallColumnView from '../views/WaterfallColumnView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'waterfallColumn',
      component: WaterfallColumnView
    },
    {
      path: '/waterfallFlex',
      name: 'waterfallFlex',
      component: () => import('../views/WaterfallFlexView.vue')
    },
    {
      path: '/waterfallGrid',
      name: 'waterfallGrid',
      component: () => import('../views/WaterfallGridView.vue')
    },
    {
      path: '/waterfallJs',
      name: 'waterfallJs',
      component: () => import('../views/WaterfallJsView.vue')
    }
  ]
})

export default router

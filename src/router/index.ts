import BackView from '@/views/BackView.vue'
import FrontView from '@/views/FrontView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/front',
      name: 'front',
      component: FrontView,
    },
    {
      path: '/back',
      name: 'back',
      component: BackView,
    },
  ],
})

export default router

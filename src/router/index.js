import { createRouter, createWebHistory } from 'vue-router';
import ReservationForm from '@/views/ReservationForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ReservationForm,
    },
    {
      path: '/reservations',
      name: 'Reservations',
      component: () => import('@/views/ReservationList.vue'),
    },
  ],
});

export default router;

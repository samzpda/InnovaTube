import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import MyFavoritos from '../components/Favoritos.vue';
import login from '../components/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Favoritos',
    name: 'MyFavorites',
    component: MyFavoritos
  },
  {
    path: '/Login',
    name: 'LoginAuth',
    component: login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

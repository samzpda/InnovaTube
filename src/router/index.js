import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import MyFavoritos from '../components/Favoritos.vue';
import login from '../components/Login.vue';
import register from '../components/Register.vue';

// rutas para componentes

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
  },
  {
    path: '/Register',
    name: 'RegisterAuth',
    component: register
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

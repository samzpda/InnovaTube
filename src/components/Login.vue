<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="loginUser">Login</button>
  </div>
</template>

<script>
import { login } from '../utils/firebase.js';

export default {
    name: 'LoginAuth',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        await login(this.email, this.password);
        alert('User logged in successfully!');
      } catch (error) {
        alert('Error logging in user: ' + error.message);
      }
    }
  }
};
</script>
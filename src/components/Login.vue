<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Formulario de Login</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="loginUser">
          <!-- Correo Electrónico -->
          <div class="mb-3">
            <label for="correo" class="form-label">Correo Electrónico</label>
            <input type="email" class="form-control" v-model="correo" placeholder="Correo Electrónico" required>
          </div>
          <!-- Contraseña -->
          <div class="mb-3">
            <label for="contrasena" class="form-label">Contraseña</label>
            <input type="password" class="form-control" v-model="contrasena" placeholder="Contraseña" required>
          </div>
          <!-- Botón de Login -->
          <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  </div>
  <Router-Link to="/Register" href="#">Registrarse</Router-Link>
</template>

<script>
import { auth } from '../api/firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'LoginAuth',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    async loginUser() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.correo, this.contrasena);
        const user = userCredential.user;
        console.log('Usuario logueado:', user);
        alert('Usuario logueado correctamente');
        // Puedes redirigir al usuario a otra página después del inicio de sesión exitoso
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión: ' + error.message);
      }
    }
  }
};
</script>
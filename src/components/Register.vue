<template>
    <div class="container mt-5">
    <h1 class="text-center mb-4">Formulario de Registro</h1>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="registerUser">
          <!-- Nombre y Apellido -->
          <div class="mb-3">
            <label for="nombreApellido" class="form-label">Nombre y Apellido</label>
            <input type="text" class="form-control" v-model="nombreApellido" placeholder="Nombre y Apellido" required>
          </div>
          <!-- Nombre de Usuario -->
          <div class="mb-3">
            <label for="nombreUsuario" class="form-label">Nombre de Usuario</label>
            <input type="text" class="form-control" v-model="nombreUsuario" placeholder="Nombre de Usuario" required>
          </div>
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
          <!-- Confirmación de Contraseña -->
          <div class="mb-3">
            <label for="confirmacionContrasena" class="form-label">Confirmación de Contraseña</label>
            <input type="password" class="form-control" v-model="confirmacionContrasena" placeholder="Confirmación de Contraseña" required>
          </div>
          <!-- Botón de Registro -->
          <button type="submit" class="btn btn-primary">Registrarse</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>



    import { auth } from '../api/firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'RegisterAuth',
  data() {
    return {
      nombreApellido: '',
      nombreUsuario: '',
      correo: '',
      contrasena: '',
      confirmacionContrasena: ''
    };
  },
  methods: {
    async registerUser() {
      if (this.contrasena !== this.confirmacionContrasena) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.correo, this.contrasena);
        const user = userCredential.user;
        console.log('Usuario registrado:', user);
        alert('Usuario registrado correctamente');
        // Puedes redirigir al usuario a otra página o hacer otras acciones después del registro exitoso
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario: ' + error.message);
      }
    }
  }
};

    //const SignInWithGoogle = () => {}

</script>
<template>
  <section class="vh-100">
    <div class="container pt-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 ">
          <div class="card shadow-2-strong " style="border-radius: 1rem;">
            <div class="card-body p-5 text-center ">
  
              <h3 class="mb-5">Registrate</h3>
  
              <div data-mdb-input-init class="form-outline mb-4">
                <input v-model="nombreApellido" type="text" class="form-control form-control-lg" />
                <label class="form-label" for="typeEmailX-2">Nombre y Apellido</label>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input v-model="nombreUsuario" type="text" class="form-control form-control-lg" />
                <label class="form-label" for="typeEmailX-2">Usuario</label>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input v-model="correo" type="email" id="typeEmailX-2" class="form-control form-control-lg" />
                <label class="form-label" for="typeEmailX-2">Correo</label>
              </div>
  
              <div data-mdb-input-init class="form-outline mb-4">
                <input v-model="contrasena" type="password" id="typePasswordX-2" class="form-control form-control-lg" />
                <label class="form-label" for="typePasswordX-2">Contraseña</label>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <input v-model="confirmacionContrasena" type="password" id="typePasswordX-2" class="form-control form-control-lg" />
                <label class="form-label" for="typePasswordX-2">Contraseña</label>
              </div>
              
              
                <button @click="registerUser" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" type="submit">Registrar</button>
              
              

              <div class="pt-3">
                <p class="mb-0">¿Ya tienes cuenta? <router-link to="/Login" class="text-black-50 fw-bold">Inicia sesión</router-link></p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth, database } from '../api/firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push } from 'firebase/database';
import { useRouter } from 'vue-router';

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
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  methods: {
    async registerUser() {
      if (this.contrasena !== this.confirmacionContrasena) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      
      try {
        // Registra al usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, this.correo, this.contrasena);
        const user = userCredential.user;
        console.log('Usuario registrado en Firebase Authentication:', user);

        
        
        const newUserInfo = {
          nombreApellido: this.nombreApellido,
          nombreUsuario: this.nombreUsuario,
          correo: this.correo
          // Otros campos que desees agregar
        };
        await push(ref(database, 'users'), newUserInfo);

        console.log('Usuario registrado en Realtime Database:', newUserInfo);
        alert('Usuario registrado correctamente');
        this.router.push('/Login');
        
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario: ' + error.message);
      }
    }
  }
};

</script>
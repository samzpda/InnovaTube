<template>
  <section class="vh-100">
    <div class="container pt-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5 ">
          <div class="card shadow-2-strong " style="border-radius: 1rem;">
            <div class="card-body p-5 text-center ">
  
              <h3 class="mb-5">Sign in</h3>
  
              <div data-mdb-input-init class="form-outline mb-4">
                <input v-model="email" type="email" id="typeEmailX-2" class="form-control form-control-lg" />
                <label class="form-label" for="typeEmailX-2">Email</label>
              </div>
  
              <div data-mdb-input-init class="form-outline mb-4">
                <input v-model="password" type="password" id="typePasswordX-2" class="form-control form-control-lg" />
                <label class="form-label" for="typePasswordX-2">Password</label>
              </div>
  
              <button @click="loginUser" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" type="submit">Login</button>

              <div class="pt-3">
              <p class="mb-0">¿No tienes cuenta?<Router-Link to="/Register" class="text-black-50 fw-bold"> Registrate</Router-Link>
              </p>
            </div>

  
              <hr class="my-4">
              
              <button @click="loginWithGoogle" data-mdb-button-init data-mdb-ripple-init class="btn btn-lg btn-block btn-primary" style="background-color: #dd4b39;">
                <i class="fab fa-google me-2"></i> Inicia sesion con Google
              </button>
              
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </template>
  
  <script>

  import { auth } from '../api/firebase.js';
  import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { useRouter } from 'vue-router';
  
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
    setup() {
    const router = useRouter();
    return {
      router
    };
  },
    methods: {
      async loginUser() {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
          console.log('Usuario logueado:', user);
          alert('Usuario logueado correctamente');
          this.router.push('/');
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión: ' + error.message);
        }
      },
      async loginWithGoogle() {
        try {
          const provider = new GoogleAuthProvider();
          const userCredential = await signInWithPopup(auth, provider);
          const user = userCredential.user;
          console.log('Usuario logueado con Google:', user);
          alert('Usuario logueado correctamente con Google');
          this.router.push('/');
        } catch (error) {
          console.error('Error al iniciar sesión con Google:', error);
          alert('Error al iniciar sesión con Google: ' + error.message);
        }
      }
    }
  };
  </script>
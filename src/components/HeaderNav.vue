<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">InnovaTube</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Router-Link to="/" class="nav-link active" aria-current="page" >Inicio</Router-Link>
        </li>
        <li class="nav-item">
          <Router-Link to="/favoritos" class="nav-link active" aria-current="page" >favoritos</Router-Link>
        </li>
      </ul>
      
        
          <div v-if="user">
            <p>Bienvenido, {{ maskedEmail }}</p>
            <button class="Logout" @click="logout">Cerrar Sesión</button>
          </div>
          <div v-else>
            <Router-Link to="/Login" class="login-button" href="#">Iniciar sesion</Router-Link>
            
            <span class="navbar-togger-icon"></span>
      
          </div>
    </div>
  </div>
</nav>
</template>

<script>
import { auth } from '../api/firebase.js';
import youtubeApi from '../api/youtube';

export default {
  name: 'HeaderNav',
  data() {
    return {
      user: null,
      email: '',
      password: '',
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    //          Api de youtube
    async searchVideos() {
      try {
        const response = await youtubeApi.get('/search', {
          params: {
            q: this.query
          }
        });
        this.videos = response.data.items;
      } catch (error) {
        console.error('Error fetching videos', error);
      }
    },
    //             Firebase Auth
    async login() {
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
    computed: {
    maskedEmail() {
      if (this.user && this.user.email) {
        const email = this.user.email;
        const [userPart, domainPart] = email.split('@');
        const maskedUserPart = userPart.slice(0, 2) + '****' + userPart.slice(-1);
        const maskedDomainPart = domainPart.slice(0, 1) + '****' + domainPart.slice(-4);
        return maskedUserPart + '@' + maskedDomainPart;
      }
      return '';
    },
  },
    async logout() {
      try {
        await auth.signOut();
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    },
  },
};

</script>

<style lang="scss" scoper>
    $color1: #141827;
    $color2: #62455b;
    $color3: #736681;
    $color4: #c1d9d0;
    $color5: #fffae3;


.login-button{
    background-color: $color1;
    color: #fff;
    font-size: 14px;
    padding: 8px 20px;
    border-radius: 60px;
    text-decoration: none;
    transition: 0.3s background-color;
}

.Logout{
    background-color: $color1;
    color: #fff;
    font-size: 14px;
    padding: 8px 30px;
    border-radius: 60px;
    text-decoration: none;
    transition: 0.3s background-color;
}
</style>
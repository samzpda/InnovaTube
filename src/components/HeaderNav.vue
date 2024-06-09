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
      <form class="d-flex justify-content-center w-100" role="search">
        <div class="container-fluid">
    <div class="d-flex justify-content-center w-100">
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscador" aria-label="Search" v-model="query" @keyup.enter="searchVideos">
        <button @click="searchVideos" class="btn btn-outline-success" >Buscar</button>
      </form>
    </div>
  </div>
      </form>
      <a href="#" class="login-button">Iniciar sesion</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-togger-icon"></span>
      </button>
    </div>
  </div>
</nav>
</template>

<script>
  export default{
    name: 'HeaderNav'
  }
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
</style>
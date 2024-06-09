<template>
  <h1>Innovatube</h1>
</template>

<script>
import { onMounted } from "vue";


export default{
  name: "App",
  setup(){

    onMounted(()=>{
    console.log("Firebase");
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

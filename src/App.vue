<template>
  <div class="app">
    <div class="app-container">
      <div class="content">
        <Header />
        <transition
          mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      >
      <router-view />
      </transition>
      </div>
  </div>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";

export default {
  name: "App",
  components: {
    Header
  },
};
</script>

<style>
/*   .loading {
    z-index: 10;
    background-color: rgba(0,0, 0, 0.35);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    padding-top: 20%;
    position: fixed;

  } */
  .loading {
    font-size:2rem;
    color: red;
    font-weight: bold;
    height: 100vh;
    text-align: center;
  }

  .loading::after {
    content: '\2026';
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    animation: dots steps(4, end) 1.2s, infinite;
    width: 0px;
  }
   @keyframes dots {
     to{ 
       width: 3rem;
     }
   }
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color :#3d5a80;
  width: 100%;
  height: 100% auto;
  min-height: 100%;
  position: absolute;
  top:0;
  right: 0;
  bottom: 0 auto;
  left: 0;
  display: block;
  text-decoration: none;
}
.app-container{
  background-color: whitesmoke;
  padding: 3rem auto;
  margin: 4rem;
  border-radius: 25px;
  box-shadow: 0 0 1.8rem 0.5rem #1a2530;
  display: flex;
  justify-content: center;
  align-items: stretch;
}
.content{
  margin:1rem;
}
template{
  width:100%;
  height: 100%;
}

button{
  border-radius: 25px;
  border-color: #ee6c4d;
  background-color: #ee6c4d;
  padding: 10px;
  margin: 15px;
  width: 10rem;
  color: whitesmoke;
}
</style>

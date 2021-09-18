<template>
  <div id="app">
    <Header />
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <router-view />
    </transition>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

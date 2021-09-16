<template>
  <div id="app">
    <Header />
    <router-view></router-view>
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
  .loading {
    z-index: 10;
    background-color: rgba(0,0, 0, 0.35);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    padding-top: 20%;
    position: absolute;
    text-align: center;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="header">
    <h1 id="title">Trivia Game!</h1>
    <ul>
      <li><router-link to="/start">Link</router-link></li>
      <li><router-link to="/questions">Link</router-link></li>
      <li><router-link to="/result">Link</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  background-color: pink;
  margin: 0;
  top: 0;
  width: 100%;
  position: absolute;
}
#title {
  color: red;
}
li {
  list-style: none;
}
</style>

<template>
  <div>
    <Username />
  </div>
</template>

<script>
import Username from "./Username.vue"

export default {
  name: "Start",
  components: {
    Username
  }
};
</script>

<style scoped>
  #hello_world {
    color: red;
  }
</style>
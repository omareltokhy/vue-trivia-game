<template>
  <div>
    <strong>Enter username:</strong>
    <Username />
    <Settings />
  </div>
</template>

<script>
import Username from "./Username.vue"
import Settings from "./Settings.vue"

export default {
  name: "Start",
  components: {
    Username,
    Settings
  }
};
</script>

<style scoped>
  #hello_world {
    color: red;
  }
</style>
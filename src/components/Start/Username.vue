<template>
  <div>
    <input id="username" type="Insert username">
  </div>
</template>

<script>
export default {
  name: "Username",
  components: {
  },
  async created() {
  },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style scoped>
  #username {
    border-color: red;
  }
  #username:focus {
      border-color: black;
  }
</style>
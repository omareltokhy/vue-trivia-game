<template>
  <div>
    <h4>Enter username</h4>
    <input @input="onUsernameChange" id="username" type="text" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "Username",
  methods: {
    ...mapMutations(['setUsername']),
    // Updating the username to the store
    onUsernameChange(event) {
      this.setUsername(event.target.value.trim())
    },
  },
};
</script>

<style scoped>
  #username {
    border-color: #ee6c4d;
  }
  #username:focus {
      border-color: black;
  }
</style>
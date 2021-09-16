<template>
  <div>
    <h4>Enter username</h4>
    <input @input="onUsernameChange" id="username" type="text" />
    <button @click="getUserBtn">Get user info</button>
    <button @click="addUserBtn">Add user</button>
    <button @click="highScoreBtn">High Score</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "Username",
  methods: {
    ...mapActions(['getUser', 'addUser', 'updateHighScore']),
    ...mapMutations(['setUsername']),
    async getUserBtn() {
      this.getUser()
    },
    async addUserBtn() {
      this.addUser()
    },
    onUsernameChange(event) {
      this.setUsername(event.target.value.trim())
    },
    async highScoreBtn() {
      this.updateHighScore()
    }
  }
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
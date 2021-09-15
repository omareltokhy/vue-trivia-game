<template>
  <div>
    <p v-if="isLoading">Fetching users...</p>
    <h4>Enter username</h4>
    <input id="username" type="text" v-model="username" />
    <button @click="getUser">Get user info</button>
    <button @click="addUser">Add user</button>
    <p>Your high score is {{highscore}}, hope you get better score this thime</p>
  </div>
</template>

<script>
import { fetchUserByUsername, addUser } from "@/api/usersAPI";

export default {
  name: "Username",
  components: {
  },
  methods: {
    async getUser() {
      let username = this.username
      const [error, user] = await fetchUserByUsername(username)
      this.error = error;
      this.user = user;
      this.isLoading = false
      this.highscore = user[0].highScore;
    },
    async addUser() {
      let username = this.username
      const [error, message] = await addUser(username)
      this.error = error
      console.log(message)
    }
  },
  data() {
    return {
      isLoading: true,
      error: '',
      user: null,
      username: '',
      highscore: 0
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
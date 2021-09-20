<template>
  <div v-click-outside="startTrivia" class="trivia-start">
    <div class="loading" v-if="this.isLoading">Loading</div>
    <Username />
    <Settings />
    <button class="start" @click="startTrivia">START TRIVIA</button>
  </div>
</template>

<script>
import Username from "./Username.vue"
import Settings from "./Settings.vue"
import store from "@/store/store"
import ClickOutside from 'vue-click-outside'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Start",
  components: {
    Username,
    Settings
  },
  data() {
    return {
      isLoading: false,
    };
  },
  directives: {
    ClickOutside
  },
  computed: {
    ...mapGetters(['userFound'])
  },
  methods: {
    ...mapActions(['getUser', 'addUser', 'getQuestions']),
    // Starting new trivia with users settings
    async startTrivia() {
      this.isLoading = true
      try {
        // Try to find the user from the API
        await this.getUser()
        // If the user is not in the API, new user will be added
        if(store.getters.userFound === "") {
          this.addUser()
        }
        // Getting new questions from the API based on the users choises
        await this.getQuestions();
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
      this.$router.push('/questions')
    }
  }
};
</script>

<style scoped>
.trivia-start {
  margin-top: 30px;
}
.start{
  font-weight:900;
}
</style>
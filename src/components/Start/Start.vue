<template>
  <div class="trivia-start">
    <div class="loading" v-if="this.isLoading"> <img src="@/assets/loading.gif" alt=""> </div>
    <Username />
    <Settings />
    <button @click="startTrivia">Start Trivia!</button>
  </div>
</template>

<script>
import Username from "./Username.vue"
import Settings from "./Settings.vue"
import store from "@/store/store"
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
  computed: {
    ...mapGetters(['userFound'])
  },
  methods: {
    ...mapActions(['getUser', 'addUser', 'getQuestions']),
    async startTrivia() {
      this.isLoading = true
      try {
        await this.getUser()
        // If the user is not in the API, new user will be added
        if(store.getters.userFound === "") {
          this.addUser()
        }
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
  margin-top: 300px;
}
</style>
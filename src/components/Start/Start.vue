<template>
  <div>
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
  computed: {
    ...mapGetters(['userFound'])
  },
  methods: {
    ...mapActions(['getUser', 'addUser', 'getQuestions']),
    async startTrivia() {
      try {
        await this.getUser()
        // If the user is not in the API, new user will be added
        if(store.getters.userFound === "") {
          this.addUser()
        }
        await this.getQuestions();
      } catch (error) {
        console.log(error)
      }
      this.$router.push('/questions')
    }
  }
};
</script>

<style scoped>

</style>
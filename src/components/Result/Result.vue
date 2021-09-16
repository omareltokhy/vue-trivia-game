<template>
  <div>
    <meta charset="UTF-8">
    <h1>Results</h1>

    <p>Your score: <strong>{{score}}</strong></p>
    <p>Previous high score: <strong>{{highScore}}</strong></p>

    <button @click="onStart">Back to start</button>
    <button @click="onReplay">Replay</button>

    <div>
      <ul>
      <li
        v-for="question in questions"
        :value="question.name"
        :key="question.id"
      >
        <strong v-html="question.question"></strong>
        <p v-html="question.correct_answer"></p>
        <span v-if="question.correct_answer == question.user_answer"> Correct! +10</span>
      </li>
    </ul>
    </div>
    
    

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Result",
  async created() {

    this.isLoading = false;
  },
  computed: {
    ...mapState(["username", "score", "highScore", "highScore", "questions"]),
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(["getQuestions"]),
    ...mapMutations([
      "setSelectedCategoryId",
      "setSelectedQuestionsAmount",
      "setSelectedDifficulty",
      "setQuestionsError"
    ]),
    onStart(){
      this.$router.push('/start')
    },
    async onReplay() {
      //1. Fetch new questions
      try {
        await this.getQuestions();
      } catch (error) {
        this.setQuestionsError(error.message)
      }
      //2. Settings already in store?
      //3. Route to questions page
      this.$router.push('/questions')
    },
  },
};
</script>

<style scoped>
  li {
    list-style: none;
  }
</style>
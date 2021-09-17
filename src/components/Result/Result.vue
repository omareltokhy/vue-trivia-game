<template>
  <div>
    <meta charset="UTF-8">
    <h2>Results</h2>

    <div class="loading" v-if="this.isLoading"><img src="@/assets/loading.gif" alt=""></div>

    <p id="new_highscore" v-if="score > highScore">New highscore!</p>
    <p>Your score: <span class="score">{{score}}</span></p>
    <p>Previous high score: <span class="score">{{previousHighscore}}</span></p>

    <button @click="onStart">Back to start</button>
    <button @click="onReplay">Replay</button>

    <div>
      <h3>Questions</h3>
      <ul>
      <li
        v-for="question in questions"
        :value="question.name"
        :key="question.id"
      >
        <strong v-html="question.question"></strong>
        <p>Your answer: <span v-html="question.user_answer"></span></p>

        <span v-if="question.correct_answer == question.user_answer"> Correct! +10</span>
        <p v-else>Correct answer: {{question.correct_answer}}</p>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import store from "@/store/store";

export default {
  name: "Result",
  created() {
    this.checkHighscore()
  },
  computed: {
    ...mapState(["username", "score", "highScore", "highScore", "questions"]),
    ...mapGetters(["scoreIsNewHighscore", "getHighscore"])
  },
  data() {
    return {
      isLoading: false,
      previousHighscore: 0
    };
  },
  methods: {
    ...mapActions(["getQuestions", "updateHighScore"]),
    ...mapMutations([
      "setSelectedCategoryId",
      "setSelectedQuestionsAmount",
      "setSelectedDifficulty",
      "setQuestionsError",
      "initQuestionParams"
    ]),
    onStart(){
      this.initQuestionParams()
      this.$router.push('/start')
    },
    async onReplay() {
      this.isLoading = true;
      this.initQuestionParams()
      //Fetch new questions
      try {
        await this.getQuestions();
        this.isLoading = false;
      } catch (error) {
        this.setQuestionsError(error.message)
        this.isLoading = false;
      }
      this.$router.push('/questions')
    },
    checkHighscore(){
      this.previousHighscore = store.getters.getHighscore
      if(store.getters.scoreIsNewHighscore) this.updateHighScore()
    }
  },
};
</script>

<style scoped>

  li {
    list-style: none;
  }
  #new_highscore {
    color: green;
    font-size: 20px;
    font-weight: bold;
  }
  .score {
    font-weight: bold;
  }
</style>
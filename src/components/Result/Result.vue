<template>
  <div>
    <div class="loading" v-if="this.isLoading">Loading</div>
    <h2>Results</h2>
    <p id="new_highscore" class="animate__animated animate__heartBeat" v-if="score > previousHighscore">New highscore!</p>
    <p>Your score: <span class="score">{{score}}</span></p>
    <p>Previous high score: <span class="score">{{previousHighscore}}</span></p>

    <button class= "resultPageButton" @click="onStart">Back to start</button>
    <button class= "resultPageButton" @click="onReplay">Replay</button>

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
        <span v-else>Correct answer: <span v-html="question.correct_answer"></span></span>
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
    // If user wants to go back to start screen
    onStart(){
      this.initQuestionParams()
      this.$router.push('/start')
    },
    // If user wants to play trivia again with the same settings
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
    // Checking if the score is better than user's previous high score
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
  .resultPageButton{
    font-weight:700;
  }
  h2, h3{
    font-weight: 900;
  }
 li{
    border: 3px solid #3d5a80;
    border-radius: 25px;
    margin: 10px;
    padding: 10px;
    width: 700px;
  }
</style>
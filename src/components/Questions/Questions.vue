<template>
  <div>
    <span id = "questionCount">Question {{currentQuestionIndex + 1}} / {{questions.length}} </span>
    <h2 v-html="currentQuestion.question"></h2>
    <button class = "answer" v-html="answer"
      @click="answerSelected(answer)"
      v-for="answer in currentAnswers"
      :key="answer"
    ></button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import store from "@/store/store";

export default {
  name: "Questions",
  created() {
    this.currentQuestion = this.getQuestion();
    this.currentAnswers = this.getAnswers();
  },
  data() {
    return {
      isLoading: false,
      currentQuestion: {},
      currentAnswers: [],
    };
  },
  computed: {
    ...mapGetters(["getCurrentQuestion", "getQuestions"]),
    ...mapState(["questions", "currentQuestionIndex"]),
  },
  methods: {
    ...mapMutations([
      "setNextQuestionIndex",
      "setUserAnswer",
      "setQuestionsError",
      "addUserPoints",
      "initQuestionIndex",
    ]),
    // Get current question
    getQuestion: function () {
      return store.getters.getCurrentQuestion;
    },
    // Get available answers for current question
    getAnswers: function () {
      // Return boolean types as strings for answer checking
      if (store.getters.getCurrentQuestion.type === "boolean") {
        return ["True", "False"];
      }
      // Combine correct & incorrect answers in same array
      let answers = store.getters.getCurrentQuestion.incorrect_answers;
      answers.push(store.getters.getCurrentQuestion.correct_answer);

      // Randomize order of answers
      let shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());
      return shuffledAnswers;
    },
    // Set chosen answer for current question, and go to next question
    answerSelected: function (answer) {
      this.setUserAnswer(answer);
      if (answer === store.getters.getCurrentQuestion.correct_answer)
        this.addUserPoints(10);
      this.goToNextQuestion();
    },
    goToNextQuestion() {
      // If no next question, go to result page
      if (this.questions.length === (this.currentQuestionIndex + 1)){
        this.initQuestionIndex()
        this.$router.push("/result");
      }        
      else {
        // If questions left, add index and get next question & answer
        this.setNextQuestionIndex();
        this.currentQuestion = this.getQuestion();
        this.currentAnswers = this.getAnswers();
      }
    },
    getCurrentQuestionCount() {
      return this.currentQuestionIndex;
    },
  },
};
</script>

<style scoped>
.answer{
  width: 80%;
  font-size: 16px;
  font-weight: 900;
  margin:10px;
}
.questionCount{
  font-weight: 700;
}
</style>
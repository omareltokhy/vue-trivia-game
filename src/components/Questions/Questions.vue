<template>
  <div>
    <span>Question {{currentQuestionIndex + 1}} / {{questions.length}} </span>
    <h2 v-html="currentQuestion.question"></h2>
    <button v-html="answer"
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
    console.log(this.questions)
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
    getQuestion: function () {
      return store.getters.getCurrentQuestion;
    },
    getAnswers: function () {
      if (store.getters.getCurrentQuestion.type === "boolean") {
        return ["True", "False"];
      }
      let answers = store.getters.getCurrentQuestion.incorrect_answers;
      answers.push(store.getters.getCurrentQuestion.correct_answer);

      let shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());
      return shuffledAnswers;
    },
    answerSelected: function (answer) {
      this.setUserAnswer(answer);
      if (answer === store.getters.getCurrentQuestion.correct_answer)
        this.addUserPoints(10);
      this.goToNextQuestion();
    },
    goToNextQuestion() {
      //If no next question, go to result page
      if (this.questions.length === (this.currentQuestionIndex + 1)){
        this.initQuestionIndex()
        this.$router.push("/result");
      }        
      else {
        this.setNextQuestionIndex();
        this.currentQuestion = this.getQuestion();
        this.currentAnswers = this.getAnswers();
        console.log("this.currentQuestion: " + this.getQuestion());
        console.log("this.currentAnswers: " + this.currentAnswers);
      }
    },
    getCurrentQuestionCount() {
      return this.currentQuestionIndex;
    },
  },
};
</script>

<style scoped>
</style>
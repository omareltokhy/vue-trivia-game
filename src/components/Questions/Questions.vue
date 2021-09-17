<template>
  <div>
    <h1 v-html="currentQuestion.question"></h1>
    <button
      @click="answerSelected(answer)"
      v-for="answer in currentAnswers"
      :key="answer"
    >
      {{ answer }}
    </button>
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

    console.log("this.currentQuestion: " + this.getQuestion());
    console.log("this.currentAnswers: " + this.currentAnswers);
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
    ]),
    getQuestion: function () {
      return store.getters.getCurrentQuestion;
    },
    getAnswers: function () {
      if (store.getters.getCurrentQuestion.type === "boolean") {
        return [true, false];
      }
      let answers = store.getters.getCurrentQuestion.incorrect_answers;
      answers.push(store.getters.getCurrentQuestion.correct_answer);
      return answers;
    },
    answerSelected: function (answer) {
      this.setUserAnswer(answer);
      if (answer === store.getters.getCurrentQuestion.correct_answer)
        this.addUserPoints(10);
      this.goToNextQuestion();
    },
    goToNextQuestion() {
      this.setNextQuestionIndex();
      //If no next question, go to result page
      if (!this.questions[this.currentQuestionIndex++]) this.$router.push("/result");
      else {
        this.currentQuestion = this.getQuestion();
        this.currentAnswers = this.getAnswers();
        console.log("this.currentQuestion: " + this.getQuestion());
        console.log("this.currentAnswers: " + this.currentAnswers);
      }
    },
  },
};
</script>

<style scoped>
</style>
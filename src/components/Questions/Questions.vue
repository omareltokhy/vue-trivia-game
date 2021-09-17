<template>
  <div>
    <h1 v-html="currentQuestion.question"></h1>
    <ul>
      <li v-for="answer in currentAnswers"
          :key="answer">{{answer}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import store from "@/store/store";

export default {
  name: "Questions",
  created() {
    // this.currentQuestion = this.questions[0]
    // this.setNextQuestionIndex()
    console.log("questions: ", this.getQuestion());
    this.currentQuestion = this.getQuestion()

    this.currentAnswers = this.getAnswers()

    console.log("this.currentQuestion: " + this.getQuestion())
    console.log("this.currentAnswers: " + this.currentAnswers)
  },
  data() {
    return {
      isLoading: false,
      currentQuestion: {},
      currentAnswers: []
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
    ]),
    getQuestion: function () {
      return store.getters.getCurrentQuestion;
    },
    getAnswers: function () {
      
      if (store.getters.getCurrentQuestion.type === "boolean") {
        return [true, false];
      }
      let answers = store.getters.getCurrentQuestion.incorrect_answers
      answers.push(store.getters.getCurrentQuestion.correct_answer);
      return answers
    },
  },
};
</script>

<style scoped>
</style>
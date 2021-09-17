<template>
  <div>
    <h1 v-html="questions.question"></h1>
    <ul>
      <li>

      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import store from "@/store/store"

export default {
  name: "Questions",
  created() {
    // this.currentQuestion = this.questions[0]
    // this.setNextQuestionIndex()
    console.log("questions: ", this.getQuestion())
  },
  data() {
    return {
      isLoading: false,
      currentQuestion: {}
    };
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
    getAnswers: function() {

    }
  },
  computed: {
    ...mapState(["questions", "currentQuestionIndex"]),
    ...mapGetters(["getCurrentQuestion"]),
  },
};
</script>

<style scoped>
</style>
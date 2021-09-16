<template>
  <h1>
    {{ compQuestion }}
  </h1>
</template>

<script>
// import fetchQuestions from "@/api/questionsAPI";

export default {
  name: "Questions",
  props: {
    question: {
      type: String,
      required: true
    }
  },
  computed:{
    compQuestion(){
        return this.question;
    }
  },
  components: {

  },
  // async created() {
  //   const { error, questions } = await fetchQuestions();

  //   this.error = error;
  //   this.questions = questions;
  // },
  // data() {
  //   return {
  //     isLoading: true,
  //     error: this.error,
  //     questions: this.questions,
  //   };
  // },
};
</script>

<style scoped>

</style>
<template>
  <button @click="onAnswerClicked">
    {{ decodedAnswer }}
  </button>
</template>

<script>

export default {
    name: "Answers",
    props: {
        answer:{
            type: String,
            required: true
        }
    },
    computed: {
        compAnswer(){
            return this.answer;
        }
    }
}
</script>

<style scoped>

</style>
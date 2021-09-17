<template>
    <div>
    <h1> {{questionItem.question}}</h1>
    <button
      v-for="(answer, index) of answerOptions"
      :key="index"
      :answer="answer"
      @selected_answer="selectedAnswer"
    />
    </div>
</template>

<script>
import { Questions } from '@/Questions'
import { Answers } from '@/Answers.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    name: "QuestionsItem",
    components: {
        // eslint-disable-next-line vue/no-unused-components
        Questions,
        // eslint-disable-next-line vue/no-unused-components
        Answers
    },
    computed:{
        ...mapState(["questionItems", "selectedQuestionsAmount"]),
        numberOfQuestions(){
            return this.selectedQuestionsAmount;
        },
        id(){
            const { id } = this.$route.id;
            return id; 
        },
        questionItem(){
            return this.questionItems[this.id-1]
        },
        answerOptions(){
            if(this.questionItem.type === "boolean"){
                return [ true , false ]
            }
                let options = this.questionItem.incorrect_answers;
                options.push(this.questionItem.correct_answer);
                return options;
        }

    },
    methods:{
        selectedAnswer(answer){
            this.questionItem.selected_answer = answer;
            this.setQuestionItems(this.questionItem)
            if(this.id < this.numberOfQuestions){
                this.$router.push(`./questions/${Number(this.id)+1}`)
            }else{
                this.$router.push(`./result`)
            }
        }
    },
    ...mapMutations(["setQuestionItems"])
}
</script>

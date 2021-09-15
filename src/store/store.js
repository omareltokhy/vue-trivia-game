import Vue from 'vue';
import Vuex from 'vuex'
// import {fetchQuestionsWithSettings} from "../../api/questionsAPI"

export default new Vuex.Store({
    state: {
        loadingQuestions: true,
        questions: {},
        questionsError: '',
        username: '',
        selectedQuestionAmount: 10,
        selectedCategoryId: 0,
        selectedDifficulty: "easy",
        category_question_count: {},
    },  
    getters: {
        questionStrings: state => {
            return state.questions
        }
    },
    mutations: {
        setLoadingQuestions: (state, payload) => {
            state.loadingQuestions = payload
        },
        setQuestionsError: (state, payload) => {
            state.questionsError = payload
        },
        setQuestions: (state, payload) => {
            state.questions = payload
        },
        setUsername: (state, payload) => {
            state.username = payload
        }
    },
    actions: {
        async fetchQuestions({commit}) {
            // const questions = await 
        }
    },
})

import Vue from 'vue';
import Vuex from 'vuex'
// import {fetchQuestionsWithSettings} from "../../api/questionsAPI"

Vue.use(Vuex)

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
        SET_QUESTIONS: (state, payload) => {
            state.questions = payload
        },
        setUsername: (state, payload) => {
            state.username = payload
        }
    },
    actions: {
        async setQuestions ({commit, state}) {
            return new Promise((resolve) => {
                commit('SET_QUESTIONS', state)
                resolve()
            })
        },
        // async fetchQuestions({commit}) {
            // const questions = await 
        // }
    },
})

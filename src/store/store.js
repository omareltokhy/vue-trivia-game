import Vue from 'vue';
import Vuex from 'vuex'
import { UserAPI } from '../api/usersAPI'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: [],
        userId: '',
        username: '',
        highScore: 0,
        userError: '',
        loadingQuestions: true,
        questions: {},
        questionsError: '',
        selectedQuestionAmount: 10,
        selectedCategoryId: 0,
        selectedDifficulty: "easy",
        category_question_count: {},
    },  
    getters: {
        questionStrings: state => {
            return state.questions
        },
    },
    mutations: {
        setUser: (state, payload) => {
            state.user = payload
        },
        setUserId: (state, payload) => {
            state.userId = payload
        },
        setUsername: (state, payload) => {
            state.username = payload
        },
        setHighScore: (state, payload) => {
            state.highScore = payload
        },
        setUserError: (state, payload) => {
            state.userError = payload
        },
        setLoadingQuestions: (state, payload) => {
            state.loadingQuestions = payload
        },
        setQuestionsError: (state, payload) => {
            state.questionsError = payload
        },
        setQuestions: (state, payload) => {
            state.questions = payload
        },
    },
    actions: {
        // Getting user information from API by username
        async getUser({ commit, state }) {
            try {
                const [error, user] = await UserAPI.getUserByUsername(state.username)
                // Updating values
                commit('setUser', user)
                commit('setUserId', state.user[0].id)
                commit('setUsername', state.user[0].username)
                commit('setHighScore', state.user[0].highScore)
                commit('setUserError', error)
            } catch (error) {
                commit('setUserError', error.message)
            }
        },
        // Adding a new user to API
        async addUser({ commit, state }) {
            try {
                const [error, user] = await UserAPI.addUser(state.username)
                // Updating values
                commit('setUser', user)
                commit('setUserId', state.user.id)
                commit('setUsername', state.user.username)
                commit('setHighScore', state.user.highScore)
                commit('setUserError', error)
            } catch (error) {
                commit('setUserError', error.message)
            }
        },
        // Updating a new high score for user by id
        async updateHighScore({ commit, state }) {
            try {
                const [error, user] = await UserAPI.editHighScore(state.userId)
                // Updating values
                commit('setUser', user)
                commit('setHighScore', state.user.highScore)
                commit('setUserError', error)
            } catch (error) {
                commit('setUserError', error.message)
            }
        },
        async setQuestions ({commit, state}) {
            return new Promise((resolve) => {
                commit('setQuestions', state)
                resolve()
            })
        },
    },
})

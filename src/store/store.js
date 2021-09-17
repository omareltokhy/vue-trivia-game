import Vue from "vue";
import Vuex from "vuex";
import { QuestionsAPI } from "@/api/questionsAPI";
import { UserAPI } from "../api/usersAPI";

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		user: [],
		userId: "",
		username: "",
		highScore: 0,
		score: 0,
		userError: "",
		questions: [],
		currentQuestionIndex: 0,
		allCategories: [],
		selectedQuestionsAmount: 10,
		selectedCategoryId: 0,
		selectedDifficulty: "easy",
		category_question_count: {},
		questionsError: null,
		questionItems: []
	},
	mutations: {
		setUser: (state, payload) => {
			state.user = payload;
		},
		setUserId: (state, payload) => {
			state.userId = payload;
		},
		setUsername: (state, payload) => {
			state.username = payload;
		},
		setHighScore: (state, payload) => {
			state.highScore = payload;
		},
		setUserError: (state, payload) => {
			state.userError = payload;
		},
		setLoadingQuestions: (state, payload) => {
			state.loadingQuestions = payload;
		},
		setQuestionsError: (state, payload) => {
			state.questionsError = payload;
		},
		setQuestions: (state, payload) => {
			state.questions = payload;
		},
		setCategories: (state, payload) => {
			state.allCategories = payload;
		},
		setSelectedCategoryId: (state, payload) => {
			state.selectedCategoryId = payload;
		},
		setCategoryQuestionsCount: (state, payload) => {
			state.category_question_count = payload;
		},
		setSelectedQuestionsAmount: (state, payload) => {
			state.selectedQuestionsAmount = payload;
		},
		setSelectedDifficulty: (state, payload) => {
			state.selectedDifficulty = payload;
		},
		setQuestionItems: (state, payload) => {
			state.questionItems = payload;
		},
		setNextQuestionIndex: (state) => {
			state.currentQuestionIndex++;
		},
		setUserAnswer: (state, payload) => {
			state.questions[state.currentQuestionIndex].user_answer = payload
		}
	},
	getters: {
		userFound: state => {
			return state.userId
		},
		getCurrentQuestion: state => {
			// console.log("Current question Getter ", state.questions)
			// console.log("Current questionIndex Getter ", state.currentQuestionIndex)
			return state.questions[state.currentQuestionIndex]
		},
		getQuestions: state => {
			return state.questions
		}
	},
	actions: {
		// Getting user information from API by username
		async getUser({ commit, state }) {
			try {
				const [error, user] = await UserAPI.getUserByUsername(state.username);
				// Updating values
				commit("setUser", user);
				commit("setUserId", state.user[0].id);
				commit("setUsername", state.user[0].username);
				commit("setHighScore", state.user[0].highScore);
				commit("setUserError", error);
			} catch (error) {
				commit("setUserError", error.message);
			}
		},
		// Adding a new user to API
		async addUser({ commit, state }) {
			try {
				const [error, user] = await UserAPI.addUser(state.username);
				// Updating values
				commit("setUser", user);
				commit("setUserId", state.user.id);
				commit("setUsername", state.user.username);
				commit("setHighScore", state.user.highScore);
				commit("setUserError", error);
			} catch (error) {
				commit("setUserError", error.message);
			}
		},
		// Updating a new high score for user by id
		async updateHighScore({ commit, state }) {
			try {
				const [error, user] = await UserAPI.editHighScore(state.userId);
				// Updating values
				commit("setUser", user);
				commit("setHighScore", state.user.highScore);
				commit("setUserError", error);
			} catch (error) {
				commit("setUserError", error.message);
			}
		},
		async getQuestions({ commit, state }) {
			try {
				//Fetch max questions per difficulty level
				const [error, categoriesCount] = await QuestionsAPI.getMaxQuestions(state.selectedCategoryId);

				commit("setCategoryQuestionsCount", categoriesCount.category_question_count);
				commit("setQuestionsError", error);

				//Set max questions depending on which difficulty level is selected
				let maxQuestionsForDifficulty = 0;
				if (state.selectedDifficulty === "easy") maxQuestionsForDifficulty = state.category_question_count.total_easy_question_count;
				else if (state.selectedDifficulty === "medium") maxQuestionsForDifficulty = state.category_question_count.total_medium_question_count;
				else maxQuestionsForDifficulty = state.category_question_count.total_hard_question_count;

				//Set selected question amount to max if too many are selected
				if (state.selectedQuestionsAmount > maxQuestionsForDifficulty) commit("setSelectedQuestionsAmount", maxQuestionsForDifficulty);

				try {
					const [error, results] = await QuestionsAPI.getQuestions(state.selectedQuestionsAmount, state.selectedCategoryId, state.selectedDifficulty);

					if (results) commit("setQuestions", results.results);
					else commit("setQuestionsError", error);
				} catch (error) {
					commit("setQuestionsError", error.message);
				}
			} catch (error) {
				commit("setQuestionsError", error.message);
			}
		},
		async getCategories({ commit, state }) {
			try {
				const [error, categories] = await QuestionsAPI.getCategories();
				state.questionsError = error;

				// console.log("Categories fetched: " + categories.trivia_categories)
				if (categories) commit("setCategories", categories.trivia_categories);
				else commit("setQuestionsError", error);
			} catch (error) {
				commit("setQuestionsError", error.message);
			}
		},
		async getQuestionItems({ commit, state }) {
			try {
				const[error, questions] = await QuestionsAPI.getQuestions(state.selectedQuestionsAmount, state.selectedCategoryId, state.selectedDifficulty);
				state.questionsError = error;

				if(questions) commit("setQuestionItems", questions.results);
				else commit("setQuestionsError", error.message)
			} catch (error) {
				commit("setQuestionsError", error.message)
			}
		},
	},
});

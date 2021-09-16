import Vue from "vue";
import Vuex from "vuex";
import { QuestionsAPI } from "@/api/questionsAPI";

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {
		loadingQuestions: true,
		username: "",
		questions: [],
		allCategories: [],
		selectedQuestionsAmount: 10,
		selectedCategoryId: 0,
		selectedDifficulty: "easy",
		category_question_count: {},
		questionsError: null,
	},
	mutations: {
		setLoadingQuestions: (state, payload) => {
			state.loadingQuestions = payload;
		},
		setQuestionsError: (state, payload) => {
			state.questionsError = payload;
		},
		setQuestions: (state, payload) => {
			state.questions = payload;
		},
		setUsername: (state, payload) => {
			state.username = payload;
		},
		setCategories: (state, payload) => {
			state.allCategories = payload
		},
        setSelectedCategoryId: (state, payload) => {
            state.selectedCategoryId = payload
        },
		setCategoryQuestionsCount: (state, payload) => {
			state.category_question_count = payload
		},
		setSelectedQuestionsAmount: (state, payload) => {
			state.selectedQuestionsAmount = payload
		},
		setSelectedDifficulty: (state, payload) => {
			state.selectedDifficulty = payload
		},
	},
	actions: {
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
		async getCategories({ commit, state }){
			try {
				const [error, categories] = await QuestionsAPI.getCategories();
				state.questionsError = error

				// console.log("Categories fetced: " + categories.trivia_categories)
				if(categories) commit("setCategories", categories.trivia_categories);
				else commit("setQuestionsError", error);
			} catch (error) {
				commit("setQuestionsError", error.message);
			}
		}
	},
});

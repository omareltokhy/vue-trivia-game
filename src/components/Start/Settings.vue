<template>
  <div>
    <label for="easy" class="container-radio">Easy</label>
    <input
      id="easy"
      type="radio"
      checked="checked"
      value="easy"
      name="radio"
      v-model="selectedDifficulty"
    />
    <!-- <span class="checkmark"></span> -->
    <label for="medium" class="container-radio">Medium</label>
    <input
      id="medium"
      type="radio"
      name="radio"
      value="medium"
      v-model="selectedDifficulty"
    />
    <!-- <span class="checkmark"></span> -->
    <label for="hard" class="container-radio">Hard</label>
    <input
      id="hard"
      type="radio"
      name="radio"
      value="hard"
      v-model="selectedDifficulty"
    />
    <!-- <span class="checkmark"></span> -->

    <label for="trivia_amount" class="container-amount">
      Number of Questions:</label
    >
    <input
      type="number"
      name="trivia_amount"
      id="trivia_amount"
      class="form-control"
      min="1"
      max="50"
      v-model="selectedQuestionAmount"
    />

    <label class="container-category"
      >Category:
      <select v-model="selectedCategoryId">
        <option
          v-for="category in categories"
          :value="category.id"
          :key="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </label>
    <button v-on:click="startTrivia">Start Trivia</button>
  </div>
</template>

<script>
import {
  fetchCategories,
  fetchMaxQuestions,
  fetchQuestionsWithSettings,
} from "../../api/questionsAPI";
// import store from "../../store/store"
import {mapActions} from "vuex";

export default {
  name: "Settings",
  async created() {
    const [error, categories] = await fetchCategories();

    this.error = error;
    this.categories = categories.trivia_categories;
    this.isLoading = false;
  },
  data() {
    return {
      isLoading: true,
      error: "",
      categories: [],
      selectedQuestionAmount: 10,
      selectedCategoryId: 0,
      selectedDifficulty: "easy",
      category_question_count: {},
      questionsForSelection: {},
    };
  },
  methods: {
    ...mapActions(['setQuestions']),
    async startTrivia() {
      //Fetch max questions per difficulty level
      const [error, categoriesCount] = await fetchMaxQuestions(this.selectedCategoryId);
      this.category_question_count = categoriesCount.category_question_count;
      this.error = error;

      //Set max questions depending on which difficulty level is selected
      let maxQuestionsForDifficulty = 0;
      if (this.selectedDifficulty === "easy") maxQuestionsForDifficulty = this.category_question_count.total_easy_question_count;
      else if (this.selectedDifficulty === "medium") maxQuestionsForDifficulty = this.category_question_count.total_medium_question_count;
      else maxQuestionsForDifficulty = this.category_question_count.total_hard_question_count;

      //Set selected question amount to max if too many are selected
      if (this.selectedQuestionAmount > maxQuestionsForDifficulty) this.selectedQuestionAmount = maxQuestionsForDifficulty;

      //Fetch questions based on settings
      const [questionWithSettingsError, results] = await fetchQuestionsWithSettings( this.selectedQuestionAmount, this.selectedCategoryId, this.selectedDifficulty);
      this.questionsForSelection = results.results;

      console.log(this.questionsForSelection);
      await this.setQuestions(this.questionsForSelection)   
    },
  },
};
</script>

<style scope>
.container-radio,
.container-amount,
.container-category {
  display: block;
  margin: 10px 0 10px 0;
}
.container-radio {
  cursor: pointer;
}
</style>
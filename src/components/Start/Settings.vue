<template>
  <div>
    <label for="easy" class="container-radio">Easy</label>
    <input
      id="easy"
      type="radio"
      checked="checked"
      value="easy"
      name="radio"
      @change="onDifficultyChange"
    />
    <label for="medium" class="container-radio">Medium</label>
    <input
      id="medium"
      type="radio"
      name="radio"
      value="medium"
      @change="onDifficultyChange"
    />
    <label for="hard" class="container-radio">Hard</label>
    <input
      id="hard"
      type="radio"
      name="radio"
      value="hard"
      @change="onDifficultyChange"
    />

    <label for="trivia_amount" class="container-amount">
      Number of Questions (max 50):</label
    >
    <input
      type="number"
      name="trivia_amount"
      id="trivia_amount"
      class="form-control"
      min="1"
      max="50"
      @change="onQuestionsAmountChange"
    />

    <label class="container-category"
      >Category:</label>
      <select @change="onCategoryChange">
        <option
          v-for="category in allCategories"
          :value="category.id"
          :key="category.name"
        >
          {{ category.name }}
        </option>
      </select>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Settings",
  async created() {
    try {
      // Set category selection to "General knowledge" ID
      this.setSelectedCategoryId(9);
      // Get all category names to populate dropdown menu
      const [error, allCategories] = await this.getCategories();
      this.setCategories(allCategories.trivia_categories)
      this.setQuestionsError(error)
      this.getQuestions();      
    } catch (error) {
      this.setQuestionsError(error.message)
    }
  },
  computed: {
    ...mapState([
      "questions",
      "allCategories",
      "selectedCategoryId",
      "selectedQuestionsAmount",
      "selectedDifficulty"
    ]),
  },
  methods: {
    ...mapActions(["getQuestions", "getCategories"]),
    ...mapMutations([
      "setSelectedCategoryId",
      "setSelectedQuestionsAmount",
      "setSelectedDifficulty",
      "setCategories",
      "setQuestionsError"
    ]),
    onCategoryChange(event) {
      this.setSelectedCategoryId(event.target.value);
    },
    onQuestionsAmountChange(event) {
      this.setSelectedQuestionsAmount(event.target.value);
    },
    onDifficultyChange(event) {
      this.setSelectedDifficulty(event.target.value);
    },
  },
};
</script>

<style scope>
.container-amount,
.container-category {
  display: block;
  margin-top:15px;
  border-radius: 25px;
  padding: 5px;
}
.container-radio {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 15px;
}
select{
  border-radius: 25px;
  border-width: 2px;
  padding:5px;
  border-color: #ee6c4d;
}
select:focus{
  border-color: black;
}
input{
  border-radius: 25px;
  padding:5px;
  border-color: #ee6c4d;
}
input:focus{
  border-color: black;
}
</style>
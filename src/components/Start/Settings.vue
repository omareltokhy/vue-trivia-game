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
    <!-- <span class="checkmark"></span> -->
    <label for="medium" class="container-radio">Medium</label>
    <input
      id="medium"
      type="radio"
      name="radio"
      value="medium"
      @change="onDifficultyChange"
    />
    <!-- <span class="checkmark"></span> -->
    <label for="hard" class="container-radio">Hard</label>
    <input
      id="hard"
      type="radio"
      name="radio"
      value="hard"
      @change="onDifficultyChange"
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
      @change="onQuestionsAmountChange"
    />

    <label class="container-category"
      >Category:
      <select @change="onCategoryChange">
        <option
          v-for="category in allCategories"
          :value="category.id"
          :key="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import { mapState, mapActions, /*mapGetters,*/ mapMutations } from "vuex";

export default {
  name: "Settings",
  async created() {
    try {
      const [error, allCategories] = await this.getCategories();
      this.error = error;
      this.allCategories = allCategories.trivia_categories;
      this.isLoading = false;

      this.getQuestions();
    } catch (error) {
      this.error = error.message;
    }
  },
  computed: {
    ...mapState([
      "questions",
      "allCategories",
      "selectedCategoryId",
      "selectedQuestionsAmount",
      "selectedDifficulty",
    ]),
    //...mapGetters(["getSelectedCategoryId"]), Onko tarpeellinen?
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(["getQuestions", "getCategories"]),
    ...mapMutations([
      "setSelectedCategoryId",
      "setSelectedQuestionsAmount",
      "setSelectedDifficulty",
    ]),
/*     async startTrivia() {
      try {
        await this.getQuestions();
      } catch (error) {
        // this.SET_QUESTIONS_ERROR(error.message);
        this.setQuestionsError(error.message);
      }
    }, */
    onCategoryChange(event) {
      // this.SET_SELECTED_CATEGORY_ID(event.target.value);
      this.setSelectedCategoryId(event.target.value);
    },
    onQuestionsAmountChange(event) {
      // this.SET_SELECTED_QUESTIONS_AMOUNT(event.target.value);
      this.setSelectedQuestionsAmount(event.target.value);
    },
    onDifficultyChange(event) {
      // this.SET_SELECTED_DIFFICULTY(event.target.value);
      this.setSelectedDifficulty(event.target.value);
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
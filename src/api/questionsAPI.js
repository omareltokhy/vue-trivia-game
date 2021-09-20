export const QuestionsAPI = {
    // Get questions from API based on settings
    async getQuestions(questionsAmount, CategoryId, difficulty) {
        let URL = "https://opentdb.com/api.php?" + "amount=" + questionsAmount + "&category=" + CategoryId + "&difficulty=" + difficulty;
        try {
            const results = await fetch(URL).then(r => r.json())
            return [null, results]
        } catch (error) {
            return [error.message, []]
        }
    },
    // Get all category names and IDs
    async getCategories() {
        try {
            const results = await fetch("https://opentdb.com/api_category.php").then(r => r.json())
            return [null, results]
        } catch (error) {
            return [error.message, []]
        }
    },
    // Get max questions in given category
    async getMaxQuestions(categoryId) {
        try {
            const results = await fetch("https://opentdb.com/api_count.php?category=" + categoryId).then(r => r.json())
            return [null, results]
        } catch (error) {
            return [error.message, []]
        }
    },
}
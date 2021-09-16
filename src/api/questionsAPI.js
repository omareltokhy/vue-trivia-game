export const QuestionsAPI = {
    async getQuestions(questionsAmount, CategoryId, difficulty) {
        let URL = "https://opentdb.com/api.php?" + "amount=" + questionsAmount + "&category=" + CategoryId + "&difficulty=" + difficulty;
        console.log("Questions URL: " + URL)
        try {
            const results = await fetch(URL).then(r => r.json())
            console.log("Questions results: " + results.results)
            return [null, results]
        } catch (error) {
            return [error.message, []]
        }
    },
    async getCategories() {
        try {
            const results = await fetch("https://opentdb.com/api_category.php").then(r => r.json())
            return [null, results]
        } catch (error) {
            return [error.message, []]
        }
    },
    async getMaxQuestions(categoryId) {
        try {
            const results = await fetch("https://opentdb.com/api_count.php?category=" + categoryId).then(r => r.json())
            return [null, results]
        } catch (error) {
            return [error.message, []]
        }
    },
}
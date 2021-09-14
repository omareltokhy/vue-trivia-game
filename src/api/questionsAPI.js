// export const fetchQuestions = async () => {
//     try {
//         const {results} = await fetch("https://opentdb.com/api.php?amount=10&type=boolean").then(r => r.json())
//         return [null, results]
//     } catch (error) {
//         return [error.message, null]
//     }
// }
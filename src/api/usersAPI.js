const apiURL = 'https://super-trivia-api.herokuapp.com/trivia'
const apiKey = 'fVvuHQrocVXC9G9z06xa3ec9rdXYGZyJZRDXJ9k3arjVxy2zuUXX6c34Z2dgnlx2'

/* export const fetchUsers = async () => {
    try {
        const {results} = await fetch(apiURL)
            .then(result => result.json())
        return [null, results]
    } catch (e) {
        return [e.message, []]
    }
} */


// Get user by username
export const fetchUserByUsername = async username => {
    try {
        const response = await fetch(`${apiURL}?username=${username}`)
            .then(result => result.json())
        return [null, response]
    } catch (e) {
        return [e.message, {}]
    }   
}

// Post user
export const addUser = async username => {
    try {
        fetch(`${apiURL}`, {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: username, 
                highScore: 0 
            }) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not create new user')
            }
            return response.json()
        })
        .then(newUser => {
            newUser.username = username,
            newUser.highScore = 0
        })
        return [null, "user added"]
    } catch(error) {
        return [error.message, null]
    }
}


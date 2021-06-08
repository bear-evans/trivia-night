// =============================
// Trivia Module
// -----------------------------
// Handles the trivia game code
// =============================
var triviaGame = (function() {

    var apiToken = "";
    let scoreA = 0;
    let scoreB = 0;
    let scoreC = 0;
    let scoreD = 0;

    // grabs a question and processes it for other functions
    async function getQuestion (prefs) {
        let token = await getToken();
        let apiUrl = "https://opentdb.com/api.php?amount=1&token=" + token;
        let Q = {};

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong retrieving a question!");
            }

            return response.json();
        })
        .then(data => {
            console.log(data.correct_answer);
        })
        .catch(error => {
            console.error(error);
        });

    }

    // Retrieves a session token or requests a new one if expired
    function getToken () {
        if (apiToken != "") {
            return apiToken; // stop if there was already a token
        }

        // If there is no token, generate a new one
        let tokenUrl = "https://opentdb.com/api_token.php?command=request";
        apiToken = fetch(tokenUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Something went wrong requesting the API token!");
                }
                return response.json();
            })
            .then(data => {
                return data.token;
            })
            .catch(error => {
                console.error(error);
            });
        
            return apiToken;
        }

   

    // Prints the question to the question box
    function printQuestion () {

    }

    // randomizes the answers and colorizes the correct one
    function printAnswers() {

    }

    // saves the team scores to memory in case of accidental closure or refresh
    function saveScore () {
        // saving goes here
    }

    // increases the score of the appropriate team
    function addScore (event) {

    }

    // Saves parameters to memory
    function setSettings() {

    }

    // loads parameters from memory for the API calls
    function getSettings() {

    }

    // Expose any functions needed outside
    return {
        getQuestion: getQuestion
    }
})();
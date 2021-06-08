// =============================
// Trivia Module
// -----------------------------
// Handles the trivia game code
// =============================
var triviaGame = (function() {

    let apiToken = "";
    let scoreA = 0;
    let scoreB = 0;
    let scoreC = 0;
    let scoreD = 0;

    // grabs a question and processes it for other functions
    function getQuestion (prefs) {
        let token = getToken();
        let apiUrl = "https://opentdb.com/api.php?amount=1";
        let Q = {};

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong retrieving a question!");
            }

            response.json();
        })
        .then(data => {
            Q = {
                question: data.question,
                answers: [
                    data.correct_answer,
                    data.incorrect_answers[0],
                    data.incorrect_answers[1],
                    data.incorrect_answers[2],
                ],
                correct: data.correct_answer
            };
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
        fetch("https://opentdb.com/api_token.php?command=request")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Something went wrong requesting the API token!");
                }

                response.json();
            })
            .then(data => {
                apiToken = data.token;
                return apiToken;
            })
            .catch(error => {
                console.error(error);
            });
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

    }
})();
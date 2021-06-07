// =============================
// Trivia Module
// -----------------------------
// Handles the trivia game code
// =============================
var triviaGame = (function() {

    let scoreA = 0;
    let scoreB = 0;
    let scoreC = 0;
    let scoreD = 0;

    // grabs a question and processes it for other functions
    function getQuestion (prefs) {
        let apiUrl = "https://opentdb.com/api.php?amount=1";

        fetch(apiUrl)
        .then(response => {
            // Check for response integrity here
        })
        .then(data => {
            // process the data here
        })
    }

    // saves the team scores to memory in case of accidental closure or refresh
    function saveScore () {
        // saving goes here
    }

    // increases the score of the appropriate team
    function addScore () {

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

// =============================
// Cocktail Module
// -----------------------------
// Handles the drink suggestions
// =============================
var suggestDrink = (function() {

    // Expose any functions needed outside
    return {

    }
})();
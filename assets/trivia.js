// =============================
// Trivia Module
// -----------------------------
// Handles the trivia game code
// =============================
var triviaGame = (function() {

    var apiToken = "";
    let qNum = 0;
    let scoreA = 0;
    let scoreB = 0;
    let scoreC = 0;
    let scoreD = 0;

    // grabs a question (and possibly a session token) and processes it for other functions
    async function getQuestion (prefs) {
        let token = await getToken();
        let apiUrl = "https://opentdb.com/api.php?amount=1&token=" + token;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong retrieving a question!");
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
            let question = data.results[0].question;
            let type = data.results[0].type;
            let correct = data.results[0].correct_answer;
            let answers = incorrect_answers;
            printQuestion(question, type);
            printAnswers(correct, answers);
        })
        .catch(error => {
            console.error(error);
        });

    }

    // Retrieves a session token or requests a new one if expired
    async function getToken () {
        if (apiToken != "") {
            return apiToken; // stop if there was already a token
        }

        // If there is no token, generate a new one
        let tokenUrl = "https://opentdb.com/api_token.php?command=request";
        apiToken = await fetch(tokenUrl)
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
    function printQuestion (question, type) {
    // TODO: CHANGE VARIABLES TO MATCH THE NECESSARY DOM ELEMENTS
    let body = $("body");

        qNum = qNum + 1;

        body.append("Question " + qNum + " - " + type);
        body.append("The Question is: </br>" + question);
    }

    // randomizes the answers and colorizes the correct one
    function printAnswers(correct, answers) {
        $("answer-list"); // TODO: set to the div of the answer box

        answers.push(correct);

        // Shuffles the answers in the array so the correct answer
        // isn't always first
        for (var i = answers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = answers[j];
            answers[i] = answers[j];
            answers[j] = t;
        }
    }

    // saves the team scores and question number to memory in case of accidental closure or refresh
    function saveState () {
        let data = {
            number: qNum,
            Team1: scoreA,
            Team2: scoreB,
            Team3: scoreC,
            Team4: scoreD,
        };
        localStorage.setItem("trivia-data", JSON.stringify(data));
        // TODO: Also save questions and answer options?
        loadState();
    }

    // loads scores 
    function loadState() {

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

triviaGame.getQuestion();
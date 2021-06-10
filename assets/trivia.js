// =============================
// Trivia Module
// -----------------------------
// Handles the trivia game code
// =============================
var triviaGame = (function() {

    var apiToken = "";
    let qNum = 0;
    let scores = [ 0, 0, 0, 0 ];

    // grabs a question (and possibly a session token) and processes it for other functions
    async function getQuestion () {
        let token = await getToken();

        let prefs = getSettings();
        // TODO: Parse the settings returned and add as parameters

        let apiUrl = "https://opentdb.com/api.php?amount=1&token=" + token;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong retrieving a question!");
            }

            return response.json();
        })
        .then(data => {
            console.log(data); //TODO: Remove this
            let question = data.results[0].question;
            let type = data.results[0].type;
            let correct = data.results[0].correct_answer;
            let answers = data.results[0].incorrect_answers;
            // parses data and sends them to the appropriate functions
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
    // FIXME: CHANGE VARIABLES TO MATCH THE NECESSARY DOM ELEMENTS
        let qContainer = $("#question-box");
        let qHeader = $("#question-header");
        let typeText = "";

        // Checks what type of question for the header
        if (type == "boolean") {
            typeText = "True or False";
        } else if (type == "multiple") {
            typeText = "Multiple Choice"
        }

        // Empty all previous content
        qHeader.empty();
        qContainer.empty();

        qNum = qNum + 1; // increase the question number

        qHeader.append("Question " + qNum + " - " + typeText);
        qContainer.append(question);
    }

    // randomizes the answers and marks the correct one for revealing
    function printAnswers(correct, answers) {
        let answerContainer = $("#answer-list"); // FIXME: set to the div of the answer box
        answerContainer.empty();
        answers.push(correct);

        // Shuffles the answers in the array so the correct answer
        // isn't always in the same spot
        for (var i = answers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = answers[i];
            answers[i] = answers[j];
            answers[j] = t;
        }

        // Cycles through the answers, creating boxes. Gives special styling to the correct answer.
        for (var i = 0; i < answers.length; i++) {
            //FIXME: Change div classes to bulma styling options
            let box;
            if (answers[i] == correct) {
                box = $("<div class='card-footer-item correct-answer'>" + answers[i] + "</div>");
            } else {
                box = $("<div class='card-footer-item'>" + answers[i] + "</div>");
            }
            answerContainer.append(box);
        }
    }

    // Reveals the correct answer when a button is pressed
    function revealAnswer() {
        let correctBox = $(".correct-answer");

        correctBox.addClass("has-background-success-light");
        $("#tally-button").removeClass("is-hidden");
    }

    // Toggles the team's points buttons when clicked
    // This is used when tallying scores
    function toggleTeam(event) {
        event.preventDefault();
        $(event.target).toggleClass("is-success");
    }

    // saves the team scores and question number to memory in case of accidental closure or refresh
    function saveState () {
        let data = {
            number: qNum + 1,
            score: scores,
            token: apiToken
        };
        localStorage.setItem("trivia-data", JSON.stringify(data));

        // TODO: Also save questions and answer options?
        loadState();
    }

    // loads scores from memory
    function loadState() {
        // TODO: retrieve scores from memory
        renderScores();
    }

    function renderScores() {
        let scoreBox = $("#score-box");

        scoreBox.empty();

        scoreBox.append($("<div class='team-score'>Team 1: " + scores[0] + "</div>"));
        scoreBox.append($("<div class='team-score'>Team 2: " + scores[1] + "</div>"));
        scoreBox.append($("<div class='team-score'>Team 3: " + scores[2] + "</div>"));
        scoreBox.append($("<div class='team-score'>Team 4: " + scores[3] + "</div>"));
    }

    // increases the score of the appropriate team(s)
    function tallyScore () {
        // Checks for the toggled states of the team buttons and increments the associated score
        $(".team-label").each(function(i) {
            if ($(this).hasClass("is-success")) { //FIXME: Change to whatever toggle class is being used
                scores[i] = scores[i] + 1;
                $(this).removeClass("is-success");
        }});

        // Hides the tally button
        $("#tally-button").addClass("is-hidden");
        saveState();
        getQuestion();
    }

    // Saves parameters to memory
    function setSettings() {
        // TODO: Save settings
    }

    // loads parameters from memory for the API calls
    function getSettings() {
        // TODO: Load settings from memory
    }

    // Expose any functions needed outside
    return {
        getQuestion: getQuestion,
        revealAnswer: revealAnswer,
        toggleTeam: toggleTeam,
        tallyScore: tallyScore
    }
})();

$("#tally-button").on('click', triviaGame.tallyScore);
$(".team-label").on('click', triviaGame.toggleTeam);
$("#new-button").on('click', triviaGame.getQuestion);
$("#reveal-button").on('click', triviaGame.revealAnswer);

triviaGame.getQuestion();
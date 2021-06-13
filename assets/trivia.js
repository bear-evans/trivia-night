// =============================
// Trivia Module
// -----------------------------
// Handles the trivia game code
// =============================
var triviaGame = (function () {
  var apiToken = "";
  let qNum = 0;
  let scores = [0, 0, 0, 0];

  // Initializes the trivia module
  function init() {
    // Button event listeners
    $("#tally-button").on("click", tallyScore);
    $(".team-label").on("click", toggleTeam);
    $("#new-question-button").on("click", getQuestion);
    $("#reveal-button").on("click", revealAnswer);
    $("#settings-cancel").on("click", closeModal);
    $("#settings-save").on("click", saveModal);
    $("#settings-show").on("click", showModal);

    loadState();
    getQuestion();
  }
  // grabs a question (and possibly a session token) and processes it for other functions
  async function getQuestion() {
    let token = await getToken();
    let prefs = getSettings();
    let apiUrl = "https://opentdb.com/api.php?amount=1&token=" + token;

    if (prefs.category != "") {
        apiUrl = apiUrl + "&category=" + prefs.category;
    }
    if (prefs.difficulty != "") {
        apiUrl = apiUrl + "&difficulty=" + prefs.difficulty;
    }
    if (prefs.type != "") {
        apiUrl = apiUrl + "&type=" + prefs.type;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong retrieving a question!");
        }

        return response.json();
      })
      .then((data) => {
        let question = data.results[0].question;
        let type = data.results[0].type;
        let correct = data.results[0].correct_answer;
        let answers = data.results[0].incorrect_answers;

        // parses data and sends them to the appropriate functions
        printQuestion(question, type);
        printAnswers(correct, answers);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Retrieves a session token or requests a new one if expired
  async function getToken() {
    if (apiToken != "") {
      return apiToken; // stop if there was already a token
    };

    // If there is no token, generate a new one
    let tokenUrl = "https://opentdb.com/api_token.php?command=request";
    apiToken = await fetch(tokenUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong requesting the API token!");
        }
        return response.json();
      })
      .then((data) => {
        return data.token;
      })
      .catch((error) => {
        console.error(error);
      });

    return apiToken;
  }

  // Prints the question to the question box
  function printQuestion(question, type) {
    let qContainer = $("#question-box");
    let qHeader = $("#question-header");
    let typeText = "";

    // Checks what type of question for the header
    if (type == "boolean") {
      typeText = "True or False";
    } else if (type == "multiple") {
      typeText = "Multiple Choice";
    }

    // Empty all previous content
    qHeader.empty();
    qContainer.empty();

    qNum = qNum + 1; // increase the question number

    qHeader.append(
      "<div class='card-header-title has-text-white'>Question " +
        qNum +
        " - " +
        typeText +
        "</div>"
    );
    qContainer.append(question);
  }

  // randomizes the answers and marks the correct one for revealing
  function printAnswers(correct, answers) {
    let answerContainer = $("#answer-list");
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
      let box;
      if (answers[i] == correct) {
        box = $(
          "<div class='card-footer-item correct-answer'>" +
            answers[i] +
            "</div>"
        );
      } else {
        box = $("<div class='card-footer-item'>" + answers[i] + "</div>");
      }
      answerContainer.append(box);
    }
  }

  // Reveals the correct answer when a button is pressed
  function revealAnswer() {
    $(".correct-answer").addClass("has-background-success");
    $("#tally-button").removeClass("is-hidden");
    $("#reveal-button").addClass("is-hidden");
    $("#new-question-button").addClass("is-hidden");
    $("#instructions").empty();
    $("#instructions").append(
      $(
        "<p>Select the teams that got it right. When you're ready, click the button to tally the scores and start the next round.</p>"
      )
    );
  }

  // Toggles the team's points buttons when clicked
  // This is used when tallying scores
  function toggleTeam(event) {
    event.preventDefault();
    $(event.target).toggleClass("is-success");
  }

  // saves the team scores and question number to memory in case of accidental closure or refresh
  function saveState() {
    let data = {
      number: qNum + 1,
      score: scores,
      token: apiToken,
    };
    localStorage.setItem("trivia-data", JSON.stringify(data));
    loadState();
  }

  // loads scores from memory
  function loadState() {
    let data = JSON.parse(localStorage.getItem("trivia-data"));
    qNum = data.number;
    scores = data.score;
    apiToken = data.token;
    renderScores();
  }

  function renderScores() {
    let scoreBox = $("#score-box");

    scoreBox.empty();

    scoreBox.append(
        $(
          "<h1>Score</h1>"
        )
    );  
    scoreBox.append(
      $(
        "<div class='team-score'><span class='team-score-header'>Team 1:</span> " +
          scores[0] +
          "</div>"
      )
    );
    scoreBox.append(
      $(
        "<div class='team-score'><span class='team-score-header'>Team 2:</span> " +
          scores[1] +
          "</div>"
      )
    );
    scoreBox.append(
      $(
        "<div class='team-score'><span class='team-score-header'>Team 3:</span> " +
          scores[2] +
          "</div>"
      )
    );
    scoreBox.append(
      $(
        "<div class='team-score'><span class='team-score-header'>Team 4:</span> " +
          scores[3] +
          "</div>"
      )
    );
  }

  // increases the score of the appropriate team(s)
  function tallyScore() {
    // Checks for the toggled states of the team buttons and increments the associated score
    $(".team-label").each(function (i) {
      if ($(this).hasClass("is-success")) {
        scores[i] = scores[i] + 1;
        $(this).removeClass("is-success");
      }
    });

    $("#tally-button").addClass("is-hidden");
    $("#new-question-button").removeClass("is-hidden");
    $("#reveal-button").removeClass("is-hidden");
    $("#instructions").empty();
    $("#instructions").append(
      $(
        "<p>When everyone has had the chance to write down their answer, click the button to reveal the correct one, or hit new question to get a different question.</p>"
      )
    );
    saveState();
    getQuestion();
  }

  // Shows the settings modal and loads the settings into the form
  function showModal() {
    $("html").addClass("is-clipped");
    $("#trivia-settings").addClass("is-active");

    let prefs = getSettings();

    if (prefs == null) {return};
    $("#question-category").val(prefs.category).change();
    $("#question-difficulty").val(prefs.difficulty).change();
    $("#question-type").val(prefs.type).change();

  }

  // Handles closing the modal
  function closeModal() {
    $("html").removeClass("is-clipped");
    $("#trivia-settings").removeClass("is-active");
  }

  // Handles saving the settings and closing the modal
  function saveModal() {
    setSettings();
    closeModal();
  }

  // Saves parameters to memory
  function setSettings() {
    let category = $("#question-category").val();
    let difficulty = $("#question-difficulty").val();
    let type = $("#question-type").val();

    let settings = {
        category: category,
        difficulty: difficulty,
        type: type
    }

    localStorage.setItem("trivia-settings", JSON.stringify(settings));
  }

  // loads parameters from memory for the API calls
  function getSettings() {
      let settings = JSON.parse(localStorage.getItem("trivia-settings"));
      return settings;
  }

  // Expose any functions needed outside
  return {
    init: init,
    getQuestion: getQuestion,
    revealAnswer: revealAnswer,
    toggleTeam: toggleTeam,
    tallyScore: tallyScore,
  };
})();

triviaGame.init();

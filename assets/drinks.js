// ingredient list: https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
// Search by ingredient: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// By ID www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Search cocktail by name www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

var drinkID;
var drinkData = {};

// Events Button Random
var randomButton = $("#random-button");
randomButton.on("click", function (event) {
  event.preventDefault();
  drinkID = 0;
  randomDrink();
});

// Event Button Search
var searchButton = $("#search-button");
searchButton.on("click", function (event) {
  event.preventDefault();
  console.log("clicked");
  searchField = $("#search-field").val();

  if (searchField === " " || searchField === "" || searchField === null) {
    //validate field
    console.log("Empty");
  } else {
    var checkRadio = $(".search-type:checked").val();
    if (checkRadio === "by-drink") {
      console.log("text field data: " + searchField);
      console.log(checkRadio);
      byDrink(searchField);
    } else if (checkRadio === "by-ingredient") {
      console.log("text field data: " + searchField);
      console.log(checkRadio);
      byIngredient(searchField);
    }
  }
  $("#search-field").val("");
});

function byIngredient(drinkTxt) {
  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkTxt;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drinkData = data;
      $(".modal").addClass("is-active");
      drinkTxt = "drink with " + drinkTxt;
      console.log("search drink ID");
      console.log(drinkData);
      selectionList(drinkTxt);
    });
}
function byDrinkID(drinkTxt) {
  console.log("to search" + drinkTxt);
  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkTxt;
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drinkData = data;
      console.log(drinkData);
      drinkID = 0;
      console.log(drinkData.drinks[drinkID].strDrink); //Name
      renderDrink(drinkData);
    });
}

function byDrink(drinkTxt) {
  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkTxt;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drinkData = data
      console.log(drinkData);
      $(".modal").addClass("is-active");
      selectionList(drinkTxt);
    });
}

// Random Drink Function
function randomDrink() {
  var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderDrink(data);
    });
}

// Render Drink Function
function renderDrink(data) {
  $("#img-thumb").attr("src", data.drinks[drinkID].strDrinkThumb);
  // console.log(data.drinks[drinkID].strDrinkThumb); //Thumb

  console.log(data.drinks[drinkID].strDrink); //Name
  $("#drink-name").text(data.drinks[drinkID].strDrink);

  console.log(data.drinks[drinkID].strVideo); // Video
  console.log(data.drinks[drinkID].strGlass); //Glass
  $("#glass-type").text(data.drinks[drinkID].strGlass);

  // console.log(data.drinks[drinkID].strIngredient1);
  $("#ing-name-1").text(data.drinks[drinkID].strIngredient1);

  // console.log(data.drinks[drinkID].strIngredient2);
  $("#ing-name-2").text(data.drinks[drinkID].strIngredient2);

  // console.log(data.drinks[drinkID].strIngredient3);
  $("#ing-name-3").text(data.drinks[drinkID].strIngredient3);

  // console.log(data.drinks[0].strIngredient4);
  // console.log(data.drinks[0].strIngredient5);
  // console.log(data.drinks[0].strIngredient6);
  // console.log(data.drinks[0].strIngredient7);
  // console.log(data.drinks[0].strIngredient8);
  // console.log(data.drinks[0].strIngredient9);
  // console.log(data.drinks[0].strIngredient10);
  // console.log(data.drinks[0].strIngredient11);
  // console.log(data.drinks[0].strIngredient12);
  // console.log(data.drinks[0].strIngredient13);
  // console.log(data.drinks[0].strIngredient14);
  // console.log(data.drinks[0].strIngredient15);

  // console.log(data.drinks[drinkID].strMeasure1);
  $("#ing-qty-1").text(data.drinks[drinkID].strMeasure1);

  // console.log(data.drinks[drinkID].strMeasure2);
  $("#ing-qty-2").text(data.drinks[drinkID].strMeasure2);

  // console.log(data.drinks[drinkID].strMeasure3);
  $("#ing-qty-3").text(data.drinks[drinkID].strMeasure3);

  // console.log(data.drinks[0].strMeasure4);
  // console.log(data.drinks[0].strMeasure5);
  // console.log(data.drinks[0].strMeasure6);
  // console.log(data.drinks[0].strMeasure7);
  // console.log(data.drinks[0].strMeasure8);
  // console.log(data.drinks[0].strMeasure9);
  // console.log(data.drinks[0].strMeasure10);
  // console.log(data.drinks[0].strMeasure11);
  // console.log(data.drinks[0].strMeasure12);
  // console.log(data.drinks[0].strMeasure13);
  // console.log(data.drinks[0].strMeasure14);
  // console.log(data.drinks[0].strMeasure15);

  // console.log(data.drinks[drinkID].strInstructions); //Instructions
  $("#instructions").text(data.drinks[drinkID].strInstructions);
}

// Modal Fuctions
var modalDelete = $(".delete");
modalDelete.on("click", function (event) {
  event.preventDefault();
  removeModal();
});

function removeModal() {
  cleanModal();
  $(".modal").removeClass("is-active");
}

function cleanModal() {
  for (var i = 0; i < 5; i++) {
    $("#select-" + [i]).text("");
  }
}

var modalCancel = $("#cancel-button");
modalCancel.on("click", function (event) {
  event.preventDefault();
  removeModal();
});

/**
 * Handle when a drink selection is clicked
 */
document.addEventListener("click", function (event) { // <----- check code
  if (!event.target.classList.contains("selection")) return;

  event.preventDefault();
  var targetClicked = event.target;
  drinkID = targetClicked.id;
  // var selection = event.target.innerText;
  // toLocalstorage(selectedCity);
  // console.log("Target Clicked: " + selectedCity);
  // $('#current-city').text(selectedCity);
  drinkID = drinkID.charAt(7);
  drinkID = parseInt(drinkID);
  console.log(drinkID);
  removeModal();
  cleanModal();
  var checkRadio = $(".search-type:checked").val();
  if (checkRadio === "by-drink") {
    console.log(checkRadio);
    renderDrink(drinkData);
  } else if (checkRadio === "by-ingredient") {
    console.log(checkRadio);
    byDrinkID(drinkData.drinks[drinkID].idDrink);
    console.log("ID Sent:" + drinkData.drinks[drinkID].idDrink);
  }
});


// Show options in Modal
function selectionList(titleText) {
  $("#drink-modal-title").text(titleText);
  for (var i = 0; i < drinkData.drinks.length; i++) {
    // listItem=$("<li></li>").text("Text.");
    // $('modal-list').append(listItem);

    // $('#modallist', '#button').attr('id', 'value');

    $("#select-" + [i]).text(drinkData.drinks[i].strDrink)


  }
}

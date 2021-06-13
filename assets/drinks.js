// ingredient list: https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
// Search by ingredient: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// By ID www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Search cocktail by name www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita


var drinkID;
var drinkData = {};

// Events Button Hide
var hideButton = $("#hide-drinks-button");
hideButton.on("click", function (event) {
  event.preventDefault();
$('#drinks-section').attr("style", "display:none");
alert("test");
});



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


  var ingredientNumber; 
  var measureNumber;
  $('#ingredient-table-body').empty();
  for (var i=1; i<16; i++){
    ingredientNumber="strIngredient"+i;
    measureNumber="strMeasure"+i;

    // debug
    console.log("ingNumber" + ingredientNumber);
    console.log("ingNumber" + measureNumber);



    if (data.drinks[drinkID][ingredientNumber]!=null){


      // Create Table

      $('#ingredient-table-body').append($('<tr><td></td><td></td></tr>')); //Removed left header row (ing number)
      $('#ingredient-table-body').children().eq(i-1).attr('id', "ing-row-"+i);
      // $('#ingredient-table-body').children().eq(i-1).children().eq(0).attr('id', "ing-no-"+i).text(i);
      $('#ingredient-table-body').children().eq(i-1).children().eq(0).attr('id', "ing-qty-"+i).text(i);
      $('#ingredient-table-body').children().eq(i-1).children().eq(1).attr('id', "ing-name-"+i).text(i);

      // add text
      $("#ing-name-"+i).text(data.drinks[drinkID][ingredientNumber]);
          // debug
      console.log("ing: " + ingredientNumber + " " + data.drinks[drinkID][ingredientNumber]);

    }
    else {
      break;
    }

    // Fill Measure
    if (data.drinks[drinkID][measureNumber]!=null){
      $("#ing-qty-"+i).text(data.drinks[drinkID][measureNumber]);

          // debug
      console.log("measure: " + measureNumber + " " + data.drinks[drinkID][measureNumber]);
    }
    else {
      $("#ing-qty-"+i).text("See Instructions");
    }

  }

  // console.log(data.drinks[drinkID].strIngredient1);
  // $("#ing-name-1").text(data.drinks[drinkID].strIngredient1);

  // console.log(data.drinks[drinkID].strIngredient2);
  // $("#ing-name-2").text(data.drinks[drinkID].strIngredient2);

  // console.log(data.drinks[drinkID].strIngredient3);
  // $("#ing-name-3").text(data.drinks[drinkID].strIngredient3);

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
  // $("#ing-qty-1").text(data.drinks[drinkID].strMeasure1);

  // console.log(data.drinks[drinkID].strMeasure2);
  // $("#ing-qty-2").text(data.drinks[drinkID].strMeasure2);

  // console.log(data.drinks[drinkID].strMeasure3);
  // $("#ing-qty-3").text(data.drinks[drinkID].strMeasure3);

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
  if (drinkID<10){
  drinkID = drinkID.charAt(7);
  }
  else{
    drinkID = drinkID.charAt(7) + drinkID.charAt(8);
    console.log("Drink ID: " + drinkID);
  }
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
  $( "#modal-list").empty();
  console.log("ID Data Drinks Length:" + drinkData.drinks.length);
  for (var i = 0; i < drinkData.drinks.length; i++) {
  $('#modal-list').append($('<li><button>x</button></li>'));
  idForButton=("select-"+i);
  $('#modal-list').children().eq(i).children().first().addClass('button is-text selection').attr('id', idForButton).text(drinkData.drinks[i].strDrink);
  // $('#modal-list').children().eq(i).children().first().text(drinkData.drinks[i].strDrink);

    // $("#select-" + i).text(drinkData.drinks[i].strDrink);

    console.log(i);
  }
} 
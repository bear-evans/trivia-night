// Show Random Drink when page loads
randomDrink();
$('#show-drinks-button').attr("style", "display:none");

var drinkID=0;
var drinkData = {};

// Events Button Hide
var hideButton = $("#hide-drinks-button");
hideButton.on("click", function (event) {
  event.preventDefault();
$('#drinks-section').attr("style", "display:none");
$('#hide-drinks-button').attr("style", "display:none");
$('#show-drinks-button').removeAttr("style");
$('.columns').children().eq(1).removeClass('is-9').addClass('is-12');
});

// Events Button Show
var showButton = $("#show-drinks-button");
showButton.on("click", function (event) {
  event.preventDefault();
$('#drinks-section').removeAttr("style");
$('#show-drinks-button').attr("style", "display:none");
$('#hide-drinks-button').removeAttr("style");
$('.columns').children().eq(1).removeClass('is-12').addClass('is-9');
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
  searchField = $("#search-field").val();

  if (searchField === " " || searchField === "" || searchField === null) {
    //validate field

  } else {
    var checkRadio = $(".search-type:checked").val();
    if (checkRadio === "by-drink") {
      byDrink(searchField);
    } else if (checkRadio === "by-ingredient") {
      byIngredient(searchField);
    }
  }
  $("#search-field").val("");
});

//Get Data from API, drink by Ingredient
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
      selectionList(drinkTxt);
    });
}

//Get Data from API, drink by ID
function byDrinkID(drinkTxt) {
  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkTxt;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drinkData = data;
      drinkID = 0;
      renderDrink(drinkData);
    });
}

//Get Data from API, drink by drink name
function byDrink(drinkTxt) {
  var requestUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkTxt;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drinkData = data
      $(".modal").addClass("is-active");
      selectionList(drinkTxt);
    });
}

//Get Data from API, random drink
function randomDrink() {
  var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderDrink(data);
    });
}

// Render Drink DataFunction
function renderDrink(data) {
  $("#img-thumb").attr("src", data.drinks[drinkID].strDrinkThumb); //Render Drink Image
  $("#drink-name").text(data.drinks[drinkID].strDrink); //Render Drink Name
  $("#glass-type").text(data.drinks[drinkID].strGlass); //Render Glass type

  var ingredientNumber; 
  var measureNumber;
  $('#ingredient-table-body').empty();
  for (var i=1; i<16; i++){
    ingredientNumber="strIngredient"+i;
    measureNumber="strMeasure"+i;

    if (data.drinks[drinkID][ingredientNumber]!=null){ //Validate Data

      // Create Ingredients Table
      $('#ingredient-table-body').append($('<tr><td></td><td></td></tr>'));
      $('#ingredient-table-body').children().eq(i-1).attr('id', "ing-row-"+i);
      $('#ingredient-table-body').children().eq(i-1).children().eq(0).attr('id', "ing-qty-"+i).text(i);
      $('#ingredient-table-body').children().eq(i-1).children().eq(1).attr('id', "ing-name-"+i).text(i);

      // Add text to the Ingredients Table
      $("#ing-name-"+i).text(data.drinks[drinkID][ingredientNumber]);
    }
      
      else {
        break;
      }

    // Add Ingredients Quantity
    if (data.drinks[drinkID][measureNumber]!=null){
      $("#ing-qty-"+i).text(data.drinks[drinkID][measureNumber]);
      }

    else {
      $("#ing-qty-"+i).text("See Instructions"); 
    }
  }
  
  //Add instructions text
  $("#instructions").text(data.drinks[drinkID].strInstructions);
}


/** Modal Functions **/

//Handle when the [x] button is clicked

var modalDelete = $(".delete");
modalDelete.on("click", function (event) {
  event.preventDefault();
  removeModal();
});

//This function will change the class of the modal to hide it
function removeModal() {
  cleanModal();
  $(".modal").removeClass("is-active");
}

//This function will clean modal options
function cleanModal() {
  for (var i = 0; i < drinkData.drinks.length; i++) {
    $("#select-" + [i]).text("");
  }
}



//Handle when the the cancel button is clicked
 
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
  }

  drinkID = parseInt(drinkID);
  removeModal();
  cleanModal();
  var checkRadio = $(".search-type:checked").val();

  if (checkRadio === "by-drink") {
    renderDrink(drinkData);
  }
  
  else if (checkRadio === "by-ingredient") {
    byDrinkID(drinkData.drinks[drinkID].idDrink);
  }
});


// Show drinks options in Modal
function selectionList(titleText) {
  $("#drink-modal-title").text(titleText);
  $( "#modal-list").empty();
  
  for (var i = 0; i < drinkData.drinks.length; i++) {
    $('#modal-list').append($('<li><button>x</button></li>'));
    idForButton=("select-"+i);
    $('#modal-list').children().eq(i).children().first().addClass('button is-text selection').attr('id', idForButton).text(drinkData.drinks[i].strDrink);
  }
} 


/* For reference only */
// Ingredient list: https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
// Search by ingredient: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// By ID https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
// Search cocktail by name https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

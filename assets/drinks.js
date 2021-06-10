// ingredient list: https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
// Search by ingredient: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// By ID www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Search cocktail by name www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita


// Events Button Random
var randomButton=$("#random-button");  
randomButton.on('click', function (event) {
  event.preventDefault();
  randomDrink();
})




// Event Button Search
var searchButton=$("#search-button");  
searchButton.on('click', function (event) {
  event.preventDefault();
  console.log("clicked")
  searchField=$('#search-field').val();

  if(searchField ===" " || searchField ==="" || searchField ===null){   //validate field

  // if(typeof searchField !== 'string'){

    console.log("Empty");
}
else{

  console.log(searchField);
  byDrink(searchField);

}
$('#search-field').val("");
})





// function byIngredient(){
//   var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         renderDrink(data);
//       });
//     }


function byDrink(drinkTxt){
  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drinkTxt;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        renderDrink(data);
      });
    }






// Random Drink Function
function randomDrink(){
var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
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
function renderDrink(data){

      $('#img-thumb').attr("src", data.drinks[0].strDrinkThumb);
      console.log(data.drinks[0].strDrinkThumb); //Thumb


      console.log(data.drinks[0].strDrink); //Name
      $("#drink-name").text(data.drinks[0].strDrink);

      console.log(data.drinks[0].strVideo); // Video
      console.log(data.drinks[0].strGlass); //Glass
      $("#glass-type").text(data.drinks[0].strGlass);

        console.log(data.drinks[0].strIngredient1);
        $("#ing-name-1").text(data.drinks[0].strIngredient1);

        console.log(data.drinks[0].strIngredient2); 
        $("#ing-name-2").text(data.drinks[0].strIngredient2);

        console.log(data.drinks[0].strIngredient3);
        $("#ing-name-3").text(data.drinks[0].strIngredient3);

        console.log(data.drinks[0].strIngredient4);
        console.log(data.drinks[0].strIngredient5); 
        console.log(data.drinks[0].strIngredient6);
        console.log(data.drinks[0].strIngredient7);
        console.log(data.drinks[0].strIngredient8); 
        console.log(data.drinks[0].strIngredient9);
        console.log(data.drinks[0].strIngredient10);
        console.log(data.drinks[0].strIngredient11); 
        console.log(data.drinks[0].strIngredient12);
        console.log(data.drinks[0].strIngredient13);
        console.log(data.drinks[0].strIngredient14); 
        console.log(data.drinks[0].strIngredient15);
        
        console.log(data.drinks[0].strMeasure1);
        $("#ing-qty-1").text(data.drinks[0].strMeasure1);

        console.log(data.drinks[0].strMeasure2);
        $("#ing-qty-2").text(data.drinks[0].strMeasure2);

        console.log(data.drinks[0].strMeasure3);
        $("#ing-qty-3").text(data.drinks[0].strMeasure3);

        console.log(data.drinks[0].strMeasure4);
        console.log(data.drinks[0].strMeasure5); 
        console.log(data.drinks[0].strMeasure6);
        console.log(data.drinks[0].strMeasure7);
        console.log(data.drinks[0].strMeasure8); 
        console.log(data.drinks[0].strMeasure9);
        console.log(data.drinks[0].strMeasure10);
        console.log(data.drinks[0].strMeasure11); 
        console.log(data.drinks[0].strMeasure12);
        console.log(data.drinks[0].strMeasure13);
        console.log(data.drinks[0].strMeasure14);
        console.log(data.drinks[0].strMeasure15);

        console.log(data.drinks[0].strInstructions); //Instructions
        $("#instructions").text(data.drinks[0].strInstructions);


      

      }

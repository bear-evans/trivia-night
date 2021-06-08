// ingredient list: https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
// Search by ingredient: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      console.log(data);

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







  });

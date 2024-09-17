const searchBTN = document.querySelector(".searchBTN");
const recipeContainer = document.querySelector(".recipe-container");
const searchBox = document.querySelector(".searchBox");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const RecipecloseBTN = document.querySelector(".Recipe-closeBtn");

// function to get recipes


//function to fetch ingredinets and measurement
const fetchIngredients=(meal)=>{
  // console.log(meal)
  let ingredientsList="";
  for(let i =1; i<=20;i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
      const measure = meal[`strMeasure${i}`];
      ingredientsList +=`<li>${measure} ${ingredient}</li>`

    }
    else{
      break;
    }
  }
  return ingredientsList;
}

const openRecipiePopUp=(meal)=>{
  recipeDetailsContent.parentElement.style.display="block";
  recipeDetailsContent.innerHTML =
  `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredents :</h3>
  <ul class="recipeIngredientList">${fetchIngredients(meal)}</ul>
  <div class="Instructions">
    <h3 >Instructions:</h3>
    <p >${meal.strInstructions}</p>
  </div>

  `;

 
}


const fetchRecipes= async(searchInput)=>{
    recipeContainer.innerHTML="<h2>Fetching recipes...</h2>";
  try{
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    let data = await response.json();
    recipeContainer.innerHTML="";
    data.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipeDiv");
      recipeDiv.innerHTML=
      `
      <img src="${meal.strMealThumb}"/>
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>  
      <p>Belongs to <span>${meal.strCategory} Category</span></p>  

      `
      const button = document.createElement("button");
      button.textContent="View Recipe";
      recipeDiv.appendChild(button);

      // adding eventlistter to reciepe button;

      button.addEventListener("click",()=>{
        openRecipiePopUp(meal);
      })
       

      recipeContainer.appendChild(recipeDiv);
    });
  
  }catch(error){
    recipeContainer.innerHTML="<h2>Error in fetching recipes...</h2>";
  }
    // end of data.meals.foreach section
}

searchBTN.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
      recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
      return;
    }
    fetchRecipes(searchInput)
});


// close btn

RecipecloseBTN.addEventListener("click",()=>{
  recipeDetailsContent.parentElement.style.display="none";

})
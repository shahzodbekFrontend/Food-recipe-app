const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetalisContent = document.querySelector(".meal-detalis-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event Listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", gatMealResipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetalisContent.parentElement.classList.remove("showRecipe");
});

async function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((responce) => responce.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-item" data-id='${meal.idMeal}'>
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="repise-btn">Get Repise</a>
                </div>
            </div>
            `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Dalbayob to'g'ri yoz";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

function gatMealResipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("repise-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((responce) => responce.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    </div>
    <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
  mealDetalisContent.innerHTML = html;
  mealDetalisContent.parentElement.classList.add("showRecipe");
}

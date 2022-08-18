const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "07c475ba";
const APP_key = "264095da978b0cb725f2ace81bd6469d";
const section = document.querySelector("#section");
const loader = document.querySelector("#loading");
// console.log(container)
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  if(searchQuery.length === 0) return
  loader.classList.remove("hidden");
  await fetchAPI();
  loader.classList.add("hidden")
  section.classList.remove("search");
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
       generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}





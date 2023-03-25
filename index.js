import { recipes } from './scripts/data/recipes.js'
import { ViewRecipes } from './scripts/view/recipeView.js'
import { ControllerRecipes } from './scripts/controller/recipeController.js'

let recipesToShow = []
console.log(recipes)

const controller = new ControllerRecipes({ recipes: recipes })

const displayRecipes = new ViewRecipes()
recipes.forEach((recipe) => displayRecipes.displayRecipesList(recipe))

export function mainSearchFunction(text) {
	controller.mainSearch(text)
}

export function ingredientSearchFunction(text) {
	controller.ingredientSearch(text)
}

// Code pour ajouter les écouteurs d'événements
const searchInput = document.querySelector('#search-zone')
searchInput.addEventListener('input', (event) => {
	const searchText = event.target.value
	mainSearchFunction(searchText)
})



console.log(recipesToShow);

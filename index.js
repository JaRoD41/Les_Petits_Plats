import { recipes } from './scripts/data/recipes.js'
import { ViewRecipes } from './scripts/view/recipeView.js'
import { ControllerRecipes } from './scripts/controller/recipeController.js'
import { recipesToShow } from './scripts/model/recipeModel.js'




// je dois créer un tableau avec toutes les recettes filtrées et l'envoyer dans mon controleur pour effectuer mon tri et utiliser le nouveau tableau pour afficher les recettes triées
const controller = new ControllerRecipes({ recipes: recipes })
const searchInput = document.querySelector('#search-zone')
searchInput.addEventListener('input', (event) => {
	const searchText = event.target.value
	controller.mainSearch(searchText)
})

// const displayRecipes = new ViewRecipes()
// recipesToShow.forEach((recipe) => displayRecipes.displayRecipesList(recipe))

// export function mainSearchFunction(text) {
// 	controller.mainSearch(text)
// }

// export function mainSearchFunction(text) {
// 	controller.mainSearch(text)
// }

// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur pour effectuer la recheche



console.log('toutes les recettes :', recipes)
console.log('tableau recipesToShow dans index.js :', recipesToShow);
// console.log('recettes filtrées coco :', mainSearchFunction('coco'));

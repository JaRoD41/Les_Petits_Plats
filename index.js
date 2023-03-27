import { recipes } from './scripts/data/recipes.js'
import { ViewRecipes } from './scripts/view/recipeView.js'
import { ControllerRecipes } from './scripts/controller/recipeController.js'

const recipeSnippet = document.getElementById('recipes-zone')
let recipesToShow = []

// je dois créer un tableau avec toutes les recettes filtrées et l'envoyer dans mon controleur pour effectuer mon tri et utiliser le nouveau tableau pour afficher les recettes triées
function init() {
	recipesToShow = recipes.slice()
	// const controller = new ControllerRecipes({ recipes: recipes })
	const controller = new ControllerRecipes({ recipes: recipesToShow })

	const displayRecipes = new ViewRecipes()
	recipesToShow.forEach((recipe) => recipeSnippet.innerHTML += (displayRecipes.displayRecipesList(recipe)))

	const searchInput = document.querySelector('#search-zone')

	// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur pour effectuer la recheche
	searchInput.addEventListener('input', (event) => {
		const searchText = event.target.value
		controller.mainSearch(searchText)
		controller.ingredientSearch(searchText)
		controller.applianceSearch(searchText)
		controller.ustensilSearch(searchText)
	})
}


init()

// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur pour effectuer la recheche

console.log('recipes :', recipes)
console.log('recipesToShow :', recipesToShow)
// console.log('recettes filtrées coco :', mainSearchFunction('coco'));

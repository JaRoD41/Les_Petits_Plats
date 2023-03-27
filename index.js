import { recipes } from './scripts/data/recipes.js'
import { ViewRecipes } from './scripts/view/recipeView.js'
import { ControllerRecipes } from './scripts/controller/recipeController.js'

const recipeSnippet = document.getElementById('recipes-zone')
// je crée un tableau vide pour pouvoir y stocker les recettes filtrées
let recipesToShow = []

// Je dois créer un tableau avec toutes les recettes filtrées et l'envoyer dans mon controleur pour effectuer mon tri et utiliser le nouveau tableau pour afficher les recettes triées

function init() {
	// je crée un tableau avec toutes les recettes pour pouvoir les afficher à partir du tableau d'origine
	recipesToShow = recipes.slice()

	// je crée une instance de mon controleur pour pouvoir utiliser les méthodes de mon modèle avec les données de mon tableau de recettes
	const controller = new ControllerRecipes({ recipes: recipesToShow })

	// je crée une instance de ma vue pour pouvoir afficher les recettes
	const displayRecipes = new ViewRecipes()
	recipesToShow.forEach((recipe) => (recipeSnippet.innerHTML += displayRecipes.displayRecipesList(recipe)))

	// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur pour effectuer la recheche
	const searchInput = document.querySelector('#search-zone')

	searchInput.addEventListener('input', (event) => {
		const searchText = event.target.value
		controller.mainSearch(searchText)
		controller.ingredientSearch(searchText)
		controller.applianceSearch(searchText)
		controller.ustensilSearch(searchText)
	})
}


init()


console.log('recipes :', recipes)
console.log('recipesToShow :', recipesToShow)

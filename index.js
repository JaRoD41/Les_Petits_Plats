import { recipes } from './scripts/data/recipes.js'
import { FilterTagView, ViewRecipes } from './scripts/view/recipeView.js'
import { ControllerRecipes } from './scripts/controller/recipeController.js'
import { Recipes } from './scripts/model/recipeModel.js'

// je crée un tableau vide pour pouvoir y stocker les recettes filtrées
let recipesToShow = []
let ingredientArray = []
let applianceArray = []
let ustensilsArray = []

function init() {
	// je crée un tableau avec toutes les recettes pour pouvoir les afficher à partir du tableau d'origine
	recipesToShow = recipes.slice()

	// je crée une instance de mes controleurs pour pouvoir utiliser les méthodes avec les données de mon tableau de recettes
	const controller = new ControllerRecipes(new Recipes(recipesToShow))

	// je récupère les données des mots-clés à afficher depuis mon controleur
	ingredientArray = controller.getBaseIngredients()
	applianceArray = controller.getBaseAppliances()
	ustensilsArray = controller.getBaseUstensils()

	// je crée une instance de ma vue et de controleur pour pouvoir afficher les recettes et gérer les mots-clés lors de la première ouverture de la page
	const recipesDisplay = new ViewRecipes()
	recipesDisplay.displayRecipesList(recipesToShow)
	recipesDisplay.displayButtonLists(ingredientArray, applianceArray, ustensilsArray)
	controller.handleTagSelected()
	controller.handleTagUnSelected()

	controller.mainSearch()
}

init()

export { recipesToShow }

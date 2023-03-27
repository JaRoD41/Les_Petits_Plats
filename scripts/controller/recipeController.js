import { Recipes } from '../model/recipeModel.js'
import { ViewRecipes } from '../view/recipeView.js'
// import { recipesToShow } from '../index.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
	}

	// On envoie le texte saisi dans la barre de recherche dans le controleur qui va filtrer les recettes dans le Modèle et les envoyer dans la Vue pour les afficher
	mainSearch(text) {
		const mainFilteredRecipes = this.filter.mainSearch(this.model.recipes, text)
		console.log('mainFilteredRecipes mainSearch du controleur :', mainFilteredRecipes)
		// recipesToShow = filteredRecipes.slice()
		// recipesToShow.push(...filteredRecipes)
		// this.view.displayRecipesList(recipesToShow)
		// this.view.displayRecipesList(mainFilteredRecipes)
	}

	ingredientSearch(tag) {
		const ingredientTagFilteredRecipes = this.filter.ingredientSearch(this.model.recipes, tag)
		console.log('recherche tag ingredient contrôleur :', ingredientTagFilteredRecipes)
	}

	applianceSearch(tag) {
		const applianceTagFilteredRecipes = this.filter.applianceSearch(this.model.recipes, tag)
		console.log('recherche tag appareil contrôleur :', applianceTagFilteredRecipes)
	}

	ustensilSearch(tag) {
		const ustensilTagFilteredRecipes = this.filter.ustensilSearch(this.model.recipes, tag)
		console.log('recherche tag ustensile contrôleur :', ustensilTagFilteredRecipes)
	}
}

// console.log('recipesToShow dans le contrôleur :', recipesToShow);
import { Recipes } from '../model/recipeModel.js'
import { FilterTagView, ViewRecipes } from '../view/recipeView.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
		this.tagDisplay = new FilterTagView()
	}

	// On envoie le texte saisi dans la barre de recherche dans le controleur qui va filtrer les recettes dans le Modèle

	mainSearch(text) {
		const mainFilteredRecipes = this.filter.mainSearch(this.model.recipes, text)
		console.log('mainFilteredRecipes mainSearch du controleur :', mainFilteredRecipes)
		// On envoie les recettes filtrées dans la vue pour qu'elle les affiche à l'utilisateur
		this.view.displayRecipesList(mainFilteredRecipes)
	}

	resetSearch() {
		const resetFilteredRecipes = this.filter.resetSearch(this.model.recipes)
		console.log('resetFilteredRecipes resetSearch du controleur :', resetFilteredRecipes)
		// On envoie les recettes filtrées dans la vue pour qu'elle les affiche à l'utilisateur
		this.view.displayRecipesList(resetFilteredRecipes)
	}
}

export class FilterTagController {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
		this.tagDisplay = new FilterTagView()
	}

	ingredientSearch(tag, type) {
		const ingredientTagFilteredRecipes = this.filter.ingredientSearch(this.model.recipes, tag)
		console.log('recherche tag ingredient contrôleur :', ingredientTagFilteredRecipes)
		// this.tagDisplay.add(tag, type)
		this.view.displayRecipesList(ingredientTagFilteredRecipes)
	}

	applianceSearch(tag) {
		const applianceTagFilteredRecipes = this.filter.applianceSearch(this.model.recipes, tag)
		console.log('recherche tag appareil contrôleur :', applianceTagFilteredRecipes)
	}

	ustensilSearch(tag) {
		const ustensilTagFilteredRecipes = this.filter.ustensilSearch(this.model.recipes, tag)
		console.log('recherche tag ustensile contrôleur :', ustensilTagFilteredRecipes)
	}

	deleteTag(tag) {
		console.log('tag supprimé :', tag)
	}
}

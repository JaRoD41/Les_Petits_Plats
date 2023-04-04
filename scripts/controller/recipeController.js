import { Recipes } from '../model/recipeModel.js'
import { FilterTagView, ViewRecipes } from '../view/recipeView.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
		this.tagDisplay = new FilterTagView()
		this.searchInput = document.querySelector('#search-zone')
	}

	// On envoie le texte saisi dans la barre de recherche dans le controleur qui va filtrer les recettes dans le Modèle

	mainSearch() {
		this.searchInput.addEventListener('input', (event) => {
			this.searchText = event.target.value
			this.mainInputLength = this.searchText.length
			const mainFilteredRecipes = this.filter.mainSearch(this.model.recipes, this.searchText)
			const resetFilteredRecipes = this.filter.resetSearch(this.model.recipes)
			if (this.mainInputLength > 3) {
				this.view.displayRecipesList(mainFilteredRecipes)
			} else if (this.mainInputLength <= 2) {
				this.view.displayRecipesList(resetFilteredRecipes)
			}
			console.log('mainFilteredRecipes mainSearch du controleur :', mainFilteredRecipes)
		})

		// On envoie les recettes filtrées dans la vue pour qu'elle les affiche à l'utilisateur
	}
}

export class FilterTagController {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
		this.tagDisplay = new FilterTagView()
		this.recipesToShow = this.model.recipes
	}

	ingredientSearch(tag, type) {
		const ingredientTagFilteredRecipes = this.filter.ingredientSearch(this.model.recipes, tag)
		console.log('recherche tag ingredient contrôleur :', ingredientTagFilteredRecipes)
		// this.tagDisplay.add(tag, type)
		this.recipesToShow = ingredientTagFilteredRecipes
		this.view.displayRecipesList(this.recipesToShow)
	}

	applianceSearch(tag, type) {
		const applianceTagFilteredRecipes = this.filter.applianceSearch(this.model.recipes, tag)
		console.log('recherche tag appareil contrôleur :', applianceTagFilteredRecipes)
		// this.tagDisplay.add(tag, type)
		this.view.displayRecipesList(applianceTagFilteredRecipes)
	}

	ustensilSearch(tag) {
		const ustensilTagFilteredRecipes = this.filter.ustensilSearch(this.model.recipes, tag)
		console.log('recherche tag ustensile contrôleur :', ustensilTagFilteredRecipes)
		// this.tagDisplay.add(tag, type)
		this.view.displayRecipesList(ustensilTagFilteredRecipes)
	}

	// Méthode pour supprimer un tag de filtre
	// remove(tag) {
	// 	tag.style.display = 'none'

	// 	console.log('ingredientArray depuis Controller :', ingredientArray)
	// }

	reset() {
		const resetTagFilteredRecipes = this.tagDisplay.resetSearch(this.model.recipes)
		console.log('resetTagFilteredRecipes resetTags du controleur :', resetTagFilteredRecipes)
		// On envoie les recettes filtrées dans la vue pour qu'elle les affiche à l'utilisateur
		this.view.displayRecipesList(resetTagFilteredRecipes)
	}
}

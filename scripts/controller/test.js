import { Recipes } from '../model/recipeModel.js'
import { FilterTagView, ViewRecipes } from '../view/recipeView.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
		this.tagDisplay = new FilterTagView()
		this.searchInput = document.querySelector('#search-zone')
		this.keywordsToClick = document.querySelectorAll('.accordion-body ul li')
		this.selectedTags = []
	}

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
	}

	keywordsSearch() {
		this.keywordsToClick.forEach((keyword) => {
			keyword.addEventListener('click', (event) => {
				const keywordToSearch = event.target
        // Ici, je récupère le nom de l'array dans lequel se trouve le mot clé cliqué
				const keywordArray = keywordToSearch.closest('ul').id.replace('List', '')
				const keywordTagToSearch = event.target.innerText
        // Je push le mot clé cliqué dans mon tableau de tags sélectionnés
				this.selectedTags.push(keywordTagToSearch)
				if (keywordArray === 'ingredient') {
					ingredientArray.push(keywordTagToSearch)
					for (let i = 0; i < ingredientArray.length; i++) {
						this.filter.ingredientSearch(this.model.recipes, ingredientArray[i])
					}
					this.tagDisplay.add(keywordTagToSearch, keywordArray)
				} else if (keywordArray === 'appliance') {
					applianceArray.push(keywordTagToSearch)
					for (let i = 0; i < applianceArray.length; i++) {
						this.filter.applianceSearch(this.model.recipes, applianceArray[i])
					}
					this.tagDisplay.add(keywordTagToSearch, keywordArray)
				} else if (keywordArray === 'ustensils') {
					ustensilArray.push(keywordTagToSearch)
					for (let i = 0; i < ustensilArray.length; i++) {
						this.filter.ustensilSearch(this.model.recipes, ustensilArray[i])
					}
					this.tagDisplay.add(keywordTagToSearch, keywordArray)
				}
			})
		})
	}

	removeTag(tag) {
		const index = this.selectedTags.indexOf(tag)
		if (index > -1) {
			this.selectedTags.splice(index, 1)
		}
	}

	hasSelectedTags() {
		return this.selectedTags.length > 0
	}

	resetRecipes() {
		this.view.displayRecipesList(this.model.recipes)
	}
}

function init() {
	recipesToShow = recipes.slice()
	const controller = new ControllerRecipes({ recipes: recipesToShow })
	controller.mainSearch()
	controller.keywordsSearch()
	const displayRecipes = new ViewRecipes()
	displayRecipes.displayRecipesList(recipesToShow)
}
init()

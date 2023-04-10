import { Recipes } from '../model/recipeModel.js'
import { FilterTagView, ViewRecipes, KeywordsView } from '../view/recipeView.js'
import { Event } from './Event.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.event = new Event()
		this.view = new ViewRecipes()
		this.tagDisplay = new FilterTagView()
		this.keywordsDisplay = new KeywordsView()
		this.searchInput = document.querySelector('#search-zone')
		this.ingredientSearchInput = document.querySelector('#ingredient-input')
		this.applianceSearchInput = document.querySelector('#appliance-input')
		this.ustensilsSearchInput = document.querySelector('#ustensils-input')
		// this.keywordsToClick = document.querySelectorAll('.accordion-body ul li')
		// Je crée un tableau qui va contenir les tags sélectionnés
		this.selectedTags = []
		this.ingredientArray = []
		this.applianceArray = []
		this.ustensilsArray = []
		this.mainFilteredRecipes = []
		this.resetFilteredRecipes = []
		this.mainInputLength = 0
		// this.view.listenSearchInput((searchText) => {
		// 	this.searchText = searchText
		// 	this.mainInputLength = searchText.length
		// })
		// this.recipesToShow = this.model.recipes
	}

	// On envoie le texte saisi dans la barre de recherche dans le controleur qui va filtrer les recettes dans le Modèle

	mainSearch() {
		this.searchInput.addEventListener('input', (event) => {
			this.searchText = event.target.value
			this.mainInputLength = this.searchText.length
			// Si la longueur de la recherche est inférieure ou égale à 2, on réinitialise la recherche
			const mainFilteredRecipes = this.filter.mainSearch(this.model.recipes, this.searchText)
			const resetFilteredRecipes = this.filter.resetSearch(this.model.recipes)
			if (this.mainInputLength > 3) {
				this.view.displayRecipesList(mainFilteredRecipes)
				// this.keywordsDisplay.displayKeywordsList(mainFilteredRecipes)
			} else if (this.mainInputLength <= 2) {
				this.view.displayRecipesList(resetFilteredRecipes)
				// this.keywordsDisplay.displayKeywordsList(resetFilteredRecipes)
			}
			console.log('mainSearch du controleur :', mainFilteredRecipes)
		})
	}

	// Méthode qui va récupérer les mots clés cliqués et les envoyer au Modèle pour filtrer les recettes et créeer les tags
	keywordsSearch() {
		// this.keywordsToClick.forEach((keyword) => {
		// 	keyword.addEventListener('click', (event) => {
		// 		const keywordToSearch = event.target
		// 		// Ici, je récupère le nom de l'array dans lequel se trouve le mot clé cliqué
		// 		const keywordArray = keywordToSearch.closest('ul').id.replace('List', '')
		// 		const keywordTagToSearch = event.target.innerText
		// 		// Je push le mot clé cliqué dans mon tableau de tags sélectionnés
		// 		this.selectedTags.push(keywordTagToSearch)
		// 		console.log('Selected Tags :', this.selectedTags)
		// 		if (keywordArray === 'ingredient') {
		// 			// const ingredientTagFilteredRecipes = this.filter.ingredientSearch(this.model.recipes, this.selectedTags)
		// 			// console.log('ingredientTagFilteredRecipes :', ingredientTagFilteredRecipes);
		// 			this.ingredientArray.push(keywordTagToSearch)
		// 			// Je boucle sur mon tableau de tags sélectionnés pour les passer en paramètre à ma méthode de recherche
		// 			for (let i = 0; i < this.ingredientArray.length; i++) {
		// 				this.filter.applianceSearch(this.model.recipes, this.ingredientArray[i])
		// 			}
		// 			this.tagDisplay.add(keywordTagToSearch, keywordArray)
		// 			// this.view.displayRecipesList(this.model.recipes)
		// 		} else if (keywordArray === 'appliance') {
		// 			this.applianceArray.push(keywordTagToSearch)
		// 			// Je boucle sur mon tableau de tags sélectionnés pour les passer en paramètre à ma méthode de recherche
		// 			for (let i = 0; i < this.applianceArray.length; i++) {
		// 				this.filter.applianceSearch(this.model.recipes, this.applianceArray[i])
		// 			}
		// 			this.tagDisplay.add(keywordTagToSearch, keywordArray)
		// 		} else if (keywordArray === 'ustensils') {
		// 			this.ustensilsArray.push(keywordTagToSearch)
		// 			// Je boucle sur mon tableau de tags sélectionnés pour les passer en paramètre à ma méthode de recherche
		// 			for (let i = 0; i < this.ustensilsArray.length; i++) {
		// 				this.filter.ustensilsSearch(this.model.recipes, this.ustensilsArray[i])
		// 			}
		// 			this.tagDisplay.add(keywordTagToSearch, keywordArray)
		// 		}
		// 	})
		// })
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



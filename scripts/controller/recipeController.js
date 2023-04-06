import { Recipes } from '../model/recipeModel.js'
import { FilterTagView, ViewRecipes, KeywordsView } from '../view/recipeView.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
		this.tagDisplay = new FilterTagView()
		this.keywordsDisplay = new KeywordsView()
		this.searchInput = document.querySelector('#search-zone')
		this.keywordsToClick = document.querySelectorAll('.accordion-body ul li')
		// Je crée un tableau qui va contenir les tags sélectionnés
		this.selectedTags = []
		this.ingredientArray = []
		this.applianceArray = []
		this.ustensilsArray = []
		this.mainFilteredRecipes = []
		this.resetFilteredRecipes = []
		this.mainInputLength = 0
		this.view.listenSearchInput((searchText) => {
			this.searchText = searchText
			this.mainInputLength = searchText.length
		})
		// this.recipesToShow = this.model.recipes
	}

	// On envoie le texte saisi dans la barre de recherche dans le controleur qui va filtrer les recettes dans le Modèle

	mainSearch() {
		this.view.listenSearchInput()
		console.log('this.searchText depuis le controleur :', this.searchText)
		console.log('this.model depuis le controleur :', this.model)
		// Si la longueur de la recherche est inférieure ou égale à 2, on réinitialise la recherche
		const mainFilteredRecipes = this.filter.mainSearch(this.model.recipes, this.searchText)
		const resetFilteredRecipes = this.filter.resetSearch(this.model.recipes)
		if (this.mainInputLength > 3) {
			this.view.displayRecipesList(mainFilteredRecipes)
		} else if (this.mainInputLength <= 2) {
			this.view.displayRecipesList(resetFilteredRecipes)
		}
		console.log('mainSearch du controleur :', mainFilteredRecipes)
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
				console.log('Selected Tags :', this.selectedTags)
				if (keywordArray === 'ingredient') {
					// const ingredientTagFilteredRecipes = this.filter.ingredientSearch(this.model.recipes, this.selectedTags)
					// console.log('ingredientTagFilteredRecipes :', ingredientTagFilteredRecipes);
					this.ingredientArray.push(keywordTagToSearch)
					// Je boucle sur mon tableau de tags sélectionnés pour les passer en paramètre à ma méthode de recherche
					for (let i = 0; i < this.ingredientArray.length; i++) {
						this.filter.applianceSearch(this.model.recipes, this.ingredientArray[i])
					}
					this.tagDisplay.add(keywordTagToSearch, keywordArray)
					// this.view.displayRecipesList(this.model.recipes)
				} else if (keywordArray === 'appliance') {
					this.applianceArray.push(keywordTagToSearch)
					// Je boucle sur mon tableau de tags sélectionnés pour les passer en paramètre à ma méthode de recherche
					for (let i = 0; i < this.applianceArray.length; i++) {
						this.filter.applianceSearch(this.model.recipes, this.applianceArray[i])
					}
					this.tagDisplay.add(keywordTagToSearch, keywordArray)
				} else if (keywordArray === 'ustensils') {
					this.ustensilsArray.push(keywordTagToSearch)
					// Je boucle sur mon tableau de tags sélectionnés pour les passer en paramètre à ma méthode de recherche
					for (let i = 0; i < this.ustensilsArray.length; i++) {
						this.filter.ustensilsSearch(this.model.recipes, this.ustensilsArray[i])
					}
					this.tagDisplay.add(keywordTagToSearch, keywordArray)
				}
			})
		})
	}
}

// export class FilterTagController {
// 	constructor(model) {
// 		this.model = model
// 		this.filter = new Recipes()
// 		this.view = new ViewRecipes()
// 		this.tagDisplay = new FilterTagView()
// 		this.recipesToShow = this.model.recipes
// 	}

// 	ingredientSearch(tag, type) {
// 		const ingredientTagFilteredRecipes = this.filter.ingredientSearch(this.model.recipes, tag)
// 		console.log('recherche tag ingredient contrôleur :', ingredientTagFilteredRecipes)
// 		this.recipesToShow = ingredientTagFilteredRecipes
// 		this.view.displayRecipesList(this.recipesToShow)
// 	}

// 	applianceSearch(tag, type) {
// 		const applianceTagFilteredRecipes = this.filter.applianceSearch(this.model.recipes, tag)
// 		console.log('recherche tag appareil contrôleur :', applianceTagFilteredRecipes)
// 		// this.tagDisplay.add(tag, type)
// 		this.view.displayRecipesList(applianceTagFilteredRecipes)
// 	}

// 	ustensilSearch(tag) {
// 		const ustensilTagFilteredRecipes = this.filter.ustensilSearch(this.model.recipes, tag)
// 		console.log('recherche tag ustensile contrôleur :', ustensilTagFilteredRecipes)
// 		// this.tagDisplay.add(tag, type)
// 		this.view.displayRecipesList(ustensilTagFilteredRecipes)
// 	}

// 	// Méthode pour supprimer un tag de filtre
// 	// remove(tag) {
// 	// 	tag.style.display = 'none'

// 	// 	console.log('ingredientArray depuis Controller :', ingredientArray)
// 	// }

// 	reset() {
// 		const resetTagFilteredRecipes = this.tagDisplay.resetSearch(this.model.recipes)
// 		console.log('resetTagFilteredRecipes resetTags du controleur :', resetTagFilteredRecipes)
// 		// On envoie les recettes filtrées dans la vue pour qu'elle les affiche à l'utilisateur
// 		this.view.displayRecipesList(resetTagFilteredRecipes)
// 	}
// }

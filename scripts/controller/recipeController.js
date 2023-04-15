import { Recipes } from '../model/recipeModel.js'
import { FilterTagView, ViewRecipes, KeywordsView } from '../view/recipeView.js'
import { Event } from './Event.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.searchInput = document.querySelector('#search-zone')
		this.ingredientSearchInput = document.querySelector('#ingredient-input')
		this.applianceSearchInput = document.querySelector('#appliance-input')
		this.ustensilsSearchInput = document.querySelector('#ustensils-input')
		// Je crée un tableau qui va contenir les tags sélectionnés
		this.selectedTags = []
		this.tagToDisplay = ''

		this.ingredientArray = []
		this.applianceArray = []
		this.ustensilsArray = []
		this.mainFilteredRecipes = []
		this.resetFilteredRecipes = []
		this.mainInputLength = 0

		// Tableau des différents mots-clés disponibles
		this.availableIngredientKeywords = document.querySelectorAll('#collapseOne .accordion-body ul li')
		this.availableApplianceKeywords = document.querySelectorAll('#collapseTwo .accordion-body ul li')
		this.availableUstensilsKeywords = document.querySelectorAll('#collapseThree .accordion-body ul li')

		// // Je crée une instance de ma classe Recipes pour pouvoir filtrer les recettes
		// this.filter = new Recipes()
		// gestion des événements
		this.event = new Event()

		// Je crée et j'écoute les événements liés aux recherches par ingrédient, appareil et ustensile
		this.event.addListener(this.handleIngredientSearch.bind(this))
		this.event.addListener(this.handleApplianceSearch.bind(this))
		this.event.addListener(this.handleUstensilsSearch.bind(this))

		this.ingredientSearchInput.addEventListener('input', (event) => {
			this.event.trigger(event)
		})
		this.applianceSearchInput.addEventListener('input', (event) => {
			this.event.trigger(event)
		})
		this.ustensilsSearchInput.addEventListener('input', (event) => {
			this.event.trigger(event)
		})

		// Je crée une instance de ma vue pour pouvoir afficher les recettes
		this.view = new ViewRecipes()
		// Je crée une instance de ma classe FilterTagView pour pouvoir afficher les tags de filtre
		this.tagDisplay = new FilterTagView()
	}

	// On envoie le texte saisi dans la barre de recherche dans le controleur qui va filtrer les recettes dans le Modèle

	mainSearch() {
		this.searchInput.addEventListener('input', (event) => {
			this.searchText = event.target.value
			this.mainInputLength = this.searchText.length
			this.model.mainSearch = this.searchText
			// On crée une variable qui va contenir les recettes filtrées par la recherche
			const mainFilteredRecipes = this.model.getRecipesFilteredBySearch()
			let resetFilteredRecipes = this.model.getRecipesFilteredBySearch()
			console.log('resetFilteredRecipes :', resetFilteredRecipes)
			// Si la longueur de la recherche est supérieure à 3, on affiche les recettes filtrées
			if (this.mainInputLength > 3) {
				if (mainFilteredRecipes.length != 0) {
					this.view.displayRecipesList(mainFilteredRecipes)
					this.view.displayButtonLists(
						this.model.getIngredientList(),
						this.model.getApplianceList(),
						this.model.getUstensilList()
					)
					this.handleTagSelected()
					this.handleTagUnSelected()
				} else {
					this.view.displayNoRecipeMessage()
				}

				// Sinon, on affiche toutes les recettes
			}
			if (this.mainInputLength <= 2 || this.mainInputLength == 0) {
				resetFilteredRecipes = this.model.resetRecipes()
				this.view.displayRecipesList(resetFilteredRecipes)
				this.view.displayButtonLists(
					this.model.getIngredientList(),
					this.model.getApplianceList(),
					this.model.getUstensilList()
				)
				this.handleTagSelected()
				this.handleTagUnSelected()
			}
		})
	}

	getBaseIngredients() {
		this.ingredientArray = this.model.getFirstIngredientList()
		return this.ingredientArray
	}

	getBaseAppliances() {
		this.applianceArray = this.model.getFirstApplianceList()
		return this.applianceArray
	}

	getBaseUstensils() {
		this.ustensilsArray = this.model.getFirstUstensilList()
		return this.ustensilsArray
	}

	// Méthode d'écoute des tags sélectionnés dans les listes déroulantes
	handleTagSelected() {
		const listOfAllTags = document.querySelectorAll('.accordion-body ul li')
		for (let tag of listOfAllTags) {
			tag.addEventListener('click', () => {
				const keywordArray = tag.closest('ul').id.replace('List', '')
				this.tagToDisplay = tag.textContent
				// Je récupère l'élément parent de l'élément cliqué et je referme le collapse du bouton
				let collapseElement = tag.closest('.accordion-collapse')
				let collapseInstance = bootstrap.Collapse.getInstance(collapseElement)
				if (collapseInstance) {
					collapseInstance.hide()
				}

				this.model.addTag(keywordArray, this.tagToDisplay)
				this.selectedTags = this.model.getSelectedTags()
				console.log('listOfAllTags :', listOfAllTags);
				console.log('liste des tags avant suppression :', this.selectedTags);
				this.tagDisplay.add(keywordArray, this.tagToDisplay)

				if (this.model.getRecipesFilteredBySearchAndTags(this.tagToDisplay, keywordArray)) {
					this.view.displayRecipesList(this.model.getRecipesFilteredBySearchAndTags(this.tagToDisplay, keywordArray))
					this.view.displayButtonLists(
						this.model.getIngredientList(),
						this.model.getApplianceList(),
						this.model.getUstensilList()
					)
					this.handleTagSelected()
					this.handleTagUnSelected()
				} else {
					this.view.displayNoRecipeMessage()
				}
			})
		}
	}

	handleTagUnSelected() {
		const tagCloseBtn = document.querySelectorAll('.tag-close')
		tagCloseBtn.forEach((tag) => {
			tag.addEventListener('click', (event) => {
				const tagToDelete = event.target.closest('.tag')
				const tagContent = tagToDelete.textContent
				console.log('tag supprimé :', tagContent);
				tagToDelete.style.display = 'none'
				this.removeTag(tagContent)
				console.log('list des tags après suppression :', this.selectedTags);
				// je récupère le contenu du tag pour pouvoir le passer en paramètre à la méthode remove de la classe FilterTagView
				// removeTags.remove(event)
			})
		})
	}

	// Code des méthodes de recherche par mots-clés //

	handleIngredientSearch(event) {
		this.ingredientSearchText = event.target.value
		this.ingredientInputLength = this.ingredientSearchText.length
		// On affiche les mots-clés restants qui correspondent à la recherche
		this.view.filterIngredients(this.ingredientSearchText)
	}

	handleApplianceSearch(event) {
		this.applianceSearchText = event.target.value
		this.applianceInputLength = this.applianceSearchText.length
		// On affiche les mots-clés restants qui correspondent à la recherche
		this.view.filterAppliances(this.applianceSearchText)
		// const applianceFilteredRecipes = this.filter.applianceSearch(this.model.recipes, this.applianceSearchText)
		// const resetFilteredRecipes = this.filter.resetSearch(this.model.recipes)
		// if (this.applianceInputLength > 3) {
		// 	this.view.displayRecipesList(applianceFilteredRecipes)
		// } else if (this.applianceInputLength <= 2) {
		// 	this.view.displayRecipesList(resetFilteredRecipes)
		// }
		// console.log('applianceSearch du controleur :', applianceFilteredRecipes)
	}

	handleUstensilsSearch(event) {
		this.ustensilsSearchText = event.target.value
		this.ustensilsInputLength = this.ustensilsSearchText.length
		// On affiche les mots-clés restants qui correspondent à la recherche
		this.view.filterUstensils(this.ustensilsSearchText)
		// const ustensilsFilteredRecipes = this.filter.ustensilsSearch(this.model.recipes, this.ustensilsSearchText)
		// const resetFilteredRecipes = this.filter.resetSearch(this.model.recipes)
		// if (this.ustensilsInputLength > 3) {
		// 	this.view.displayRecipesList(ustensilsFilteredRecipes)
		// } else if (this.ustensilsInputLength <= 2) {
		// 	this.view.displayRecipesList(resetFilteredRecipes)
		// }
		// console.log('ustensilsSearch du controleur :', ustensilsFilteredRecipes)
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

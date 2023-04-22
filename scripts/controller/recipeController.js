import { FilterTagView, ViewRecipes } from '../view/recipeView.js'
import { Event } from './Event.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.searchInput = document.querySelector('#search-zone')
		this.ingredientSearchInput = document.querySelector('#ingredient-input')
		this.applianceSearchInput = document.querySelector('#appliance-input')
		this.ustensilsSearchInput = document.querySelector('#ustensils-input')
		// Je crée un tableau qui va contenir les tags sélectionnés
		this.selectedTags = this.model.getSelectedTags()
		this.tagToDisplay = ''

		this.ingredientArray = []
		this.applianceArray = []
		this.ustensilsArray = []
		this.mainFilteredRecipes = []
		this.resetFilteredRecipes = []
		this.mainInputLength = 0

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
		this.tagView = new FilterTagView()
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
					this.view.checkDisplayNoRecipeMessage()
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

	// Les 3 méthodes d'obtention des listes d'ingrédients, d'appareils et d'ustensiles pour le premier affichage

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

	// Méthode d'écoute du clic d'ouverture ou de fermeture de la liste déroulante des tags

	handleToggleButtons() {
		// On récupère tous les boutons de la liste déroulante
		const inputButtons = document.querySelectorAll('.filter_button input')
		const collapseElements = document.querySelectorAll('.accordion-collapse')
		for (let i = 0; i < inputButtons.length; i++) {
			const inputButton = inputButtons[i]
			const collapseElement = collapseElements[i]

			// On modifie le placeholder du bouton cliqué et son opacité à l'ouverture de la liste déroulante
			collapseElement.addEventListener('show.bs.collapse', () => {
				switch (inputButton.id) {
					case 'ingredient-input':
						inputButton.placeholder = 'Rechercher un ingrédient'
						if (inputButton.classList.contains('opacity-100')) {
							inputButton.classList.remove('opacity-100')
						}
						inputButton.classList.add('opacity-50')
						break
					case 'appliance-input':
						inputButton.placeholder = 'Rechercher un appareil'
						if (inputButton.classList.contains('opacity-100')) {
							inputButton.classList.remove('opacity-100')
						}
						inputButton.classList.add('opacity-50')
						break
					case 'ustensils-input':
						inputButton.placeholder = 'Rechercher un ustensile'
						if (inputButton.classList.contains('opacity-100')) {
							inputButton.classList.remove('opacity-100')
						}
						inputButton.classList.add('opacity-50')
						break
				}
			})

			// On restaure le placeholder initial et l'opacité lorsque la liste déroulante se ferme
			collapseElement.addEventListener('hide.bs.collapse', () => {
				switch (inputButton.id) {
					case 'ingredient-input':
						inputButton.placeholder = 'Ingredients'
						inputButton.value = ''
						if (inputButton.classList.contains('opacity-50')) {
							inputButton.classList.remove('opacity-50')
						}
						inputButton.classList.add('opacity-100')
						break
					case 'appliance-input':
						inputButton.placeholder = 'Appareils'
						inputButton.value = ''
						if (inputButton.classList.contains('opacity-50')) {
							inputButton.classList.remove('opacity-50')
						}
						inputButton.classList.add('opacity-100')
						break
					case 'ustensils-input':
						inputButton.placeholder = 'Ustensiles'
						inputButton.value = ''
						if (inputButton.classList.contains('opacity-50')) {
							inputButton.classList.remove('opacity-50')
						}
						inputButton.classList.add('opacity-100')
						break
				}
			})
		}
	}

	// Méthode d'écoute des tags sélectionnés dans les listes déroulantes

	handleTagSelected() {
		this.handleToggleButtons()
		const listOfAllTags = document.querySelectorAll('.accordion-body ul li')
		for (let tag of listOfAllTags) {
			tag.addEventListener('click', () => {
				const keywordArray = tag.closest('ul').id.replace('List', '')
				this.tagToDisplay = tag.textContent
				// je vérifie si le tag sélectionné est déjà affiché
				const isInTags = this.selectedTags.some((tag) => tag.value === this.tagToDisplay)

				// Je récupère l'élément parent de l'élément cliqué et je referme le collapse du bouton
				let collapseElement = tag.closest('.accordion-collapse')
				let collapseInstance = bootstrap.Collapse.getInstance(collapseElement)
				if (collapseInstance) {
					collapseInstance.hide()
				}

				// On ajoute le tag sélectionné au tableau créé dans le modèle s'il n'est pas déjà présent
				if (!isInTags) {
					this.model.addTag(keywordArray, this.tagToDisplay)
					this.tagView.add(keywordArray, this.tagToDisplay)
				}
				// On affiche les recettes filtrées par les tags sélectionnés
				if (this.model.getRecipesFilteredBySearchAndTags(this.tagToDisplay, keywordArray)) {
					this.view.displayRecipesList(this.model.getRecipesFilteredBySearchAndTags(this.tagToDisplay, keywordArray))
					this.view.displayButtonLists(
						this.model.getIngredientList(),
						this.model.getApplianceList(),
						this.model.getUstensilList()
					)
					this.handleToggleButtons()
					this.handleTagSelected()
				} else {
					this.view.checkDisplayNoRecipeMessage()
				}
			})
		}
		// this.view.displayRecipesList(this.model.getRecipesFilteredBySearchAndTags())
		this.handleTagUnSelected()
	}

	// Méthode d'écoute des tags supprimés

	handleTagUnSelected() {
		this.selectedTags = this.model.getSelectedTags()
		const tagCloseBtn = document.querySelectorAll('.tag-close')
		tagCloseBtn.forEach((tag) => {
			tag.addEventListener('click', (event) => {
				// On récupère le type du tag à supprimer
				// On trouve le bouton parent
				const button = event.target.closest('button')
				// Récupérer le type du tag à supprimer
				const tagType = button.getAttribute('data-type')
				// On supprime le tag de la liste des tags sélectionnés dans la Vue
				this.tagView.remove(event)
				// On récupère le tag à supprimer
				const tagToDelete = event.target.closest('.tag')
				const tagContent = tagToDelete.textContent.split('\n')[0].trim()
				// On supprime le tag de la liste des tags sélectionnés dans le Modèle
				this.model.removeTag(this.selectedTags, tagType, tagContent)
				this.selectedTags = this.model.getSelectedTags()
				this.handleSearchAfterDeletedTag()
			})
		})
	}

	// Méthode de filtrage des mots-clés restants et d'affichage des recettes en fonction //

	handleSearchAfterDeletedTag() {
		let filteredRecipes = this.model.getRecipesFilteredBySearch()
		if (this.selectedTags.length === 0) {
			this.view.displayRecipesList(filteredRecipes)
		} else {
			this.selectedTags.forEach((tag) => {
				filteredRecipes = filteredRecipes.filter((recipe) =>
					this.model.getRecipesFilteredBySearchAndTags(tag.value, tag.type).includes(recipe)
				)
			})
			this.view.displayRecipesList(filteredRecipes)
		}
		this.view.displayButtonLists(
			this.model.getIngredientList(),
			this.model.getApplianceList(),
			this.model.getUstensilList()
		)
		// this.view.displayRecipesList(filteredRecipes)
		this.handleToggleButtons()
		this.handleTagSelected()
	}

	// Code des méthodes de recherche par mots-clés et affichage des mots-clés restants //

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
	}

	handleUstensilsSearch(event) {
		this.ustensilsSearchText = event.target.value
		this.ustensilsInputLength = this.ustensilsSearchText.length
		// On affiche les mots-clés restants qui correspondent à la recherche
		this.view.filterUstensils(this.ustensilsSearchText)
	}

	// Méthode de suppression d'un tag de la liste des tags sélectionnés
	removeTag(type, value) {
		this.selectedTags[type].delete(value)
	}

	// Méthode d'écoute si tag présent ou non dans la liste des tags sélectionnés
	hasSelectedTags() {
		return this.selectedTags.length > 0
	}

	// Méthode de réinitialisation des recettes affichées
	resetRecipes() {
		this.view.displayRecipesList(this.model.recipes)
	}
}

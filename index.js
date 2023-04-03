import { recipes } from './scripts/data/recipes.js'
import { FilterTagView, ViewRecipes } from './scripts/view/recipeView.js'
import { FilterTagController, ControllerRecipes } from './scripts/controller/recipeController.js'

// je crée un tableau vide pour pouvoir y stocker les recettes filtrées
let recipesToShow = []
let ingredientArray = []
let applianceArray = []
let ustensilArray = []

// Je dois créer un tableau avec toutes les recettes filtrées et l'envoyer dans mon controleur pour effectuer mon tri et utiliser le nouveau tableau pour afficher les recettes triées

function init() {
	// je crée un tableau avec toutes les recettes pour pouvoir les afficher à partir du tableau d'origine
	recipesToShow = recipes.slice()

	// je crée une instance de mes controleurs pour pouvoir utiliser les méthodes avec les données de mon tableau de recettes
	const controller = new ControllerRecipes({ recipes: recipesToShow })
	const filterTagController = new FilterTagController({ recipes: recipesToShow })

	// je crée une instance de ma vue pour pouvoir afficher les recettes
	const displayRecipes = new ViewRecipes()
	displayRecipes.displayRecipesList(recipesToShow)

	// je crée une instance de ma vue pour pouvoir afficher/supprimer les tags de filtrage des recettes
	const displayTags = new FilterTagView()

	// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur
	const searchInput = document.querySelector('#search-zone')
	const keywordsToClick = document.querySelectorAll('.accordion-body ul li')

	searchInput.addEventListener('input', (event) => {
		const searchText = event.target.value
		let mainInputLength = searchText.length

		if (mainInputLength > 3) {
			controller.mainSearch(searchText)
		} else if (mainInputLength <= 2) {
			controller.resetSearch()
		}
	})

	// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur pour afficher les tags

	// Écouteur d'événement pour ajouter un tag de filtre
	keywordsToClick.forEach((keyword) => {
		keyword.addEventListener('click', (event) => {
			const keywordToSearch = event.target
			const keywordArray = keywordToSearch.closest('ul').id.replace('List', '')
			const keywordTagToSearch = event.target.innerText
			console.log(keywordTagToSearch)
			// JE DOIS ENVOYER LE TEXTE DU TAG CLIQUÉ DANS LE CONTROLEUR POUR FILTRER LES RECETTES APRES AVOIR VERIFIÉ SI LE TAG CLIQUÉ EST UN INGREDIENT, UN APPAREIL OU UN USTENSILE

			// J'appelle ma méthode créée pour lancer la recherche des recettes par ces tags et les afficher

			if (keywordArray === 'ingredient') {
				ingredientArray.push(keywordTagToSearch)
				console.log(ingredientArray)
				// Je crée une boucle pour pouvoir envoyer chaque mot clé du tableau ingredient dans ma méthode de recherche 
				for (let i = 0; i < ingredientArray.length; i++) {
					filterTagController.ingredientSearch(ingredientArray[i], keywordArray)
				}
				displayTags.add(keywordTagToSearch, keywordArray)
			} else if (keywordArray === 'appliance') {
				applianceArray.push(keywordTagToSearch)
				console.log(applianceArray)
				// Je crée une boucle pour pouvoir envoyer chaque mot clé du tableau appliance dans ma méthode de recherche
				for (let i = 0; i < applianceArray.length; i++) {
					filterTagController.applianceSearch(applianceArray[i], keywordArray)
				}
				
			} else if (keywordArray === 'ustensil') {
				ustensilArray.push(keywordTagToSearch)
				console.log(ustensilArray)
				// Je crée une boucle pour pouvoir envoyer chaque mot clé du tableau ustensils dans ma méthode de recherche
				for (let i = 0; i < ustensilArray.length; i++) {
					filterTagController.ustensilSearch(ustensilArray[i], keywordArray)
				}
			}
		})
	})
}

init()

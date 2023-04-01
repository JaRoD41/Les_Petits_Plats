import { recipes } from './scripts/data/recipes.js'
import { FilterTagView, ViewRecipes } from './scripts/view/recipeView.js'
import { ControllerRecipes } from './scripts/controller/recipeController.js'

// je crée un tableau vide pour pouvoir y stocker les recettes filtrées
let recipesToShow = []
let ingredientArray = []
let applianceArray = []
let ustensilArray = []

// Je dois créer un tableau avec toutes les recettes filtrées et l'envoyer dans mon controleur pour effectuer mon tri et utiliser le nouveau tableau pour afficher les recettes triées

function init() {
	// je crée un tableau avec toutes les recettes pour pouvoir les afficher à partir du tableau d'origine
	recipesToShow = recipes.slice()

	// je crée une instance de mon controleur pour pouvoir utiliser les méthodes de mon modèle avec les données de mon tableau de recettes
	const controller = new ControllerRecipes({ recipes: recipesToShow })

	// je crée une instance de ma vue pour pouvoir afficher les recettes
	const displayRecipes = new ViewRecipes()
	displayRecipes.displayRecipesList(recipesToShow)

	// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur
	const searchInput = document.querySelector('#search-zone')
	const keywordsToClick = document.querySelectorAll('.accordion-body ul li')
	keywordsToClick.forEach((keyword) => {
		keyword.addEventListener('click', (event) => {
			const keywordToSearch = event.target.innerText
			console.log(keywordToSearch)
			// JE DOIS ENVOYER LE TEXTE DU TAG CLIQUÉ DANS LE CONTROLEUR POUR FILTRER LES RECETTES APRES AVOIR VERIFIÉ SI LE TAG CLIQUÉ EST UN INGREDIENT, UN APPAREIL OU UN USTENSILE
			// je crée une instance de ma vue pour pouvoir afficher les tags de filtrage des recettes
			const displayTags = new FilterTagView()
			displayTags.add(keywordToSearch, "ustensil")
		})
	})

	searchInput.addEventListener('input', (event) => {
		const searchText = event.target.value
		let mainInputLength = searchText.length 

		if (mainInputLength > 3) {
			controller.mainSearch(searchText)
			controller.ingredientSearch(searchText)
			controller.applianceSearch(searchText)
			controller.ustensilSearch(searchText)

		}
		else if (mainInputLength === 0) {
			controller.resetSearch()
		}
	})

	// Code pour ajouter les écouteurs d'événements que j'envoie dans le controleur pour afficher les tags


}

init()

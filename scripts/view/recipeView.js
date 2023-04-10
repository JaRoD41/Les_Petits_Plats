import { recipesToShow } from '../../index.js'
import { ControllerRecipes } from '../controller/recipeController.js'

export class ViewRecipes {
	constructor(controller) {
		this.controller = controller
		this.ingredientlist = []
		this.applianceList = []
		this.ustensilsList = []
		this.ingredientButtonList = document.getElementById('ingredientList')
		this.applianceButtonList = document.getElementById('applianceList')
		this.ustensilsButtonList = document.getElementById('ustensilsList')

		// J'utilise bind pour pouvoir conserver le this de la classe ViewRecipes dans la méthode displayRecipesList
		this.displayRecipesList = this.displayRecipesList.bind(this)

		this.recipeSnippet = document.getElementById('recipes-zone')
		this.searchInput = document.querySelector('#search-zone')
	}

	// Méthode pour afficher la liste des recettes à l'utilisateur

	displayRecipesList(recipesToShow) {
		this.ingredientlist = []
		this.applianceList = []
		this.ustensilsList = []
		this.recipeSnippet.innerHTML = ''
		this.ingredientButtonList.innerHTML = ''
		this.applianceButtonList.innerHTML = ''
		this.ustensilsButtonList.innerHTML = ''

		recipesToShow.forEach((recipe) => {
			// Je crée un tableau avec les ingrédients, appareils et ustensiles de chaque recette et je supprime les doublons
			recipe.ingredients.map((ingredient) => {
				this.ingredientlist.push(`${ingredient.ingredient}`)
			})
			this.applianceList.push(`${recipe.appliance}`)
			recipe.ustensils.map((ustensil) => {
				this.ustensilsList.push(`${ustensil}`)
			})
			// Je supprime les doublons de mes 3 listes grâce à l'opérateur spread et la méthode Set
			this.ingredientlist = [...new Set(this.ingredientlist)]
			this.applianceList = [...new Set(this.applianceList)]
			this.ustensilsList = [...new Set(this.ustensilsList)]
			console.log('tableau des ingrédients :', this.ingredientlist)
			console.log('tableau des appareils :', this.applianceList)
			console.log('tableau des ustensiles :', this.ustensilsList)

			// Je normalise le nom de la recette pour pouvoir l'utiliser dynamiquement comme nom d'image
			const imageName = recipe.name
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.split(' ')
				.join('-')

			// Je crée une div pour chaque recette et je l'insère dans la div recipes-zone
			this.recipeSnippet.innerHTML += `
        <div id="card-container" class="col-12 col-lg-4">
                    <article class="card h-100 border-0">
                        <img src="./assets/images/${imageName}.webp" alt="photo de ${
				recipe.name
			}" class="card-img-top" height="178px">
                        <div class="card-body rounded-bottom">
                            <div id="recipe-name-time" class="d-flex flex-row justify-content-between">
                                <h5 class="card-title w-75">${recipe.name}</h5>
                                <div class="recipe-time">
                                    <span class="timeIcon me-1">
                                        <img src="./assets/icons/time.svg" alt="icone d'horloge">
                                    </span>
                                    <span id="timeValue">${recipe.time} min</span>
                                </div>
                            </div>
                            <div class="card-text py-3 d-flex flex-row">
                                <ul class="ingredients-list w-50 pl-0">
                                    ${recipe.ingredients
																			.map((ingredient) => {
																				return `<li>${ingredient.ingredient}: ${
																					ingredient.quantity ? ingredient.quantity : ''
																				} ${ingredient.unit ? ingredient.unit : ''}</li>`
																			})
																			.join('')}
                                </ul>
                                <p class="recipe-description w-50">
                                    ${recipe.description}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>        
        `
		})
		this.ingredientButtonList.innerHTML += `
		${this.ingredientlist
			.map((ingredient) => {
				return `<li>${ingredient}</li>`
			})
			.join('')}
		`
		this.applianceButtonList.innerHTML += `
		${this.applianceList
			.map((appliance) => {
				return `<li>${appliance}</li>`
			})
			.join('')}
		`
		this.ustensilsButtonList.innerHTML += `
		${this.ustensilsList
			.map((ustensil) => {
				return `<li>${ustensil}</li>`
			})
			.join('')}
		`

		// this.searchInput.addEventListener('input', (event) => {

		// console.log('this search text de view :', this.searchText)
		// console.log('this main input length de view :', this.mainInputLength)
	}

	// Méthode pour écouter l'input de recherche
	// listenSearchInput(callback) {
	// 	this.searchInput.addEventListener('input', (event) => {
	// 		const searchText = event.target.value
	// 		callback(searchText)
	// 	})
	// 	//return this.searchText
	// }
}

export class KeywordsView {
	constructor(controller) {
		this.controller = controller
		this.displayKeywordsList = this.displayKeywordsList.bind(this)
		this.ingredientlist = []
		this.applianceList = []
		this.ustensilsList = []
		this.keywordsToClick = document.querySelectorAll('.accordion-body ul li')

		// this.controller.keywordsToClick = document.querySelectorAll('.accordion-body ul li')
		this.ingredientButtonList = document.getElementById('ingredientList')
		this.applianceButtonList = document.getElementById('applianceList')
		this.ustensilsButtonList = document.getElementById('ustensilsList')
	}

	displayKeywordsList(recipes) {
		// this.ingredientButtonList.innerHTML = ''
		// this.applianceButtonList.innerHTML = ''
		// this.ustensilsButtonList.innerHTML = ''

		
		// recipes.forEach((recipe) => {
		// 	// Je crée un tableau avec les ingrédients, appareils et ustensiles de chaque recette et je supprime les doublons

		// 	// Les ingrédients
		// 	// this.ingredientlist = []
		// 	recipe.ingredients.map((ingredient) => {
		// 		this.ingredientlist.push(`${ingredient.ingredient}`)
		// 	})

		// 	// Les appareils
		// 	// this.applianceList = []
		// 	this.applianceList.push(`${recipe.appliance}`)

		// 	// Les ustensiles
		// 	// this.ustensilsList = []
		// 	recipe.ustensils.map((ustensil) => {
		// 		this.ustensilsList.push(`${ustensil}`)
		// 	})

		// 	// Je supprime les doublons de mes 3 listes grâce à l'opérateur spread et la méthode Set
		// 	this.ingredientlist = [...new Set(this.ingredientlist)]
		// 	this.applianceList = [...new Set(this.applianceList)]
		// 	this.ustensilsList = [...new Set(this.ustensilsList)]

		// 	// Je crée les listes d'ingrédients, appareils et ustensiles correspondants aux recettes affichées

		// 	this.ingredientButtonList.innerHTML += `
		// ${this.ingredientlist
		// 	.map((ingredient) => {
		// 		return `<li>${ingredient}</li>`
		// 	})
		// 	.join('')}
		// `
		// 	console.log('this.ingredientlist :', this.ingredientlist)
		// 	this.applianceButtonList.innerHTML += `
		// ${this.applianceList
		// 	.map((appliance) => {
		// 		return `<li>${appliance}</li>`
		// 	})
		// 	.join('')}
		// `

		// 	this.ustensilsButtonList.innerHTML += `
		// ${this.ustensilsList
		// 	.map((ustensil) => {
		// 		return `<li>${ustensil}</li>`
		// 	})
		// 	.join('')}
		// `
		// })
	}

	// Méthode pour écouter les clics sur les mots-clés
	// listenKeywordsClick(callback) {
	// 	this.keywordsToClick.forEach((keyword) => {
	// 		keyword.addEventListener('click', (event) => {
	// 			const keywordContent = event.target.textContent
	// 			callback(keywordContent)
	// 		})
	// 	})
	// }
}

// je crée une classe pour gérer les tags de filtre
export class FilterTagView {
	constructor(controller) {
		this.controller = controller
		this.add = this.add.bind(this)
		this.remove = this.remove.bind(this)
	}

	// Méthode pour ajouter un tag de filtre
	add(tag, type) {
		const filterTagSnippet = document.getElementById('tags-zone')

		filterTagSnippet.innerHTML += `
        <button type="button" class="tag tag-${type}">${tag}
                <img src="./assets/icons/tag-close.svg" alt="icone de fermeture du tag" class="tag-close">
            </button>
        `
	}

	// Méthode pour supprimer un tag de filtre
	remove(event) {
		const tagToDelete = event.target.closest('.tag')
		const tagContent = tagToDelete.textContent
		console.log('tag supprimé :', tagContent)
		// je récupère le contenu du tag pour pouvoir le supprimer du DOM
		tagToDelete.style.display = 'none'
	}
}

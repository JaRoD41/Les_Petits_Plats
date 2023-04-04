import { recipesToShow, ingredientArray, applianceArray, ustensilArray } from '../../index.js'
import { ControllerRecipes } from '../controller/recipeController.js'

export class ViewRecipes {
	constructor(controller) {
		this.controller = controller
		// J'utilise bind pour pouvoir conserver le this de la classe ViewRecipes dans la méthode displayRecipesList
		this.displayRecipesList = this.displayRecipesList.bind(this)
	}

	// Méthode pour afficher la liste des recettes à l'utilisateur

	displayRecipesList(recipesToShow) {
		let ingredientlist = []
		let applianceList = []
		let ustensilsList = []
		const recipeSnippet = document.getElementById('recipes-zone')
		const ingredientButtonList = document.getElementById('ingredientList')
		const applianceButtonList = document.getElementById('applianceList')
		const ustensilsButtonList = document.getElementById('ustensilsList')

		recipeSnippet.innerHTML = ''
		ingredientButtonList.innerHTML = ''
		applianceButtonList.innerHTML = ''
		ustensilsButtonList.innerHTML = ''

		recipesToShow.forEach((recipe) => {
			// Je crée un tableau avec les ingrédients, appareils et ustensiles de chaque recette et je supprime les doublons
			recipe.ingredients.map((ingredient) => {
				ingredientlist.push(`${ingredient.ingredient}`)
			})
			applianceList.push(`${recipe.appliance}`)
			recipe.ustensils.map((ustensil) => {
				ustensilsList.push(`${ustensil}`)
			})

			// Je supprime les doublons de mes 3 listes grâce à l'opérateur spread et la méthode Set
			ingredientlist = [...new Set(ingredientlist)]
			applianceList = [...new Set(applianceList)]
			ustensilsList = [...new Set(ustensilsList)]

			// Je normalise le nom de la recette pour pouvoir l'utiliser dynamiquement comme nom d'image
			const imageName = recipe.name
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.split(' ')
				.join('-')

			// Je crée une div pour chaque recette et je l'insère dans la div recipes-zone
			recipeSnippet.innerHTML += `
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

		// Je crée les listes d'ingrédients, appareils et ustensiles correspondants aux recettes affichées
		ingredientButtonList.innerHTML += `
		${ingredientlist
			.map((ingredient) => {
				return `<li>${ingredient}</li>`
			})
			.join('')}
		`
		applianceButtonList.innerHTML += `
		${applianceList
			.map((appliance) => {
				return `<li>${appliance}</li>`
			})
			.join('')}
		`
		ustensilsButtonList.innerHTML += `
		${ustensilsList
			.map((ustensil) => {
				return `<li>${ustensil}</li>`
			})
			.join('')}
		`
	}
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

export class ViewRecipes {
	constructor(controller) {
		this.controller = controller
		// J'utilise bind pour pouvoir conserver le this de la classe ViewRecipes dans la méthode displayRecipesList
		this.displayRecipesList = this.displayRecipesList.bind(this)
	}

	// Méthode pour afficher la liste des recettes à l'utilisateur

	displayRecipesList(recipesToShow) {
		const recipeSnippet = document.getElementById('recipes-zone')

		recipeSnippet.innerHTML = ''
		recipesToShow.forEach((recipe) => {
			// Je normalise le nom de la recette pour pouvoir l'utiliser dynamiquement comme nom d'image
			const imageName = recipe.name
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.split(' ')
				.join('-')
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
	}
}

export class FilterTagView {
	constructor(controller) {
		this.controller = controller
		this.displayFilterTag = this.displayFilterTag.bind(this)
	}

	displayFilterTag(tag) {
		const filterTagSnippet = document.getElementById('filters-zone')

		filterTagSnippet.innerHTML += `
        <button id="filter-tag" type="button" class="btn btn-primary">
            <span class="filter-tag-text">${tag}</span>
            <span class="filter-tag-icon">
                <img src="./assets/icons/close.svg" alt="icone de fermeture">
            </span>
        </button>
        `
	}
}

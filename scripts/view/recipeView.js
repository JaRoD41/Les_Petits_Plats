export class ViewRecipes {
	constructor(controller) {
		this.controller = controller
		this.addEventListeners()
	}

	displayRecipesList(recipeToShow) {
		// Code pour afficher la liste des recettes à l'utilisateur
		const recipeSnippet = document.getElementById('recipes-zone')
		recipeSnippet.innerHTML += `
                <div class="col-12 col-lg-4 mb-4">
                    <article class="card h-100 border-0">
                        <img src="./assets/images/test-image.webp" alt="photo de plat test" class="card-img-top">
                        <div class="card-body rounded-bottom">
                            <div id="recipe-name-time" class="d-flex flex-row justify-content-between">
                                <h5 class="card-title">${recipeToShow.name}</h5>
                                <div class="recipe-time">
                                    <span class="timeIcon me-1">
                                        <img src="./assets/icons/time.svg" alt="icone d'horloge">
                                    </span>
                                    <span id="timeValue">${recipeToShow.time} min</span>
                                </div>
                            </div>
                            <div class="card-text py-3 d-flex flex-row justify-content-between">
                                <ul class="ingredients-list w-50 pl-0">
                                    ${recipeToShow.ingredients
																			.map((ingredient) => {
																				return `<li>${ingredient.ingredient}: ${
																					ingredient.quantity ? ingredient.quantity : ''
																				} ${ingredient.unit ? ingredient.unit : ''}</li>`
																			})
																			.join('')}
                                </ul>
                                <div class="recipe-description w-50">
                                    <p>${recipeToShow.description}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            `
	}

	displayUpdate() {
		// Code pour mettre à jour l'affichage lorsque les données changent
	}

	addEventListeners() {
		// Code pour ajouter les écouteurs d'événements
		const searchInput = document.querySelector('#search-zone')
		searchInput.addEventListener('input', (event) => {
			const searchText = event.target.value
			this.controller.mainSearch(searchText)
		})
	}
}

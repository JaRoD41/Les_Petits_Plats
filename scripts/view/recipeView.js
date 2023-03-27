import { ControllerRecipes } from '../controller/recipeController.js'
import { recipes } from '../data/recipes.js'



export class ViewRecipes {
	constructor(controller) {
		this.controller = controller
	}

	displayRecipesList(recipeToShow) {
		// Code pour afficher la liste des recettes à l'utilisateur

		return `
        <div id="card-container" class="col-12 col-lg-4">
                    <article class="card h-100 border-0">
                        <img src="./assets/images/test-image.webp" alt="photo de plat test" class="card-img-top" height="178px">
                        <div class="card-body rounded-bottom">
                            <div id="recipe-name-time" class="d-flex flex-row justify-content-between">
                                <h5 class="card-title w-75">${recipeToShow.name}</h5>
                                <div class="recipe-time">
                                    <span class="timeIcon me-1">
                                        <img src="./assets/icons/time.svg" alt="icone d'horloge">
                                    </span>
                                    <span id="timeValue">${recipeToShow.time} min</span>
                                </div>
                            </div>
                            <div class="card-text py-3 d-flex flex-row">
                                <ul class="ingredients-list w-50 pl-0">
                                    ${recipeToShow.ingredients
																			.map((ingredient) => {
																				return `<li>${ingredient.ingredient}: ${
																					ingredient.quantity ? ingredient.quantity : ''
																				} ${ingredient.unit ? ingredient.unit : ''}</li>`
																			})
																			.join('')}
                                </ul>
                                <p class="recipe-description w-50">
                                    ${recipeToShow.description}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>        
        `
	}

	displayUpdate() {
		// Code pour mettre à jour l'affichage lorsque les données changent
	}
}

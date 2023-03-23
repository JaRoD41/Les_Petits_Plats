import { recipes } from '../data/recipes.js'

console.log('recettes :', recipes)

// class Recipe {
// 	constructor(id, name, servings, ingredients, time, description, appliance, ustensils) {
// 		this.id = id
// 		this.name = name
// 		this.servings = servings
// 		this.ingredients = ingredients
// 		this.time = time
// 		this.description = description
// 		this.appliance = appliance
// 		this.ustensils = ustensils
// 	}
// }

class ViewRecipes {
	constructor(controller) {
		this.controller = controller
		this.addEventListeners()
	}

	displayRecipesList(recipesToShow) {
		// Code pour afficher la liste des recettes à l'utilisateur
		const recipeSnippet = document.getElementById('recipes-zone')
		recipeSnippet.innerHTML = `
    <div class="row">
                <div class="col-12 col-lg-4">
                    <article class="card border-0">
                        <img src="./assets/images/test-image.webp" alt="photo de plat test" class="card-img-top">
                        <div class="card-body px-3 rounded-bottom">
                            <div id="recipe-name-time" class="d-flex flex-row justify-content-between">
                                <h5 class="card-title">${recipesToShow.name}</h5>
                                <div class="recipe-time">
                                    <span class="timeIcon me-1">
                                        <img src="./assets/icons/time.svg" alt="icone d'horloge">
                                    </span>
                                    <span id="timeValue">${recipesToShow.time} min</span>
                                </div>
                            </div>
                            <div class="card-text py-3 d-flex flex-row justify-content-between">
                                <ul class="ingredients-list w-50 pl-0">
    ${testRecipe.ingredients
			.map((ingredient) => {
				return `<li>${ingredient.ingredient}: ${ingredient.quantity ? ingredient.quantity : ''} ${
					ingredient.unit ? ingredient.unit : ''
				}</li>`
			})
			.join('')}
</ul>
                                <div class="recipe-description w-50">
                                    <p>${recipesToShow.description}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
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

class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.view = new ViewRecipes(this)
		this.filter = new Recipes()
	}

	mainSearch(text) {
		const filteredRecipes = this.filter.mainSearch(this.model.recipes, text)
		console.log(filteredRecipes)
		//this.view.displayRecipesList(filteredRecipes);
	}

	ingredientSearch(tag) {
		const filteredRecipe = this.filter.ingredientSearch(this.model.recipes, tag)
		console.log(filteredRecipe)
	}
}

class Recipes {
	constructor(id, name, servings, ingredients, time, description, appliance, ustensils) {
		this.id = id
		this.name = name
		this.servings = servings
		this.ingredients = ingredients
		this.time = time
		this.description = description
		this.appliance = appliance
		this.ustensils = ustensils
	}

	mainSearch(recipes, text) {
		return recipes.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(text.toLowerCase()) ||
				recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(text.toLowerCase())) ||
				recipe.description.toLowerCase().includes(text.toLowerCase())
		)
	}

	ingredientSearch(recipes, tag) {
		return recipes.filter((recipe) =>
			recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	ustensilSearch(recipes, tag) {
		return recipes.filter((recipe) =>
			recipe.ustensils.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	ingredientSearch(recipes, tag) {
		return recipes.filter((recipe) =>
			recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
		)
	}
}

const controller = new ControllerRecipes({ recipes: recipes })

controller.mainSearch('verres')
controller.ingredientSearch('huile')

const testRecipe = new Recipes(
	51,
	'recette test',
	4,
	[
		{
			ingredient: 'ingrédient 1',
			quantity: 1,
		},
		{
			ingredient: 'ingrédient 2',
		},
		{
			ingredient: 'ingrédient 3',
			quantity: 250,
			unit: 'grammes',
		},
		{
			ingredient: 'ingrédient 4',
		},
	],
	17,
	'tout simplement une description de la recette',
	'Four',
	'papier cuisson, verres'
)

console.log(testRecipe)
const displayTest = new ViewRecipes()
displayTest.displayRecipesList(testRecipe)

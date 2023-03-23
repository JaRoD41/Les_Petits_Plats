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

	displayRecipesList(recipes) {
		// Code pour afficher la liste des recettes à l'utilisateur
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
}

const controller = new ControllerRecipes({ recipes: recipes })

controller.mainSearch('verres')
controller.ingredientSearch('huile')

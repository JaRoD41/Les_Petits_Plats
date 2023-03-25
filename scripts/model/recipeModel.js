import { ViewRecipes } from '../view/recipeView.js'
import { ControllerRecipes } from '../controller/recipeController.js'


export class Recipes {
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

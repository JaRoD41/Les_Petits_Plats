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

	// méthode pour filtrer les recettes par ingrédient dans le tableau recipes à partir du tag sélectionné
	ingredientSearch(recipes, tag) {
		return recipes.filter((recipe) =>
			recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	// méthode pour filtrer les recettes par appareil dans le tableau recipes à partir du tag sélectionné
	applianceSearch(recipes, tag) {
		return recipes.filter((recipe) => recipe.appliance.toLowerCase().includes(tag.toLowerCase()))
	}

	// méthode pour filtrer les recettes par ustensile dans le tableau recipes à partir du tag sélectionné
	ustensilSearch(recipes, tag) {
		return recipes.filter((recipe) =>
			recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(tag.toLowerCase()))
		)
	}
}

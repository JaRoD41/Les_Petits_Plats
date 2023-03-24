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

console.log('recettes :', recipes)

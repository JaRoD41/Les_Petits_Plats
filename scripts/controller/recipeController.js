import { Recipes } from '../model/recipeModel.js'
import { ViewRecipes } from '../view/recipeView.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
	}

	mainSearch(text) {
		const filteredRecipes = this.filter.mainSearch(this.model.recipes, text)
		console.log(filteredRecipes)

		this.view.displayRecipesList(filteredRecipes)
	}

	ingredientSearch(tag) {
		const filteredRecipe = this.filter.ingredientSearch(this.model.recipes, tag)
		console.log(filteredRecipe)
	}
}

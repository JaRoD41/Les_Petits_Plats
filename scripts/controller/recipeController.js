import { ViewRecipes } from '../view/recipeView.js'
import { Recipes } from '../model/recipeModel.js'

export class ControllerRecipes {
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

const controller = new ControllerRecipes({ recipes: recipes })

controller.mainSearch('verres')
controller.ingredientSearch('huile')

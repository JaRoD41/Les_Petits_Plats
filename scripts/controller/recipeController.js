import { Recipes } from '../model/recipeModel.js'
import { ViewRecipes } from '../view/recipeView.js'
import { recipesToShow } from '../model/recipeModel.js'

export class ControllerRecipes {
	constructor(model) {
		this.model = model
		this.filter = new Recipes()
		this.view = new ViewRecipes()
	}

	// On envoie le texte saisi dans la barre de recherche dans le controleur qui va filtrer les recettes dans le Modèle et les envoyer dans la Vue pour les afficher
	mainSearch(text) {
		const filteredRecipes = this.filter.mainSearch(this.model.recipes, text)
		console.log(filteredRecipes)
		// recipesToShow = filteredRecipes.slice()
		// recipesToShow.push(filteredRecipes)
		this.view.displayRecipesList(recipesToShow)
	}

	ingredientSearch(tag) {
		const filteredRecipe = this.filter.ingredientSearch(this.model.recipes, tag)
		console.log(filteredRecipe)
	}
}

console.log('recipesToShow dans le controller :', recipesToShow);
export class Recipes {
	constructor(recipeList = []) {
		this.mainSearch = ''
		this.recipeList = recipeList
		this.selectedTags = {
			ingredients: new Set(),
			appliances: new Set(),
			ustensils: new Set(),
		}

		this.mainFilteredRecipes = []
		this.resetFilteredRecipes = []
	}

	addTag(type, value) {
		this.selectedTags[type].add(value)
		console.log(this.selectedTags)
	}
	getIngredientList() {
		// recipe.ingredients.map((ingredient) => {
		// 	this.ingredientlist.push(`${ingredient.ingredient}`)
		// })
		const ingredients = this.getRecipesFilteredBySearchAndTags().reduce((pre, cur) => {
			const array = [...pre, ...cur.ingredients.map((ingredient) => ingredient.ingredient)]
			return array
		}, [])
		return Array.from(new Set(ingredients))
	}
	getApplianceList() {
		//this.applianceList.push(`${recipe.appliance}`)
		return []
	}
	getUstensilList() {
		// recipe.ustensils.map((ustensil) => {
		// 	this.ustensilsList.push(`${ustensil}`)
		// })
		return []
	}
	getSelectedTags() {}

	getRecipesFilteredBySearch() {
		return this.recipeList.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(this.mainSearch.toLowerCase()) ||
				recipe.ingredients.some((ingredient) =>
					ingredient.ingredient.toLowerCase().includes(this.mainSearch.toLowerCase())
				) ||
				recipe.description.toLowerCase().includes(this.mainSearch.toLowerCase())
		)
	}
	getRecipesFilteredBySearchAndTags() {
		return this.getRecipesFilteredBySearch()
	}

	// Méthode pour filtrer les recettes par nom, ingrédient, description dans le tableau recipes à partir du texte saisi dans la barre de recherche
	mainSearch(recipes, text) {
		console.log('recipes :', recipes)
		console.log('text :', text)
		return recipes.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(text.toLowerCase()) ||
				recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(text.toLowerCase())) ||
				recipe.description.toLowerCase().includes(text.toLowerCase())
		)
	}

	// Méthode pour filtrer les recettes par ingrédient dans le tableau recipes à partir du tag sélectionné
	ingredientSearch(tag) {
		return this.getRecipesFilteredBySearchAndTags().filter((recipe) =>
			recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	// Méthode pour filtrer les recettes par appareil dans le tableau recipes à partir du tag sélectionné
	applianceSearch(recipes, tag) {
		return this.getRecipesFilteredBySearchAndTags().filter((recipe) =>
			recipe.appliance.toLowerCase().includes(tag.toLowerCase())
		)
	}

	// Méthode pour filtrer les recettes par ustensile dans le tableau recipes à partir du tag sélectionné
	ustensilsSearch(recipes, tag) {
		return this.getRecipesFilteredBySearchAndTags().filter((recipe) =>
			recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	// Méthode pour réinitialiser la recherche lorsque l'utilisateur efface le texte saisi dans la barre de recherche ou supprime les tags
	resetSearch(recipes) {
		return recipes
	}
}

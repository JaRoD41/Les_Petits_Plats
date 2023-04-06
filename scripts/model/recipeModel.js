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
	ingredientSearch(recipes, tag) {
		return recipes.filter((recipe) =>
			recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	// Méthode pour filtrer les recettes par appareil dans le tableau recipes à partir du tag sélectionné
	applianceSearch(recipes, tag) {
		return recipes.filter((recipe) => recipe.appliance.toLowerCase().includes(tag.toLowerCase()))
	}

	// Méthode pour filtrer les recettes par ustensile dans le tableau recipes à partir du tag sélectionné
	ustensilsSearch(recipes, tag) {
		return recipes.filter((recipe) =>
			recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	// Méthode pour réinitialiser la recherche lorsque l'utilisateur efface le texte saisi dans la barre de recherche ou supprime les tags
	resetSearch(recipes) {
		return recipes
	}
}

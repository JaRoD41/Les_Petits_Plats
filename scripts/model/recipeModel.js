export class Recipes {
	constructor(recipeList = []) {
		this.mainSearch = ''
		this.recipeList = recipeList
		// Je crée un tableau qui va contenir les tags sélectionnés en utilisant la méthode Set
		this.selectedTags = {
			ingredients: new Set(),
			appliances: new Set(),
			ustensils: new Set(),
		}

		this.mainFilteredRecipes = []
		this.resetFilteredRecipes = []
	}

	// Code des méthodes d'envoi des données liées aux mots-clés à afficher //
	getIngredientList() {
		// Je crée un tableau d'ingrédients à partir du tableau de recettes en utilisant la méthode reduce pour applatir les ingrédients de chaque recette dans un seul tableau
		const ingredients = this.getRecipesFilteredBySearchAndTags().reduce((acc, cur) => {
			const array = [...acc, ...cur.ingredients.map((ingredient) => ingredient.ingredient)]
			return array
		}, [])
		// Je crée un nouveau tableau à partir du tableau d'ingrédients en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(ingredients))
	}

	getApplianceList() {
		// Je crée un tableau d'appareils à partir du tableau de recettes en utilisant la méthode map pour récupérer l'appareil de chaque recette
		const appliances = this.getRecipesFilteredBySearchAndTags().map((recipe) => recipe.appliance)
		// Je crée un nouveau tableau à partir du tableau d'appareils en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(appliances))
	}

	getUstensilList() {
		// Je crée un tableau d'ustensiles à partir du tableau de recettes en utilisant la méthode reduce pour applatir les ustensiles de chaque recette dans un seul tableau
		const ustensils = this.getRecipesFilteredBySearchAndTags().reduce((acc, cur) => {
			const array = [...acc, ...cur.ustensils]
			return array
		}, [])
		// Je crée un nouveau tableau à partir du tableau d'ustensiles en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(ustensils))
	}

	// Méthode pour ajouter un tag dans le tableau des tags sélectionnés
	addTag(type, value) {
		// J'ajoute le tag dans le tableau des tags sélectionnés en utilisant la méthode add de l'objet Set
		this.selectedTags[type].add(value)
		// console.log(this.selectedTags)
	}

	getSelectedTags() {
		return this.selectedTags
	}

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

	// Algorithme de recherche par mot-clé utilisant la programmation fonctionnelle et l'objet array
	mainSearch(recipes, text) {
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
	applianceSearch(tag) {
		return this.getRecipesFilteredBySearchAndTags().filter((recipe) =>
			recipe.appliance.toLowerCase().includes(tag.toLowerCase())
		)
	}

	// Méthode pour filtrer les recettes par ustensile dans le tableau recipes à partir du tag sélectionné
	ustensilsSearch(tag) {
		return this.getRecipesFilteredBySearchAndTags().filter((recipe) =>
			recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(tag.toLowerCase()))
		)
	}

	// Méthode pour réinitialiser la recherche lorsque l'utilisateur efface le texte saisi dans la barre de recherche ou supprime les tags
	resetSearch(recipes) {
		return recipes
	}
}

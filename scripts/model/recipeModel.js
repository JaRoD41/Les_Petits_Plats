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
		this.filteredRecipes = []
	}

	// Code des méthodes d'envoi des données liées aux mots-clés à afficher //
	getIngredientList() {
		console.log('liste recettes utilisée pour filtrer :', this.filteredRecipes)
		// Je crée un tableau d'ingrédients à partir du tableau de recettes en utilisant la méthode reduce pour applatir les ingrédients de chaque recette dans un seul tableau
		// const ingredients = this.getRecipesFilteredBySearchAndTags().reduce((acc, cur) => {
		const ingredients = this.getRecipesFilteredBySearch().reduce((acc, cur) => {
			const array = [...acc, ...cur.ingredients.map((ingredient) => ingredient.ingredient)]
			return array
		}, [])
		// Je crée un nouveau tableau à partir du tableau d'ingrédients en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(ingredients))
	}

	getApplianceList() {
		// Je crée un tableau d'appareils à partir du tableau de recettes en utilisant la méthode map pour récupérer l'appareil de chaque recette
		// const appliances = this.getRecipesFilteredBySearchAndTags().map((recipe) => recipe.appliance)
		const appliances = this.getRecipesFilteredBySearch().map((recipe) => recipe.appliance)
		// Je crée un nouveau tableau à partir du tableau d'appareils en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(appliances))
	}

	getUstensilList() {
		// Je crée un tableau d'ustensiles à partir du tableau de recettes en utilisant la méthode reduce pour applatir les ustensiles de chaque recette dans un seul tableau
		// const ustensils = this.getRecipesFilteredBySearchAndTags().reduce((acc, cur) => {
		const ustensils = this.getRecipesFilteredBySearch().reduce((acc, cur) => {
			const array = [...acc, ...cur.ustensils]
			return array
		}, [])
		// Je crée un nouveau tableau à partir du tableau d'ustensiles en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(ustensils))
	}

	getFirstIngredientList() {
		// Je crée un tableau d'ingrédients à partir du tableau de recettes en utilisant la méthode reduce pour applatir les ingrédients de chaque recette dans un seul tableau
		const ingredients = this.recipeList.reduce((acc, cur) => {
			const array = [...acc, ...cur.ingredients.map((ingredient) => ingredient.ingredient)]
			return array
		}, [])
		// Je crée un nouveau tableau à partir du tableau d'ingrédients en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(ingredients))
	}

	getFirstApplianceList() {
		// Je crée un tableau d'appareils à partir du tableau de recettes en utilisant la méthode map pour récupérer l'appareil de chaque recette
		const appliances = this.recipeList.map((recipe) => recipe.appliance)
		// Je crée un nouveau tableau à partir du tableau d'appareils en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(appliances))
	}

	getFirstUstensilList() {
		// Je crée un tableau d'ustensiles à partir du tableau de recettes en utilisant la méthode reduce pour applatir les ustensiles de chaque recette dans un seul tableau
		const ustensils = this.recipeList.reduce((acc, cur) => {
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
		// Je vérifie si le tableau des recettes filtrées est vide, si oui je lui affecte le tableau de recettes
		this.filteredRecipes = this.filteredRecipes.length ? this.filteredRecipes : this.recipeList
		this.filteredRecipes = this.filteredRecipes.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(this.mainSearch.toLowerCase()) ||
				recipe.ingredients.some((ingredient) =>
					ingredient.ingredient.toLowerCase().includes(this.mainSearch.toLowerCase())
				) ||
				recipe.description.toLowerCase().includes(this.mainSearch.toLowerCase())
		)
		return this.filteredRecipes
	}
	// getRecipesFilteredBySearchAndTags(tag) {
	// 	// if (tag) {
	// 	// 	return this.getRecipesFilteredBySearch().filter((recipe) =>
	// 	// 		recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
	// 	// 	)
	// 	// }
	// 	console.log('tag passé au modele :', tag);
	// 	// test avec condition si le tag appartient à la liste ingredients, appliances ou ustensils
	// 	// if (this.selectedTags.ingredients.size > 0) {
	// 	if (tag) {
	// 		return this.getRecipesFilteredBySearch().filter((recipe) =>
	// 			recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
	// 		)
	// 	} else if (this.selectedTags.appliances.size > 0) {
	// 		return this.getRecipesFilteredBySearch().filter((recipe) => recipe.appliance.toLowerCase() === tag.toLowerCase())
	// 	} else if (this.selectedTags.ustensils.size > 0) {
	// 		return this.getRecipesFilteredBySearch().filter((recipe) =>
	// 			recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === tag.toLowerCase())
	// 		)
	// 	} else {
	// 		return this.getRecipesFilteredBySearch()
	// 	}
	// }
	getRecipesFilteredBySearchAndTags(tag, type) {
		console.log('lancement de la méthode getRecipesFilteredBySearchAndTags')
		// console.log('liste recettes utilisée pour filtrer :', this.filteredRecipes)
		// if (tag) {
		// 	return this.getRecipesFilteredBySearch().filter((recipe) =>
		// 		recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
		// 	)
		// }
		// test avec condition si le tag appartient à la liste ingredients, appliances ou ustensils
		// if (this.selectedTags.ingredients.size > 0) {
		if (tag && type === 'ingredients') {
			console.log('nbre de recettes dispos au clic sur un ingrédient :', this.filteredRecipes.length)
			// this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
			this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
				recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
			)
			return this.filteredRecipes
		} else if (tag && type === 'appliances') {
			this.filteredRecipes = this.getRecipesFilteredBySearch().filter(
				(recipe) => recipe.appliance.toLowerCase() === tag.toLowerCase()
			)
			return this.filteredRecipes
		} else if (tag && type === 'ustensils') {
			this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
				recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === tag.toLowerCase())
			)
			return this.filteredRecipes
		} else {
			return this.getRecipesFilteredBySearch()
		}
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
		// return this.getRecipesFilteredBySearchAndTags().filter((recipe) =>
		// 	recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
		// )
		this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
			recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === tag.toLowerCase())
		)
		return this.filteredRecipes
	}

	// Méthode pour filtrer les recettes par appareil dans le tableau recipes à partir du tag sélectionné
	applianceSearch(tag) {
		this.filteredRecipes = this.getRecipesFilteredBySearch().filter(
			(recipe) => recipe.appliance.toLowerCase() === tag.toLowerCase()
		)
		return this.filteredRecipes
	}

	// Méthode pour filtrer les recettes par ustensile dans le tableau recipes à partir du tag sélectionné
	ustensilsSearch(tag) {
		this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
			recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === tag.toLowerCase())
		)
		return this.filteredRecipes
	}

	// Méthode pour réinitialiser la recherche lorsque l'utilisateur efface le texte saisi dans la barre de recherche ou supprime les tags
	resetRecipes() {
		this.filteredRecipes = [...this.recipeList]
		return this.filteredRecipes
	}
}

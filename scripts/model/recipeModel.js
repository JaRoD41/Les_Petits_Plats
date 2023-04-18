export class Recipes {
	constructor(recipeList = []) {
		this.mainSearch = ''
		this.recipeList = recipeList

		// Je crée un tableau qui va contenir les tags sélectionnés par l'utilisateur
		this.selectedTags = []
		// this.selectedTags = {
		// 	ingredients: new Set(),
		// 	appliances: new Set(),
		// 	ustensils: new Set(),
		// }

		this.addTag = this.addTag.bind(this)
		this.removeTag = this.removeTag.bind(this)

		this.mainFilteredRecipes = []
		this.resetFilteredRecipes = []
		this.filteredRecipes = []
	}

	// Méthode de suppression des accents //
	removeAccents(str) {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
	}

	// Code des méthodes d'envoi des données liées aux mots-clés à afficher //

	getIngredientList() {
		// Je crée une liste d'ingrédients en utilisant la méthode map pour récupérer les ingrédients de chaque recette et flat pour applatir le tableau
		const ingredients = this.getRecipesFilteredBySearch()
			.map((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient))
			.flat()
		// Je crée un nouveau tableau à partir du tableau d'ingrédients en utilisant la méthode Set pour supprimer les doublons
		return Array.from(new Set(ingredients))
	}

	getApplianceList() {
		// Je crée un tableau d'appareils à partir du tableau de recettes en utilisant la méthode map pour récupérer l'appareil de chaque recette
		const appliances = this.getRecipesFilteredBySearch().map((recipe) => recipe.appliance)
		return Array.from(new Set(appliances))
	}

	getUstensilList() {
		// Je crée une liste d'ustensiles en utilisant la méthode map pour récupérer les ustensiles de chaque recette et flat pour applatir le tableau
		const ustensils = this.getRecipesFilteredBySearch()
			.map((recipe) => recipe.ustensils)
			.flat()
		return Array.from(new Set(ustensils))
	}

	getFirstIngredientList() {
		const ingredients = this.recipeList
			.map((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient))
			.flat()
		return Array.from(new Set(ingredients))
	}

	getFirstApplianceList() {
		// Je crée un tableau d'appareils à partir du tableau de recettes en utilisant la méthode map pour récupérer l'appareil de chaque recette
		const appliances = this.recipeList.map((recipe) => recipe.appliance)
		return Array.from(new Set(appliances))
	}

	getFirstUstensilList() {
		const ustensils = this.recipeList.map((recipe) => recipe.ustensils).flat()
		return Array.from(new Set(ustensils))
	}

	// Méthode pour ajouter un tag dans le tableau des tags sélectionnés
	addTag(type, value) {
		// const isInTags = this.selectedTags.some((tag) => tag.value === value)
		// console.log('isInTags :', isInTags);
		// J'ajoute le tag dans le tableau des tags sélectionnés en utilisant la méthode add de l'objet Set
		// if (!isInTags) {
			this.selectedTags.push({ type: type, value: value })
		// }
		console.log('this tags:', this.selectedTags)
		// console.log(this.selectedTags)
	}

	// Méthode pour supprimer un tag du tableau des tags sélectionnés
	removeTag(type, value) {
		console.log('value to delete', value)
		console.log('type to delete', type);
		console.log('before delete', this.selectedTags)
		// Je supprime le tag du tableau des tags sélectionnés en utilisant la méthode delete de l'objet Set
		// this.selectedTags[type].delete.apply(value)
		console.log('after delete', this.selectedTags)
		// this.updateRecipes()
	}

	getSelectedTags() {
		return this.selectedTags
	}

	// Méthode pour filtrer les recettes par nom, ingrédient, description dans le tableau recipes à partir du texte saisi dans la barre de recherche

	// Algorithme de recherche par mot-clé utilisant l'objet array
	getRecipesFilteredBySearch() {
		// Je vérifie si le tableau des recettes filtrées est vide, si oui je lui affecte le tableau de recettes
		this.filteredRecipes = this.filteredRecipes.length ? this.filteredRecipes : this.recipeList
		this.filteredRecipes = this.filteredRecipes.filter(
			(recipe) =>
				this.removeAccents(recipe.name.toLowerCase()).includes(this.removeAccents(this.mainSearch.toLowerCase())) ||
				recipe.ingredients.some((ingredient) =>
					this.removeAccents(ingredient.ingredient.toLowerCase()).includes(
						this.removeAccents(this.mainSearch.toLowerCase())
					)
				) ||
				this.removeAccents(recipe.description.toLowerCase()).includes(this.removeAccents(this.mainSearch.toLowerCase()))
		)
		return this.filteredRecipes
	}

	getRecipesFilteredBySearchAndTags(tag, type) {
		if (tag && type === 'ingredients') {
			this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
				recipe.ingredients.some(
					(ingredient) =>
						this.removeAccents(ingredient.ingredient.toLowerCase()) === this.removeAccents(tag.toLowerCase())
				)
			)
			return this.filteredRecipes
		} else if (tag && type === 'appliances') {
			this.filteredRecipes = this.getRecipesFilteredBySearch().filter(
				(recipe) => this.removeAccents(recipe.appliance.toLowerCase()) === this.removeAccents(tag.toLowerCase())
			)
			return this.filteredRecipes
		} else if (tag && type === 'ustensils') {
			this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
				recipe.ustensils.some(
					(ustensil) => this.removeAccents(ustensil.toLowerCase()) === this.removeAccents(tag.toLowerCase())
				)
			)
			return this.filteredRecipes
		} else {
			return this.getRecipesFilteredBySearch()
		}
	}

	// Méthode pour filtrer les recettes par ingrédient dans le tableau recipes à partir du tag sélectionné
	ingredientSearch(tag) {
		this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
			recipe.ingredients.some(
				(ingredient) =>
					this.removeAccents(ingredient.ingredient.toLowerCase()) === this.removeAccents(tag.toLowerCase())
			)
		)
		return this.filteredRecipes
	}

	// Méthode pour filtrer les recettes par appareil dans le tableau recipes à partir du tag sélectionné
	applianceSearch(tag) {
		this.filteredRecipes = this.getRecipesFilteredBySearch().filter(
			(recipe) => this.removeAccents(recipe.appliance.toLowerCase()) === this.removeAccents(tag.toLowerCase())
		)
		return this.filteredRecipes
	}

	// Méthode pour filtrer les recettes par ustensile dans le tableau recipes à partir du tag sélectionné
	ustensilsSearch(tag) {
		this.filteredRecipes = this.getRecipesFilteredBySearch().filter((recipe) =>
			recipe.ustensils.some(
				(ustensil) => this.removeAccents(ustensil.toLowerCase()) === this.removeAccents(tag.toLowerCase())
			)
		)
		return this.filteredRecipes
	}

	// Méthode pour mettre à jour le tableau des recettes filtrées en fonction des tags sélectionnés
	updateRecipes() {
		// Je filtre les recettes en fonction des tags sélectionnés
		this.filteredRecipes = this.recipeList.filter((recipe) => {
			// Je vérifie si la recette contient tous les ingrédients sélectionnés
			for (const ingredient of this.selectedTags.ingredients) {
				if (!recipe.ingredients.includes(ingredient)) {
					return false
				}
			}
			// Je vérifie si la recette contient tous les appareils sélectionnés
			for (const appliance of this.selectedTags.appliances) {
				if (recipe.appliance !== appliance) {
					return false
				}
			}
			// Vérifier si la recette contient tous les ustensiles sélectionnés
			for (const ustensil of this.selectedTags.ustensils) {
				if (!recipe.ustensils.includes(ustensil)) {
					return false
				}
			}
			return true
		})
	}

	// Méthode pour réinitialiser la recherche lorsque l'utilisateur efface le texte saisi dans la barre de recherche ou supprime les tags
	resetRecipes() {
		this.filteredRecipes = [...this.recipeList]
		return this.filteredRecipes
	}
}

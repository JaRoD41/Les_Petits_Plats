import { recipes } from './scripts/data/recipes.js'
import { ViewRecipes } from './scripts/view/recipeView.js'

console.log(recipes)

const displayTest = new ViewRecipes()
recipes.forEach((recipe) => displayTest.displayRecipesList(recipe))

import uuidv4 from 'uuid/v4'

let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes
const getIngredients = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id)
    return recipe.ingredients
}

const createRecipe = () => {
    const id = uuidv4()

    recipes.push({
        id: id,
        title: '',
        instructions: '',
        ingredients: []
    })
    saveRecipes()
    return id

}

const createIngredients = (id, ingredientText) => {
    const recipe = recipes.find((recipe) => recipe.id === id)
    if (recipe) {
        recipe.ingredients.push({
            id: uuidv4(),
            title: ingredientText,
            inPossesion: false
        })
        saveRecipes()
    }
}
//this function is incomplete
const generateIngredientSummary = (id) => {
    const ingredients = recipes.find((recipe) => recipe.id === id).ingredients
    const haveAllIngredients = ingredients.every(ingredient => ingredient.inPossesion === true)
    const haveSomeIngredients = ingredients.some(ingredient => ingredient.inPossesion === true)
    if(ingredients.length <= 0){
        return 'No Ingredients listed'
    } else if (haveAllIngredients) {
        return 'You have all the ingredients'
    } else if (haveSomeIngredients) {
        return 'You have some of the ingredients'
    } else {
        return 'You have none of the ingredients'
    }
}
const updateRecipes = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.instructions === 'string') {
        recipe.instructions = updates.instructions
    }

    saveRecipes()
    return recipe
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

const removeIngredient = (recipeId, ingredientId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === ingredientId)
    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    }
}

const toggleIngredient = (recipeId, ingredientId) => {
    const recipe = recipes.find(recipe => recipe.id === recipeId)
    const ingredientIndex = recipe.ingredients.findIndex(ingredient => ingredient.id === ingredientId)
    console.log(ingredientIndex)
    if (recipe) {
        recipe.ingredients[ingredientIndex].inPossesion = !recipe.ingredients[ingredientIndex].inPossesion
    }
    saveRecipes()
}

recipes = loadRecipes()

export {
    loadRecipes,
    getRecipes,
    createRecipe,
    createIngredients,
    generateIngredientSummary,
    saveRecipes,
    updateRecipes,
    removeRecipe,
    toggleIngredient,
    getIngredients,
    removeIngredient
}
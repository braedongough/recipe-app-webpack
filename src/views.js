import { getFilters } from './filters'
import { getRecipes, generateIngredientSummary, toggleIngredient, getIngredients, removeIngredient } from './recipe'

// Generate the DOM structure for a note
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the note title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    // Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    statusEl.textContent = generateIngredientSummary(recipe.id)
    statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

    return recipeEl
}

// Render application notes
const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const filteredRecipes = getRecipes().filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

const renderIngredients = (recipeId) => {
    const ingredientEl = document.querySelector('#ingredients')
    const ingredients = getIngredients(recipeId)

    ingredientEl.innerHTML = '' 

    if (ingredients.length > 0) {
        ingredients.forEach(ingredient => {
            ingredientEl.appendChild(generateIngredientDOM(recipeId, ingredient))
        })
    } else {
        let messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no ingredients'
        ingredientEl.appendChild(messageEl)
    }
}

const generateIngredientDOM = (recipeId, ingredient) => {
    const ingredientEl = document.createElement('label') 
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const newText = document.createElement('span')
    const button = document.createElement('button')

    //append checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = ingredient.inPossesion
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', () => {
        toggleIngredient(recipeId, ingredient.id)
        renderIngredients(recipeId)
    })

    //append todo
    newText.textContent = ingredient.title
    containerEl.appendChild(newText)

    //Setup container
    ingredientEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    ingredientEl.appendChild(containerEl)

    //append delete button
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    ingredientEl.appendChild(button)
    button.addEventListener('click', () => {
        removeIngredient(recipeId, ingredient.id)
        renderIngredients(recipeId)
    })



    return ingredientEl
}

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#recipe-title')
    const instructionsElement = document.querySelector('#recipe-instructions')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    instructionsElement.value = recipe.instructions
}

export { generateRecipeDOM, renderRecipes, initializeEditPage, renderIngredients }
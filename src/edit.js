import { initializeEditPage, renderIngredients } from './views'
import { updateRecipes, removeRecipe, createIngredients, getRecipes } from './recipe'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-instructions')
const ingredientElement = document.querySelector('#add-ingredient')
const removeElement = document.querySelector('#remove-recipe')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)
renderIngredients(recipeId)

titleElement.addEventListener('input', (e) => {
    updateRecipes(recipeId, {
        title: e.target.value
    })
})

bodyElement.addEventListener('input', (e) => {
    updateRecipes(recipeId, {
        instructions: e.target.value
    })
})

ingredientElement.addEventListener('submit', e => {
    e.preventDefault()
    const inputText = e.target.elements.newIngredient.value.trim()
    createIngredients(recipeId, inputText)
    renderIngredients(recipeId)
    e.target.elements.newIngredient.value = ""
  })

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(noteId)
    }
})
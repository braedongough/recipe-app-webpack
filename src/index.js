import { createRecipe } from './recipe'
import { renderRecipes } from './views'
import { setFilters } from './filters'

renderRecipes()

document.querySelector('#create-recipe').addEventListener('click', () => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
})

const url = 'https://raw.githubusercontent.com/daslef/js-30/master/24_sticky_nav/data.json'

const nav = document.querySelector('nav'),
    logo = document.querySelector('li.logo a'),
    main = document.querySelector('main'),
    footer = document.querySelector('footer')

let topOfNav = nav.offsetTop;

const recipeMenuIntroduction = document.querySelector('.recipe__introduction__menu'),
    recipeMenuIngredients = document.querySelector('.recipe__ingredients__menu'),
    recipeMenuInstructions = document.querySelector('.recipe__instructions__menu'),
    recipeMenuOrder = document.querySelector('.recipe__order__menu'),
    recipeMenuItems = [recipeMenuIntroduction, recipeMenuIngredients, recipeMenuInstructions, recipeMenuOrder]


function setActiveMenuElement(activeElement) {
    recipeMenuItems.filter(x => x !== activeElement).map(x => {
        x.classList.remove('highlighted')
    })
    activeElement.classList.add('highlighted')
}


function updateMenu() {

    let x = this.innerWidth / 2,
        y = this.innerHeight / 3,
        activeElement = document.elementFromPoint(x, y)

    if (activeElement.tagName !== 'DIV') {
        activeElement = activeElement.parentElement
    }

    switch (activeElement.className) {
        case 'recipe__introduction':
            setActiveMenuElement(recipeMenuIntroduction)
            break;
        case 'recipe__ingredients':
            setActiveMenuElement(recipeMenuIngredients)
            break;
        case 'recipe__instructions':
            setActiveMenuElement(recipeMenuInstructions)
            break;
    }

    let parent = activeElement.parentElement

    try {
        while (parent.className !== 'recipe') {
            parent = parent.parentElement
        }
        logo.textContent = parent.dataset['name']
    } catch(e) {
        return
    }


}


function newRecipeElement(recipe) {
    let newRecipe = document.createElement('div')
    newRecipe.classList.add('recipe')
    newRecipe.dataset.name = recipe

    let ingredients = recipe.ingredients
        .map(el => `<li>${el}</li>`)
        .join('')

    let instruction = recipe.instruction
        .map(el => `<li>${el}</li>`)
        .join('')

    newRecipe.innerHTML = `
                <div class="recipe__introduction">
                    <div class="recipe__title">${recipe.title}</div>
                    <p>ВРЕМЯ ПРИГОТОВЛЕНИЯ - ${recipe.duration} ЧАС</p>
                    <img src="${recipe.imgSrc}">
                    <div class="recipe__nutrients">
                        <ul>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ НА ПОРЦИЮ</ul>
                        <li>КАЛОРИЙНОСТЬ - ${recipe.nutrients['kkal']} ККАЛ</li>
                        <li>БЕЛКИ - ${recipe.nutrients['protein']} ГРАММ</li>
                        <li>ЖИРЫ ${recipe.nutrients['fat']} ГРАММ</li>
                        <li>УГЛЕВОДЫ ${recipe.nutrients['carbo']} ГРАММ</li>
                    </div>
                </div>
                <div class="recipe__ingredients">
                    <ul>ИНГРЕДИЕНТЫ</ul>
                    ${ingredients}
                </div>
                <div class="recipe__instructions">
                    <ul>ИНСТРУКЦИЯ</ul>
                    ${instruction}
                </div>`
    return newRecipe
}


function updateRecipes() {
    fetch(url)
        .then(response => response.json())
        .then(data => data[0])
        .then(recipe => main.appendChild(newRecipeElement(recipe)))
        .catch(e => console.log(e))
}


const options = {root: null, rootMargins: "0px", threshold: 0.5}
const observer = new IntersectionObserver(updateRecipes, options)
observer.observe(footer)


window.addEventListener('scroll', () => {
    if (this.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + 'px'
        document.body.classList.add('fixed-nav')
    } else {
        document.body.classList.remove('fixed-nav')
        document.body.style.paddingTop = 0
    }
    updateMenu()
})

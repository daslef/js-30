const nav = document.querySelector('nav')
let topOfNav = nav.offsetTop;

const recipeIntroduction = document.querySelector('.recipe__introduction')
const recipeNutrients = document.querySelector('.recipe__nutrients')
const recipeIngredients = document.querySelector('.recipe__ingredients')
const recipeInstructions = document.querySelector('.recipe__instructions')
const recipeSections = [recipeIntroduction, recipeNutrients, recipeIngredients, recipeInstructions]

const recipeMenuIntroduction = document.querySelector('.recipe__introduction__menu')
const recipeMenuNutrients = document.querySelector('.recipe__nutrients__menu')
const recipeMenuIngredients = document.querySelector('.recipe__ingredients__menu')
const recipeMenuInstructions = document.querySelector('.recipe__instructions__menu')
const recipeMenuOrder = document.querySelector('.recipe__order__menu')
const recipeMenuItems = [recipeMenuIntroduction, recipeMenuNutrients, recipeMenuIngredients, recipeMenuInstructions, recipeMenuOrder]

window.addEventListener('scroll', () => {

    if (this.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + 'px'
        document.body.classList.add('fixed-nav')
    } else {
        document.body.classList.remove('fixed-nav')
        document.body.style.paddingTop = 0
    }

    let x = this.innerWidth / 2
    let y = this.innerHeight / 3
    let activeElement = document.elementFromPoint(x, y)

    if (activeElement.tagName !== 'DIV') {
        activeElement = activeElement.parentElement
    }

    switch (activeElement.className) {
        case 'recipe__introduction':
            recipeMenuItems.filter(x => x !== recipeMenuIntroduction).map(x => {
                x.classList.remove('highlighted')
            })
            recipeMenuIntroduction.classList.add('highlighted')
            break;

        case 'recipe__nutrients':
            recipeMenuItems.filter(x => x !== recipeMenuNutrients).map(x => {
                x.classList.remove('highlighted')
            })
            recipeMenuNutrients.classList.add('highlighted')
            break;

        case 'recipe__ingredients':
            recipeMenuItems.filter(x => x !== recipeMenuIngredients).map(x => {
                x.classList.remove('highlighted')
            })
            recipeMenuIngredients.classList.add('highlighted')
            break;

        case 'recipe__instructions':
            recipeMenuItems.filter(x => x !== recipeMenuInstructions).map(x => {
                x.classList.remove('highlighted')
            })
            recipeMenuInstructions.classList.add('highlighted')
            break;
    }

})

function newRecipe() {

    let newRecipe = document.createElement('div')
    newRecipe.classList.add('recipe')

    const url = ''
    fetch(url)
        .then(response => response.json())
        .then(data => data[0])
        .then(recipe => {
            newRecipe.innerHTML = `
            <div class="recipe__title">${recipe.title}</div>
            <div class="recipe__introduction">
                <p>ВРЕМЯ ПРИГОТОВЛЕНИЯ - ${recipe.duration} ЧАС</p>
                <img src="${recipe.imgSrc}">
            </div>
            <div class="recipe__nutrients">
                <ul>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ НА ПОРЦИЮ</ul>
                <li>КАЛОРИЙНОСТЬ - ${recipe.nutrients['kkal']} ККАЛ</li>
                <li>БЕЛКИ - ${recipe.nutrients['protein']} ГРАММ</li>
                <li>ЖИРЫ ${recipe.nutrients['fat']} ГРАММ</li>
                <li>УГЛЕВОДЫ ${recipe.nutrients['carbo']} ГРАММ</li>
            </div>
            <div class="recipe__ingredients">
                <ul>ИНГРЕДИЕНТЫ</ul>
            </div>
            <div class="recipe__instructions">
                <ul>ИНСТРУКЦИЯ</ul>
            </div>`
            }
        )
    console.log(newRecipe)

}
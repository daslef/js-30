const url = 'https://raw.githubusercontent.com/daslef/js-30/master/24_sticky_nav/data.json'

const nav = document.querySelector('.menu'),
    logo = document.querySelector('.menu__logo a'),
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
    console.log(recipe)
    newRecipe.dataset.name = recipe.shortTitle

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
                    <img class="recipe__image" src="${recipe.imgSrc}">
                    <div class="recipe__nutrients">
                        <p>ЭНЕРГЕТИЧЕСКАЯ ЦЕННОСТЬ НА ПОРЦИЮ</p>
                        <ul>
                            <li>${recipe.nutrients['kkal']} ккал.</li>
                            <li>белки ${recipe.nutrients['protein']} г.</li>
                            <li>жиры ${recipe.nutrients['fat']} г.</li>
                            <li>углеводы ${recipe.nutrients['carbo']} г.</li>
                        </ul>
                    </div>
                </div>
                <div class="recipe__ingredients">
                    <p>ИНГРЕДИЕНТЫ</p>
                    <ul>${ingredients}</ul>
                </div>
                <div class="recipe__instructions">
                    <p>ИНСТРУКЦИЯ</p>
                    <ul>${instruction}</ul>
                </div>
                <div class="recipe__order-wrapper">
                    <p>Заказать</p>
                    <form class="recipe__order-form">
                        <div class="recipe__order-row">
                            <div class="recipe__order-col">
                                <input type="text" id="firstname" name="firstname">
                                <label for="firstname">First Name</label>
                            </div>
                            <div class="recipe__order-col">
                                <input type="text" id="lastname" name="lastname">
                                <label for="lastname">Last Name</label>
                            </div>
                        </div>
                        <div class="recipe__order-row">
                            <input type="text" name="phone" id="phone">
                            <label for="phone">Phone</label>
                        </div>
                        <div class="recipe__order-row">
                            <input type="text" name="address" id="address">
                            <label for="address">Address</label>
                        </div>
                    </form>
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

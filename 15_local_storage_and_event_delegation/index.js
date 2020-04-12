const form = document.querySelector('.plates__form');
const itemsList = document.querySelector('.plates__ul');
const items = JSON.parse(localStorage.getItem('items')) || [];

function populateList(arrayOfObjects=[], htmlNode) {
    htmlNode.innerHTML = arrayOfObjects.map((el, i) => {
        return `
            <li class="plates__ligc">
                <input class="plates__plate-checkbox" type="checkbox" data-index=${i} id="item${i}" ${ el.done ? "checked" : "" } />
                <label class="plates__plate-title" for="item${i}">${el.text}</label>
            </li>
        `
    }).join('')
}

function submitHandler(e) {
    e.preventDefault()
    let text = (e.target.querySelector('.plates__form-input')).value
    let item = {text, done: false}
    items.push(item)
    populateList(items, itemsList)
    localStorage.setItem('items', JSON.stringify(items))
    e.target.reset()
}

function initEventListeners() {
    itemsList.addEventListener('click', e => {
        if (!e.target.matches('input')) return
        items[e.target.dataset.index].done = !items[e.target.dataset.index].done
        localStorage.setItem('items', JSON.stringify(items))
    })
    form.addEventListener('submit', e => submitHandler(e))
}

initEventListeners()
populateList(items, itemsList)
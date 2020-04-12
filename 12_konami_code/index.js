const textWrapper = document.querySelector('h1')
const p = document.querySelector('p')

let pressed = []
const secret = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]
const mapping = new Map([
    ['ArrowUp', '&uarr;'],
    ['ArrowDown', '&darr;'],
    ['ArrowLeft', '&larr;'],
    ['ArrowRight', '&rarr;']
])

textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

function isEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
}

function display(array) {
    let symbols = []
    array.map(s => {
        let kbd_s = mapping.has(s) ? mapping.get(s) : s
        symbols.push(`<kbd>${kbd_s}</kbd>`)
    })
    symbols[symbols.length-1] = symbols[symbols.length-1].replace('<kbd>', '<kbd class="active">')
    p.innerHTML = symbols.join('')
}

function hurray() {
    document.querySelector('canvas').style.display = 'block'
    textWrapper.style.display = 'none'
    p.style.display = 'none'

}

document.addEventListener('keyup', (e) => {
    pressed.push(e.key)
    display(pressed)
    if (pressed.length === 11) pressed.splice(0, 1)
    if (isEqual(secret, pressed)) hurray()
})

anime.timeline({loop: true})
    .add({
        targets: 'h1 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i+1)
    }).add({
    targets: 'h1',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});
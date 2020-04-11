let textWrapper = document.querySelector('h1')
let secret = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]
let pressed = []

textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

function isEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
}

function hurray() {
    document.querySelector('canvas').style.display = 'block'
    textWrapper.style.display = 'none'
}

document.addEventListener('keyup', (e) => {
    pressed.push(e.key)
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
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});
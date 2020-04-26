const holes = document.querySelectorAll('.game__hole');
const scoreBoard = document.querySelector('.game__score');
const moles = document.querySelectorAll('.game__mole');
const startButton = document.querySelector('.game__button-start')

const minInterval = 200
const maxInterval = 1000
let lastHole = 0
let timeUp = false

function randomTime(min, max) {
    return Math.floor(Math.random() * max) + min
}

function randomHole(holes) {
    let ix = Math.round(Math.random() * (holes.length - 1))
    if (ix === lastHole) {
        return randomHole(holes)
    }
    lastHole = ix
    return holes[ix]
}

function peep() {
    const delay = randomTime(minInterval, maxInterval)
    const hole = randomHole(holes)
    hole.classList.add('up')
    setTimeout(() => {
        hole.classList.remove('up')
        if (!timeUp) peep()
    }, delay)
}

function startGame() {
    scoreBoard.textContent = 0
    timeUp = false
    startButton.setAttribute('disabled', true)
    peep()
    setTimeout(() => timeUp = true, 15000)
}

startButton.addEventListener('click', startGame)

for (let mole of moles) {
    mole.addEventListener('click', (e) => {
        scoreBoard.textContent++
        e.target.parentElement.classList.remove('up')
    })
}
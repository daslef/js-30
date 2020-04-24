const timeLeft = document.querySelector(".display__time-left")
const endTime = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll(".timer__button")
const manualInput = document.querySelector(".timer__manual")

let countdown

function timer(endTime) {
    clearInterval(countdown)
    displayEndTime(endTime)
    countdown = setInterval(() => {
        const dt = Math.round((endTime - Date.now()) / 1000)
        if (dt < 0) {
            clearInterval(countdown)
            return
        }
        displayTimeLeft(dt)
    }, 1000)
}

function setTimer() {
    const endTime = setEndTime(this.dataset.time)
    timer(endTime)
}

function setManualTimer(dt) {
    const endTime = setEndTime(dt * 60)
    manualInput.value = ''
    timer(endTime)
}

function setEndTime(dt) {
    return Date.now() + dt * 1000
}

function displayTimeLeft(time) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    timeLeft.textContent = `${minutes}:${seconds.toString().padStart(2,0)}`
}

function displayEndTime(time) {
    const timestamp = new Date(time)
    const minutes = timestamp.getMinutes()
    const hours = timestamp.getHours()
    endTime.textContent = `Be back at ${hours}:${minutes.toString().padStart(2,0)}`
}


buttons.forEach(button => button.addEventListener('click', setTimer))

manualInput.addEventListener('keyup', e => {
    if (e.code === 'Enter') setManualTimer(e.target.value)
})
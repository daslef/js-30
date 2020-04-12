const timeNodes = document.querySelectorAll('li[data-time]')
const result = document.querySelector('p')

const totalSeconds = Array.from(timeNodes)
    .map(timeNode => timeNode.dataset.time)
    .map(time => {
        let [min, sec] = time.split(':').map(x => Number.parseInt(x))
        return min * 60 + sec
    })
    .reduce((acc, x) => acc + x, 0)

const date = new Date(null)
date.setSeconds(totalSeconds)
result.innerText = `Total: ${date.toISOString().slice(11,19)}`
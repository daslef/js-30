const video = document.querySelector('.video'),
      speed = document.querySelector('.video__speed'),
      speedBar = speed.querySelector('.video__speed-bar')

const minSpeed = 0.4,
      maxSpeed = 4

function getPercent(e) {
    return (e.pageY - speed.offsetTop) / speed.offsetHeight
}

function calculateSpeed(percent) {
    return percent * (maxSpeed - minSpeed) + minSpeed
}

speed.addEventListener('mousemove', e => {
    const percent = getPercent(e)
    const playbackRate = calculateSpeed(percent)
    speedBar.style.height = Math.round(percent * 100) + '%';
    speedBar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
})

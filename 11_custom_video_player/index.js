const canvas = document.querySelector('canvas');
const wrapper = document.querySelector('.video-player');
const video = document.querySelector('.video-player__video');
const ui = document.querySelector('.video-player__ui');
const playButton = document.querySelector('.video-player__play-pause')
const progressWrapper = document.querySelector('.video-player__progress-wrapper')
const progressBar = document.querySelector('.video-player__progress-bar')

const timing = document.querySelector('.remote__time')
const remoteForward = document.querySelector('.remote__forward')
const remoteBackward = document.querySelector('.remote__backward')
const remotePlay = document.querySelector('g#Play')
const remoteSound = document.querySelector('g#Sound')


const ctx = canvas.getContext('2d');
let durationMinutes, durationSeconds

function calculateMean(data) {
    let [sum_r, sum_g, sum_b] = [0,0,0]
    for (let i=0, j=data.length; i<j; i+=3) {
        let [r,g,b] = data.slice(i,i+3)
        sum_r += r
        sum_g += g
        sum_b += b
    }
    return [Math.ceil(sum_r/data.length*3), Math.ceil(sum_g/data.length*3), Math.ceil(sum_b/data.length*3)]
}

function processImage(data) {
    let top = data.slice(0, video.videoWidth * 4 * 80).filter((value, index) => (index+1) % 4 !== 0)
    let bottom = data.slice(data.length - 80 * 4 * video.videoWidth).filter((value, index) => (index+1) % 4 !== 0)

    let left = [], right = []
    for (let i=0, j=data.length; i<j; i+=video.videoWidth*4) {
        let temporary = data.slice(i, i + video.videoWidth*4).filter((value, index) => (index+1) % 4 !== 0),
            temporary_left = temporary.filter((value, index) => (index < 40)),
            temporary_right = temporary.slice().reverse().filter((value, index) => (index < 40))
        left.push(...temporary_left)
        right.push(...temporary_right)
    }
    return [calculateMean(top), calculateMean(bottom), calculateMean(left), calculateMean(right)]
}

function capture() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    let frame = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
    let [top_mean, bottom_mean, left_mean, right_mean] = processImage(frame.data)
    let [top_mean_r, top_mean_g, top_mean_b] = top_mean,
        [bottom_mean_r, bottom_mean_g, bottom_mean_b] = bottom_mean,
        [left_mean_r, left_mean_g, left_mean_b] = left_mean,
        [right_mean_r, right_mean_g, right_mean_b] = right_mean
    for (let prop of ["-webkit-box-shadow", "-moz-box-shadow", "box-shadow"]) {
        wrapper.style.setProperty(prop, `6px -4px 4px 0 black,
                                                0px -20px 35px 5px rgba(${top_mean_r}, ${top_mean_g}, ${top_mean_b}, 0.75),
                                               0px -10px 15px -4px rgba(${top_mean_r}, ${top_mean_g}, ${top_mean_b}, 0.85),
                                               0px 20px 35px 5px rgba(${bottom_mean_r}, ${bottom_mean_g}, ${bottom_mean_b}, 0.75),
                                               0px 10px 15px -4px rgba(${bottom_mean_r}, ${bottom_mean_g}, ${bottom_mean_b}, 0.85),
                                               -15px 0px 20px 5px rgba(${left_mean_r}, ${left_mean_g}, ${left_mean_b}, 0.75),
                                               -5px 5px 10px -4px rgba(${left_mean_r}, ${left_mean_g}, ${left_mean_b}, 0.85),
                                               15px 0px 20px 5px rgba(${right_mean_r}, ${right_mean_g}, ${right_mean_b}, 0.75),
                                               5px 5px 10px -4px rgba(${right_mean_r}, ${right_mean_g}, ${right_mean_b}, 0.85)`)
    }
}

function changeTimingHandler(e) {
    let percent = e.offsetX / e.target.offsetWidth
    progressBar.style.width = `${percent * 100}%`
    video.currentTime = Math.ceil(percent * video.duration)
}

function changeSpeedHandler() {
    video.playbackRate = parseFloat(this.value)
}

function pauseHandler() {
    playButton.innerHTML = '<i class="fa fa-play"></i>'
}

function playHandler() {
    playButton.innerHTML = '<i class="fa fa-pause"></i>'
}

function updateTime() {
    let date = new Date('1993-02-22T00:00:00');
    date.setSeconds(video.currentTime)
    let currentTime = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").slice(3);
    timing.innerHTML = `${currentTime} / ${durationMinutes}:${durationSeconds}`
}

function updateHandler() {
    progressBar.style.width = `${this.currentTime / this.duration * 100}%`
    updateTime()
    capture()
}

function playButtonHandler() {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function forwardButtonHandler() {
    video.currentTime += 5
}

function backwardButtonHandler() {
    video.currentTime -= 5
}

video.addEventListener('loadedmetadata', () => {
    durationMinutes = Math.floor(video.duration / 60)
    durationSeconds = Math.floor(video.duration % 60)
})

video.addEventListener('timeupdate', updateHandler)
video.addEventListener('click', playButtonHandler)
video.addEventListener('play', playHandler)
video.addEventListener('pause', pauseHandler)

playButton.addEventListener('click', playButtonHandler)
progressWrapper.addEventListener('click', changeTimingHandler)

remoteForward.addEventListener('click', forwardButtonHandler)
remoteBackward.addEventListener('click', backwardButtonHandler)
remotePlay.addEventListener('click', playButtonHandler)
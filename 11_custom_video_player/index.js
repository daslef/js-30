const videoSrc = ['assets/video/foggy_x264.mp4', 'assets/video/ocean_x264.mp4', 'assets/video/ophtal_x264.mp4']
let currentVideoIx = 1
let expanded = false

const canvas = document.querySelector('canvas');
const wrapper = document.querySelector('.video-player');
const video = document.querySelector('.video-player__video');
const image = document.querySelector('img')

let WIDTH, HEIGHT

const progressWrapper = document.querySelector('.video-player__progress-wrapper')
const progressBar = document.querySelector('.video-player__progress-bar')
const menu = document.querySelector('.video-player__menu')

const timing = document.querySelector('.remote__time')
const remoteForward = document.querySelector('g#Forward')
const remoteBackward = document.querySelector('g#Backward')
const remotePlay = document.querySelector('g#Play')
const remoteMenu = document.querySelector('g#Menu')
const remoteExpand = document.querySelector('g#Expand')

let menuMode = false

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
    let top = data.slice(0, WIDTH * 4 * 20).filter((value, index) => (index+1) % 4 !== 0)
    let bottom = data.slice(data.length - 20 * 4 * WIDTH).filter((value, index) => (index+1) % 4 !== 0)

    let left = [], right = []
    for (let i=0, j=data.length; i<j; i+=WIDTH*4) {
        let temporary = data.slice(i, i + WIDTH*4).filter((value, index) => (index+1) % 4 !== 0),
            temporary_left = temporary.filter((value, index) => (index < 15)),
            temporary_right = temporary.slice().reverse().filter((value, index) => (index < 15))
        left.push(...temporary_left)
        right.push(...temporary_right)
    }
    return [calculateMean(top), calculateMean(bottom), calculateMean(left), calculateMean(right)]
}

function capture() {
    canvas.width = WIDTH
    canvas.height = HEIGHT
    ctx.drawImage(video, 0, 0, WIDTH, HEIGHT);
    let frame = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    let [top_mean, bottom_mean, left_mean, right_mean] = processImage(frame.data)

    // for (let x of [top_mean, bottom_mean]) {
    //     console.log(`%c ${'❚'.repeat(30)};`, `color: rgb(${x[0]}, ${x[1]}, ${x[2]})`)
    // }

    canvas.style.border = "4px solid"
    canvas.style.borderTopColor = `rgba(${top_mean.join(',')})`
    canvas.style.borderBottomColor = `rgba(${bottom_mean.join(',')})`
    canvas.style.borderLeftColor = `rgba(${left_mean.join(',')})`
    canvas.style.borderRightColor = `rgba(${right_mean.join(',')})`

    let topShadowLong = `0px -15px 40px 2px rgba(${top_mean.join(',')}, 0.95)`
    let topShadowShort = `0px -5px 5px -4px rgba(${top_mean.join(',')}, 0.95)`

    let bottomShadowLong = `0px 15px 40px 2px rgba(${bottom_mean.join(',')}, 0.95)`
    let bottomShadowShort = `0px 5px 5px -4px rgba(${bottom_mean.join(',')}, 0.95)`

    let leftShadowShort = `-2px 0px 10px -4px rgba(${left_mean.join(',')}, 0.85)`
    let rightShadowShort = `2px 0px 10px -4px rgba(${right_mean.join(',')}, 0.85)`

    let allShadowLong = `${topShadowLong}, ${bottomShadowLong}`
    let allShadowShort = `${topShadowShort}, ${bottomShadowShort}, ${leftShadowShort}, ${rightShadowShort}`

    for (let prop of ["-webkit-box-shadow", "-moz-box-shadow", "box-shadow"]) {
        wrapper.style.setProperty(prop, `5px -3px 3px 0 black, ${allShadowLong}, ${allShadowShort}`)
    }
}

function changeTimingHandler(e) {
    let percent = e.offsetX / e.target.offsetWidth
    progressBar.style.width = `${percent * 100}%`
    video.currentTime = Math.ceil(percent * video.duration)
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
    try {
        capture()
    } catch {
        console.warn('changing videosrc?')
    }

}

function playButtonHandler() {
    if (menuMode) {
        video.setAttribute('src', videoSrc[currentVideoIx])
        video.load()
        menuButtonHandler()
    }

    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function getNextVideoIx(direction) {
    if (direction === 'forward') {
        return (currentVideoIx === 2) ? 0 : currentVideoIx+1
    } else {
        return (currentVideoIx === 0) ? 2 : currentVideoIx-1
    }
}

function forwardButtonHandler() {
    if (!menuMode) {
        video.currentTime += 5
    } else {
        currentVideoIx = getNextVideoIx('forward')
        if (menu.style.transform === "") {
            menu.style.transform = "translateX(-33%)"
        } else if (menu.style.transform === "translateX(33%)") {
            menu.style.transform = ""
        }
    }
}

function backwardButtonHandler() {
    if (!menuMode){
        video.currentTime -= 5
    } else {
        currentVideoIx = getNextVideoIx('backward')
        if (menu.style.transform === "") {
            menu.style.transform = "translateX(33%)"
        } else if (menu.style.transform === "translateX(-33%)") {
            menu.style.transform = ""
        }
    }
}

function menuButtonHandler() {
    menuMode = !menuMode
    menu.classList.toggle('video-player__menu_active')
}

function expandButtonHandler() {
    if (!expanded) {
        video.style.width = "1280px";
        wrapper.style.left = `${(window.innerWidth - 1280) / 2 - 100}px`
        wrapper.style.top = `${(window.innerHeight - 720) / 2}px`
        document.body.style.filter = "opacity: 0.8"
        document.body.style.backgroundSize = "210%"
        document.body.style.backgroundPositionY = "41%"
        document.querySelector('svg').style.right = '2vw'
        canvas.style.right = `${0.02 * window.innerWidth + 96}px`

    } else {
        video.style.width = "380px"
        wrapper.style.left = "40vw"
        wrapper.style.top = "26vh"
        canvas.style.top = "15vh"
        canvas.style.right = `${0.05 * window.innerWidth + 96}px`
        document.body.style.filter = "opacity: 1"
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPositionY = "center"
        document.querySelector('svg').style.right = '5vw'
    }
    expanded = !expanded
}

video.addEventListener('loadedmetadata', () => {
    durationMinutes = Math.floor(video.duration / 60)
    durationSeconds = Math.floor(video.duration % 60)
    WIDTH = 180
    HEIGHT = 180 * video.videoHeight / video.videoWidth
})

video.addEventListener('timeupdate', updateHandler)
video.addEventListener('click', playButtonHandler)

progressWrapper.addEventListener('click', changeTimingHandler)

remoteForward.addEventListener('click', forwardButtonHandler)
remoteBackward.addEventListener('click', backwardButtonHandler)
remotePlay.addEventListener('click', playButtonHandler)
remoteMenu.addEventListener('click', menuButtonHandler)
remoteExpand.addEventListener('click', expandButtonHandler)
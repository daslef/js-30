const player = document.querySelector('.player')

const playController = player.querySelector('audio')
const playPauseButton = player.querySelector('button#play-pause')
const forwardButton = player.querySelector('button#forward')
const backwardButton = player.querySelector('button#backward')
const volumeBar = player.querySelector('input[type="range"]')
const info = player.querySelector('.player__info')
// titlessssssssssssssssssssssssssssssss
const bgMusicFiles = [
    {"title": "Burial x Four Tet - Nove",
        "cover": "assets/music/burial.jfif",
        "src": "assets/music/burial.mp3"},
    {"title": "Cesaria Evora - Sodade",
        "cover": "assets/music/evora.jpg",
        "src": "assets/music/evora.mp3"},
    {"title": "Akira Yamaoka - Reprise",
        "cover": "assets/music/yamaoka.jfif",
        "src": "assets/music/yamaoka.mp3"}
]

let currentMusicIndex = 0

playController.src = bgMusicFiles[currentMusicIndex].src
player.querySelector('.player__ui').style.backgroundImage = `url(${bgMusicFiles[currentMusicIndex].cover})`
const [author, title] = bgMusicFiles[currentMusicIndex].title.split(' - ')
info.innerHTML = `<span class="song">${author}</span> - <span class="author">${title}</span>`

player.addEventListener('mousedown', (e) => {
    const state = (player.className === 'player player_inactive') ? 'inactive' : 'active'
    player.className = (state === 'inactive') ? "player player_active" : "player player_inactive"
})

player.addEventListener('mouseenter', (e) => {
    cursor.style.display = "none";
    player.style.cursor = "pointer"
})

player.addEventListener('mouseleave', (e) => {
    cursor.style.display = "block";
    player.style.cursor = "none"
})

playPauseButton.addEventListener('mousedown', (e) => {

    if (playController.paused || playController.ended) {
        playController.play()
        playPauseButton.title = 'Pause'
        playPauseButton.innerHTML = '<i class="fa fa-pause fa-5x"></i>'
        playPauseButton.style.left = "74px"
    } else {
        playController.pause()
        playPauseButton.title = 'Play'
        playPauseButton.innerHTML = '<i class="fa fa-play fa-5x"></i>'
        playPauseButton.style.left = "78px"
    }
    e.stopPropagation()
})

playController.addEventListener('ended', e => {
    playPauseButton.title = 'Play'
    playPauseButton.innerHTML = '<i class="fa fa-play fa-5x"></i>'
    playPauseButton.style.left = "78px"
})

function changeMusic(e, direction) {
    e.stopPropagation()

    if (direction === "forward") {
        currentMusicIndex = (currentMusicIndex+1 === bgMusicFiles.length) ? 0 : currentMusicIndex+1
    } else if (direction === "backward") {
        currentMusicIndex = (currentMusicIndex-1 < 0) ? bgMusicFiles.length-1 : currentMusicIndex-1
    }

    playController.src = bgMusicFiles[currentMusicIndex].src
    player.querySelector('.player__ui').style.backgroundImage = `url(${bgMusicFiles[currentMusicIndex].cover})`
    const [author, title] = bgMusicFiles[currentMusicIndex].title.split(' - ')
    info.innerHTML = `<span class="song">${author}</span> - <span class="author">${title}</span>`
    playPauseButton.title = 'Pause'
    playPauseButton.innerHTML = '<i class="fa fa-pause fa-5x"></i>';
    playController.play()
}

forwardButton.addEventListener('mousedown', e => {
    changeMusic(e, "forward")
})

backwardButton.addEventListener('mousedown', e => {
    changeMusic(e, "backward")
})

volumeBar.addEventListener('mousedown', (e) => {
    playController.volume = e.target.value
    e.stopPropagation()
})
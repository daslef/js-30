const video = document.querySelector('.app__video')
const canvas = document.querySelector('.app__canvas')
let ctx = canvas.getContext('2d')
const audioFx = document.querySelector('.audio')
const photoButton = document.querySelector('a')
const [radioNone, radioRed, radioRGB, radioAlpha] = document.querySelectorAll('.app__image-effects input[type="radio"]')
let snapWrapper = document.querySelector('.app__snapshot-wrapper')
let imageEffect = 'none'

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
            video.srcObject = stream
            video.play()
        })
        .catch(error => console.error('Something went wrong...', error))
}

function updateCanvas() {
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth
    return setInterval(() => {
        if (imageEffect === 'ghost') {
            ctx.globalAlpha = 0.1
        } else {
            ctx.globalAlpha = 1
        }
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        let imageData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight)
        if (imageEffect === 'red' || imageEffect === 'rgb') {
            imageData = new ImageData(applyImageEffect(imageData.data, imageEffect), canvas.width, canvas.height)
        }

        ctx.putImageData(imageData, 0, 0)
    }, 16)
}

function createPhotoLink(data) {
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'handsome')
    link.innerHTML = `<img src=${data} alt="WebCam Image" />`
    return link
}

function playAudioFx() {
    audioFx.currentTime = 0
    audioFx.play()
}

function takePhoto() {
    playAudioFx()
    if (snapWrapper.children.length === 6) {
        snapWrapper.removeChild(snapWrapper.children[5])
    }
    const data = canvas.toDataURL('image/jpeg')
    snapWrapper.insertBefore(createPhotoLink(data), snapWrapper.firstChild)
}

function redEffect(pixels) {
    for (let i=0; i < pixels.length; i+=4) {
        pixels[i] = pixels[i] + 10
        pixels[i+1] = pixels[i+1] - 50
        pixels[i+2] = pixels[i+2] * 0.5
    }
    return pixels
}

function rgbEffect(pixels) {
    for (let i=0; i < pixels.length; i+=4) {
        pixels[i - 550] = pixels[i]
        pixels[i + 50] = pixels[i+1]
        pixels[i + 100] = pixels[i+2]
    }
    return pixels
}

function applyImageEffect(data, effect) {
    switch (effect) {
        case 'red':
            return redEffect(data)
        case 'rgb':
            return rgbEffect(data)
    }
}

video.addEventListener('canplay', updateCanvas)
photoButton.addEventListener('click', takePhoto)
document.querySelectorAll('.app__image-effects input[type="radio"]').forEach(
    el => el.addEventListener('change', (e) => imageEffect = e.target.value)
)

getVideo()
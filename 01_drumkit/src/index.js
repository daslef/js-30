const keys = document.querySelectorAll('.wrapper-keys__key')
const cursor = document.querySelector('.custom-cursor')

window.addEventListener('keydown', (e) => {
    let key = e.keyCode
    let sound = document.querySelector(`.sound-files audio[data-key="${key}"]`)
    let div = document.querySelector(`.wrapper-keys__key[data-key="${key}"]`)

    if (!sound) return
    sound.currentTime = 0;
    div.classList.add('wrapper-keys__key_playing')
    sound.play()
})


for (let key of keys) {
    
    key.addEventListener('click', e => {
        let keyCode = key.getAttribute('data-key')
        let sound = document.querySelector(`audio[data-key="${keyCode}"]`)

        if (!sound) return

        sound.currentTime = 0;
        key.classList.add('wrapper-keys__key_playing')
        sound.play()
    })

    key.addEventListener('transitionend', (e) => {
        e.target.classList.remove('wrapper-keys__key_playing')
    })

    key.addEventListener('mouseenter', (e) => {
        cursor.style.borderColor = "red"
    })

    key.addEventListener('mouseleave', (e) => {
        cursor.style.borderColor = "#444444"
    })
}

document.addEventListener('mousemove', e => {
    cursor.style.top = `${e.pageY - 9}px`
    cursor.style.left = `${e.pageX - 9}px`
})

document.addEventListener('click', e => {
    cursor.classList.add('custom-cursor_click')
    setTimeout(() => {
        cursor.classList.remove('custom-cursor_click')
    }, 400)
})
const wrapper = document.querySelector('.wrapper')
const text = wrapper.querySelector('h1')
const walk = 20;

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = wrapper
    let { offsetX: x, offsetY: y } = e
    if (this !== e.target) {
        x += e.target.offsetLeft
        y += e.target.offsetTop
    }
    let shadX = Math.round(x / width * walk - walk / 2),
        shadY = Math.round(y / height * walk - walk / 2)
    text.style.textShadow = `${shadX}px ${shadY}px 0 rgba(0,0,0,0.8)`
}

wrapper.addEventListener('mousemove', shadow)
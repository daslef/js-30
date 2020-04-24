const slider = document.querySelector('.items')
let scrollLeft;
let startX;
let isDown = false;

slider.addEventListener('mouseleave', () => {
    isDown = false
    this.classList.remove('active')
})

slider.addEventListener('mousedown', (e) => {
    isDown = true
    slider.classList.add('active')
    startX = e.pageX - slider.offsetLeft
    scrollLeft = slider.scrollLeft
})

slider.addEventListener('mouseup', () => {
    isDown = false
    slider.classList.remove('active')
})

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const currentX = e.pageX - slider.offsetLeft
    slider.scrollLeft = scrollLeft - (currentX - startX) * 1.5
})

const ps = new PerfectScrollbar(slider);
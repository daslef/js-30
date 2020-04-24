const triggers = document.querySelectorAll('.menu__item')

const span = document.createElement('span')
span.classList.add('menu__highlight')
document.body.appendChild(span)

function highlight() {
    const {width: width, height: height, top: top, left: left} = this.getBoundingClientRect()
    span.style.width = `${width}px`
    span.style.height = `${height}px`
    span.style.transform = `translate(${left}px, ${top}px)`
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', highlight))
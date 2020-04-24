const triggers = document.querySelectorAll('.menu__item')

const menuSpan = document.createElement('span')
menuSpan.classList.add('menu__highlight')
document.body.appendChild(menuSpan)

const submenuSpan = document.createElement('span')
submenuSpan.classList.add('menu__background')
document.body.appendChild(submenuSpan)

function handleEnter() {
    const {width: width, height: height, top: top, left: left} = this.getBoundingClientRect()
    menuSpan.style.width = `${width}px`
    menuSpan.style.height = `${height}px`
    menuSpan.style.transform = `translate(${left}px, ${top}px)`
    menuSpan.style.zIndex = "-1" //TODO
    this.classList.add('active')

    const {width: subWidth, height: subHeight, top: subTop, left: subLeft} = this.querySelector('.menu__submenu').getBoundingClientRect()
    submenuSpan.classList.add('active')
    submenuSpan.style.width = subWidth + 'px'
    submenuSpan.style.height = subHeight + 'px'
    submenuSpan.style.transform = `translate(${subLeft}px, ${subTop}px)`
    submenuSpan.style.zIndex = "-1" //TODO
    // setTimeout(() => submenuSpan.classList.add('show'), 500)
}

function handleLeave() {
    this.classList.remove('active')
    submenuSpan.classList.remove('active')
    // setTimeout(() => submenuSpan.classList.remove('show'), 500)
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter))
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave))
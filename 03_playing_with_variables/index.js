const controllers = document.querySelectorAll('input')
const toggler = document.querySelector('.image-wrapper__style-toggler')

const customStyleLink = '<link rel="stylesheet" href="assets/custom_range.css">'

toggler.addEventListener('click', e => {
    if (document.head.children.length == 3) {
        let customLinkElement = document.createElement("link")
        customLinkElement.href = "assets/custom_range.css"
        customLinkElement.rel = "stylesheet"
        document.head.appendChild(customLinkElement)
        toggler.innerHTML = "disable custom range"
    } else {
        document.head.children[3].remove()
        toggler.innerHTML = "enable custom range"
    }
})

function changeHandler(e) {
    let new_value = e.target.value + e.target.dataset['suffix']
    document.documentElement.style.setProperty(`--${e.target.name}`, new_value)
}

for (let i of controllers) {
    i.addEventListener('change', changeHandler)
    i.addEventListener('mousemove', changeHandler)
}
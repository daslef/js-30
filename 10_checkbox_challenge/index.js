const checkboxes = document.querySelectorAll('.inbox__input')
const image = document.querySelector('img')
let lastCheckedIx = null

function handleCheck(e) {
    let elements = Array.from(checkboxes)
    let currentIx = elements.indexOf(e.target)

    if (!e.target.checked) {
        lastCheckedIx = null
        return
    }

    if (!e.shiftKey || !lastCheckedIx || !elements.some(el => el.checked)) {
        lastCheckedIx = currentIx
        return
    }

    if (lastCheckedIx < currentIx) {
        elements.slice(lastCheckedIx, currentIx + 1).map(el => el.checked = true)
        lastCheckedIx = elements.indexOf(e.target)
    }
}

checkboxes.forEach(ch => {
    ch.addEventListener('click', e => handleCheck(e))
})

document.addEventListener('keydown', e => {
    if (e.key !== 'Shift') return
    image.style.transform = "translateY(-5px)"
    image.style.filter = "opacity(1)"
})

document.addEventListener('keyup', e => {
    if (e.key !== 'Shift') return
    image.style.transform = "translateY(0)"
    image.style.filter = "opacity(0.8)"
})
const panels = document.querySelectorAll('.panels')


function clickHandle(e) {
    console.log(e.target.tagName)
    let target = (e.target.tagName === 'P') ? e.target.parentElement : e.target

    for (let i=0; i < panels.length; i++) {
        if (panels[i] !== target && panels[i].classList.contains('panels_open')) {
            panels[i].classList.toggle('panels_open')
            panels[i].classList.toggle('panels_active')
        }
    }

    target.classList.toggle('panels_open')

    setTimeout(() => {
        target.classList.toggle('panels_active')
    }, 1000)
}


for (let panel of panels) {
    panel.addEventListener('click', clickHandle)
}
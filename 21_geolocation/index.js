const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

navigator.geolocation.watchPosition(data => {
    if (data.coords.heading && data.coords.speed) {
        arrow.style.transform = `rotate(${e.coords.heading}deg)`
        speed.textContent = data.coords.speed.toString()
    } else {
        let step = 0
        setTimeout(function update() {
            let sign = (Math.random() > 0.5) ? -1 : 1
            let delta = sign * Math.random() * 20
            arrow.style.transform = `rotate(${delta}deg)`
            if (step === 2) {
                speed.textContent = Number(10 + sign * Math.random() * 5).toFixed(1).toString()
                step = 0
            } else {
                step += 1
            }
            console.log(step)
            setTimeout(update, 1000)
        }, 1000)
    }
})


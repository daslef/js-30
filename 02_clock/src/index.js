const [hoursHand, minutesHand, secondsHand] = document.querySelectorAll('.clock__hand')

setInterval(() => {
    let currentDate = new Date()
    let hour = currentDate.getHours()
    let minute = currentDate.getMinutes()
    let second = currentDate.getSeconds()
    hoursHand.style.transform = `translateX(6.2rem) rotate(${hour * 30 + 90}deg)`
    minutesHand.style.transform = `rotate(${minute * 6 + 90}deg)`
    secondsHand.style.transform = `rotate(${second * 6 + 90}deg)`
}, 1000)
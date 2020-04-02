const [hoursHand, minutesHand, secondsHand] = document.querySelectorAll('.clock__hand')

setInterval(() => {
    let currentDate = new Date()
    let hour = currentDate.getHours()
    let minute = currentDate.getMinutes()
    let second = currentDate.getSeconds()
    hoursHand.style.transform = `translate(6.2rem, -15px) rotate(${hour * 30 + 90}deg)`
    minutesHand.style.transform = `translateY(15px) rotate(${minute * 6 + 90}deg)`
    secondsHand.style.transform = `translateY(15px) rotate(${second * 6 + 90}deg)`
}, 1000)
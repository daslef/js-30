const words = document.querySelector('.words');
const spinner = document.querySelector('.spinner')

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let newP = true

recognition.addEventListener('result', e => {

    const result = e.results[0]
    let all_paragraphs = words.querySelectorAll('p')
    let p = (newP) ? document.createElement('p') : all_paragraphs[all_paragraphs.length-1]

    if (newP) {
        newP = false
        spinner.style.filter = "opacity(1)"
    }

    p.textContent = result[0].transcript
    p.style.color = (result.isFinal) ? "green" : "red"

    if (result.isFinal) {
        p.style.filter = `opacity(${result[0].confidence})`
        newP = true
        spinner.style.filter = "opacity(0)"
    }
    words.appendChild(p)
})

recognition.addEventListener('end', recognition.start)
recognition.start()

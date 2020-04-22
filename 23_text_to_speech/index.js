const startButton = document.querySelector('.app__start'),
      pauseButton = document.querySelector('.app__pause'),
      tempoInput = document.querySelector('.app__tempo'),
      pitchInput = document.querySelector('.app__pitch'),
      voiceSelect = document.querySelector('.app__voices'),
      textInput = document.querySelector('.app__text')

const msg = new SpeechSynthesisUtterance()
let voices = []


function populateVoices() {
    voices = this.getVoices()
    voiceSelect.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function changeText() {
    msg.text = this.value
}

function toggle(startOver=true) {
    speechSynthesis.cancel()
    if (startOver) {
        msg.rate = tempoInput.value
        msg.pitch = pitchInput.value
        speechSynthesis.speak(msg)
    }
}

textInput.addEventListener('input', changeText)
voiceSelect.addEventListener('change', setVoice)
speechSynthesis.addEventListener('voiceschanged', populateVoices);
startButton.addEventListener('click', toggle)
pauseButton.addEventListener('click', () => toggle(false))
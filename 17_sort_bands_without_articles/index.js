const ul = document.querySelector('.bands')
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const stripArticles = string => string.replace(/^(a |the |an )/i, '')

ul.innerHTML = bands
    .sort((a, b) => stripArticles(a) > stripArticles(b) ? 1 : -1)
    .map(band => `<li>${band}</li>`)
    .join('')
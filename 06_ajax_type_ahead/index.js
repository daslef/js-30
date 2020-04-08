const cities = []

fetch("https://raw.githubusercontent.com/pensnarik/russian-cities/master/russian-cities.json")
    .then(blob => blob.json())
    .then(cities => cities.sort((a, b) => (a.population < b.population) ? 1 : -1))
    .then(data => cities.push(...data))
    .catch(e => console.log(e))

function formatNumber(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function highlightSubstring(regex, string) {
    return string.replace(regex, `<span class="search__matched">${regex.source}</span>`)

}

function findMatches(token) {
    let regex = new RegExp(token, 'gi')
    let candidates = cities.filter(city => city.name.match(regex))
    return candidates
        .map(city => `<li class="search__li">
                        <span class="search__city">${highlightSubstring(regex, city.name)}</span>
                        <span class="search__subject">(${city.subject})</span>
                        <span class="search__population">${formatNumber(city.population)}</span></li>`)
        .join('')
}

function displayMatches(e) {
    let token = e.target.value
    let ul = document.querySelector('ul')

    switch (token.length) {
        case 0: {
            ul.innerHTML = ""
            break
        }
        case 1: {
            ul.innerHTML = `<li class="search__li">Your request is too short...</li>`
            break
        }
        default: {
            ul.innerHTML = findMatches(token)
        }
    }

}

document.querySelector('input').addEventListener('input', displayMatches)
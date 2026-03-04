const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');

async function fetchWeather(city) {

    let response = fetch("info.json").then(response => response.json());

    const data = await response;

    const weatherCondition = data.weather[0].main; 
    console.log(weatherCondition);
    updateBackground(weatherCondition);
}
    
function updateBackground(weatherCondition) {
    const body = document.body;
    let imageUrl = '';

    // Mappiamo le condizioni alle immagini
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            imageUrl = 'url("images/engin-akyurt-3ihnKT5apmg-unsplash.jpg")';
            break;
        case 'rain':
            imageUrl = 'url("images/alexey-sabulevskiy-tl8GM4dWXnM-unsplash.jpg")';
            break;
        case 'drizzle':
            imageUrl = 'url("images/alexey-sabulevskiy-tl8GM4dWXnM-unsplash.jpg")';
            break;
        case 'clouds':
            imageUrl = 'url("images/valery-rabchenyuk-OP1kmMw1wSQ-unsplash.jpg")';
            break;
        case 'snow':
            imageUrl = 'url("images/snowy.jpg")';
            break;
        case 'thunderstorm':
            imageUrl = 'url("images/thunderstorm.jpg")';
            break;
        default:
            imageUrl = 'url("images/default.jpg")';
    }

    // Applichiamo lo sfondo al body
    body.style.backgroundImage = imageUrl;
}

searchButton.addEventListener('click', () => {
    const city = searchBar.value;
    if (city) {
        fetchWeather(city);
    }
});


window.addEventListener('load', fetchWeather);
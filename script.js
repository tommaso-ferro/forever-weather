const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const weatherInfoText = document.querySelector('#weather-info-h1');
const highTempText = document.querySelector('#high-temp');
const lowTempText = document.querySelector('#low-temp');
const positionText = document.querySelector('#position-text');
const dateText = document.querySelector('#date');
const humidityText = document.querySelector('#humidity');
const windSpeedText = document.querySelector('#wind-speed');

async function fetchWeather(city) {

    let response = fetch("info.json").then(response => response.json());

    const data = await response;

    const weatherCondition = data.weather[0].main; 
    console.log(weatherCondition);
    updateBackground(weatherCondition);

    const weatherDescription = data.weather[0].description;
    weatherInfoText.textContent = weatherDescription;

    const temperature = data.main.temp;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const humidity = data.main.humidity;
    humidityText.textContent = `${humidity}%`;

    const windSpeed = data.wind.speed;
    windSpeedText.textContent = windSpeed;

    const cityText = data.name;
    const countryText = data.sys.country;
    updatePosition(cityText, countryText);

    document.querySelector('#degrees').textContent = `${Math.round(temperature)}°`;
    highTempText.textContent = `H: ${Math.round(tempMax)}°`;
    lowTempText.textContent = `L: ${Math.round(tempMin)}°`;
}
    
function updateBackground(weatherCondition) {
    const body = document.body;
    let imageUrl = '';
    const condition = weatherCondition.toLowerCase();

    // Reset delle classi per rimuovere il meteo precedente e aggiunta di quello nuovo
    body.className = ''; 
    body.classList.add(condition); 

    // Mappiamo le condizioni alle immagini
    switch (condition) {
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
    const country = data.sys.country;
    const city2 = data.name;
    if (city) {
        fetchWeather(city);
        updatePosition(city2, country);
    }
});

function updatePosition(city, country) {
    positionText.textContent = `${city}, ${country}`;
}

function dateUpdate(){
    let now = new Date();  
    dateText.textContent = `(${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })})`;
}

window.addEventListener('load', () => {
    fetchWeather();
    dateUpdate();
});
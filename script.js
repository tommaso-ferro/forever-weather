import { MeshLambertMaterial, FrontSide } from 'https://esm.sh/three';
import * as topojson from 'https://esm.sh/topojson-client';

    const world = new Globe(document.getElementById('globeViz'))
        .backgroundColor('rgba(0,0,0,0)')
        .showGlobe(false)
        .showAtmosphere(false)
        .width(230)  
        .height(230);

    world
        .labelLat(d => d.lat)
        .labelLng(d => d.lng)
        .labelText(d => d.text)
        .labelSize(1.5)           
        .labelDotRadius(0.4)      
        .labelColor(() => 'red')
        .labelAltitude(0.01) 
        .labelIncludeDot(true)
        .labelDotOrientation('outward')
        .labelResolution(2);

const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const weatherInfoText = document.querySelector('#weather-info-h1');
const highTempText = document.querySelector('#high-temp');
const lowTempText = document.querySelector('#low-temp');
const positionText = document.querySelector('#position-text');
const dateText = document.querySelector('#date');
const humidityText = document.querySelector('#humidity');
const windSpeedText = document.querySelector('#wind-speed');
const gotoCity1Button = document.querySelector('#goto-city-1');
const gotoCity2Button = document.querySelector('#goto-city-2');

let weeklyChartInstance = null;   

async function fetchWeather(city) {
    let response = fetch(`https://wttr.in/${city}?format=j1`).then(response => response.json());
    const data = await response;
    console.log(data);

    const weatherCondition = data.current_condition[0].weatherDesc[0].value;
    console.log(weatherCondition);
    updateBackground(weatherCondition);

    const weatherDescription = data.current_condition[0].weatherDesc[0].value;
    weatherInfoText.textContent = weatherDescription;

    const temperature = data.current_condition[0].temp_C;
    const tempMin = data.current_condition[0].temp_C;
    const tempMax = data.current_condition[0].temp_C;
    const humidity = data.current_condition[0].humidity;
    humidityText.textContent = `${humidity}%`;

    const windSpeed = data.current_condition[0].windspeedKmph;
    windSpeedText.textContent = `${windSpeed} km/h`;

    const cityText = data.nearest_area[0].areaName[0].value;
    const countryText = data.nearest_area[0].country[0].value;
    updatePosition(cityText, countryText);

    const lat = data.nearest_area[0].latitude;
    const lon = data.nearest_area[0].longitude;
    const cityName = data.nearest_area[0].areaName[0].value;

    world.labelsData([{
        lat: lat,
        lng: lon,
        text: cityName
    }]);

    world.pointOfView({ lat: lat, lng: lon, altitude: 0.3 }, 1500);
    world.controls().autoRotate = false;

    document.querySelector('#degrees').textContent = `${Math.round(temperature)}°`;
    highTempText.textContent = `H: ${Math.round(tempMax)}°`;
    lowTempText.textContent = `L: ${Math.round(tempMin)}°`;

    await fetchForecast();
}
    
async function fetchForecast() {
    let response = fetch("forecast.json").then(response => response.json());
    const data = await response;

    const labels = data.forecast.map(item => item.day);
    const temps = data.forecast.map(item => item.temp);

    createWeeklyChart(labels, temps);
}

function createWeeklyChart(labels, temps) {
    const ctx = document.getElementById('weekly-chart').getContext('2d');

    if (weeklyChartInstance) {
        weeklyChartInstance.destroy();
    }

    weeklyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature °C',
                data: temps,
                borderColor: 'rgba(255, 255, 255, 0.95)',
                backgroundColor: 'rgba(199, 36, 36, 0)',
                borderWidth: 4,
                tension: 0.4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: 'rgba(255,255,255,1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    displayColors: false
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0)' },
                    ticks: {
                        color: 'rgba(255,255,255,0.8)',
                        font: { size: 13, family: 'Inter' },
                        stepSize: 5
                    }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0)' },
                    ticks: {
                        color: 'rgba(255,255,255,0.8)',
                        font: { size: 13, family: 'Inter' }
                    }
                }
            }
        }
    });
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
        case 'sunny':
            imageUrl = 'url("images/engin-akyurt-3ihnKT5apmg-unsplash.jpg")';
            break;
        case 'rain':
            imageUrl = 'url("images/alexey-sabulevskiy-tl8GM4dWXnM-unsplash.jpg")';
            break;
        case 'drizzle':
            imageUrl = 'url("images/alexey-sabulevskiy-tl8GM4dWXnM-unsplash.jpg")';
            break;
        case 'clouds':
            imageUrl = 'url("images/alexey-sabulevskiy-tl8GM4dWXnM-unsplash.jpg")';
            break;
        case 'overcast':
            imageUrl = 'url("images/alexey-sabulevskiy-tl8GM4dWXnM-unsplash.jpg")';
            break;
        case 'partly cloudy':
            imageUrl = 'url("images/valery-rabchenyuk-OP1kmMw1wSQ-unsplash.jpg")';
            break;
        case 'snow':
            imageUrl = 'url("images/aaron-burden-5AiWn2U10cw-unsplash.jpg")';
            break;
        case 'thunderstorm':
            imageUrl = 'url("images/johannes-plenio-E-Zuyev2XWo-unsplash.jpg")';
            break;
        case 'fog':
            imageUrl = 'url("images/artem-sapegin-TBw3iQGdwbg-unsplash.jpg")';
            break;
        case 'mist':
            imageUrl = 'url("images/artem-sapegin-TBw3iQGdwbg-unsplash.jpg")';
            break;
        default:
            imageUrl = 'url("images/default.jpg")';
    }

    // Applichiamo lo sfondo al body
    body.style.backgroundImage = imageUrl;
}

gotoCity1Button.addEventListener('click', () => {
    navigator.serial.requestPort();
});

searchButton.addEventListener('click', () => {
    const city = searchBar.value;
    if (city) {
        fetchWeather(city);
    }
});

function updatePosition(city, country) {
    positionText.textContent = `${city}, ${country}`;
}

function dateUpdate(){
    let now = new Date();  
    dateText.textContent = `(${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })})`; 
}     

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 1;

fetch('//cdn.jsdelivr.net/npm/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        world
          .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
          .polygonCapMaterial(new MeshLambertMaterial({ color: 'rgba(255,255,255,0.8)', side: FrontSide }))
          .polygonSideColor(() => 'rgba(0,0,0,0)');
      });

window.addEventListener('load', () => {
    //fetchWeather(); 
    dateUpdate();
    resizeCanvas();
});

window.addEventListener('resize', resizeCanvas);
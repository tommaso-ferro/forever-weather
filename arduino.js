const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const weatherInfoText = document.querySelector('#weather-info-h1');
const highTempText = document.querySelector('#high-temp');
const lowTempText = document.querySelector('#low-temp');
const positionText = document.querySelector('#position-text');
const dateText = document.querySelector('#date');
const humidityText = document.querySelector('#humidity-p');
const luminosityText = document.querySelector('#luminosity-p');
const windSpeedText = document.querySelector('#wind-speed');

let weeklyChartInstance = null;   

async function fetchIP(id) {

        const response = await fetch(`http://${id}/data`);
        const data = await response.json();

    const temperature = data[0].temperature;

    const humidity = data[0].humidity;
    humidityText.textContent = `${humidity}%`;

    const lux = data[0].luminosity;
    luminosityText.textContent = `${lux} lux`;

    const laboratoryText = data[0].position;

    document.querySelector('#degrees').textContent = `${Math.round(temperature)}°`;

    weatherInfoText.innerHTML = '';

    updatePosition(laboratoryText);
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

searchButton.addEventListener('click', () => {
    let id = searchBar.value;
    if (id) {
        fetchIP(id);
        console.log(`Fetching data for IP: ${id}`);
    }
});

function updatePosition(city) {
    positionText.textContent = `${city}`;
}

function dateUpdate(){
    let now = new Date();  
    dateText.textContent = `(${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })})`; 
}     

/* world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 1; */

window.addEventListener('load', () => {
    fetchIP(); 
    dateUpdate();

});

window.addEventListener('resize', null);
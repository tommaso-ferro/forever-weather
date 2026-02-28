function updateBackground(weatherCondition) {
    const body = document.body;
    let imageUrl = '';

    // Mappiamo le condizioni alle immagini
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            imageUrl = 'url("small-clouds-with-sun.jpg")';
            break;
        case 'rain':
            imageUrl = 'url("rainy.jpg")';
            break;
        case 'clouds':
            imageUrl = 'url("cloudy.jpg")';
            break;
        default:
            imageUrl = 'url("default.jpg")';
    }

    // Applichiamo lo sfondo al body
    body.style.backgroundImage = imageUrl;
}


// Rimuovi le classi precedenti e aggiungi quella nuova
body.className = ''; 
body.classList.add(weatherCondition.toLowerCase());

function changeWeather(condition) {
    const body = document.body;
    
    // Rimuoviamo eventuali classi precedenti
    body.className = ''; 
    
    // Aggiungiamo la classe corrispondente alla condizione cliccata
    body.classList.add(condition);
    
    console.log("Meteo simulato:", condition);
}
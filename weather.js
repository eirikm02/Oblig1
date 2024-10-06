const locations = [
    { name: "Tokyo, Japan", lat: 35.6895, lon: 139.6917 },
    { name: "New York, USA", lat: 40.7128, lon: -74.0060 },
    { name: "London, UK", lat: 51.5074, lon: -0.1278 },
    { name: "Paris, France", lat: 48.8566, lon: 2.3522 },
    { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 }
];

function fetchWeather(location) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = data.current_weather;
            const weatherBox = document.getElementById(`weather-${location.name}`);

            weatherBox.innerHTML = `
                <h3>${location.name}</h3>
                <p>Temperature: ${weatherData.temperature}°C</p>
                <p>Wind Speed: ${weatherData.windspeed} km/h</p>
                <p>Weather Code: ${weatherData.weathercode}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            const weatherBox = document.getElementById(`weather-${location.name}`);
            weatherBox.innerHTML = `<p>Error fetching data for ${location.name}</p>`;
        });
}

function displayWeather() {
    const container = document.getElementById("weather-container");

    container.innerHTML = "";

    locations.forEach(location => {
        const weatherBox = document.createElement("div");
        weatherBox.className = "weather-box";
        weatherBox.id = `weather-${location.name}`;
        weatherBox.innerHTML = `<h3>Loading weather for ${location.name}...</h3>`;
        container.appendChild(weatherBox);

        fetchWeather(location);
    });
}

setInterval(displayWeather, 60000);

displayWeather();

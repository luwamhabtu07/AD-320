document.getElementById("getWeatherBtn").addEventListener("click", function() {
    let city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    // API URL without the language parameter
    let url = `http://api.weatherstack.com/current?access_key=6971837c3c4c521cc533c64cb6832242&query=${encodeURIComponent(city)}&units=m`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data || data.success === false) {
                document.getElementById("weatherResult").innerHTML = `<p>Error: ${data.error?.info || "Invalid city name. Try again!"}</p>`;
                return;
            }

            let weatherInfo = `

<h3>${data.location.name}, ${data.location.country}</h3>
<p>Temperature: ${data.current.temperature}°C</p>
<p>Weather: ${data.current.weather_descriptions[0]}</p>
<p>Humidity: ${data.current.humidity}%</p>
<p>Wind Speed: ${data.current.wind_speed} km/h</p>
`;

            document.getElementById("weatherResult").innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            document.getElementById("weatherResult").innerHTML = "<p>Network error. Try again later.</p>";
        });
});
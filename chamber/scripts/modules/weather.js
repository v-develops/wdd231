
/*--------------------------------------*/
const apiKey = "cdf8ca9d1932be89995da4bbc322b0a2";

const latitude = -22.91;
const longitude = -43.18;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

const currentContainer = document.querySelector("#weather-current");
const forecastContainer = document.querySelector("#weather-forecast");
/*--------------------------------------*/
/* TRY TO GET DATA */
async function getWeatherData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not retrieve weather data.");
    }

    return await response.json();
}
/*--------------------------------------*/
/* DISPLAY CURRET WEATHER */
function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    currentContainer.innerHTML = `
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}"
            width="100"
            height="100"
        >
        <p><strong>${temperature}°C</strong></p>
        <p>${description}</p>
    `;
}
/*--------------------------------------*/
/* 3 DAY FORECAST */
function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const today = new Date().toLocaleDateString("en-CA");

    const dailyForecasts = {};

    data.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const dateKey = date.toLocaleDateString("en-CA");

        if (dateKey !== today && !dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = [];
        }

        if (dateKey !== today) {
            dailyForecasts[dateKey].push(forecast);
        }
    });

    const nextThreeDays = Object.keys(dailyForecasts).slice(0, 3);

    nextThreeDays.forEach((day) => {
        const forecasts = dailyForecasts[day];

        const middayForecast = forecasts.reduce((closest, current) => {
            const currentHour = new Date(current.dt * 1000).getHours();
            const closestHour = new Date(closest.dt * 1000).getHours();

            return Math.abs(currentHour - 12) <
                   Math.abs(closestHour - 12)
                ? current
                : closest;
        });

        const date = new Date(middayForecast.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const temperature = Math.round(middayForecast.main.temp);
        const description = middayForecast.weather[0].description;
        const icon = middayForecast.weather[0].icon;

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h4>${dayName}</h4>
            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="80"
                height="80"
            >
            <p><strong>${temperature}°C</strong></p>
            <p>${description}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}
/*--------------------------------------*/
export async function initializeWeather() {
    if (!currentContainer || !forecastContainer) return;

    try {
        const [currentData, forecastData] = await Promise.all([
            getWeatherData(currentUrl),
            getWeatherData(forecastUrl)
        ]);

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error loading weather:", error);

        currentContainer.innerHTML =
            "<p>Unable to load current weather.</p>";

        forecastContainer.innerHTML =
            "<p>Unable to load weather forecast.</p>";
    }
}
/*--------------------------------------*/
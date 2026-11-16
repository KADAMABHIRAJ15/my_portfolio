const API_KEY = "576a15e3aa2162ffb3939fe0e1af2c2b";
const searchInput = document.querySelector("#search-city");
const searchBtn = document.querySelector("#search-btn");
async function getWeather(city) {

    if (!city.trim()) {
        document.querySelector("#ip").textContent ="Please enter a city name!";
        return;
    }

    searchBtn.disabled = true;
    searchBtn.textContent = "Loading...";

    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "City not found!");
        }
        document.querySelector("#city").textContent = data.name;
        document.querySelector("#temp").textContent = `${data.main.temp} °C`;
        document.querySelector("#min-temp").textContent =`${data.main.temp_min} °C`;
        document.querySelector("#max-temp").textContent =`${data.main.temp_max} °C`;
        document.querySelector("#humidity").textContent =`${data.main.humidity}%`;
        document.querySelector("#pressure").textContent =`${data.main.pressure} hPa`;
        document.querySelector("#p").textContent =`Visibility: ${data.visibility / 1000} km | Wind: ${data.wind.speed} m/s`;
    }
    catch (error) {
        document.querySelector("#ip").textContent = error.message;
    }
    finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
    }
}

searchBtn.addEventListener("click", () => {
    getWeather(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        getWeather(searchInput.value);
    }
});

getWeather("Pune");

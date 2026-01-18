const container = document.querySelector(".container");
const searchBtn = document.querySelector(".search-box .fa-magnifying-glass");
const clearBtn = document.querySelector(".search-box .fa-xmark");

const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const input = document.querySelector(".search-box input");

// стартовий стан
container.classList.add("collapsed");

// робоча головна функція
function searchWeather() {
  const APIKey = "efd960ae82bc2e0fde37919c7b718a74";
  const city = input.value.trim();

  if (!city) return;

  clearBtn.style.display = "block";
  searchBtn.style.display = "none";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`,
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "fit-content";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span",
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "img/clear.svg";
          break;

        case "Rain":
          image.src = "img/rain.png";
          break;

        case "Snow":
          image.src = "img/snow.png";
          break;

        case "Clouds":
          image.src = "img/cloud.svg";
          break;

        case "Haze":
          image.src = "img/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";

      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");

      expandContainer();
    });
}

function showError() {
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";

  error404.style.display = "block";
  error404.classList.add("fadeIn");

  expandContainer();
}

function expandContainer() {
  container.classList.remove("collapsed");
  container.classList.add("expanded");
}

function collapseContainer() {
  container.classList.remove("expanded");
  container.classList.add("collapsed");
}

// події
searchBtn.addEventListener("click", searchWeather);

// викликаємо по натисканню Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

// викликаємо мишею
clearBtn.addEventListener("click", () => {
  input.value = "";
  clearBtn.style.display = "none";
  searchBtn.style.display = "block";

  // ховаємо результати
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "none";

  collapseContainer();
});

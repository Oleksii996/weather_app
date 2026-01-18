const container = document.querySelector(".container");
const searchBtn = document.querySelector(".search-box .fa-magnifying-glass");
const clearBtn = document.querySelector(".search-box .fa-xmark");

const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const input = document.querySelector(".search-box input");

const authorBar = document.querySelector(".dev-info");

// початковий стан
container.classList.add("collapsed");

// функція пошуку
function searchWeather() {
  const APIKey = "efd960ae82bc2e0fde37919c7b718a74";
  const city = input.value.trim();

  if (!city) return;

  clearBtn.style.display = "block";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`,
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        showError();
        return;
      } else showWeather(json);
    });
}
// функція вдалого результату
function showWeather(json) {
  error404.style.display = "none";
  error404.classList.remove("fadeIn");

  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  switch (json.weather[0].main) {
    case "Clear":
      image.src = "img/clear.svg";
      break;

    case "Rain":
      image.src = "img/rain.svg";
      break;

    case "Snow":
      image.src = "img/snow.svg";
      break;

    case "Clouds":
      image.src = "img/cloud.svg";
      break;

    case "Mist":
      image.src = "img/mist.svg";
      break;

    case "Fog":
      image.src = "img/mist.svg";
      break;

    default:
      image.src = "";
  }

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

  weatherBox.style.display = "flex";
  weatherDetails.style.display = "flex";

  expandContainer();
}
//функція помилки
function showError() {
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";

  error404.style.display = "flex";
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

// подія кліком
searchBtn.addEventListener("click", searchWeather);

// подія Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

// подія очищення
clearBtn.addEventListener("click", () => {
  input.value = "";
  clearBtn.style.display = "none";
  searchBtn.style.display = "block";

  collapseContainer();

  const onTransitionEnd = (e) => {
    if (e.propertyName !== "max-height") return;

    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "none";
    error404.classList.remove("fadeIn");

    container.removeEventListener("transitionend", onTransitionEnd);
  };

  container.addEventListener("transitionend", onTransitionEnd);
});

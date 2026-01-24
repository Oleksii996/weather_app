const container = document.querySelector(".container") as HTMLElement;
const searchBtn = document.querySelector(".search-box .fa-magnifying-glass") as HTMLElement;
const clearBtn = document.querySelector(".search-box .fa-xmark") as HTMLElement;

const weatherBox = document.querySelector(".weather-box") as HTMLElement;
const weatherDetails = document.querySelector(".weather-details") as HTMLElement;
const error404 = document.querySelector(".not-found") as HTMLElement;
const input = document.querySelector(".search-box input") as HTMLInputElement;

const authorBar = document.querySelector(".dev-info") as HTMLElement;

// початковий стан
container.classList.add("collapsed");

// пошук
function searchWeather(): void {
  const APIKey: string = "efd960ae82bc2e0fde37919c7b718a74";
  const city: string = input.value.trim();

  if (!city) return;

  clearBtn.style.display = "block";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json: any) => {
      if (json.cod === "404" || json.cod === 404) {
        showError();
      } else {
        showWeather(json);
      }
    });
}

// успішний результат
function showWeather(json: any): void {
  error404.style.display = "none";
  error404.classList.remove("fadeIn");

  const image = document.querySelector(".weather-box img") as HTMLImageElement;
  const temperature = document.querySelector(".weather-box .temperature") as HTMLElement;
  const description = document.querySelector(".weather-box .description") as HTMLElement;
  const humidity = document.querySelector(".weather-details .humidity span") as HTMLElement;
  const wind = document.querySelector(".weather-details .wind span") as HTMLElement;

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
    case "Fog":
      image.src = "img/mist.svg";
      break;
    default:
      image.src = "";
  }

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = json.weather[0].description;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

  weatherBox.style.display = "flex";
  weatherDetails.style.display = "flex";

  expandContainer();
}

// помилка
function showError(): void {
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";

  error404.style.display = "flex";
  error404.classList.add("fadeIn");

  expandContainer();
}

function expandContainer(): void {
  container.classList.remove("collapsed");
  container.classList.add("expanded");
}

function collapseContainer(): void {
  container.classList.remove("expanded");
  container.classList.add("collapsed");
}

// події
searchBtn.addEventListener("click", searchWeather);

input.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

clearBtn.addEventListener("click", () => {
  input.value = "";
  clearBtn.style.display = "none";
  searchBtn.style.display = "block";

  collapseContainer();

  const onTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName !== "max-height") return;

    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "none";
    error404.classList.remove("fadeIn");

    container.removeEventListener("transitionend", onTransitionEnd);
  };

  container.addEventListener("transitionend", onTransitionEnd);
});

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const clearBtn = document.querySelector(".search-box .fa-xmark");

function searchWeather() {
  const APIKey = "efd960ae82bc2e0fde37919c7b718a74";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  clearBtn.style.display = "block";
  search.style.display = "one";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`,
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
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
      container.style.height = "fit-content";
    });
}

search.addEventListener("click", searchWeather);

const input = document.querySelector(".search-box input");

// викликаємо по натисканню Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});
// викликаємо мишею
clearBtn.addEventListener("click", () => {
  const input = document.querySelector(".search-box input");

  input.value = "";
  clearBtn.style.display = "none";
  search.style.display = "block";

  // ховаємо результати
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "none";

  container.style.height = "100px";
});

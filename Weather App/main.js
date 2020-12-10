const baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}";
const apiKey = "7c72c4660455669edf14877fb6257619";
const apiImgUrl = "https://openweathermap.org/img/wn/{icon}@2x.png";

window.addEventListener("DOMContentLoaded", function () {
  // function for fetching weather data from API
  function findWeatherByCity(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((weatherData) => {
        console.log(weatherData)
        const cardData = {
          name: weatherData.name,
          country: weatherData.sys.country,
          temp: weatherData.main.temp - 273.15,
          clouds: weatherData.clouds.all,
          icon: weatherData.weather[0].icon,
        };

        const newWeatherCard = createWeatherCard(cardData);

        const cities = document.querySelector("#cities");
        cities.innerHTML = cities.innerHTML ? cities.innerHTML + newWeatherCard : newWeatherCard;
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createWeatherCard({ name, country, temp, icon, clouds }) {
    return `<li class="city">
    <h2 class="city-name" data-name="${name},${country}">
      <span>${name}</span>
      <sup>${country}</sup>
    </h2>
    <div class="city-temp">${temp.toFixed(0)}<sup>°C</sup></div>
    <figure>
      <img class="city-icon" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg" alt="few clouds">
      <figcaption>${clouds}% clouds</figcaption>
    </figure>
  </li>`;
  }

  const search_form = document.querySelector("#search_form");
  search_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const cityName = enterCityName.value;
    findWeatherByCity(cityName);

    search_form.reset();
  });
  findWeatherByCity(name);
});

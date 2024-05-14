const api_key = "b9b90817d4a049c6ae7102853242703";
const url = `http://api.weatherapi.com/v1/current.json`;
let weather_content = document.getElementById("weather_content")
let search_city = document.getElementById("search_city");
let search_bttn = document.getElementById("search_bttn");
let weather_icons = [
  "Sunny",
  "Clear",
  "Partly cloudy",
  "Cloudy",
  "Overcast",
  "Mist",
  "Blowing snow",
  "Blizzard",
  "Fog",
  "Light rain",
  "Heavy rain",
  "Snow"
]

function fetchWeather() {
  let resUrl = url + `?key=${api_key}&q=${search_city.value}`;
  let time = Math.floor(Math.random() * (2000 - 800) + 800)
  weather_content.innerHTML = '<div class="loading"></div>'
  setTimeout(() => {
    fetch(resUrl)
      .then((res) => res.json())
      .then((res) => showResult(res))
      .catch((err) => {
        weather_content.innerHTML = '<h3>Not found<h3/>';
        console.log(err);
      });
  }, time);
}

function showResult(res) {
  let location = res.location
  let data = res.current
  let temp = data.temp_c > 0 ? "+" + data.temp_c : data.temp_c
  wind = `${Math.floor(data.wind_kph / 3.6)} m/s, ${data.wind_dir}`

  let child = `<div class="city" id="city"><span>Weather in ${location.name}</span></div>
    <div class="weather">
      <div class="temp">
        <div class="temp_num" id="temp_num">${temp}<span class="cricle">°</span>C</div>
        <div class="icon" id="icon">
          <img src="images/${weather_icons.includes(data.condition.text) ? data.condition.text : data.condition.icon}.svg" alt="" />
        </div>
        <div class="cond_feels" id="cond_feels">
          <span>${data.condition.text}</span>
          <span>Feels like: ${data.feelslike_c} <span class="cricle">°</span>C</span>
        </div>
      </div>
      <div class="additionally">
        <div class="wind" id="wind">
          <img src="images/wind.svg" alt="wind" /> <span>${wind}</span>
        </div>
        <div class="pressure" id="pressure">
          <img src="images/pressure.svg" alt="pressure" /> <span>${data.pressure_mb}</span> mm Hg
        </div>
        <div class="humidity" id="humidity">
          <img src="images/humidity.svg" alt="humidity" /> <span>${data.humidity}</span>%
        </div>
        <div class="visibility" id="visibility">
          <img src="images/visibility.svg" alt="visibility" /> <span>${data.vis_km}</span>km
        </div>
      </div>
      <div class="region"><span>${location.name} in ${location.region} (${location.country})</span></div>
    </div>`
  weather_content.innerHTML = child
}

search_bttn.addEventListener("click", fetchWeather);
document.addEventListener("keydown", () => event.key == "Enter" ? fetchWeather() : 0)

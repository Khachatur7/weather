const api_key = "b9b90817d4a049c6ae7102853242703";
const url = `http://api.weatherapi.com/v1/current.json`;
//°C
//°F
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
    // weather_content.innerHTML = ""
    let resUrl = url + `?key=${api_key}&q=${search_city.value}`;
    fetch(resUrl)
        .then((res) => res.json())
        .then((res) => showResult(res.current))
        .catch((err) => {
            weather_content.innerHTML = '<h3>Not found<h3/>';
            console.log(err);
        });
}

function showResult(res) {
    console.log(res);
    let temp = res.temp_c > 0 ? "+" + res.temp_c : res.temp_c
    temp_num = temp > 0 ? `+ ${temp} <span class="cricle">°</span>C` : `${temp} <span class="cricle">°</span>C`;
    wind = `${Math.floor(res.wind_kph / 3.6)} m/s, ${res.wind_dir}`

    let child = `<div class="city" id="city"><span>Weather in ${search_city.value}</span></div>
    <div class="weather">
      <div class="temp">
        <div class="temp_num" id="temp_num">${temp}<span class="cricle">°</span>C</div>
        <div class="icon" id="icon">
          <img src="images/${weather_icons.includes(res.condition.text)?res.condition.text:res.condition.icon}.svg" alt="" />
        </div>
        <div class="cond_feels" id="cond_feels">
          <span>${res.condition.text}</span>
          <span>Feels like: ${res.feelslike_c} <span class="cricle">°</span>C</span>
        </div>
      </div>
      <div class="additionally">
        <div class="wind" id="wind">
          <img src="images/wind.svg" alt="wind" /> <span>${wind}</span>
        </div>
        <div class="pressure" id="pressure">
          <img src="images/pressure.svg" alt="pressure" /> <span>${res.pressure_mb}</span> mm Hg
        </div>
        <div class="humidity" id="humidity">
          <img src="images/humidity.svg" alt="humidity" /> <span>${res.humidity}</span>%
        </div>
        <div class="visibility" id="visibility">
          <img src="images/visibility.svg" alt="visibility" /> <span>${res.vis_km}</span>km
        </div>
      </div>
    </div>`
    weather_content.innerHTML = child
}

search_bttn.addEventListener("click", fetchWeather);


const api_key = "b9b90817d4a049c6ae7102853242703";
const url = `http://api.weatherapi.com/v1/current.json`;
const auto_complete = 'http://api.weatherapi.com/v1/search.json'
let weather_content = document.getElementById("weather_content")
let search_input = document.getElementById("search_input");
let search_bttn = document.getElementById("search_bttn");
let sim_city_list = document.getElementById("sim_city_list")
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

function fetchWeather(city) {
  sim_city_list.innerHTML = ''
  search_input.value = ''
  let resUrl = url + `?key=${api_key}&q=${city.toLowerCase()}`;
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
  return true
}

function ChooseCityFromList() {
  if (sim_city_list.children) {
    let city_array = document.querySelectorAll(".sim_city_item")
    city_array.forEach(city => {
      city.addEventListener('click', () => fetchWeather(search_input.value.trim()))
    });
  }
  return true
}

function SearchWithAutoComplete(value) {

  let resUrl = auto_complete + `?key=${api_key}&q=${value}`
  if (value.length >= 2) {
    fetch(resUrl).then(res => res.json())
      .then(res => {
        if (res.length >= 1) {
          sim_city_list.innerHTML = ''
          res.forEach(el => {
            let child = document.createElement("div")
            child.className = 'sim_city_item'
            child.id = el.name
            child.innerHTML = ` <div class="similar_city"><span>${el.name}</span></div>
             <div class="sim_country"><span>${el.country}</span></div>`

            sim_city_list.append(child)
          });
          ChooseCityFromList()
        }
        else {
          sim_city_list.innerHTML = ''
        }

      }).catch(er => console.log(er))
  }
  else if (value.length <= 2) {
    return sim_city_list.innerHTML = ''
  }

  return true
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

search_bttn.addEventListener("click", () => fetchWeather(search_input.value.trim()));
document.addEventListener("keydown", (event) => event.key == "Enter" ? fetchWeather(search_input.value.trim()) : 0)
search_input.addEventListener("input", () => SearchWithAutoComplete(search_input.value.trim()))

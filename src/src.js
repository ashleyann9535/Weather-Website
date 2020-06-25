let now = new Date();
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let year = now.getFullYear();

let months = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];
let month = months[now.getMonth()];

let header = document.querySelector("#currentDate");
header.innerHTML = `${day}, ${month} ${date}, ${year}`;

let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let time = document.querySelector("#currentTime");
time.innerHTML = `${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#place");
  let viewCity = document.querySelector("h2");
  viewCity.innerHTML = `${newCity.value}`;
}

let city = document.querySelector("#search");
city.addEventListener("submit", searchCity);

function currentLocation(position) {
  let apiKey = "d26daee782ed7569b86130dfdffeb3ee";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiPosition).then(myWeather);
}

navigator.geolocation.getCurrentPosition(currentLocation);

function myWeather(response) {
  let locationTemp = document.querySelector("small");
  let temperature = Math.round(response.data.main.temp);
  locationTemp.innerHTML = `${temperature}°`;
  let location = document.querySelector("h2");
  location.innerHTML = `${response.data.name}`;
}

function searchWeather(response) {
  let searchWeather = document.querySelector("small");
  let searchTemp = Math.round(response.data.main.temp);
  searchWeather.innerHTML = `${searchTemp}°`;
}

function updatedTemp() {
  let place = document.querySelector("#place");
  let apiKey = "d26daee782ed7569b86130dfdffeb3ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(searchWeather);
}
let citySearch = document.querySelector("#search");
citySearch.addEventListener("submit", updatedTemp);

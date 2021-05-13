let pDate = document.querySelector("#date");
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

pDate.innerHTML = `${currentDay} ${hours}:${minutes}`;

function showTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "6564272724482451c8ea4a6b9bde60dd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function currentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

let enterCity = document.querySelector("#search-forecast");
enterCity.addEventListener("submit", currentCity);

function showPosition(position) {
  let apiKey = "6564272724482451c8ea4a6b9bde60dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocation);

searchCity("Copenhagen");

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.64&units=metric&appid=973e102e6d8aa3ffb26c2257b4ca9177';

async function apiFetch() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  displayData(data);
}

function displayData(data) {
  currentTemp.innerHTML = data.main.temp;
  weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  captionDesc.innerHTML = data.weather[0].description;
}

apiFetch();

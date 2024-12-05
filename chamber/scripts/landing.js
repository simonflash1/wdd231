const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll("nav ul li a");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;
const members = document.querySelector("#members");
const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  menu.classList.toggle("show");
  menuToggle.classList.toggle("active");
  //console.log("Menu toggled:", menu.classList.contains("show"));
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.classList.remove("show");
    menuToggle.classList.remove("active");
  }
});

menuLinks.forEach((link) => {
  let currentPath = window.location.pathname;

  if (currentPath === "/" || currentPath === "") {
    currentPath = "/index.html";
  }

  if (link.href.endsWith(currentPath)) {
    link.classList.add("active");
  }
});

themeToggle.addEventListener("click", () => {
  const isDarkMode = body.classList.toggle("dark-mode");
  themeIcon.textContent = isDarkMode ? "☀️" : "🌙";
  //console.log("Dark mode:", isDarkMode ? "Enabled" : "Disabled");
});

document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent =
  "Last modified: " + document.lastModified;

  async function fetchMembers() {
    try {
      const response = await fetch("./data/members.json");
      if (!response.ok) throw new Error("Failed to load members.");
      const members = await response.json();
      const membersDiv = document.getElementById("members");

      const goldMembers = members.filter((member) => member.membership_level === 3);
  
      membersDiv.innerHTML = "";
  
      goldMembers.forEach((member) => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("member");
  
        const goldBadge =
          member.membership_level === 3
            ? `<img src="./images/gold.png" alt="Gold Member" class="gold-badge" title="Gold Member">`
            : "";
  
        memberDiv.innerHTML = `
          <div class="member-header">
            ${goldBadge}
            <h2>${member.name}</h2>
          </div>
          <p>${member.address}</p>
          <p>${member.other_information}</p>
          <a href="${member.website_url}" target="_blank">Website</a>
          <figure>
            <img src="./images/${member.icon_file_name}" alt="${member.name}" width="200">
          </figure>`;
  
        membersDiv.appendChild(memberDiv);
      });
    } catch (error) {
      console.error(error);
    }
  }
  

function toggleView(view) {
  members.classList.remove("grid", "list");
  members.classList.add(view);

  if (view === "grid") {
    gridButton.classList.add("active");
    listButton.classList.remove("active");
    console.log("grid");
  } else if (view === "list") {
    listButton.classList.add("active");
    gridButton.classList.remove("active");
    console.log("list");
  }
}

if (gridButton) {
  gridButton.addEventListener("click", () => toggleView("grid"));
}

if (listButton) {
  listButton.addEventListener("click", () => toggleView("list"));
}

fetchMembers();

// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

// define the API URL
const myKey = "05af6ab2e391031ce939791e499633e2";
const myLat = "-26.80";
const myLon = "-65.21";

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;

async function fetchCurrentWeather() {
  try {
    const response = await fetch(currentWeatherURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayCurrentWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrentWeather(data) {
  const temp = data.main.temp;
  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;

  currentTemp.innerHTML = `<p>${temp} &deg;C</p>`;
  weatherIcon.setAttribute("src", iconSrc);
  weatherIcon.setAttribute("alt", desc);
  captionDesc.textContent = desc;
}

async function fetchForecast() {
  try {
    const response = await fetch(forecastURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById("forecast");
  
    // Limpiar el contenedor de forecast
    forecastContainer.innerHTML = "";
  
    const today = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    for (let i = 0; i < data.list.length; i += 8) {
      if (i >= 24) break;
  
      const dayData = data.list[i];
      const temp = dayData.main.temp;
      const date = new Date(dayData.dt_txt);
      const dayLabel =
        i === 0 ? "Today" : daysOfWeek[(today.getDay() + i / 8) % 7];
  
      const iconCode = dayData.weather[0].icon;
      const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const description = dayData.weather[0].description;
  
      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
  
      const dayText = document.createElement("p");
      dayText.textContent = dayLabel;
  
      const tempWithIcon = document.createElement("div");
      tempWithIcon.classList.add("temp-with-icon");
  
      const iconImg = document.createElement("img");
      iconImg.setAttribute("src", iconSrc);
      iconImg.setAttribute("alt", description);
      iconImg.setAttribute("title", description);
      iconImg.setAttribute("width", "50");
  
      const tempText = document.createElement("span");
      tempText.textContent = `${temp} °C`;
  
      tempWithIcon.appendChild(tempText);
      tempWithIcon.appendChild(iconImg);
  
      forecastItem.appendChild(dayText);
      forecastItem.appendChild(tempWithIcon);
      forecastContainer.appendChild(forecastItem);
    }
  }
  

fetchCurrentWeather();
fetchForecast();

setInterval(fetchCurrentWeather, 900000);
setInterval(fetchForecast, 900000);

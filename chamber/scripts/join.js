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

  if (currentPath === "/wdd231/chamber/" || currentPath === "/wdd231/chamber") {
    currentPath = "/index.html";
  }
  //console.log(currentPath);
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

const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modalId = trigger.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "flex";
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("modal") ||
      event.target.classList.contains("close")
    ) {
      modal.style.display = "none";
    }
  });
});

const timestampField = document.getElementById("timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString().split("T")[0];
}

const visitMessage = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("last-visit");
const now = Date.now();

if (lastVisit) {
  const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${diffDays} days ago.`;
  }
} else {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem("last-visit", now);

const images = [
  {
    place: "Villa Nougues",
    image:
      "https://media.viajando.travel/p/12079183c64848a2eea07c42a92ebb45/adjuntos/236/imagenes/000/718/0000718157/escapadas-tucuman-vacaciones-invierno.png",
  },
  {
    place: "San Javier Hill",
    image:
      "https://img.lagaceta.com.ar/fotos/notas/2023/01/02/1200x800_san-javier-foto-ente-tucumn-turismo-975420-132546.webp",
  },
  {
    place: "Fountain of Plaza Independencia",
    image:
      "https://www.tucumanturismo.gob.ar/public/img/planzaindep_1w8nob77_22-11-2024.jpg",
  },
  {
    place: "Hourse of Government",
    image:
      "https://www.tucumanturismo.gob.ar/public/img/sanmigueltuc_0a1rp74m_14-06-2024.jpg",
  },
  {
    place: "Catedral",
    image:
      "https://www.tucumanturismo.gob.ar/public/img/capitalsmtgaleria3_ccoknyj2_14-06-2024.jpg",
  },
  {
    place: "Plaza Independencia Panoramic",
    image:
      "https://www.tucumanturismo.gob.ar/public/img/1920x650-CiudadHistorica22-Desktop_3h6fg9sy_28-06-2024.jpg",
  },
];

function displayImages(images) {
  const container = document.getElementById("gallery-container");
  container.innerHTML = "";

  images.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("gallery");
    card.innerHTML = `
        <h2>${image.place}</h2>
        <img src="${image.image}" alt="${image.place}" loading="lazy">
      `;
    container.appendChild(card);
  });
}
displayImages(images);

function generateCalendar() {
  const container = document.getElementById("calendar-container");
  container.innerHTML = "";

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarHeader = document.createElement("h2");
  calendarHeader.textContent = `${now.toLocaleString("en-US", {
    month: "long",
  })} ${year}`;
  container.appendChild(calendarHeader);

  const table = document.createElement("table");
  table.classList.add("calendar-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  daysOfWeek.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  let currentDay = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.classList.add("empty");
      } else if (currentDay > daysInMonth) {
        cell.classList.add("empty");
      } else {
        cell.textContent = currentDay;
        currentDay++;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}

generateCalendar();

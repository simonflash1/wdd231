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
    members.forEach((member) => {
      const memberDiv = document.createElement("div");
      memberDiv.classList.add("member");
      memberDiv.innerHTML = `
                <h2>${member.name}</h2>
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

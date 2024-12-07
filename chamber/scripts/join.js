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


document.addEventListener("DOMContentLoaded", () => {
    const modalTriggers = document.querySelectorAll("[data-modal]");
    const modals = document.querySelectorAll(".modal");
  
    modalTriggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        const modalId = trigger.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "flex";
      });
    });
  
    modals.forEach(modal => {
      modal.addEventListener("click", event => {
        if (event.target.classList.contains("modal") || event.target.classList.contains("close")) {
          modal.style.display = "none";
        }
      });
    });
  
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
      timestampField.value = new Date().toISOString().split("T")[0];
    }
  });
export function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    menu.classList.toggle("show");
    menuToggle.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
      menu.classList.remove("show");
      menuToggle.classList.remove("active");
    }
  });
}
setupMenuToggle();

export function highlightActiveMenu() {
  const menuLinks = document.querySelectorAll("nav ul li a");
  let currentPath = window.location.pathname;
  if (currentPath === "/project/" || currentPath === "/project") {
    currentPath = "/index.html";
  }

  menuLinks.forEach((link) => {
    if (link.href.includes(currentPath)) {
      link.classList.add("active");
    }
  });
}
highlightActiveMenu();

export function setupFooterInfo() {
  let visitCount = localStorage.getItem("visitCount") || 0;
  visitCount++;
  localStorage.setItem("visitCount", visitCount);

  document.getElementById(
    "visit-counter"
  ).textContent = `You have visited this page ${visitCount} ${
    visitCount === 1 ? "time" : "times"
  }`;
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent =
    "Last modified: " + document.lastModified;
}
setupFooterInfo();

console.log("scripts.js loaded");

async function loadTopRatedRestaurants() {
    const response = await fetch("./data/data.json");
    const data = await response.json();
    const restaurants = data[0].restaurants;
  
    const topRated = restaurants.filter((r) => r.rating >= 4.5);
    const container = document.getElementById("top-restaurants");
  
    topRated.forEach((restaurant) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <h2>${restaurant.name}</h2>
          <img src="${restaurant.images[0]}" alt="${
        restaurant.name
      }" width="200" loading="lazy">
          <p><strong>Address:</strong> ${restaurant.address}</p>
          <p><strong>Phone:</strong> ${restaurant.phone}</p>
          <p><strong>Opens:</strong> ${
            restaurant.hours.tuesday || "No especificado"
          }</p>
          <p><strong>Specialties:</strong> ${restaurant.specialties.join(
            ", "
          )}</p>
          <p><strong>Rating:</strong> ${restaurant.rating} ⭐</p>
        `;
      container.appendChild(card);
    });
  }
  
  if (document.getElementById("top-restaurants")) {
    loadTopRatedRestaurants();
  }
  
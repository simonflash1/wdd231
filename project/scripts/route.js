const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll("nav ul li a");

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

  if (currentPath === "/project/" || currentPath === "/project") {
    currentPath = "/index.html";
  }
  //console.log(currentPath);
  if (link.href.endsWith(currentPath)) {
    link.classList.add("active");
  }
});

async function getData() {
  try {
    const response = await fetch("./data/data.json");
    if (!response.ok) throw new Error("Failed to load data...");

    const data = await response.json();
    const restaurants = data[0].restaurants;

    const cardsContainer = document.querySelector(".cards");

    restaurants.forEach((restaurant) => {
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
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error.message);
  }
}
getData();

const timestampField = document.getElementById("timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString().split("T")[0];
}
const form = document.getElementById("userForm");
  const modal = document.getElementById("thankYouModal");
  const results = document.getElementById("results");
  const closeModal = document.getElementById("closeModal");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    results.innerHTML = `
      <p><strong>First Name:</strong> ${data["first-name"] || ""}</p>
      <p><strong>Last Name:</strong> ${data["last-name"] || ""}</p>
      <p><strong>Email:</strong> ${data["email"] || ""}</p>
      <p><strong>Phone Number:</strong> ${data["mobile"] || ""}</p>
      <p><strong>Message Sent:</strong> ${data["timestamp"] || ""}</p>
    `;

    modal.classList.remove("hidden");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    form.reset();
  });

let visitCount = localStorage.getItem("visitCount");

if (!visitCount) {
  visitCount = 0;
}

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

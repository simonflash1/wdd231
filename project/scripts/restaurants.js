import {
  setupMenuToggle,
  highlightActiveMenu,
  setupFooterInfo,
} from "./scripts.js";

async function getRestaurantsData() {
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
      }" width="250" height="250" loading="lazy">
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
getRestaurantsData();


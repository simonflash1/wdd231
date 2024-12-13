import {setupMenuToggle, highlightActiveMenu, setupFooterInfo } from "./scripts.js";

const form = document.getElementById("userForm");
const modal = document.getElementById("thankYouModal");
const results = document.getElementById("results");
const closeModal = document.getElementById("closeModal");

const timestampField = document.getElementById("timestamp");
if (timestampField) {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0].slice(0, 5);
  timestampField.value = `${date} at ${time}`;
}


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

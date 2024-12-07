const currentURL = window.location.href;
const everything = currentURL.split("?");

let formData = everything[1].split("&");


function show(detail) {
  let result = "";
  formData.forEach((element) => {
    if (element.startsWith(detail)) {
      result = decodeURIComponent(element.split("=")[1]).replace(/\+/g, " ");
    }
  });
  return result;
}
const showInfo = document.querySelector("#results");
showInfo.innerHTML = `
<p><strong>First Name:</strong> ${show("first-name")}</p>
<p><strong>Last Name:</strong> ${show("last-name")}</p>
<p><strong>Email:</strong> ${show("email")}</p>
<p><strong>Phone Number:</strong> ${show("mobile")}</p>
<p><strong>Business Name:</strong> ${show("business-name")}</p>
<p><strong>Application Started:</strong> ${show('timestamp')}<p>
`;

document.getElementById("currentyear").textContent = new Date().getFullYear();

let modelPopup = document.querySelector(".model");

let editButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".model__close-button");

function showModelPopup() {
  modelPopup.classList.add("model_opened");
}

function hideModelPopup() {
  modelPopup.classList.remove("model_opened");
}

editButton.addEventListener("click", showModelPopup);
closePopupButton.addEventListener("click", hideModelPopup);

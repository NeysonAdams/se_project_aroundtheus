const modelPopup = document.querySelector(".model");

const editButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelector(".model__close-button");

const modelFormElement = modelPopup.querySelector(".model__form");
const nameInput = modelFormElement.querySelectorAll(".model__form-input")[0];
const jobInput = modelFormElement.querySelectorAll(".model__form-input")[1];

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

function showModelPopup() {
  modelPopup.classList.add("model_opened");
}

function hideModelPopup() {
  modelPopup.classList.remove("model_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  hideModelPopup();
}

editButton.addEventListener("click", showModelPopup);
closePopupButton.addEventListener("click", hideModelPopup);
modelFormElement.addEventListener("submit", handleProfileFormSubmit);

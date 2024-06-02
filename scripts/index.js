const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const galleryContainer = document.querySelector(".galery__cards");
const modalPopup = document.querySelector("#popup");
const imageContainer = document.querySelector("#image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closePopupButton = modalPopup.querySelector(".model__close-button");
const closeImageButton = imageContainer.querySelector(".model__close-button");

const poupTitle = modalPopup.querySelector(".model__title");
const modelFormElement = modalPopup.querySelector(".model__form");
const titleInput = modelFormElement.querySelectorAll(".model__form-input")[0];
const subtitleInput =
  modelFormElement.querySelectorAll(".model__form-input")[1];
const submitButton = modelFormElement.querySelector(".model__submit-button");
const image = imageContainer.querySelector(".model__image");
const imageLabel = imageContainer.querySelector(".model__image-label");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

function getCardElement(name, link) {
  const template = document.getElementById("card-template").content;

  const cardElement = template.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;

  cardTitle.textContent = name;

  const trashButton = cardElement.querySelector(".card_trash-button");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const imageButton = cardElement.querySelector(".card__image");

  trashButton.addEventListener("click", handleRemoveCard);
  likeButton.addEventListener("click", handleLike);
  imageButton.addEventListener("click", showImagePopup);

  return cardElement;
}

function showModelPopup(event) {
  const classList = event.target.classList;
  const isAddNePopup = classList.contains("profile__add-button");

  poupTitle.textContent = isAddNePopup ? "New place" : "Edit profile";

  titleInput.value = isAddNePopup ? "" : profileName.textContent;
  subtitleInput.value = isAddNePopup ? "" : profileJob.textContent;

  titleInput.placeholder = isAddNePopup ? "Title" : "";
  subtitleInput.placeholder = isAddNePopup ? "Image link" : "";

  submitButton.textContent = isAddNePopup ? "Create" : "Save";

  modalPopup.classList.add("model_opened");
}

function showImagePopup(event) {
  image.src = event.target.src;
  image.alt = event.target.alt;

  imageLabel.textContent = event.target.alt;

  imageContainer.classList.add("model_opened");
}

function hideModelPopup() {
  modalPopup.classList.remove("model_opened");
}

function hideImagePopup() {
  imageContainer.classList.remove("model_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (poupTitle.textContent == "Edit profile") {
    profileName.textContent = titleInput.value;
    profileJob.textContent = subtitleInput.value;
  } else {
    const cardElement = getCardElement(titleInput.value, subtitleInput.value);
    galleryContainer.prepend(cardElement);
  }
  hideModelPopup();
}

function handleRemoveCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

function handleLike(event) {
  const currentClassList = event.target.classList;
  if (currentClassList.contains("card__like-btn-active")) {
    event.target.classList.remove("card__like-btn-active");
  } else currentClassList.add("card__like-btn-active");
}

editButton.addEventListener("click", showModelPopup);
closePopupButton.addEventListener("click", hideModelPopup);
closeImageButton.addEventListener("click", hideImagePopup);

addButton.addEventListener("click", showModelPopup);

modelFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data.name, data.link);
  galleryContainer.appendChild(cardElement);
});

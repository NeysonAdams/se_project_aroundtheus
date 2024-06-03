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
const profileModal = document.querySelector("#modal-profile");
const cardsModal = document.querySelector("#modal-cards");
const imageModal = document.querySelector("#modal-image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const closeButtons = document.querySelectorAll(".model__close-button");

const profileFormElement = profileModal.querySelector(".model__form");
const nameInput = profileFormElement.querySelector(".model__form-input_name");
const jobInput = profileFormElement.querySelector(".model__form-input_job");

const cardsFormElement = cardsModal.querySelector(".model__form");
const titleInput = cardsFormElement.querySelector(".model__form-input_title");
const linkInput = cardsFormElement.querySelector(".model__form-input_link");

const image = imageModal.querySelector(".model__image");
const imageLabel = imageModal.querySelector(".model__image-label");

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

  trashButton.addEventListener("click", handleRemoveCard);
  likeButton.addEventListener("click", handleLike);
  cardImage.addEventListener("click", () => {
    image.src = link;
    image.alt = name;

    imageLabel.textContent = name;
    openPopup(imageModal);
  });

  return cardElement;
}

function openPopup(popup) {
  popup.classList.add("model_opened");
}

function closePopup(popup) {
  popup.classList.remove("model_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileModal);
}

function handleCardsFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = getCardElement(titleInput.value, linkInput.value);
  galleryContainer.prepend(cardElement);
  closePopup(cardsModal);
}

function handleRemoveCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

function handleLike(event) {
  const currentClassList = event.target.classList;
  currentClassList.toggle("card__like-btn-active");
}

editButton.addEventListener("click", () => {
  openPopup(profileModal);
});
addButton.addEventListener("click", () => {
  openPopup(cardsModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".model");
  button.addEventListener("click", () => closePopup(popup));
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardsFormElement.addEventListener("submit", handleCardsFormSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data.name, data.link);
  galleryContainer.appendChild(cardElement);
});

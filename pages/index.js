import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
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

const optionsValidation = {
  formSelector: ".model__form",
  inputSelector: ".model__form-input",
  submitButtonSelector: ".model__submit-button",
  inactiveButtonClass: "model__submit-button-inactive",
  inputErrorClass: "-input-error",
  errorClass: "model__input-error-active",
};

const galleryContainer = document.querySelector(".galery__cards");
const profileModal = document.querySelector("#modal-profile");
const cardsModal = document.querySelector("#modal-cards");
const imageModal = document.querySelector("#modal-image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const closeButtons = document.querySelectorAll(".model__close-button");

const profileFormElement = profileModal.querySelector(".model__form");
const nameInput = profileFormElement.name;
const jobInput = profileFormElement.job;

const cardsFormElement = cardsModal.querySelector(".model__form");
const titleInput = cardsFormElement.title;
const linkInput = cardsFormElement.link;

const image = imageModal.querySelector(".model__image");
const imageLabel = imageModal.querySelector(".model__image-label");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const profileFormValidator = new FormValidator(
  optionsValidation,
  profileFormElement
);
const cardFormValidator = new FormValidator(
  optionsValidation,
  cardsFormElement
);

function openPopup(popup) {
  popup.classList.add("model_opened");
  document.addEventListener("keydown", handlerEscapeClose);
}

function closePopup(popup) {
  popup.classList.remove("model_opened");
  document.removeEventListener("keydown", handlerEscapeClose);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profileFormValidator.toggleButtonState(true);
  closePopup(profileModal);
}

function handleCardsFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(
    {
      name: titleInput.value,
      link: linkInput.value,
    },
    "card-template",
    handleImageClick
  );
  galleryContainer.prepend(card.getCardElement());
  titleInput.value = "";
  linkInput.value = "";
  cardFormValidator.toggleButtonState();
  cardFormValidator.forceHideInputError();
  closePopup(cardsModal);
}

editButton.addEventListener("click", () => {
  profileFormValidator.forceHideInputError();
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

const handleImageClick = (name, link) => {
  image.src = link;
  image.alt = name;

  imageLabel.textContent = name;
  openPopup(imageModal);
};

initialCards.forEach((data) => {
  const card = new Card(data, "card-template", handleImageClick);
  galleryContainer.appendChild(card.getCardElement());
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const modalsList = document.querySelectorAll(".model");

modalsList.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.currentTarget === evt.target) closePopup(modal);
  });
});

const handlerEscapeClose = (evt) => {
  if (evt.key == "Escape") {
    console.log("escape predesed");
    modalsList.forEach((modal) => {
      if (modal.classList.contains("model_opened")) closePopup(modal);
    });
  }
};

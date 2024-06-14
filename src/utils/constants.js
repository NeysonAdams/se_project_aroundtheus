export const apiOptions = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a1435ffd-8061-442b-b2ae-d3458326825a",
    "Content-Type": "application/json",
  },
};

export const initialCards = [
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

export const optionsValidation = {
  formSelector: ".model__form",
  inputSelector: ".model__form-input",
  submitButtonSelector: ".model__submit-button",
  inactiveButtonClass: "model__submit-button-inactive",
  inputErrorClass: "-input-error",
  errorClass: "model__input-error-active",
};

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const modalsForms = document.querySelectorAll(".model__form");
export const editAvatarButton = document.querySelector(".profile__avatar");

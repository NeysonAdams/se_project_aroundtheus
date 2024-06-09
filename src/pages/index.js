import { Card } from "../components/Card.js";
import {
  initialCards,
  editButton,
  addButton,
  optionsValidation,
  modalsForms,
} from "../utils/constants.js";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";

import { FormValidator } from "../components/FormValidator.js";

const formvalidatorList = {};

modalsForms.forEach((form) => {
  console.log(form.id);
  formvalidatorList[form.id] = new FormValidator(optionsValidation, form);
  formvalidatorList[form.id].enableValidation();
});

console.log(formvalidatorList);

const gallerySection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      gallerySection.addItem(createCard(data));
    },
  },
  ".galery__cards"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const profileModal = new PopupWithForm(
  "#modal-profile",
  (formData) => {
    userInfo.setUserInfo(formData.name, formData.job);
  },
  formvalidatorList["profile"]
);
const cardsModal = new PopupWithForm(
  "#modal-cards",
  (form) => {
    gallerySection.addItem(
      createCard({ name: formData.title, link: formData.link }),
      true
    );
  },
  formvalidatorList["cards"]
);
const imageModal = new PopupWithImage("#modal-image");

editButton.addEventListener("click", () => {
  profileModal.setInputValues(userInfo.getUserInfo());
  profileModal.open();
});
addButton.addEventListener("click", () => {
  cardsModal.open();
});

const handleImageClick = (name, link) => {
  imageModal.open({ name: name, link: link });
};

const createCard = (data) =>
  new Card(data, "card-template", handleImageClick).getCardElement();

profileModal.setEveentListeners();
cardsModal.setEveentListeners();
imageModal.setEveentListeners();
gallerySection.renderItems();

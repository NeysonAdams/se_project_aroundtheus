import { Card } from "../components/Card.js";
import {
  initialCards,
  editButton,
  addButton,
  userInfo,
} from "../utils/constants.js";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";

export const gallerySection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      gallerySection.addItem(createCard(data));
    },
  },
  ".galery__cards"
);

const profileModal = new PopupWithForm("#modal-profile", (form) => {
  userInfo.setUserInfo(form.name.value, form.job.value);
});
const cardsModal = new PopupWithForm("#modal-cards", (form) => {
  gallerySection.addItem(
    createCard({ name: form.title.value, link: form.link.value }),
    true
  );
});
const imageModal = new PopupWithImage("#modal-image");

editButton.addEventListener("click", () => {
  profileModal.open();
});
addButton.addEventListener("click", () => {
  cardsModal.open();
});

const handleImageClick = (name, link) => {
  imageModal.open({ nmae: name, link: link });
};

const createCard = (data) =>
  new Card(data, "card-template", handleImageClick).getCardElement();

profileModal.setEveentListeners();
cardsModal.setEveentListeners();
gallerySection.renderItems();

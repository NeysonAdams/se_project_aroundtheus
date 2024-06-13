import { Card } from "../components/Card.js";
import {
  initialCards,
  editButton,
  addButton,
  optionsValidation,
  modalsForms,
  editAvatarButton,
  apiOptions,
} from "../utils/constants.js";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import { FormValidator } from "../components/FormValidator.js";

const formvalidatorList = {};
const api = new Api(apiOptions);
const gallerySection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      gallerySection.addItem(createCard(data));
    },
  },
  ".galery__cards"
);

modalsForms.forEach((form) => {
  formvalidatorList[form.id] = new FormValidator(optionsValidation, form);
  formvalidatorList[form.id].enableValidation();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__image",
});

const profileModal = new PopupWithForm(
  "#modal-profile",
  (formData) => {
    api
      .editProfile({ name: formData.name, about: formData.job })
      .then((responce) => {
        userInfo.setUserInfo(responce.name, responce.about);
        profileModal.resetFormAndClose();
      })
      .finally(() => {
        profileModal.renderLoading(false);
      });
  },
  formvalidatorList["profile"]
);

const cardsModal = new PopupWithForm(
  "#modal-cards",
  (formData) => {
    api
      .addCard({ name: formData.title, link: formData.link })
      .then((response) => {
        gallerySection.addItem(createCard(response), true);
        cardsModal.resetFormAndClose();
      })
      .finally(() => {
        cardsModal.renderLoading(false);
      });
  },
  formvalidatorList["cards"]
);

const avarEditModal = new PopupWithForm(
  "#modal-edit-avatar",
  (formData) => {
    api
      .editAvatar({ avatar: formData.avatar })
      .then((responce) => {
        userInfo.setAvatarLink(responce.avatar);
        avarEditModal.resetFormAndClose();
      })
      .finally(() => {
        avarEditModal.renderLoading();
      });
  },
  formvalidatorList["avatar"]
);

const imageModal = new PopupWithImage("#modal-image");
const preDeletepoup = new PopupWithConfirmation("#modal-sure", (card, id) => {
  api
    .removeCard(id)
    .then((res) => {
      card.remove();
    })
    .finally(() => {
      preDeletepoup.close();
    });
});

editButton.addEventListener("click", () => {
  profileModal.setInputValues(userInfo.getUserInfo());
  profileModal.open();
});
addButton.addEventListener("click", () => {
  cardsModal.open();
});

editAvatarButton.addEventListener("click", () => {
  avarEditModal.open();
});

const handleImageClick = (name, link) => {
  imageModal.open({ name: name, link: link });
};
const handlerRemoveCard = (card, id) => {
  preDeletepoup.open(card, id);
};

const createCard = (data) =>
  new Card(
    data,
    "card-template",
    handleImageClick,
    handlerRemoveCard,
    api
  ).getCardElement();

profileModal.setEveentListeners();
cardsModal.setEveentListeners();
imageModal.setEveentListeners();
avarEditModal.setEveentListeners();
preDeletepoup.setEveentListeners();

api
  .getInitialCards()
  .then((initialCards) => {
    gallerySection.setItems(initialCards);
    gallerySection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserData()
  .then((response) => {
    userInfo.setUserInfo(response.name, response.about);
    userInfo.setAvatarLink(response.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

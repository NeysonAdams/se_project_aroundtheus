import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleFormSubmit) {
    super({ selector });
    this._button = this._popupElement.querySelector(".model__submit-button");
    this._handleFormSubmit = handleFormSubmit;
  }

  open(card, id) {
    super.open();
    this._card = card;
    this._id = id;
  }

  setEveentListeners() {
    super.setEveentListeners();

    this._button.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card, this._id);
    });
  }
}

import Popup from "./Popup.js";
import { FormValidator } from "./FormValidator.js";
import { optionsValidation } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super({ selector });
    this._popupForm = this._popupElement.querySelector(".model__form");
    this._handleFormSubmit = handleFormSubmit;
    this._validator = new FormValidator(optionsValidation, this._popupForm);
  }

  close() {
    this._popupForm.reset();
    this._validator.toggleButtonState();
    super.close();
  }

  setEveentListeners() {
    super.setEveentListeners();
    this._validator.enableValidation();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._popupForm);
      this.close();
    });
  }
}

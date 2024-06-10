import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit, validator) {
    super({ selector });
    this._popupForm = this._popupElement.querySelector(".model__form");
    this._inputList = Array.from(this._popupForm.querySelectorAll("input"));
    this._handleFormSubmit = handleFormSubmit;
    this._validator = validator;
  }

  close() {
    super.close();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEveentListeners() {
    super.setEveentListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
      this._validator.toggleButtonState();
      this.close();
    });
  }
}

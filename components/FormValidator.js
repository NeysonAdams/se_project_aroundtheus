export class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}${this._options.inputErrorClass}`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.errorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}${this._options.inputErrorClass}`
    );
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState(forceDisable = false) {
    const buttonElement = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
    if (this._hasInvalidInput() && !forceDisable) {
      buttonElement.classList.add(this._options.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._options.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._options.inputSelector)
    );

    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._getViews();
  }

  _getViews() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._options.inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}${this._options.inputErrorClass}`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.errorClass);
  }

  forceHideInputError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _hideInputError(inputElement) {
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
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState(forceDisable = false) {
    if (this._hasInvalidInput() && !forceDisable) {
      this._buttonElement.classList.add(this._options.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
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

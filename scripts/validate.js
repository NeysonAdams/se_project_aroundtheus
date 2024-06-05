const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}${options.inputErrorClass}`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}${options.inputErrorClass}`
  );
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, options) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  const fromList = Array.from(document.querySelectorAll(options.formSelector));
  fromList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
};

enableValidation({
  formSelector: ".model__form",
  inputSelector: ".model__form-input",
  submitButtonSelector: ".model__submit-button",
  inactiveButtonClass: "model__submit-button-inactive",
  inputErrorClass: "-input-error",
  errorClass: "model__input-error-active",
});

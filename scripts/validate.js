const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add("model__input-error-active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  errorElement.classList.remove("model__input-error-active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("model__submit-button-inactive");
  } else {
    buttonElement.classList.remove("model__submit-button-inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".model__form-input")
  );
  const buttonElement = formElement.querySelector(".model__submit-button");

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const fromList = Array.from(document.querySelectorAll(".model__form"));
  fromList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

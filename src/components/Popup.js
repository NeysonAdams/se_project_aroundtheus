export default class Popup {
  constructor({ selector }) {
    this._popupElement = document.querySelector(selector);
    this._closeButtons = this._popupElement.querySelector(
      ".model__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("model_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("model_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }

  setEveentListeners() {
    this._closeButtons.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.currentTarget === evt.target) this.close();
    });
  }
}

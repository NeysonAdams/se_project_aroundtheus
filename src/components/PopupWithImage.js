import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super({ selector });
    this._image = this._popupElement.querySelector(".model__image");
    this._imageLabel = this._popupElement.querySelector(".model__image-label");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;

    this._imageLabel.textContent = data.name;
    super.open();
  }
}

export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  getCardElement() {
    this._cardElement = document
      .getElementById(this._cardSelector)
      .content.cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    const trashButton = this._cardElement.querySelector(".card_trash-button");
    const likeButton = this._cardElement.querySelector(".card__like-btn");

    trashButton.addEventListener("click", this._handleRemoveCard);
    likeButton.addEventListener("click", this._handleLike);
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleRemoveCard(event) {
    const card = event.target.closest(".card");
    card.remove();
  }

  _handleLike(event) {
    const currentClassList = event.target.classList;
    currentClassList.toggle("card__like-btn-active");
  }
}

export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._getViews();
  }

  _getViews() {
    this._cardElement = document
      .getElementById(this._cardSelector)
      .content.cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._trashButton = this._cardElement.querySelector(".card_trash-button");
    this._likeButton = this._cardElement.querySelector(".card__like-btn");
  }

  getCardElement() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", this._handleRemoveCard);
    this._likeButton.addEventListener("click", this._handleLike);
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

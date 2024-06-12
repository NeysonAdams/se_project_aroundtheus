export class Card {
  constructor(data, cardSelector, handleImageClick, handleRemoveCard, api) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleRemoveCard = handleRemoveCard;
    this._api = api;
    this._getViews();
  }

  _getViews() {
    this._cardElement = document
      .getElementById(this._cardSelector)
      .content.cloneNode(true);

    this._likeButton = this._cardElement.querySelector(".card__like-btn");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._trashButton = this._cardElement.querySelector(".card_trash-button");
    this._likeButton = this._cardElement.querySelector(".card__like-btn");

    if (this._isLiked) this._toggleLike();
  }

  _toggleLike() {
    const currentClassList = this._likeButton.classList;
    currentClassList.toggle("card__like-btn-active");
  }

  getCardElement() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", (event) => {
      const card = event.target.closest(".card");
      this._handleRemoveCard(card, this._id);
    });

    this._likeButton.addEventListener("click", () => {
      this._api
        .like(this._isLiked, this._id)
        .then((res) => {
          this._isLiked = !this._isLiked;
          this._toggleLike();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
}

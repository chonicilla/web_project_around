export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__container")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".like-button");
    this._cardImage = this._element.querySelector(".gallery__image");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".gallery__place-name").textContent =
      this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("liked");
    }

    return this._element;
  }

  _updateLikeState(isLiked) {
    this._isLiked = isLiked;

    if (this._isLiked) {
      this._likeButton.classList.add("liked");
    } else {
      this._likeButton.classList.remove("liked");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked, (newLikeState) => {
        this._updateLikeState(newLikeState);
      });
    });

    this._element
      .querySelector(".trash-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id, this._element);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

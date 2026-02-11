import { openImageViewer } from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__container")
      .cloneNode(true);
  }

  _handleLikeIcon() {
    this._element.querySelector(".like-button").classList.toggle("liked");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    const image = this._element.querySelector(".gallery__image");
    image.addEventListener("click", () => {
      openImageViewer(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".gallery__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".gallery__place-name").textContent =
      this._name;

    return this._element;
  }
}

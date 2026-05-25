import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".viewer__image");
    this._caption = this._popupElement.querySelector(".viewer__caption");
  }

  open(name, link) {
    if (this._image) {
      this._image.src = link;
      this._image.alt = name;
    }
    if (this._caption) {
      this._caption.textContent = name;
    }
    super.open();
  }
}

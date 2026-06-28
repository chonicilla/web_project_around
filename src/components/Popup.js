export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("show");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("show");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      const closeButton = evt.target.closest(".popup__close-button");

      if (
        closeButton ||
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__overlay")
      ) {
        this.close();
      }
    });
  }
}

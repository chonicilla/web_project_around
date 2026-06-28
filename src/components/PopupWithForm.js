import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      const inputName = input.getAttribute("name") || input.id;
      this._formValues[inputName] = input.value.trim();
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading, loadingText = "Guardando...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._defaultButtonText;
  }

  close() {
    super.close();
    this.renderLoading(false);
    this._form.reset();
  }
}

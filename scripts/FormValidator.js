export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.style.borderBottomColor = "red";
    if (errorElement) errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.style.borderBottomColor = "";
    if (errorElement) errorElement.textContent = "";
  }

  // Método privado: Comprobar validez del campo
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Método privado: Cambiar estado del botón Submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", "disabled");
      this._buttonElement.style.opacity = "0.6";
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.style.opacity = "1";
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  // Método público: Activa la validación
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  // Método privado: Agrega controladores
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Método extra para resetear errores al abrir modales
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

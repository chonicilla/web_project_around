import React from "react";

function PopupWithConfirmation({
  title = "¿Estás seguro/a?",
  confirmButtonText = "Sí",
  isLoading = false,
  loadingButtonText = "Eliminando...",
  onClose,
  onConfirm,
}) {
  return (
    <section className="popup popup_is-opened">
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__edit-profile">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          id="deleteConfirmForm"
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          <button
            type="submit"
            className="popup__save-button"
            disabled={isLoading}
          >
            {isLoading ? loadingButtonText : confirmButtonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithConfirmation;

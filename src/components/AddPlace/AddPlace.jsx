import React, { useState } from "react";

function AddPlace({ onClose, onAddPlaceSubmit, isLoading = false }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({ name: "", link: "" });
  const [isValid, setIsValid] = useState(false);

  const validateField = (field, value) => {
    if (field === "name") {
      if (!value) return "El título es obligatorio";
      if (value.length < 2)
        return "El título debe tener al menos 2 caracteres";
      if (value.length > 50)
        return "El título debe tener menos de 50 caracteres";
      return "";
    }
    if (field === "link") {
      if (!value) return "La URL de la imagen es obligatoria";
      try {
        new URL(value);
      } catch {
        return "Ingresa una URL válida";
      }
      return "";
    }
    return "";
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    const err = validateField("name", value);
    setName(value);
    setErrors((prev) => ({ ...prev, name: err }));
    const linkErr = validateField("link", link);
    setIsValid(!err && !linkErr);
  };

  const handleLinkChange = (event) => {
    const value = event.target.value;
    const err = validateField("link", value);
    setLink(value);
    setErrors((prev) => ({ ...prev, link: err }));
    const nameErr = validateField("name", name);
    setIsValid(!err && !nameErr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    onAddPlaceSubmit(
      { name, link },
      () => {
        setName("");
        setLink("");
        setErrors({ name: "", link: "" });
        setIsValid(false);
      },
    );
  };

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
        <h2 className="popup__title">Nueva foto</h2>
        <form
          className="popup__form"
          id="addPhotoForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="popup__form-sentence">
            <label htmlFor="photo-title"></label>
            <input
              type="text"
              id="photo-title"
              name="photo-title"
              placeholder="Título"
              maxLength="50"
              minLength="2"
              required
              className={`popup__input ${errors.name ? "popup__input_type_error" : ""}`}
              value={name}
              onChange={handleNameChange}
            />
            <span
              className={`error-message ${errors.name ? "popup__error_visible" : ""}`}
              id="photo-title-error"
              aria-live="polite"
            >
              {errors.name}
            </span>
          </div>
          <div className="popup__form-sentence">
            <label htmlFor="photo-url"></label>
            <input
              type="url"
              id="photo-url"
              name="photo-url"
              placeholder="URL de la imagen"
              required
              className={`popup__input ${errors.link ? "popup__input_type_error" : ""}`}
              value={link}
              onChange={handleLinkChange}
            />
            <span
              className={`error-message ${errors.link ? "popup__error_visible" : ""}`}
              id="photo-url-error"
              aria-live="polite"
            >
              {errors.link}
            </span>
          </div>
          <button
            type="submit"
            id="addPhotoButton"
            className={`popup__save-button ${
              !isValid || isLoading ? "popup__button_disabled" : ""
            }`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Guardando..." : "Crear"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddPlace;

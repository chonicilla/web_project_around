import React, { useRef, useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function EditAvatar({ onClose, isLoading = false }) {
  const avatarRef = useRef();
  const userContext = useContext(CurrentUserContext);
  const { handleUpdateAvatar } = userContext;

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validate = (val) => {
    if (!val) return "La URL de la imagen es obligatoria";
    try {
      new URL(val);
    } catch {
      return "Ingresa una URL válida";
    }
    return "";
  };

  const handleChange = (event) => {
    const val = event.target.value;
    setValue(val);
    const err = validate(val);
    setError(err);
    setIsValid(!err);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    handleUpdateAvatar({ avatar: value });
  }

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
        <h2 className="popup__title">Cambiar foto de perfil</h2>
        <form
          className="popup__form"
          id="updateAvatarForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="popup__form-sentence">
            <input
              type="url"
              ref={avatarRef}
              id="avatar-url"
              name="avatar"
              placeholder="URL de la imagen"
              required
              className={`popup__input ${error ? "popup__input_type_error" : ""}`}
              value={value}
              onChange={handleChange}
            />
            <span
              className={`error-message ${error ? "popup__error_visible" : ""}`}
              id="avatar-url-error"
            >
              {error}
            </span>
          </div>
          <button
            type="submit"
            id="avatarSaveButton"
            className={`popup__save-button ${
              !isValid || isLoading ? "popup__button_disabled" : ""
            }`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditAvatar;

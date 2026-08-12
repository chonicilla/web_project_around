import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function EditProfile({ onClose, isLoading = false }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
    setErrors({ name: "", description: "" });
    const nameOk = (currentUser.name || "").length >= 2;
    const descOk = (currentUser.about || "").length >= 2;
    setIsValid(nameOk && descOk);
  }, [currentUser]);

  const validateField = (field, value) => {
    if (field === "name") {
      if (!value) return "El nombre es obligatorio";
      if (value.length < 2) return "El nombre debe tener al menos 2 caracteres";
      if (value.length > 40)
        return "El nombre debe tener menos de 40 caracteres";
      return "";
    }
    if (field === "description") {
      if (!value) return "La descripción es obligatoria";
      if (value.length < 2)
        return "La descripción debe tener al menos 2 caracteres";
      if (value.length > 200)
        return "La descripción debe tener menos de 200 caracteres";
      return "";
    }
    return "";
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    const err = validateField("name", value);
    setName(value);
    setErrors((prev) => ({ ...prev, name: err }));
    const descErr = validateField("description", description);
    setIsValid(!err && !descErr);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    const err = validateField("description", value);
    setDescription(value);
    setErrors((prev) => ({ ...prev, description: err }));
    const nameErr = validateField("name", name);
    setIsValid(!err && !nameErr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    handleUpdateUser({ name, about: description });
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
        <h2 className="popup__title">Editar perfil</h2>
        <form
          className="popup__form"
          name="profile-form"
          id="edit-profile-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="popup__label">
            <input
              className={`popup__input popup__input_type_name ${
                errors.name ? "popup__input_type_error" : ""
              }`}
              id="owner-name"
              maxLength="40"
              minLength="2"
              name="userName"
              placeholder="Nombre"
              required
              type="text"
              value={name}
              onChange={handleNameChange}
            />
            <span
              className={`popup__error ${
                errors.name ? "popup__error_visible" : ""
              }`}
              id="owner-name-error"
            >
              {errors.name}
            </span>
          </label>
          <label className="popup__label">
            <input
              className={`popup__input popup__input_type_description ${
                errors.description ? "popup__input_type_error" : ""
              }`}
              id="owner-description"
              maxLength="200"
              minLength="2"
              name="userDescription"
              placeholder="Acerca de mí"
              required
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
            <span
              className={`popup__error ${
                errors.description ? "popup__error_visible" : ""
              }`}
              id="owner-description-error"
            >
              {errors.description}
            </span>
          </label>
          <button
            className={`button popup__button ${
              !isValid || isLoading ? "popup__button_disabled" : ""
            }`}
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditProfile;

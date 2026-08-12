import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfile from "../EditProfile/EditProfile.jsx";
import EditAvatar from "../EditAvatar/EditAvatar.jsx";
import AddPlace from "../AddPlace/AddPlace.jsx";
import Card from "../Card/Card.jsx";
import PopupWithConfirmation from "../PopupWithConfirmation/PopupWithConfirmation.jsx";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  selectedCard,
  onClosePopup,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isDeleteConfirmPopupOpen,
  onAddPlaceSubmit,
  isLoadingEditProfile,
  isLoadingEditAvatar,
  isLoadingAddPlace,
  isLoadingDelete,
  onConfirmDeleteCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Icono perfil de usuario"
          />
          <button
            id="openAvatarEdit"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__name-edit">
            <h2 className="profile__name">{currentUser.name}</h2>
            <button
              id="openPopup"
              className="edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__role">{currentUser.about}</p>
        </div>

        <button
          className="add-button"
          id="openAdd"
          onClick={onAddPlace}
        >
          <p className="add-icon">+</p>
        </button>
      </section>

      <section className="gallery-place">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>

      {selectedCard && (
        <section className="popup popup_is-opened">
          <div className="popup__overlay" onClick={onClosePopup}></div>
          <div className="popup__edit-profile">
            <button
              className="popup__close-button"
              type="button"
              aria-label="Cerrar"
              onClick={onClosePopup}
            ></button>
            <figure style={{ margin: 0 }}>
              <img
                className="viewer__image"
                src={selectedCard.link}
                alt={selectedCard.name}
              />
              <figcaption className="viewer__caption">
                {selectedCard.name}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {isEditProfilePopupOpen && (
        <EditProfile
          onClose={onClosePopup}
          isLoading={isLoadingEditProfile}
        />
      )}

      {isEditAvatarPopupOpen && (
        <EditAvatar
          onClose={onClosePopup}
          isLoading={isLoadingEditAvatar}
        />
      )}

      {isAddPlacePopupOpen && (
        <AddPlace
          onClose={onClosePopup}
          onAddPlaceSubmit={onAddPlaceSubmit}
          isLoading={isLoadingAddPlace}
        />
      )}

      {isDeleteConfirmPopupOpen && (
        <PopupWithConfirmation
          onClose={onClosePopup}
          onConfirm={onConfirmDeleteCard}
          isLoading={isLoadingDelete}
          loadingButtonText="Eliminando..."
        />
      )}
    </main>
  );
}

export default Main;

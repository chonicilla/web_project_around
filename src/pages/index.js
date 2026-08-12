import api from "../utils/api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__role",
});

const imagePopup = new PopupWithImage("#imageViewer");
imagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation("#deleteConfirmPopup");
deletePopup.setEventListeners();

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery-place",
);

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    (cardId, isLiked, updateLikeView) => {
      if (!isLiked) {
        api
          .likeCard(cardId)
          .then((updatedCardData) => {
            updateLikeView(updatedCardData.isLiked);
          })
          .catch((err) => console.error(`Error al dar like: ${err}`));
      } else {
        api
          .dislikeCard(cardId)
          .then((updatedCardData) => {
            updateLikeView(updatedCardData.isLiked);
          })
          .catch((err) => console.error(`Error al quitar like: ${err}`));
      }
    },
    (cardId, cardElement) => {
      deletePopup.open();

      deletePopup.setAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            deletePopup.close();
          })
          .catch((err) =>
            console.error(`Error al eliminar la tarjeta: ${err}`),
          );
      });
    },
  );
  return card.generateCard();
};

const profileFormPopup = new PopupWithForm(
  "#editProfilePopup",
  (inputValues) => {
    profileFormPopup.renderLoading(true);

    api
      .updateUserInfo({ name: inputValues.name, about: inputValues.job })
      .then((userData) => {
        userInfo.setUserInfo({ name: userData.name, job: userData.about });
        profileFormPopup.close();
      })
      .catch((err) => {
        console.error(`Error al actualizar el perfil: ${err}`);
      })
      .finally(() => {
        profileFormPopup.renderLoading(false);
      });
  },
);
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm("#addPhotoPopup", (inputValues) => {
  const cardName = inputValues["photo-title"];
  const cardLink = inputValues["photo-url"];

  addCardFormPopup.renderLoading(true);

  api
    .addCard({ name: cardName, link: cardLink })
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      cardSection.addItem(cardElement);
      addCardFormPopup.close();
    })
    .catch((err) => {
      console.error(`Error al añadir la tarjeta: ${err}`);
    })
    .finally(() => {
      addCardFormPopup.renderLoading(false);
    });
});
addCardFormPopup.setEventListeners();

const avatarFormPopup = new PopupWithForm(
  "#updateAvatarPopup",
  (inputValues) => {
    avatarFormPopup.renderLoading(true);

    api
      .updateAvatar(inputValues.avatar) //
      .then((userData) => {
        document.querySelector(".profile__avatar").src = userData.avatar;
        avatarFormPopup.close();
      })
      .catch((err) => console.error(`Error al cambiar el avatar: ${err}`))
      .finally(() => {
        avatarFormPopup.renderLoading(false);
      });
  },
);
avatarFormPopup.setEventListeners();

document.getElementById("openPopup").addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();

  document.getElementById("nombre").value = currentUserData.name;
  document.getElementById("about-me").value = currentUserData.job;

  editValidator.resetValidation();
  profileFormPopup.open();
});

document.getElementById("openAdd").addEventListener("click", () => {
  addValidator.resetValidation();
  addCardFormPopup.open();
});

document.getElementById("openAvatarEdit").addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarFormPopup.open();
});

const editProfileForm = document
  .querySelector("#editProfilePopup")
  .querySelector(".popup__form");
const addCardForm = document
  .querySelector("#addPhotoPopup")
  .querySelector(".popup__form");
const avatarForm = document
  .querySelector("#updateAvatarPopup")
  .querySelector(".popup__form");

const editValidator = new FormValidator(config, editProfileForm);
const addValidator = new FormValidator(config, addCardForm);
const avatarValidator = new FormValidator(config, avatarForm);

editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    document.querySelector(".profile__avatar").src = userData.avatar;

    cardSection.renderItems(cards);
  })
  .catch((err) => console.error(`Error al cargar datos iniciales: ${err}`));

import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

const config = {
  inputSelector: "input",
  submitButtonSelector: ".popup__save-button",
};

const editProfileForm = document.querySelector("#popUp .popup__form");
const addCardForm = document.querySelector("#addPhotoForm");

const editValidator = new FormValidator(config, editProfileForm);
const addValidator = new FormValidator(config, addCardForm);

editValidator.enableValidation();
addValidator.enableValidation();

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
];

const imagePopup = new PopupWithImage("#imageViewer");
imagePopup.setEventListeners();

const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery-place",
);

cardSection.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__role",
});

const profileFormPopup = new PopupWithForm("#popUp", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues["nombre"],
    job: inputValues["about-me"],
  });
  profileFormPopup.close();
});
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm("#addPhotoPopup", (inputValues) => {
  const cardElement = createCard({
    name: inputValues["photo-title"],
    link: inputValues["photo-url"],
  });
  cardSection.addItem(cardElement);
  addCardFormPopup.close();
});
addCardFormPopup.setEventListeners();

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

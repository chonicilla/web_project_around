import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { openPopup, closePopup } from "./scripts/utils.js";

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

const gallery = document.querySelector(".gallery-place");

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  gallery.append(card.generateCard());
});

document.getElementById("openPopup").addEventListener("click", () => {
  editValidator.resetValidation();
  openPopup(document.getElementById("popUp"));
});

document.getElementById("openAdd").addEventListener("click", () => {
  addCardForm.reset();
  addValidator.resetValidation();
  openPopup(document.getElementById("addPhotoPopup"));
});

document.querySelectorAll(".popup__close-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    if (popup) closePopup(popup);
  });
});

document.querySelectorAll(".popup__overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    if (popup) closePopup(popup);
  });
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("photo-title").value.trim();
  const url = document.getElementById("photo-url").value.trim();
  const newCard = new Card({ name: title, link: url }, "#card-template");
  gallery.prepend(newCard.generateCard());
  closePopup(document.getElementById("addPhotoPopup"));
  addCardForm.reset();
  addValidator.resetValidation();
});

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nombre").value.trim();
  const role = document.getElementById("about-me").value.trim();
  document.querySelector(".profile__name").textContent = name;
  document.querySelector(".profile__role").textContent = role;
  closePopup(document.getElementById("popUp"));
  editProfileForm.reset();
  editValidator.resetValidation();
});

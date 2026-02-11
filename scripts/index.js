import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

const config = {
  inputSelector: "input",
  submitButtonSelector: ".popup__save-button",
};

// Instancias de validación
const editProfileForm = document.querySelector("#popUp .popup__form");
const addCardForm = document.querySelector("#addPhotoForm");

const editValidator = new FormValidator(config, editProfileForm);
const addValidator = new FormValidator(config, addCardForm);

editValidator.enableValidation();
addValidator.enableValidation();

// Lógica de Renderizado
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  // ... resto de tus tarjetas
];

const gallery = document.querySelector(".gallery-place");

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  gallery.append(card.generateCard());
});

// Eventos de apertura
document.getElementById("openPopup").addEventListener("click", () => {
  editValidator.resetValidation();
  openPopup(document.getElementById("popUp"));
});

document.getElementById("openAdd").addEventListener("click", () => {
  addCardForm.reset();
  addValidator.resetValidation();
  openPopup(document.getElementById("addPhotoPopup"));
});

// Cierres
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

// Crear nueva tarjeta desde el formulario
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

// Actualizar perfil desde el formulario
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

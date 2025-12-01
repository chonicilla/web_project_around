document.addEventListener("DOMContentLoaded", function () {
  const nombrePerfil = document.querySelector(".profile__name");
  const rolPerfil = document.querySelector(".profile__role");
  const gallery = document.querySelector(".gallery-place");
  const cardTemplate = document.querySelector("#card-template");
  const openModalBtn = document.getElementById("openPopup");
  const myModal = document.getElementById("popUp");
  const closeButton = myModal.querySelector(".popup__close-button");
  const modalOverlay = myModal.querySelector(".popup__overlay");
  const formularioEdicion = myModal.querySelector(".popup__form");
  const inputNombre = document.getElementById("nombre");
  const inputAcercaDeMi = document.getElementById("about-me");
  const botonGuardar = document.getElementById("saveButton");
  const errorNombreSpan = document.getElementById("nombre-error");
  const errorAcercaDeMiSpan = document.getElementById("about-me-error");
  const openAddModal = document.getElementById("openAdd");
  const addPhotoPopup = document.getElementById("addPhotoPopup");
  const addPhotoCloseButton = addPhotoPopup.querySelector(
    ".popup__close-button"
  );
  const addPhotoOverlay = addPhotoPopup.querySelector(".popup__overlay");
  const addPhotoForm = document.getElementById("addPhotoForm");
  const photoTitleInput = document.getElementById("photo-title");
  const photoUrlInput = document.getElementById("photo-url");
  const addPhotoButton = document.getElementById("addPhotoButton");
  const errorTitleSpan = document.getElementById("text-error");
  const errorUrlSpan = addPhotoForm.querySelector(".url-message");

  let nombreOriginal = "";
  let rolOriginal = "";
  const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    },
  ];

  /**
  @description
  @param {HTMLInputElement} input
  @param {HTMLElement} errorSpan
   */

  function validarCampo(input, errorSpan) {
    if (input.validity.valid) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
      input.style.borderBottomColor = "#ccc";
    } else {
      let mensajeError = "";

      if (input.validity.valueMissing) {
        mensajeError = "Este campo es obligatorio.";
      } else if (input.validity.tooShort) {
        mensajeError = `Debe tener al menos ${input.minLength} caracteres.`;
      } else if (input.validity.tooLong) {
        mensajeError = `No debe exceder los ${input.maxLength} caracteres.`;
      } else if (input.validity.typeMismatch && input.type === "url") {
        mensajeError = "Por favor, ingresa una URL válida.";
      } else {
        mensajeError = "El formato ingresado no es correcto.";
      }

      errorSpan.textContent = mensajeError;
      errorSpan.style.display = "block";
      input.style.borderBottomColor = "red";
    }
  }

  /**
   @description
   @param {HTMLFormElement} form
   @param {HTMLButtonElement} button
   @param {boolean} checkChanges
   */
  function verificarBotones(form, button, checkChanges = false) {
    const esValido = form.checkValidity();

    let hayCambios = true;
    if (checkChanges) {
      const nombreActual = inputNombre.value;
      const rolActual = inputAcercaDeMi.value;
      hayCambios = nombreActual !== nombreOriginal || rolActual !== rolOriginal;
    }

    if (esValido && hayCambios) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  }

  function cargarDatosGuardados() {
    try {
      const datosGuardados = JSON.parse(localStorage.getItem("profileData"));
      if (datosGuardados) {
        nombrePerfil.textContent =
          datosGuardados.nombre || nombrePerfil.textContent;
        rolPerfil.textContent = datosGuardados.rol || rolPerfil.textContent;
      }
    } catch (error) {
      console.error("Error al cargar datos guardados:", error);
    }
  }

  function guardarDatosEnLocalStorage(nombre, rol) {
    try {
      const profileData = {
        nombre: nombre,
        rol: rol,
      };
      localStorage.setItem("profileData", JSON.stringify(profileData));
    } catch (error) {
      console.error("Error al guardar datos en localStorage:", error);
    }
  }

  function createCard(cardData) {
    try {
      const cardElement = cardTemplate.content
        .cloneNode(true)
        .querySelector(".gallery__container");

      if (!cardElement) {
        console.error("Error: No se pudo clonar el template correctamente");
        return document.createElement("div");
      }

      const cardImage = cardElement.querySelector(".gallery__image");
      const cardTitle = cardElement.querySelector(".gallery__place-name");
      const likeButton = cardElement.querySelector(".like-button");
      const trashButton = cardElement.querySelector(".trash-button");

      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
      cardTitle.textContent = cardData.name;

      likeButton.addEventListener("click", function () {
        this.classList.toggle("liked");
      });

      trashButton.addEventListener("click", function () {
        eliminarTarjeta(cardElement, cardData);
      });

      return cardElement;
    } catch (error) {
      console.error("Error al crear la tarjeta:", error);
      return document.createElement("div");
    }
  }

  function cargarGaleria() {
    try {
      const tarjetasGuardadas = JSON.parse(
        localStorage.getItem("galleryCards")
      );
      const tarjetasAMostrar = tarjetasGuardadas || initialCards;
      gallery.innerHTML = "";
      tarjetasAMostrar.forEach((cardData) => {
        const cardElement = createCard(cardData);
        if (cardElement) {
          gallery.appendChild(cardElement);
        }
      });
    } catch (error) {
      console.error("Error al cargar la galería:", error);
      gallery.innerHTML = "";
      initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        if (cardElement) {
          gallery.appendChild(cardElement);
        }
      });
    }
  }

  function eliminarTarjeta(cardElement, cardData) {
    try {
      cardElement.remove();
      const tarjetasGuardadas =
        JSON.parse(localStorage.getItem("galleryCards")) || initialCards;
      const tarjetasActualizadas = tarjetasGuardadas.filter(
        (card) => !(card.name === cardData.name && card.link === cardData.link)
      );
      localStorage.setItem(
        "galleryCards",
        JSON.stringify(tarjetasActualizadas)
      );
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  }

  function agregarNuevaTarjeta(cardData) {
    try {
      const cardElement = createCard(cardData);
      gallery.prepend(cardElement);
      const tarjetasGuardadas =
        JSON.parse(localStorage.getItem("galleryCards")) || initialCards;
      tarjetasGuardadas.unshift(cardData);
      localStorage.setItem("galleryCards", JSON.stringify(tarjetasGuardadas));
    } catch (error) {
      console.error("Error al añadir nueva tarjeta:", error);
    }
  }

  function openPopup() {
    try {
      myModal.classList.add("show");

      nombreOriginal = nombrePerfil.textContent.trim();
      rolOriginal = rolPerfil.textContent.trim();

      inputNombre.value = nombreOriginal;
      inputAcercaDeMi.value = rolOriginal;

      verificarBotones(formularioEdicion, botonGuardar, true);
    } catch (error) {
      console.error("Error al abrir el popup:", error);
    }
  }

  function closePopup() {
    try {
      myModal.classList.remove("show");
      formularioEdicion.reset();

      validarCampo(inputNombre, errorNombreSpan);
      validarCampo(inputAcercaDeMi, errorAcercaDeMiSpan);
      verificarBotones(formularioEdicion, botonGuardar, true);
    } catch (error) {
      console.error("Error al cerrar el popup:", error);
    }
  }

  function openAddPhotoPopup() {
    try {
      addPhotoPopup.classList.add("show");
      addPhotoForm.reset();

      verificarBotones(addPhotoForm, addPhotoButton);
    } catch (error) {
      console.error("Error al abrir el popup de añadir foto:", error);
    }
  }

  function closeAddPhotoPopup() {
    try {
      addPhotoPopup.classList.remove("show");
      addPhotoForm.reset();

      validarCampo(photoTitleInput, errorTitleSpan);
      validarCampo(photoUrlInput, errorUrlSpan);
      verificarBotones(addPhotoForm, addPhotoButton);
    } catch (error) {
      console.error("Error al cerrar el popup de añadir foto:", error);
    }
  }

  cargarDatosGuardados();
  if (cardTemplate) {
    cargarGaleria();
  } else {
    console.error(
      "Error: No se encontró el template de tarjeta (#card-template)"
    );
  }

  openModalBtn.addEventListener("click", openPopup);

  closeButton.addEventListener("click", closePopup);
  modalOverlay.addEventListener("click", closePopup);

  formularioEdicion.addEventListener("input", function () {
    validarCampo(inputNombre, errorNombreSpan);
    validarCampo(inputAcercaDeMi, errorAcercaDeMiSpan);

    verificarBotones(formularioEdicion, botonGuardar, true);
  });

  formularioEdicion.addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
      const nuevoNombre = inputNombre.value.trim();
      const nuevoRol = inputAcercaDeMi.value.trim();

      if (nuevoNombre !== "") {
        nombrePerfil.textContent = nuevoNombre;
      }
      if (nuevoRol !== "") {
        rolPerfil.textContent = nuevoRol;
      }

      guardarDatosEnLocalStorage(
        nombrePerfil.textContent,
        rolPerfil.textContent
      );
      closePopup();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  });

  openAddModal.addEventListener("click", openAddPhotoPopup);

  addPhotoCloseButton.addEventListener("click", closeAddPhotoPopup);
  addPhotoOverlay.addEventListener("click", closeAddPhotoPopup);

  addPhotoForm.addEventListener("input", function () {
    validarCampo(photoTitleInput, errorTitleSpan);
    validarCampo(photoUrlInput, errorUrlSpan);

    verificarBotones(addPhotoForm, addPhotoButton);
  });

  addPhotoForm.addEventListener("submit", (evento) => {
    evento.preventDefault();
    try {
      const nuevoTitulo = photoTitleInput.value.trim();
      const nuevaUrl = photoUrlInput.value.trim();

      if (nuevoTitulo !== "" && nuevaUrl !== "") {
        const nuevaTarjeta = {
          name: nuevoTitulo,
          link: nuevaUrl,
        };
        agregarNuevaTarjeta(nuevaTarjeta);
        closeAddPhotoPopup();
      }
    } catch (error) {
      console.error("Error al añadir nueva foto:", error);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (myModal.classList.contains("show")) {
        closePopup();
      } else if (addPhotoPopup.classList.contains("show")) {
        closeAddPhotoPopup();
      }
    }
  });
});

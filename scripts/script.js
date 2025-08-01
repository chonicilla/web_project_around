document.addEventListener("DOMContentLoaded", function () {

  const likeButtons = document.querySelectorAll(".like-button");
  const openModalBtn = document.getElementById("openPopup");
  const myModal = document.getElementById("popUp");
  const closeButton = myModal.querySelector(".popup__close-button");
  const modalOverlay = myModal.querySelector(".popup__overlay");

  const inputNombre = document.getElementById('nombre');
  const inputAcercaDeMi = document.getElementById('about-me');
  const nombrePerfil = document.querySelector('.profile__name');
  const rolPerfil = document.querySelector('.profile__role');
  const botonGuardar = document.getElementById('saveButton');
  const formulario = document.querySelector('.popup__form');

  /*funciones popup y form*/

  function verificarCampos() {
    const nombreLleno = inputNombre.value.trim() !== '';
    const acercaDeMiLleno = inputAcercaDeMi.value.trim() !== '';

    if (nombreLleno || acercaDeMiLleno) {
      botonGuardar.removeAttribute('disabled');
    } else {
      botonGuardar.setAttribute('disabled', 'disabled');
    }
  }

  function openPopup() {
    myModal.classList.add("show");
    inputNombre.value = nombrePerfil.textContent;
    inputAcercaDeMi.value = rolPerfil.textContent;
    verificarCampos();
  }

  function closePopup() {
    myModal.classList.remove("show");
    formulario.reset();
    verificarCampos();
  }

  /*listener like button*/
  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("liked");
    });
  });

  /*listener openPopup*/
  openModalBtn.addEventListener("click", openPopup);

  /*listener cerrar popup*/
  closeButton.addEventListener("click", closePopup);

  /*listener cerrar popup con espace*/
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && myModal.classList.contains("show")) {
      closePopup();
    }
  });

  /*listener para actualizar el estado del botón al escribir*/
  inputNombre.addEventListener('input', verificarCampos);
  inputAcercaDeMi.addEventListener('input', verificarCampos);

  /*listener para actualizar el estado del botón al escribir/guardar los cambios del formulario*/
  botonGuardar.addEventListener('click', (evento) => {
    evento.preventDefault();
    const nuevoNombre = inputNombre.value;
    const nuevoRol = inputAcercaDeMi.value;

    if (nuevoNombre.trim() !== '') {
      nombrePerfil.textContent = nuevoNombre;
    }

    if (nuevoRol.trim() !== '') {
      rolPerfil.textContent = nuevoRol;
    }

    closePopup();
  });
});
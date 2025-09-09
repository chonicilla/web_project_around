document.addEventListener("DOMContentLoaded", function () {
  // Selección de elementos del DOM
  const openAddModal = document.getElementById("openAdd");
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
  const gallery = document.querySelector(".gallery-place");
  const cardTemplate = document.querySelector("#card-template");

  // Selección de elementos para el popup de añadir foto
  const addPhotoPopup = document.getElementById("addPhotoPopup");
  const addPhotoCloseButton = addPhotoPopup.querySelector(".popup__close-button");
  const addPhotoOverlay = addPhotoPopup.querySelector(".popup__overlay");
  const addPhotoForm = document.getElementById("addPhotoForm");
  const photoTitleInput = document.getElementById("photo-title");
  const photoUrlInput = document.getElementById("photo-url");
  const addPhotoButton = document.getElementById("addPhotoButton");

  const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

  // Variables para almacenar los valores originales del formulario
  let nombreOriginal = '';
  let rolOriginal = '';

  // Cargar datos guardados al iniciar la página
  cargarDatosGuardados();

  // Verificar que el template existe antes de cargar la galería
  if (cardTemplate) {
    // Cargar las tarjetas iniciales
    cargarGaleria();
  } else {
    console.error('Error: No se encontró el template de tarjeta (#card-template)');
  }

  // Verifica si los campos del formulario han cambiado para habilitar el botón de guardar

  function verificarCampos() {
    // Verificar que ambos campos tengan contenido y que al menos uno haya cambiado
    const nombreActual = inputNombre.value.trim();
    const rolActual = inputAcercaDeMi.value.trim();

    if (nombreActual !== '' && rolActual !== '' &&
        (nombreActual !== nombreOriginal || rolActual !== rolOriginal)) {
      botonGuardar.removeAttribute('disabled');
    } else {
      botonGuardar.setAttribute('disabled', 'disabled');
    }
  }

  // Carga los datos guardados en localStorage si existen

  function cargarDatosGuardados() {
    try {
      const datosGuardados = JSON.parse(localStorage.getItem('profileData'));
      if (datosGuardados) {
        nombrePerfil.textContent = datosGuardados.nombre || nombrePerfil.textContent;
        rolPerfil.textContent = datosGuardados.rol || rolPerfil.textContent;
      }
    } catch (error) {
      console.error('Error al cargar datos guardados:', error);
    }
  }

  // Abre el popup y carga los datos actuales del perfil en el formulario
  function openPopup() {
    try {
      myModal.classList.add("show");
      // Guardar los valores originales
      nombreOriginal = nombrePerfil.textContent.trim();
      rolOriginal = rolPerfil.textContent.trim();

      // Establecer los valores en los campos
      inputNombre.value = nombreOriginal;
      inputAcercaDeMi.value = rolOriginal;

      // El botón debe estar deshabilitado inicialmente ya que no hay cambios
      botonGuardar.setAttribute('disabled', 'disabled');
    } catch (error) {
      console.error('Error al abrir el popup:', error);
    }
  }

  /**
   * Cierra el popup y reinicia el formulario
   */
  function closePopup() {
    try {
      myModal.classList.remove("show");
      formulario.reset();
      verificarCampos();
    } catch (error) {
      console.error('Error al cerrar el popup:', error);
    }
  }

  /**
   * Guarda los datos del perfil en localStorage
   * @param {string} nombre - Nombre del perfil
   * @param {string} rol - Rol o descripción del perfil
   */
  function guardarDatosEnLocalStorage(nombre, rol) {
    try {
      const profileData = {
        nombre: nombre,
        rol: rol
      };
      localStorage.setItem('profileData', JSON.stringify(profileData));
    } catch (error) {
      console.error('Error al guardar datos en localStorage:', error);
    }
  }

  // Event Listeners

  /**
   * Crea una nueva tarjeta para la galería
   * @param {Object} cardData - Datos de la tarjeta (name, link)
   * @returns {HTMLElement} - Elemento de la tarjeta creada
   */
  function createCard(cardData) {
    try {
      // Clonar el template
      const cardElement = cardTemplate.content.cloneNode(true).querySelector('.gallery__container');

      // Verificar que el elemento se ha clonado correctamente
      if (!cardElement) {
        console.error('Error: No se pudo clonar el template correctamente');
        return document.createElement('div'); // Devolver un elemento vacío para evitar errores
      }

      // Obtener elementos de la tarjeta
      const cardImage = cardElement.querySelector('.gallery__image');
      const cardTitle = cardElement.querySelector('.gallery__place-name');
      const likeButton = cardElement.querySelector('.like-button');
      const trashButton = cardElement.querySelector('.trash-button');

      // Verificar que todos los elementos existen
      if (!cardImage || !cardTitle || !likeButton || !trashButton) {
        console.error('Error: Faltan elementos en el template de la tarjeta');
        console.log('cardImage:', cardImage);
        console.log('cardTitle:', cardTitle);
        console.log('likeButton:', likeButton);
        console.log('trashButton:', trashButton);
        return document.createElement('div'); // Devolver un elemento vacío para evitar errores
      }

      // Establecer datos
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name;
      cardTitle.textContent = cardData.name;

      // Añadir event listeners
      likeButton.addEventListener('click', function() {
        this.classList.toggle('liked');
      });

      trashButton.addEventListener('click', function() {
        eliminarTarjeta(cardElement, cardData);
      });

      return cardElement;
    } catch (error) {
      console.error('Error al crear la tarjeta:', error);
      return document.createElement('div'); // Devolver un elemento vacío para evitar errores
    }
  }

  /**
   * Carga las tarjetas en la galería
   */
  function cargarGaleria() {
    try {
      // Intentar cargar tarjetas desde localStorage
      const tarjetasGuardadas = JSON.parse(localStorage.getItem('galleryCards'));
      const tarjetasAMostrar = tarjetasGuardadas || initialCards;

      // Limpiar la galería
      gallery.innerHTML = '';

      // Añadir cada tarjeta a la galería
      tarjetasAMostrar.forEach(cardData => {
        const cardElement = createCard(cardData);
        if (cardElement) {
          gallery.appendChild(cardElement);
        }
      });
    } catch (error) {
      console.error('Error al cargar la galería:', error);
      // Si hay un error, cargar las tarjetas iniciales
      gallery.innerHTML = '';
      initialCards.forEach(cardData => {
        const cardElement = createCard(cardData);
        if (cardElement) {
          gallery.appendChild(cardElement);
        }
      });
    }
  }

  /**
   * Elimina una tarjeta de la galería
   * @param {HTMLElement} cardElement - Elemento de la tarjeta a eliminar
   * @param {Object} cardData - Datos de la tarjeta a eliminar
   */
  function eliminarTarjeta(cardElement, cardData) {
    try {
      // Eliminar el elemento del DOM
      cardElement.remove();

      // Actualizar localStorage
      const tarjetasGuardadas = JSON.parse(localStorage.getItem('galleryCards')) || initialCards;
      const tarjetasActualizadas = tarjetasGuardadas.filter(card =>
        !(card.name === cardData.name && card.link === cardData.link)
      );

      localStorage.setItem('galleryCards', JSON.stringify(tarjetasActualizadas));
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
    }
  }

  /**
   * Añade una nueva tarjeta a la galería
   * @param {Object} cardData - Datos de la tarjeta (name, link)
   */
  function agregarNuevaTarjeta(cardData) {
    try {
      // Crear la nueva tarjeta
      const cardElement = createCard(cardData);

      // Añadir al principio de la galería
      gallery.prepend(cardElement);

      // Actualizar localStorage
      const tarjetasGuardadas = JSON.parse(localStorage.getItem('galleryCards')) || initialCards;
      tarjetasGuardadas.unshift(cardData);
      localStorage.setItem('galleryCards', JSON.stringify(tarjetasGuardadas));
    } catch (error) {
      console.error('Error al añadir nueva tarjeta:', error);
    }
  }

  // Abre el popup para añadir una nueva foto

  function openAddPhotoPopup() {
    try {
      addPhotoPopup.classList.add("show");
      photoTitleInput.value = '';
      photoUrlInput.value = '';
      addPhotoButton.setAttribute('disabled', 'disabled');
    } catch (error) {
      console.error('Error al abrir el popup de añadir foto:', error);
    }
  }

  // Cierra el popup para añadir una nueva foto

  function closeAddPhotoPopup() {
    try {
      addPhotoPopup.classList.remove("show");
      addPhotoForm.reset();
    } catch (error) {
      console.error('Error al cerrar el popup de añadir foto:', error);
    }
  }

  // Verifica si los campos del formulario de añadir foto son válidos

  function verificarCamposAddPhoto() {
    const tituloActual = photoTitleInput.value.trim();
    const urlActual = photoUrlInput.value.trim();

    if (tituloActual !== '' && urlActual !== '') {
      addPhotoButton.removeAttribute('disabled');
    } else {
      addPhotoButton.setAttribute('disabled', 'disabled');
    }
  }

  // listener openPopup
  openModalBtn.addEventListener("click", openPopup);

  // listener cerrar popup
  closeButton.addEventListener("click", closePopup);

  // listener cerrar popup al hacer clic en el overlay
  modalOverlay.addEventListener("click", closePopup);

  // listener cerrar popup con espace
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && myModal.classList.contains("show")) {
      closePopup();
    }
  });

  // listener para actualizar el estado del botón al escribir
  inputNombre.addEventListener('input', verificarCampos);
  inputAcercaDeMi.addEventListener('input', verificarCampos);

  // listener para actualizar el estado del botón al escribir/guardar los cambios del formulario
  botonGuardar.addEventListener('click', (evento) => {
    evento.preventDefault();
    try {
      const nuevoNombre = inputNombre.value;
      const nuevoRol = inputAcercaDeMi.value;

      if (nuevoNombre.trim() !== '') {
        nombrePerfil.textContent = nuevoNombre;
      }

      if (nuevoRol.trim() !== '') {
        rolPerfil.textContent = nuevoRol;
      }

      // Guardar datos en localStorage
      guardarDatosEnLocalStorage(nombrePerfil.textContent, rolPerfil.textContent);
      closePopup();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  });

  // listener para abrir el popup de añadir foto
  openAddModal.addEventListener("click", openAddPhotoPopup);

  // listener para cerrar el popup de añadir foto
  addPhotoCloseButton.addEventListener("click", closeAddPhotoPopup);
  addPhotoOverlay.addEventListener("click", closeAddPhotoPopup);

  // listener para cerrar el popup de añadir foto con escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && addPhotoPopup.classList.contains("show")) {
      closeAddPhotoPopup();
    }
  });

  // listener para verificar campos del formulario de añadir foto
  photoTitleInput.addEventListener('input', verificarCamposAddPhoto);
  photoUrlInput.addEventListener('input', verificarCamposAddPhoto);

  // listener para guardar nueva foto
  addPhotoForm.addEventListener('submit', (evento) => {
    evento.preventDefault();
    try {
      const nuevoTitulo = photoTitleInput.value.trim();
      const nuevaUrl = photoUrlInput.value.trim();

      if (nuevoTitulo !== '' && nuevaUrl !== '') {
        const nuevaTarjeta = {
          name: nuevoTitulo,
          link: nuevaUrl
        };

        agregarNuevaTarjeta(nuevaTarjeta);
        closeAddPhotoPopup();
      }
    } catch (error) {
      console.error('Error al añadir nueva foto:', error);
    }
  });
});

// Perdon por tantos comentaios, pero así me ordeno mejor con el código
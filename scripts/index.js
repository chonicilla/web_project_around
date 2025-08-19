document.addEventListener("DOMContentLoaded", function () {
  // Selección de elementos del DOM
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
  
  // Variables para almacenar los valores originales del formulario
  let nombreOriginal = '';
  let rolOriginal = '';
  
  // Cargar datos guardados al iniciar la página
  cargarDatosGuardados();

  /**
   * Verifica si los campos del formulario han cambiado para habilitar el botón de guardar
   */
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
  
  /**
   * Carga los datos guardados en localStorage si existen
   */
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

  /**
   * Abre el popup y carga los datos actuales del perfil en el formulario
   */
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
  
  /*listener cerrar popup al hacer clic en el overlay*/
  modalOverlay.addEventListener("click", closePopup);

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
});
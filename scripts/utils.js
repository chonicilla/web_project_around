export function openPopup(popup) {
  popup.classList.add("show");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("show");
  document.removeEventListener("keydown", handleEscClose);
}

export const openModal = openPopup;
export const closeModal = closePopup;

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".popup.show");
    if (openModal) closePopup(openModal);
  }
}

export function openImageViewer(name, link) {
  const viewer = document.getElementById("imageViewer");
  if (!viewer) return;
  const img = viewer.querySelector(".viewer__image");
  const caption = viewer.querySelector(".viewer__caption");
  if (img) {
    img.src = link;
    img.alt = name;
  }
  if (caption) {
    caption.textContent = name;
  }
  openPopup(viewer);
}

document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("liked");

      if (this.classList.contains("liked")) {
        console.log(
          "Me Gusta (Card:",
          this.closest(".card").querySelector("h3").textContent,
          ")"
        );
      } else {
        console.log(
          "Ya No Me Gusta (Card:",
          this.closest(".card").querySelector("h3").textContent,
          ")"
        );
      }
    });
  });
});

const openModalBtn = document.getElementById("openPopup");
const myModal = document.getElementById("popUp");

function openPopup() {
  myModal.classList.add("show"); // Añade la clase 'show' para mostrar y centrar
}
openModalBtn.addEventListener("click", openModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && myModal.classList.contains("show")) {
    closeModal();
  }
});

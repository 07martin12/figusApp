"use strict";
const btnGirar = document.querySelector(".btn-girar");
const ruletaBackground = document.querySelector(".ruleta-background");
const ruletaItems = document.querySelector(".ruleta-items");
btnGirar?.addEventListener("click", () => {
    ruletaBackground.classList.add("girar-background");
    ruletaItems.classList.add("girar-items");
    btnGirar.disabled = true;
    setTimeout(() => {
        ruletaBackground.classList.remove("girar-background");
        ruletaItems.classList.remove("girar-items");
        btnGirar.disabled = false;
    }, 3000);
});

"use strict";
let giros = 10;
const girarBtn = document.getElementById("girarBtn");
const premiosCircle = document.querySelector(".premios-circle");
const ruletaImg = document.querySelector(".ruleta");
const btn5 = document.getElementById("girar5");
const btn10 = document.getElementById("girar10");
const btn15 = document.getElementById("girar15");
const btnAuto = document.getElementById("autoGiro");
const premios = [
    { nombre: "Sobre Dorado", img: "../../assets/img/icons/sobreDorado.png" },
    { nombre: "Nada", img: "../../assets/img/icons/premio_nada.png" },
    { nombre: "Sobre Gris", img: "../../assets/img/icons/sobreGris.png" },
    { nombre: "Nada", img: "../../assets/img/icons/premio_nada.png" },
    {
        nombre: "Figurita Aleatoria",
        img: "../../assets/img/icons/figurita_aleatoria.png",
    },
    { nombre: "Nada", img: "../../assets/img/icons/premio_nada.png" },
    { nombre: "Giro Gratis", img: "../../assets/img/icons/giroGratis.png" },
    { nombre: "Nada", img: "../../assets/img/icons/premio_nada.png" },
];
let rotacionActual = 0;
const ROTACION_INICIAL = 20;
const sector = 360 / premios.length;
girarBtn.addEventListener("click", realizarGiro);
actualizarBoton();
function actualizarBoton() {
    girarBtn.textContent = `Girar (${giros})`;
    girarBtn.disabled = giros <= 0;
}
function esperarTransicion(el) {
    return new Promise((resolve) => {
        const handler = () => {
            el.removeEventListener("transitionend", handler);
            resolve();
        };
        el.addEventListener("transitionend", handler);
    });
}
function obtenerPremio(anguloFinal) {
    const sectorSize = 360 / premios.length;
    const angulo = ((anguloFinal % 360) + 360) % 360;
    const index = Math.floor(angulo / sectorSize);
    return premios[premios.length - 1 - index];
}
async function realizarGiro() {
    if (giros <= 0)
        return;
    giros--;
    actualizarBoton();
    const girosBase = 1080;
    const randomSector = Math.floor(Math.random() * premios.length);
    const randomOffset = randomSector * sector + sector / 2;
    const anguloFinal = rotacionActual + girosBase + randomOffset;
    rotacionActual = anguloFinal;
    premiosCircle.style.transform = `rotate(${ROTACION_INICIAL + anguloFinal}deg)`;
    ruletaImg.style.transform = `rotate(${ROTACION_INICIAL + anguloFinal}deg)`;
    await Promise.all([
        esperarTransicion(premiosCircle),
        esperarTransicion(ruletaImg),
    ]);
    mostrarPremio(obtenerPremio(anguloFinal));
    actualizarBoton();
}
function mostrarPremio(premioGanado) {
    const contenedor = document.getElementById("premioGanado");
    contenedor.classList.remove("d-none");
    contenedor.innerHTML = `
    <img src="${premioGanado.img}" alt="Premio" style="width: 120px;">
  `;
    setTimeout(() => contenedor.classList.add("d-none"), 2000);
}
//
// ------ GIROS MÚLTIPLES ------
//
async function girarVariasVeces(cantidad) {
    girarBtn.setAttribute("disabled", "true");
    btn5.setAttribute("disabled", "true");
    btn10.setAttribute("disabled", "true");
    btn15.setAttribute("disabled", "true");
    btnAuto.setAttribute("disabled", "true");
    for (let i = 0; i < cantidad; i++) {
        await realizarGiro();
        await new Promise((r) => setTimeout(r, 800));
        if (giros <= 0)
            break;
    }
    if (giros > 0)
        girarBtn.removeAttribute("disabled");
    btn5.removeAttribute("disabled");
    btn10.removeAttribute("disabled");
    btn15.removeAttribute("disabled");
    btnAuto.removeAttribute("disabled");
    actualizarBoton();
}
btn5.addEventListener("click", () => girarVariasVeces(5));
btn10.addEventListener("click", () => girarVariasVeces(10));
btn15.addEventListener("click", () => girarVariasVeces(15));
//
// ------ AUTO GIRO ------
//
let autoGirando = false;
btnAuto.addEventListener("click", async () => {
    if (autoGirando)
        return;
    autoGirando = true;
    girarBtn.setAttribute("disabled", "true");
    btn5.setAttribute("disabled", "true");
    btn10.setAttribute("disabled", "true");
    btn15.setAttribute("disabled", "true");
    while (giros > 0) {
        await realizarGiro();
        await new Promise((r) => setTimeout(r, 800));
    }
    btn5.removeAttribute("disabled");
    btn10.removeAttribute("disabled");
    btn15.removeAttribute("disabled");
    if (giros > 0)
        girarBtn.removeAttribute("disabled");
    autoGirando = false;
    actualizarBoton();
});

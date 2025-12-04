const premiosCircle =
  document.querySelector<HTMLDivElement>(".premios-circle")!;
const ruletaImg = document.querySelector<HTMLImageElement>(".ruleta")!;

const girarBtn = document.getElementById("girarBtn") as HTMLButtonElement;
const btn5 = document.getElementById("girar5") as HTMLButtonElement;
const btn10 = document.getElementById("girar10") as HTMLButtonElement;
const btn15 = document.getElementById("girar15") as HTMLButtonElement;
const btnAuto = document.getElementById("autoGiro") as HTMLButtonElement;

const premios = [
  { nombre: "Nada", img: "../../assets/img/icons/premio_nada.png" },
  { nombre: "Giro Gratis", img: "../../assets/img/icons/giroGratis.png" },
  {
    nombre: "Nada",
    img: "../../assets/img/icons/premio_nada.png",
  },
  {
    nombre: "Sobre Dorado",
    img: "../../assets/img/icons/sobreDorado.png",
  },
  { nombre: "Nada", img: "../../assets/img/icons/premio_nada.png" },
  { nombre: "Sobre Gris", img: "../../assets/img/icons/sobreGris.png" },
  {
    nombre: "Nada",
    img: "../../assets/img/icons/premio_nada.png",
  },
  {
    nombre: "Figurita Aleatoria",
    img: "../../assets/img/icons/figurita_aleatoria.png",
  },
];

let giros = 20;
girarBtn.textContent = `Girar (${giros})`;
girarBtn.disabled = false;

girarBtn.addEventListener("click", () => realizarGiro(1));
btn5.addEventListener("click", () => realizarGiro(5));
btn10.addEventListener("click", () => realizarGiro(10));
btn15.addEventListener("click", () => realizarGiro(15));
btnAuto.addEventListener("click", () => realizarGiro(giros));

let rotacionActual = 0;
const ROTACION_INICIAL = 20;
const sector = 360 / premios.length;

async function realizarGiro(cantidad: number) {
  if (giros <= 0) return;

  // Se actualiza el texto del botón principal
  girarBtn.textContent = `Girar (${giros})`;

  // Se deshabilitan todos los botones mientras la ruleta gira (evita dobles clics)
  girarBtn.disabled = true;
  btn5.disabled = true;
  btn10.disabled = true;
  btn15.disabled = true;
  btnAuto.disabled = true;

  for (let i = 0; i < cantidad; i++) {
    if (giros <= 0) break;

    giros--;
    girarBtn.textContent = `Girar (${giros})`;

    // Da 5 vueltas completas
    const cantGiros = 360 * 5;

    // Selecciona un premio al azar
    const premioAleatorio = Math.floor(Math.random() * premios.length);
    // Calcula el ángulo exacto del premio ganador
    // sector / 2 porque la flecha de la ruleta se ubica en la mitad derecha del circulo.
    const anguloAleatorio = premioAleatorio * sector + sector / 2;
    // Guarda el ángulo actual para el próximo giro
    rotacionActual = rotacionActual + cantGiros + anguloAleatorio;

    // Gira el círculo de premios
    // ROTACION_INICIAL corrige la posición inicial del circulo de premios.
    premiosCircle.style.transform = `rotate(${ROTACION_INICIAL + rotacionActual}deg)`;
    // Gira la imagen de fondo de la ruleta al mismo tiempo
    ruletaImg.style.transform = `rotate(${ROTACION_INICIAL + rotacionActual}deg)`;

    // Espera a que ambas animaciones terminen antes de seguir
    await Promise.all([
      esperarTransicion(premiosCircle),
      esperarTransicion(ruletaImg),
    ]);

    // Muestra el premio ganado en pantalla
    mostrarPremio(obtenerPremio(rotacionActual));

    await new Promise((r) => setTimeout(r, 800));
  }

  // Los botones se reactivan
  girarBtn.disabled = false;
  btn5.disabled = false;
  btn10.disabled = false;
  btn15.disabled = false;
  btnAuto.disabled = false;

  girarBtn.textContent = `Girar (${giros})`;
  girarBtn.disabled = giros <= 0;
}

// Se espera a que termine la animación CSS de un elemento
function esperarTransicion(elemento: Element): Promise<void> {
  return new Promise((resolve) => {
    // esta función se ejecuta cuando la animacion termine
    const handler = () => {
      elemento.removeEventListener("transitionend", handler);
      resolve();
    };
    // se activa cuando termina la animacion CSS
    elemento.addEventListener("transitionend", handler);
  });
}

function mostrarPremio(premioGanado: any) {
  const contenedor = document.getElementById("premioGanado")!;
  contenedor.classList.remove("d-none");
  contenedor.innerHTML = `
    <img src="${premioGanado.img}" alt="Premio" style="width: 120px;">
  `;
  //la imagen desaparece luego de 2 segundos en pantalla
  setTimeout(() => contenedor.classList.add("d-none"), 2000);
}

function obtenerPremio(anguloFinal: number) {
  // Cada premio se ubica en uno de los 8 angulos del circulo de la ruleta
  const premio = 360 / premios.length;
  // El angulo final tiene los grados acumulados de todas las vueltas, se obtiene el residuo del angulo dentro del circulo.
  const residuo = anguloFinal % 360;
  // Se suma una vuelta para evitar valores negativos y se repite el procedimiento.
  const residuoPositivo = residuo + 360;
  const angulo = residuoPositivo % 360;

  let posicion = Math.floor(angulo / premio);
  //Correccion visual de la interfaz grafica que marca 2 angulos adelantados por errores en CSS
  posicion = posicion - 2;

  //Si el valor es negativo la posicion es el ultimo indice del array de premios
  if (posicion < 0) posicion += premios.length;

  return premios[posicion];
}

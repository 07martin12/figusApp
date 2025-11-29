// Función auxiliar: asignar imagen especial según equipo
function asignarImagenEspecial(card: HTMLElement, teamId: string) {
  const img = card.querySelector("img") as HTMLImageElement | null;
  if (!img) return;

  const imagenes: Record<string, { src: string; alt: string }> = {
    argentina: { src: "/assets/img/fondos/Argentina/15.jpg", alt: "Maradona" },
    brasil: { src: "/assets/img/fondos/Brasil/15.jpg", alt: "Pele" },
    francia: { src: "/assets/img/fondos/Francia/15.jpg", alt: "Zidane" },
  };

  if (imagenes[teamId]) {
    img.src = imagenes[teamId].src;
    img.alt = imagenes[teamId].alt;
  }
}

// Función auxiliar: actualizar progreso de un equipo
function actualizarProgresoEquipo(team: HTMLElement) {
  const cards = team.querySelectorAll(".card") as NodeListOf<HTMLElement>;
  const bandera = team.querySelector(".bandera") as HTMLElement;
  const progressBar = team.querySelector(".progress-bar") as HTMLElement;
  const progressText = team.querySelector(".progress-text") as HTMLElement;
  const totalCards = cards.length;

  const completadas = Array.from(cards).filter((c) =>
    c.classList.contains("completa")
  ).length;
  const porcentaje = Math.round((completadas / totalCards) * 100);

  // Actualizar barra de progreso
  progressBar.style.width = porcentaje + "%";
  progressText.textContent = `Progreso: ${porcentaje}%`;

  // Cambiar color de la barra según porcentaje
  if (porcentaje <= 33) {
    progressBar.style.background = "#e53935"; // rojo
  } else if (porcentaje <= 66) {
    progressBar.style.background = "#fdd835"; // amarillo
  } else {
    progressBar.style.background = "#43a047"; // verde
  }

  // Mostrar bandera a color si se completa el álbum
  if (completadas === totalCards && !bandera.classList.contains("color")) {
    bandera.classList.add("color");
  }

  // Verificar estado general del álbum
  mostrarMensajeFinal();
}

// Función opcional para desbloquear una figurita desde backend
function desbloquearCardPorId(teamId: string, index1Base: number) {
  const team = document.getElementById(teamId) as HTMLElement;
  if (!team) return;

  const cards = team.querySelectorAll(".card") as NodeListOf<HTMLElement>;
  const card = cards[index1Base - 1] as HTMLElement; 
  if (card && !card.classList.contains("completa")) {
    card.classList.add("completa");

    if (card.classList.contains("especial")) {
      asignarImagenEspecial(card, teamId);
    }

    actualizarProgresoEquipo(team);
  }
}

// Verifica si todos los álbumes están completos y actualiza el mensaje final
function mostrarMensajeFinal() {
  const equipos = document.querySelectorAll(".team") as NodeListOf<HTMLElement>;
  if (!equipos.length) return;

  let todosCompletos = true;

  equipos.forEach((team) => {
    const cards = team.querySelectorAll(".card") as NodeListOf<HTMLElement>;
    const total = cards.length;
    const completas = Array.from(cards).filter((c) =>
      c.classList.contains("completa")
    ).length;

    if (completas < total) {
      todosCompletos = false;
    }
  });

  const incompleto = document.getElementById("mensaje-incompleto");
  const completo = document.getElementById("mensaje-completo");

  if (todosCompletos) {
    incompleto?.classList.add("oculto");
    completo?.classList.remove("oculto");
  } else {
    completo?.classList.add("oculto");
    incompleto?.classList.remove("oculto");
  }
}

// Inicializar progreso por equipo
document.querySelectorAll(".team").forEach((team) => {
  const teamElement = team as HTMLElement; 
  const cards = teamElement.querySelectorAll(
    ".card"
  ) as NodeListOf<HTMLElement>;

  // Marcar figurita como completada al hacer clic
  cards.forEach((card) => {
    const cardElement = card as HTMLElement; 
    cardElement.addEventListener("click", () => {
      if (!cardElement.classList.contains("completa")) {
        cardElement.classList.add("completa");

        if (cardElement.classList.contains("especial")) {
          asignarImagenEspecial(cardElement, teamElement.id);
        }

        actualizarProgresoEquipo(teamElement);
      }
    });
  });

  // Estado inicial
  actualizarProgresoEquipo(teamElement);
});

// Mostrar mensaje final inicial
mostrarMensajeFinal();

// Billetera
const billeteraContenedor = document.getElementById("billetera-contenedor");

if (billeteraContenedor) {
  // Estamos en billetera.html → mostrar figus repetidas
  const billetera: Record<string, { count: number; img: string }> = JSON.parse(
    localStorage.getItem("billetera") || "{}"
  );

  Object.entries(billetera).forEach(([id, data]) => {
    if (data.count > 1) {
      const figu = document.createElement("div");
      figu.className = "figu-repetida";
      figu.dataset.id = id;
      figu.style.backgroundImage = data.img;

      // Contador
      const contador = document.createElement("div");
      contador.className = "contador";
      contador.textContent = `x${data.count}`;
      figu.appendChild(contador);

      // Botones
      const botones = document.createElement("div");
      botones.className = "botones-billetera";

      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn-eliminar";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => {
        if (billetera[id].count > 1) {
          billetera[id].count--;
          localStorage.setItem("billetera", JSON.stringify(billetera));
          contador.textContent = `x${billetera[id].count}`;
        } else {
          delete billetera[id];
          localStorage.setItem("billetera", JSON.stringify(billetera));
          figu.remove();
        }
      });

      const btnIntercambiar = document.createElement("button");
      btnIntercambiar.className = "btn-intercambiar";
      btnIntercambiar.textContent = "Intercambiar";

      botones.appendChild(btnEliminar);
      botones.appendChild(btnIntercambiar);
      figu.appendChild(botones);

      billeteraContenedor.appendChild(figu);
    }
  });
} else {
  // Estamos en index.html → contar clics en figus
  const billetera: Record<string, { count: number; img: string }> = JSON.parse(
    localStorage.getItem("billetera") || "{}"
  );

  document.querySelectorAll(".card").forEach((card) => {
    const cardElement = card as HTMLElement;
    cardElement.addEventListener("click", () => {
      const id = cardElement.dataset.id as string; 
      let img = cardElement.style.backgroundImage;

      if (!img || img === "none") {
        const imgTag = cardElement.querySelector("img") as HTMLImageElement;
        if (imgTag) {
          img = `url("${imgTag.src}")`;
        }
      }

      billetera[id] = billetera[id] || { count: 0, img };
      billetera[id].count++;

      localStorage.setItem("billetera", JSON.stringify(billetera));
    });
  });
}

// Menú hamburguesa
const hamburger = document.querySelector(".hamburger") as HTMLElement;
const navLinks = document.querySelector(".nav-links") as HTMLElement;

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

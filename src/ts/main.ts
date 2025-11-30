const perfilBtn = document.getElementById(
  "perfilBtn"
) as HTMLButtonElement | null;
const ruletaBtn = document.getElementById(
  "ruletaBtn"
) as HTMLButtonElement | null;
const billeteraBtn = document.getElementById(
  "billeteraBtn"
) as HTMLButtonElement | null;
const btnEnviarConsulta = document.getElementById(
  "btnEnviarConsulta"
) as HTMLButtonElement | null;
const mainContent = document.getElementById("mainContent")!;

btnEnviarConsulta?.addEventListener("click", (e) => {
  e.preventDefault();
  const form = btnEnviarConsulta.closest("form") as HTMLFormElement;
  if (!form) return;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const alertDiv = document.createElement("div");
  alertDiv.innerHTML = showSuccessMessage();
  form.prepend(alertDiv);
});

perfilBtn?.addEventListener("click", async () => {
  let role: string | null = null;
  do {
    role =
      prompt("Ingresa tu rol de usuario: 'comun' o 'administrador'")
        ?.trim()
        .toLowerCase() || null;
    if (role !== "comun" && role !== "administrador") {
      alert("Rol incorrecto. Debes ingresar 'comun' o 'administrador'.");
      role = null;
    }
  } while (!role);

  if (role === "comun") {
    await loadSection(
      "../pages/user/user.html",
      "../src/css/user.css",
      "data-user-css",
      "../js/user.js",
      "data-user-js"
    );
  } else if (role === "administrador") {
    await loadSection(
      "../pages/abm/abm.html",
      "../src/css/abm.css",
      "data-abm-css",
      "../js/abm.js",
      "data-abm-js"
    );
  }
});

ruletaBtn?.addEventListener("click", async () => {
  await loadSection(
    "../pages/ruleta/ruleta.html",
    "../src/css/ruleta.css",
    "data-ruleta-css",
    "../js/ruleta.js",
    "data-ruleta-js"
  );
});

billeteraBtn?.addEventListener("click", async () => {
  await loadSection(
    "../pages/billetera/billetera.html",
    "../src/css/album.css",
    "data-billetera-css",
    "../js/album.js",
    "data-billetera-js"
  );
});

async function loadSection(
  htmlPath: string,
  cssPath: string,
  cssDataAttr: string,
  jsPath: string,
  jsDataAttr: string
) {
  try {
    const response = await fetch(htmlPath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    mainContent.innerHTML = html;
    await loadCss(cssPath, cssDataAttr);
    await loadJs(jsPath, jsDataAttr);
  } catch (error) {
    mainContent.innerHTML = showErrorMessage(error as any);
  }
}

export function loadCss(href: string, dataAttr: string): Promise<boolean> {
  return new Promise((resolve) => {
    const dynamicLinks = document.querySelectorAll(
      "link[data-ruleta-css], link[data-abm-css], link[data-billetera-css], link[data-user-css]"
    );
    dynamicLinks.forEach((link) => link.remove());
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute(dataAttr, "true");
    link.onload = () => resolve(true);
    link.onerror = () => resolve(false);
    document.head.appendChild(link);
  });
}

export function loadJs(src: string, dataAttr: string): Promise<boolean> {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[${dataAttr}]`);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.src = src;
    script.type = "module";
    script.setAttribute(dataAttr, "true");
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function showErrorMessage(message: string): string {
  return `
    <div class="alert alert-danger mt-4" role="alert">
      <h4 class="alert-heading">Error</h4>
      <p>Ocurrió un problema al procesar la solicitud.</p>
      <hr>
      <p class="mb-0"><strong>Detalle:</strong> ${message}</p>
    </div>
  `;
}

export function showSuccessMessage(): string {
  return `
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
      ¡Gracias por tu consulta! Nos pondremos en contacto pronto.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

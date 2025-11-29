const perfilBtn = document.getElementById("perfilBtn");
const ruletaBtn = document.getElementById("ruletaBtn");
const billeteraBtn = document.getElementById("billeteraBtn");
const mainContent = document.getElementById("mainContent");
const btnEnviarConsulta = document.getElementById("btnEnviarConsulta");
btnEnviarConsulta?.addEventListener("click", (e) => {
    e.preventDefault();
    const form = btnEnviarConsulta.closest("form");
    if (!form)
        return;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = showSuccessMessage();
    form.prepend(alertDiv);
});
perfilBtn?.addEventListener("click", async () => {
    try {
        const response = await fetch("../pages/abm/abm.html");
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        mainContent.innerHTML = html;
        await loadCss("../src/css/abm.css", "data-abm-css");
        await loadJs("../js/abm.js", "data-abm-js");
    }
    catch (error) {
        mainContent.innerHTML = showErrorMessage(error);
    }
});
ruletaBtn?.addEventListener("click", async () => {
    try {
        const response = await fetch("../pages/ruleta/ruleta.html");
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        mainContent.innerHTML = html;
        await loadCss("../src/css/ruleta.css", "data-ruleta-css");
        await loadJs("../js/ruleta.js", "data-ruleta-js");
    }
    catch (error) {
        mainContent.innerHTML = showErrorMessage(error);
    }
});
billeteraBtn?.addEventListener("click", async () => {
    try {
        const response = await fetch("../pages/billetera/billetera.html");
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        mainContent.innerHTML = html;
        await loadCss("../src/css/album.css", "data-billetera-css");
        await loadJs("../js/album.js", "data-billetera-js");
    }
    catch (error) {
        mainContent.innerHTML = showErrorMessage(error);
    }
});
function loadCss(href, dataAttr) {
    return new Promise((resolve) => {
        const dynamicLinks = document.querySelectorAll("link[data-ruleta-css], link[data-abm-css], link[data-billetera-css]");
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
function loadJs(src, dataAttr) {
    return new Promise((resolve) => {
        const existing = document.querySelector(`script[${dataAttr}]`);
        if (existing)
            existing.remove();
        const script = document.createElement("script");
        script.src = src;
        script.type = "module";
        script.setAttribute(dataAttr, "true");
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}
export function showErrorMessage(message) {
    return `
    <div class="alert alert-danger mt-4" role="alert">
      <h4 class="alert-heading">Error</h4>
      <p>Ocurrió un problema al procesar la solicitud.</p>
      <hr>
      <p class="mb-0"><strong>Detalle:</strong> ${message}</p>
    </div>
  `;
}
export function showSuccessMessage() {
    return `
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
      ¡Gracias por tu consulta! Nos pondremos en contacto pronto.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

const perfilBtn = document.getElementById("perfilBtn");
const ruletaBtn = document.getElementById("ruletaBtn");
const billeteraBtn = document.getElementById("billeteraBtn");
const mainContent = document.getElementById("mainContent");
perfilBtn?.addEventListener("click", async () => {
    try {
        const response = await fetch("../pages/abm/abm.html");
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        mainContent.innerHTML = html;
        const cssOk = await loadCss("../src/css/abm.css", "data-abm-css");
        const jsOk = await loadJs("../js/abm.js", "data-abm-js");
        if (!cssOk || !jsOk) {
            console.log("Hubo errores cargando archivos CSS o JS.");
        }
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
        const cssOk = await loadCss("../src/css/ruleta.css", "data-ruleta-css");
        const jsOk = await loadJs("../js/ruleta.js", "data-ruleta-js");
        if (!cssOk || !jsOk) {
            console.log("Hubo errores cargando archivos CSS o JS de la ruleta.");
        }
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
        const cssOk = await loadCss("../src/css/billetera.css", "data-billetera-css");
        const jsOk = await loadJs("../js/billetera.js", "data-billetera-js");
        if (!cssOk || !jsOk) {
            console.log("Hubo errores cargando archivos CSS o JS de la billetera.");
        }
    }
    catch (error) {
        mainContent.innerHTML = showErrorMessage(error);
    }
});
function loadCss(href, dataAttr) {
    return new Promise((resolve) => {
        const existing = document.querySelector(`link[${dataAttr}]`);
        if (existing)
            existing.remove();
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

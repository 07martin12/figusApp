import { showErrorMessage, loadCss, loadJs } from "./main.js";

const mainContent = document.querySelector<HTMLDivElement>(".flex-grow-1.p-4");

const loadConfiguracion = async () => {
  if (!mainContent) return;
  try {
    const res = await fetch("../../pages/user/section/configuracion.html");
    if (!res.ok) throw new Error("No se pudo cargar configuracion.html");
    mainContent.innerHTML = await res.text();
  } catch {
    mainContent.innerHTML =
      '<p class="text-danger">Error al cargar configuracion.html</p>';
  }
};

loadConfiguracion();

const albumBtn = document.getElementById(
  "btn-album"
) as HTMLButtonElement | null;
const main = document.querySelector("main") as HTMLElement;

albumBtn?.addEventListener("click", async () => {
  try {
    const response = await fetch("../pages/album/album.html");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    main.innerHTML = html;

    await loadCss("../src/css/album.css", "data-album-css");
    await loadJs("../js/album.js", "data-album-js");
  } catch (error) {
    main.innerHTML = showErrorMessage(error as any);
  }
});

import { showErrorMessage, loadCss, loadJs } from "./main.js";

const mainContent = document.querySelector<HTMLDivElement>(".flex-grow-1.p-4");

const USER_NAME = "user123";
const USER_EMAIL = "user123@gmail.com";
const USER_PHONE = "+5492983548796";
const USER_COUNTRY = "Argentina";
const USER_DOB = "2001-06-15";

const loadConfiguracion = async () => {
  if (!mainContent) return;
  try {
    const res = await fetch("../../pages/user/section/configuracion.html");
    if (!res.ok) throw new Error("No se pudo cargar configuracion.html");
    mainContent.innerHTML = await res.text();

    const inputName = document.getElementById("inputName") as HTMLInputElement;
    const inputEmail = document.getElementById(
      "inputEmail"
    ) as HTMLInputElement;
    const inputPhone = document.getElementById(
      "inputPhone"
    ) as HTMLInputElement;
    const inputCountry = document.getElementById(
      "inputCountry"
    ) as HTMLInputElement;
    const inputDob = document.getElementById("inputDob") as HTMLInputElement;

    inputName.value = USER_NAME;
    inputEmail.value = USER_EMAIL;
    inputPhone.value = USER_PHONE;
    inputCountry.value = USER_COUNTRY;
    inputDob.value = USER_DOB;

    function setupUpdateButton(
      inputId: string,
      buttonId: string,
      statusId: string
    ) {
      const input = document.getElementById(inputId) as HTMLInputElement;
      const button = document.getElementById(buttonId) as HTMLButtonElement;
      const status = document.getElementById(statusId) as HTMLDivElement;
      if (!input || !button || !status) return;
      button.addEventListener("click", () => {
        const newValue = input.value;
        status.textContent = `Valor actualizado a: ${newValue}`;
        status.classList.add("text-success");
        setTimeout(() => {
          status.textContent = "";
          status.classList.remove("text-success");
        }, 3000);
      });
    }

    setupUpdateButton("inputName", "btn-update-name", "status-name");
    setupUpdateButton("inputEmail", "btn-update-email", "status-email");
    setupUpdateButton("inputPhone", "btn-update-phone", "status-phone");
    setupUpdateButton("inputCountry", "btn-update-country", "status-country");
    setupUpdateButton("inputDob", "btn-update-dob", "status-dob");

    const btnUpdatePass = document.getElementById(
      "btn-update-pass"
    ) as HTMLButtonElement;
    const inputPass1 = document.getElementById(
      "inputPass1"
    ) as HTMLInputElement;
    const inputPass2 = document.getElementById(
      "inputPass2"
    ) as HTMLInputElement;
    const statusPass = document.getElementById("status-pass") as HTMLDivElement;

    btnUpdatePass?.addEventListener("click", () => {
      if (!inputPass1.value || !inputPass2.value) {
        statusPass.textContent = "Ambos campos son obligatorios";
        statusPass.classList.add("text-danger");
        return;
      }
      if (inputPass1.value !== inputPass2.value) {
        statusPass.textContent = "Las contraseñas no coinciden";
        statusPass.classList.add("text-danger");
        return;
      }
      statusPass.textContent = "Contraseña actualizada correctamente";
      statusPass.classList.remove("text-danger");
      statusPass.classList.add("text-success");
      inputPass1.value = "";
      inputPass2.value = "";
      setTimeout(() => {
        statusPass.textContent = "";
        statusPass.classList.remove("text-success");
      }, 3000);
    });

    const btnDeleteAccount = document.getElementById(
      "btn-delete-account"
    ) as HTMLButtonElement;
    const selectDeleteReason = document.getElementById(
      "select-delete-reason"
    ) as HTMLSelectElement;
    const statusDelete = document.getElementById(
      "status-delete"
    ) as HTMLDivElement;

    btnDeleteAccount?.addEventListener("click", () => {
      if (!selectDeleteReason.value) {
        statusDelete.textContent = "Selecciona un motivo de eliminación";
        statusDelete.classList.add("text-danger");
        return;
      }
      alert(`Cuenta eliminada por motivo: ${selectDeleteReason.value}`);
      window.location.href = "index.html";
    });
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

const sidebar = document.querySelector(".sidebar-width") as HTMLElement | null;
const toggleBtn = document.getElementById(
  "toggleSidebar"
) as HTMLButtonElement | null;

if (toggleBtn && sidebar) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
  });
}

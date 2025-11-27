import { showErrorMessage } from "./main.js";

const clases_figurita = ["Comun", "Especial", "Legendaria"];
const clases_sobre = ["Gris", "Dorado", "Premium"];
const clases_album = ["Mundial", "Continental", "Nacional", "Local"];
const paises = [
  "Argentina",
  "Brasil",
  "Uruguay",
  "Chile",
  "Paraguay",
  "Bolivia",
  "Peru",
  "Ecuador",
  "Colombia",
  "Venezuela",
  "Mexico",
  "España",
  "Francia",
  "Alemania",
  "Italia",
  "Portugal",
  "Inglaterra",
  "Paises Bajos",
  "Belgica",
  "Croacia",
];

const rutas: { [key: string]: string } = {
  "btn-listar-figuritas": "../../pages/abm/section/listado/listarFigurita.html",
  "btn-listar-sobres": "../../pages/abm/section/listado/listarSobre.html",
  "btn-listar-albumes": "../../pages/abm/section/listado/listarAlbum.html",
  "btn-listar-usuarios": "../../pages/abm/section/listado/listarUsuario.html",

  "btn-agregar-figuritas": "../../pages/abm/section/alta/agregarFigurita.html",
  "btn-agregar-sobres": "../../pages/abm/section/alta/agregarSobre.html",
  "btn-agregar-albumes": "../../pages/abm/section/alta/agregarAlbum.html",
  "btn-agregar-usuarios": "../../pages/abm/section/alta/agregarUsuario.html",

  "btn-modificar-figuritas":
    "../../pages/abm/section/modificacion/modificarFigurita.html",
  "btn-modificar-sobres":
    "../../pages/abm/section/modificacion/modificarSobre.html",
  "btn-modificar-albumes":
    "../../pages/abm/section/modificacion/modificarAlbum.html",
  "btn-modificar-usuarios":
    "../../pages/abm/section/modificacion/modificarUsuario.html",

  "btn-eliminar-figuritas":
    "../../pages/abm/section/baja/eliminarFigurita.html",
  "btn-eliminar-sobres": "../../pages/abm/section/baja/eliminarSobre.html",
  "btn-eliminar-albumes": "../../pages/abm/section/baja/eliminarAlbum.html",
  "btn-eliminar-usuarios": "../../pages/abm/section/baja/eliminarUsuario.html",
};

Object.keys(rutas).forEach((id) => {
  const btn = document.getElementById(id) as HTMLButtonElement | null;

  if (!btn) {
    console.log(`No se encontró un botón con id '${id}' dentro del DOM.`);
    return;
  }

  btn.addEventListener("click", async () => {
    const ruta = rutas[id];
    const mainPanel = document.querySelector(".flex-grow-1")!;

    try {
      const response = await fetch(ruta);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      mainPanel.innerHTML = html;

      cargarSelects();

      const forms = document.querySelectorAll<HTMLFormElement>("form");
      desactivarForms(forms);
    } catch (error) {
      console.log(`Error cargando la ruta '${ruta}':`, error);
      mainPanel.innerHTML = showErrorMessage(error as any);
    }
  });
});

const cargarSelects = (): void => {
  cargarGrupoSelect(".cls_sobre", clases_sobre);
  cargarGrupoSelect(".cls_album", clases_album);
  cargarGrupoSelect(".cls_figurita", clases_figurita);
  cargarGrupoSelect(".cls_pais", paises);
};

const cargarGrupoSelect = (selector: string, valores: string[]): void => {
  const selects = document.querySelectorAll<HTMLSelectElement>(selector);
  selects.forEach((s) => cargarOption(s, valores));
};

const cargarOption = (select: HTMLSelectElement, array: string[]): void => {
  select.innerHTML = "";
  array.forEach((v) => {
    const option = document.createElement("option");
    option.value = v;
    option.textContent = v;
    select.appendChild(option);
  });
};

const desactivarForms = (forms: NodeListOf<HTMLFormElement>): void => {
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      procesarFormulario(form);
    });
  });
};

const procesarFormulario = (form: HTMLFormElement): void => {
  alert(`Formulario con name: ${form.name} ha sido enviado.`);
};

/*document.addEventListener("DOMContentLoaded", async () => {
  await cargarSecciones();
  cargarSelects();

  const hamburgerBtn =
    document.querySelector<HTMLButtonElement>(".hamburger_btn");
  const menuPrincipal = document.querySelector<HTMLElement>("#menu_principal");

  

  botonesMenu.forEach((boton, i) => {
    boton.addEventListener("click", () => {
      activarBoton(boton, botonesMenu);
      toggleSubmenu(submenus[i]);
    });
  })

  // Inicializar eventos de formularios
 
});

// Procesa un formulario según su name, obteniendo el archivo.json asociado (map) para su posterior procesamiento.
const procesarFormulario = async (form: HTMLFormElement) => {
  const rutas = new Map<string, string>([
    ["listar_figurita_por_id", "figuritas.json"],
    ["listar_figurita_por_sobre", "figuritas.json"],
    ["listar_sobre_por_id", "sobres.json"],
    ["listar_sobre_por_album", "sobres.json"],
    ["listar_album_por_id", "albums.json"],
    ["listar_usuario_por_id", "usuarios.json"],

    ["agregar_figurita", "figuritas.json"],
    ["agregar_sobre", "sobres.json"],
    ["agregar_album", "albums.json"],
    ["agregar_usuario", "usuarios.json"],

    ["modificar_figurita", "figuritas.json"],
    ["modificar_sobre", "sobres.json"],
    ["modificar_album", "albums.json"],
    ["modificar_usuario", "usuarios.json"],

    ["eliminar_figurita", "figuritas.json"],
    ["eliminar_sobre", "sobres.json"],
    ["eliminar_album", "albums.json"],
    ["eliminar_usuario", "usuarios.json"],
  ]);

  const formData = new FormData(form);

  const archivo = rutas.get(form.name);
  if (!archivo) return;

  const data = await getJson(archivo);
  if (!data || !Array.isArray(data)) return;

  switch (true) {
    case form.name.startsWith("listar_"):
      procesarListado(form.name, formData, data);
      break;

    case form.name.startsWith("agregar_"):
      procesarAlta(form.name, formData, data);
      break;

    case form.name.startsWith("modificar_"):
      procesarModificacion(form.name, formData, data);
      break;

    case form.name.startsWith("eliminar_"):
      procesarEliminacion(form.name, formData, data);
      break;
  }
};

/*
 * Procesa una operación de listar, filtrando los datos según los
 * campos enviados en formDate y mostrando los resultados obtenidos en una tabla.
 
const procesarListado = (
  name: string,
  formData: FormData,
  data: any[]
): void => {
  const contenedor = document.getElementById("respuesta_" + name);
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const tipo = name.replace("listar_", "").replace(/_/g, " ");
  const claves = Array.from(formData.keys());

  if (claves.length === 0) {
    contenedor.appendChild(errorDeFormulario("listar"));
    return;
  }

  const clavesFiltro = claves.filter(
    (k) => k.startsWith("id") || k.toLowerCase().startsWith("limite")
  );

  const datosFiltrados = filtrarDatos(formData, data);

  if (datosFiltrados.length === 0) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.textContent = `No se encontraron resultados para los datos ingresados.`;
    contenedor.appendChild(p);
    return;
  }

  contenedor.appendChild(crearTabla(tipo, datosFiltrados, clavesFiltro));
};

// Procesa una operación de baja, mostrando los elementos que fueron eliminados.
const procesarEliminacion = (
  id: string,
  formData: FormData,
  data: any
): void => {
  const contenedor = document.getElementById("respuesta_" + id);
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const claves = Array.from(formData.keys());

  if (claves.length === 0) {
    contenedor.appendChild(errorDeFormulario("eliminar"));
    return;
  }

  const clavesFiltro = claves.filter(
    (k) => k.startsWith("id") || k.toLowerCase().startsWith("limite")
  );

  const datosFiltrados = filtrarDatos(formData, data);

  if (datosFiltrados.length === 0) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.textContent = `No se encontraron resultados para los datos ingresados.`;
    contenedor.appendChild(p);
    return;
  }

  const tabla = crearTabla("eliminar", datosFiltrados, clavesFiltro);
  contenedor.appendChild(tabla);

  const mensaje = document.createElement("p");
  mensaje.classList.add("exito");
  mensaje.textContent = "Los elementos fueron eliminados correctamente.";
  contenedor.appendChild(mensaje);
};

// Procesa una operación de alta, validando que no exista un registro repetido,
const procesarAlta = (id: string, formData: FormData, data: any[]): void => {
  const contenedor = document.getElementById("respuesta_" + id);
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const claves = Array.from(formData.keys());
  if (claves.length === 0) {
    contenedor.appendChild(errorDeFormulario("alta"));
    return;
  }

  const existe = registroExistente(formData, data);
  if (existe) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.textContent = "El elemento ya existe y no se puede agregar.";
    contenedor.appendChild(p);
    return;
  }

  const nuevoObjeto: any = {};
  claves.forEach((key) => {
    nuevoObjeto[key] = formData.get(key);
  });

  contenedor.appendChild(crearTabla("alta", [nuevoObjeto], []));

  const mensaje = document.createElement("p");
  mensaje.classList.add("exito");
  mensaje.textContent = "El elemento se agregó correctamente.";
  contenedor.appendChild(mensaje);
};

// Procesa una operación de modificacion, mostrando los datos originales y los nuevos en dos tablas distintas.
const procesarModificacion = (
  id: string,
  formData: FormData,
  data: any[]
): void => {
  const contenedor = document.getElementById("respuesta_" + id);
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const claves = Array.from(formData.keys());
  if (claves.length === 0) {
    contenedor.appendChild(errorDeFormulario("modificar"));
    return;
  }

  const datosOriginales = filtrarDatos(formData, data);

  if (datosOriginales.length === 0) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.textContent = "No se encontró el elemento indicado para su modificación.";
    contenedor.appendChild(p);
    return;
  }

  const nuevoObjeto: any = {};
  claves.forEach((key) => {
    nuevoObjeto[key] = formData.get(key);
  });

  const clavesFiltro = claves.filter(
    (k) => k.startsWith("id") || k.toLowerCase().startsWith("limite")
  );

  const tituloOriginal = document.createElement("h3");
  tituloOriginal.textContent = "Datos originales";
  contenedor.appendChild(tituloOriginal);

  contenedor.appendChild(
    crearTabla("modificar", datosOriginales, clavesFiltro)
  );

  const tituloNuevo = document.createElement("h3");
  tituloNuevo.textContent = "Datos nuevos";
  contenedor.appendChild(tituloNuevo);

  contenedor.appendChild(crearTabla("modificar", [nuevoObjeto], []));

  const mensaje = document.createElement("p");
  mensaje.classList.add("exito");
  mensaje.textContent = "El elemento fue modificado correctamente.";
  contenedor.appendChild(mensaje);
};

// Filtra datos del JSON según el campo ID enviado en el formDate y un límite opcional.
const filtrarDatos = (formData: FormData, data: any[]): any[] => {
  const campoID = Array.from(formData.keys()).find((key) =>
    key.startsWith("id")
  );

  if (!campoID) return [];

  const valorID = Number(formData.get(campoID));
  if (isNaN(valorID)) return [];

  const campoLimite = Array.from(formData.keys()).find((key) =>
    key.toLowerCase().startsWith("limite")
  );

  const limite = campoLimite ? Number(formData.get(campoLimite)) : 1;

  const resultados = data.filter((item) => Number(item[campoID]) === valorID);
  return resultados.slice(0, limite);
};

// Determina si un registro ya existe comparando campos que deben tener valores unicos y comienzan con "nombre".
const registroExistente = (formData: FormData, data: any[]): boolean => {
  const campoNombre = Array.from(formData.keys()).find((key) =>
    key.startsWith("nombre")
  );

  if (!campoNombre) return false;

  const valorNombre = formData.get(campoNombre);
  if (!valorNombre) return false;

  const encontrado = data.some(
    (item) =>
      String(item[campoNombre]).toLowerCase() ===
      String(valorNombre).toLowerCase()
  );

  return encontrado;
};

// Crea un mensaje de error para indicar que no se seleccionó ningún campo.
const errorDeFormulario = (accion: string): HTMLElement => {
  const p = document.createElement("p");
  p.classList.add("error");
  p.textContent = `No se seleccionó ningún campo para ${accion}.`;
  return p;
};

// Crea una tabla HTML basada en una lista de objetos JSON con sus claves y valores asociados.
const crearTabla = (
  titulo: string,
  data: any[],
  clavesFiltro: string[] = []
): HTMLTableElement => {
  const tabla = document.createElement("table");
  const caption = document.createElement("caption");

  caption.textContent = titulo;
  tabla.appendChild(caption);

  if (!data || data.length === 0) return tabla;

  let columnas = Object.keys(data[0]);
  columnas = columnas.filter((c) => !clavesFiltro.includes(c));

  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  columnas.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach((item) => {
    const tr = document.createElement("tr");

    columnas.forEach((col) => {
      const td = document.createElement("td");
      td.textContent = item[col] ?? "—";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  tabla.appendChild(tbody);

  return tabla;
};

// Carga un archivo JSON desde la carpeta /data y lo retorna como una promesa.
const getJson = async (nombreArchivo: string): Promise<any> => {
  try {
    const response = await fetch(`../../data/${nombreArchivo}`);
    if (!response.ok) throw new Error(`No se pudo cargar ${nombreArchivo}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
*/

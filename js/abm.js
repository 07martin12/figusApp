import { showErrorMessage, loadCss, loadJs } from "./main.js";
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
const rutas = {
    "btn-listar-figuritas": "../../pages/abm/section/listado/listarFigurita.html",
    "btn-listar-sobres": "../../pages/abm/section/listado/listarSobre.html",
    "btn-listar-albumes": "../../pages/abm/section/listado/listarAlbum.html",
    "btn-listar-usuarios": "../../pages/abm/section/listado/listarUsuario.html",
    "btn-agregar-figuritas": "../../pages/abm/section/alta/agregarFigurita.html",
    "btn-agregar-sobres": "../../pages/abm/section/alta/agregarSobre.html",
    "btn-agregar-albumes": "../../pages/abm/section/alta/agregarAlbum.html",
    "btn-agregar-usuarios": "../../pages/abm/section/alta/agregarUsuario.html",
    "btn-modificar-figuritas": "../../pages/abm/section/modificacion/modificarFigurita.html",
    "btn-modificar-sobres": "../../pages/abm/section/modificacion/modificarSobre.html",
    "btn-modificar-albumes": "../../pages/abm/section/modificacion/modificarAlbum.html",
    "btn-modificar-usuarios": "../../pages/abm/section/modificacion/modificarUsuario.html",
    "btn-eliminar-figuritas": "../../pages/abm/section/baja/eliminarFigurita.html",
    "btn-eliminar-sobres": "../../pages/abm/section/baja/eliminarSobre.html",
    "btn-eliminar-albumes": "../../pages/abm/section/baja/eliminarAlbum.html",
    "btn-eliminar-usuarios": "../../pages/abm/section/baja/eliminarUsuario.html",
};
const jsonRutas = new Map([
    ["listar_figurita_por_id", "figuritas.json"],
    ["listar_figurita_por_sobre", "figuritas.json"],
    ["listar_sobre_por_id", "sobres.json"],
    ["listar_sobre_por_album", "sobres.json"],
    ["listar_album_por_id", "albums.json"],
    ["listar_album_por_limite", "albums.json"],
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
/**
 * Asocia la carga parcial de páginas según botones definidos en el mapa rutas.
 * Carga HTML externo y luego inicializa selects, sliders y formularios.
 */
Object.keys(rutas).forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) {
        console.log(`No se encontró un botón con id '${id}' dentro del DOM.`);
        return;
    }
    btn.addEventListener("click", async () => {
        const ruta = rutas[id];
        const mainPanel = document.querySelector(".flex-grow-1");
        if (!mainPanel) {
            console.error("No se encontró el contenedor principal (.flex-grow-1).");
            return;
        }
        btn.disabled = true;
        try {
            const response = await fetch(ruta);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const html = await response.text();
            mainPanel.innerHTML = html;
            cargarSelects();
            mostrarValoresRange();
            const forms = document.querySelectorAll("form");
            desactivarForms(forms);
        }
        catch (error) {
            console.log(`Error cargando la ruta '${ruta}':`, error);
            mainPanel.innerHTML = showErrorMessage(error);
        }
        finally {
            btn.disabled = false;
        }
    });
});
const cargarSelects = () => {
    cargarGrupoSelect(".cls_sobre", clases_sobre);
    cargarGrupoSelect(".cls_album", clases_album);
    cargarGrupoSelect(".cls_figurita", clases_figurita);
    cargarGrupoSelect(".cls_pais", paises);
};
const cargarGrupoSelect = (selector, valores) => {
    const selects = document.querySelectorAll(selector);
    selects.forEach((s) => cargarOption(s, valores));
};
const cargarOption = (select, array) => {
    select.innerHTML = "";
    array.forEach((v) => {
        const option = document.createElement("option");
        option.value = v;
        option.textContent = v;
        select.appendChild(option);
    });
};
//Muestra dinámicamente el valor de los inputs type range.
const mostrarValoresRange = () => {
    const ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach((range) => {
        const container = range.parentElement;
        if (!container)
            return;
        let span = container.querySelector(".range-value");
        if (!span) {
            span = document.createElement("span");
            span.classList.add("range-value");
            span.style.marginLeft = "8px";
            container.insertBefore(span, range);
        }
        span.textContent = range.value;
        range.addEventListener("input", () => {
            span.textContent = range.value;
        });
    });
};
//Desactiva el comportamiento por defecto de los formularios y vincula procesarFormulario() al evento de click.
const desactivarForms = (forms) => {
    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const frm = e.currentTarget;
            procesarFormulario(frm);
        });
    });
};
/*
 * Procesa el envío de un formulario aplicando la acción correspondiente
 * según su nombre (listar, agregar, modificar, eliminar).
 */
const procesarFormulario = async (form) => {
    const formData = new FormData(form);
    const archivo = jsonRutas.get(form.name);
    if (!archivo)
        return;
    const data = await getJson(archivo);
    if (!data || !Array.isArray(data))
        return;
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
const albumBtn = document.getElementById("btn-album");
const mainContent = document.getElementById("mainContent");
//Maneja el evento del click de la seccion album
albumBtn?.addEventListener("click", async () => {
    if (!mainContent) {
        console.error("No se encontró mainContent.");
        return;
    }
    albumBtn.disabled = true;
    try {
        const response = await fetch("../pages/album/album.html");
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        mainContent.innerHTML = html;
        await loadCss("../src/css/album.css", "data-album-css");
        await loadJs("../js/album.js", "data-album-js");
    }
    catch (error) {
        mainContent.innerHTML = showErrorMessage(error);
    }
    finally {
        albumBtn.disabled = false;
    }
});
const sidebar = document.querySelector(".sidebar-width");
const toggleBtn = document.getElementById("toggleSidebar");
//Maneja el despliege del menu lateral
toggleBtn?.addEventListener("click", () => {
    sidebar?.classList.toggle("sidebar-open");
});
const btnLogout = document.querySelector(".btn-danger");
//Maneja el cierre se session del usuario
btnLogout?.addEventListener("click", () => {
    alert("Sesión finalizada. ¡Hasta pronto!");
    window.location.href = "index.html";
});
//Procesa una operación de listado y genera la tabla de resultados.
const procesarListado = (name, formData, data) => {
    const contenedor = document.getElementById("respuesta_" + name);
    if (!contenedor)
        return;
    contenedor.innerHTML = "";
    const tipo = name.replace("listar_", "").replace(/_/g, " ");
    const claves = Array.from(formData.keys());
    if (claves.length === 0) {
        contenedor.appendChild(errorDeFormulario("listar"));
        return;
    }
    const clavesFiltro = claves.filter((k) => k.startsWith("id") || k.toLowerCase().startsWith("limite"));
    const datosFiltrados = filtrarDatos(formData, data);
    if (datosFiltrados.length === 0) {
        const p = document.createElement("div");
        p.className = "alert alert-warning mt-2";
        p.textContent = "No se encontraron resultados para los datos ingresados.";
        contenedor.appendChild(p);
        return;
    }
    const tablaConTitulo = crearTabla(tipo, datosFiltrados, clavesFiltro);
    contenedor.appendChild(tablaConTitulo);
};
//Procesa una operación de baja mostrando los elementos eliminados
const procesarEliminacion = (id, formData, data) => {
    const contenedor = document.getElementById("respuesta_" + id);
    if (!contenedor)
        return;
    contenedor.innerHTML = "";
    const claves = Array.from(formData.keys());
    if (claves.length === 0) {
        contenedor.appendChild(errorDeFormulario("eliminar"));
        return;
    }
    const clavesFiltro = claves.filter((k) => k.startsWith("id") || k.toLowerCase().startsWith("limite"));
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
//Procesa una operación de alta validando duplicados y mostrando el elemento agregado.
const procesarAlta = (id, formData, data) => {
    const contenedor = document.getElementById("respuesta_" + id);
    if (!contenedor)
        return;
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
    const nuevoObjeto = {};
    claves.forEach((key) => {
        nuevoObjeto[key] = formData.get(key);
    });
    contenedor.appendChild(crearTabla("alta", [nuevoObjeto], []));
    const mensaje = document.createElement("p");
    mensaje.classList.add("exito");
    mensaje.textContent = "El elemento se agregó correctamente.";
    contenedor.appendChild(mensaje);
};
//Procesa una operación de modificación mostrando datos originales y modificados.
const procesarModificacion = (id, formData, data) => {
    const contenedor = document.getElementById("respuesta_" + id);
    if (!contenedor)
        return;
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
    const nuevoObjeto = {};
    claves.forEach((key) => {
        nuevoObjeto[key] = formData.get(key);
    });
    const clavesFiltro = claves.filter((k) => k.startsWith("id") || k.toLowerCase().startsWith("limite"));
    const tituloOriginal = document.createElement("h3");
    tituloOriginal.textContent = "Datos originales";
    contenedor.appendChild(tituloOriginal);
    contenedor.appendChild(crearTabla("modificar", datosOriginales, clavesFiltro));
    const tituloNuevo = document.createElement("h3");
    tituloNuevo.textContent = "Datos nuevos";
    contenedor.appendChild(tituloNuevo);
    contenedor.appendChild(crearTabla("modificar", [nuevoObjeto], []));
    const mensaje = document.createElement("p");
    mensaje.classList.add("exito");
    mensaje.textContent = "El elemento fue modificado correctamente.";
    contenedor.appendChild(mensaje);
};
//Filtra datos por ID y límite opcional obtenido desde el formulario.
const filtrarDatos = (formData, data) => {
    const campoID = Array.from(formData.keys()).find((key) => key.toLowerCase() === "id");
    const valorID = campoID ? Number(formData.get(campoID)) : null;
    const campoLimite = Array.from(formData.keys()).find((key) => key.toLowerCase().startsWith("limite"));
    const limite = campoLimite ? Number(formData.get(campoLimite)) : data.length;
    let resultados = data;
    if (valorID !== null && !isNaN(valorID)) {
        resultados = resultados.filter((item) => Number(item[campoID]) === valorID);
    }
    return resultados.slice(0, limite);
};
//Determina si ya existe un registro con un campo único que empiece con "nombre".
const registroExistente = (formData, data) => {
    const campoNombre = Array.from(formData.keys()).find((key) => key.startsWith("nombre"));
    if (!campoNombre)
        return false;
    const valorNombre = formData.get(campoNombre);
    if (!valorNombre)
        return false;
    const encontrado = data.some((item) => String(item[campoNombre]).toLowerCase() ===
        String(valorNombre).toLowerCase());
    return encontrado;
};
//Muestra un mensaje de error formateado con Bootstrap.
const errorDeFormulario = (accion) => {
    const div = document.createElement("div");
    div.className = "alert alert-danger mt-2";
    div.textContent = `No se seleccionó ningún campo para ${accion}.`;
    return div;
};
//Crea una tabla HTML dinamicamente con los datos proporcionados.
const crearTabla = (titulo, data, clavesFiltro = []) => {
    const wrapper = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = titulo;
    h3.className = "mb-3 text-center text-capitalize";
    wrapper.appendChild(h3);
    const responsiveDiv = document.createElement("div");
    responsiveDiv.className = "table-responsive";
    const tabla = document.createElement("table");
    tabla.className =
        "table table-striped table-bordered text-center align-middle w-100";
    // ⬆ w-100 asegura responsividad
    // ❌ Eliminado: rompía el responsive
    // tabla.style.width = "max-content";
    // tabla.style.minWidth = "600px";
    if (!data || data.length === 0) {
        responsiveDiv.appendChild(tabla);
        wrapper.appendChild(responsiveDiv);
        return wrapper;
    }
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
            if (col.toLowerCase() === "imagen") {
                const img = document.createElement("img");
                img.src = item[col];
                img.alt = "imagen";
                img.style.maxWidth = "80px";
                img.style.height = "auto";
                img.style.border = "1px solid black";
                td.appendChild(img);
            }
            else {
                td.textContent = item[col] ?? "—";
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    responsiveDiv.appendChild(tabla);
    wrapper.appendChild(responsiveDiv);
    return wrapper;
};
//Obtiene la información de un archivo.json y retorna su contenido en un objeto Promise
const getJson = async (nombreArchivo) => {
    try {
        const response = await fetch(`../../src/data/${nombreArchivo}`);
        if (!response.ok)
            throw new Error(`No se pudo cargar ${nombreArchivo}`);
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return null;
    }
};

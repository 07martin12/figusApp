# Ruleta Dinámica de Premios

## Descripción general

La Ruleta de Premios permite a los usuarios obtener recompensas aleatorias mediante distintos modos de giro.
El sistema está diseñado para ofrecer una experiencia dinámica, visual y clara, con controles accesibles y un flujo perfectamente gestionado.

La ruleta incluye:

Animación fluida al girar.

Sectores con premios variados.

Botones de giro múltiple y automático.

Lógica que controla los giros disponibles del usuario.

Popup visual con el premio obtenido.

Interfaz principal

La vista está compuesta por:

Ruleta central animada

Fondo circular

Base decorativa

Triángulo indicador

Círculo de premios giratorio con 8 sectores

Botón principal “Girar (X)”
Muestra la cantidad de giros disponibles y realiza un giro único.

Botones laterales de giros múltiples:

5 giros

10 giros

15 giros

Botón “Automático”
Inicia giros consecutivos hasta agotar los giros disponibles.

Popup de premio obtenido
Muestra únicamente el icono del premio.

Enlace “¿Te quedaste sin giros?”
Permite al usuario dirigirse a la tienda para adquirir más.

Funcionamiento de la Ruleta

La experiencia se basa en animaciones con transiciones CSS y cálculos matemáticos para determinar el sector final.

La ruleta está compuesta por 8 premios:

Sobre Dorado

Sobre Gris

Figurita Aleatoria

Giro Gratis

Nada (varias posiciones para equilibrar probabilidades)

Cada giro:

Calcula un ángulo aleatorio correspondiente a un premio.

Realiza una rotación total acumulada para mantener continuidad.

Ejecuta una transición suave en el círculo de premios y la ruleta base.

Muestra el resultado como un popup temporal.

Controles de la Ruleta
Botón “Girar (X)”

Ejecuta un único giro.

Reduce en 1 la cantidad de giros disponibles.

Se desactiva automáticamente cuando no hay giros.

También se bloquea cuando se usan los modos automático o múltiple.

Botones de 5, 10 y 15 Giros

Realizan una secuencia automática de varios giros consecutivos.

Desactivan todos los controles mientras se están ejecutando.

Se detienen si el usuario se queda sin giros.

Reactivan todos los botones al finalizar.

Botón Automático

Inicia giros continuos hasta llegar a 0 giros.

Desactiva los botones de giros únicos y múltiples.

Se detiene automáticamente cuando no quedan giros.

Vuelve a habilitar el panel de controles al terminar.

Popup de Premio

Cada vez que un giro finaliza, aparece un popup con:

Solo el icono del premio ganado.

Ocultación automática a los 2 segundos.

Posicionado visualmente sobre el centro de la ruleta.

Gestión del estado y validaciones

El sistema integra controles para evitar comportamientos erróneos:

Prevención de doble giro simultáneo.

Desactivación inteligente de botones según contexto.

Manejo de transiciones con transitionend.

Uso de un bloqueo manual para giros múltiples y automáticos.

Control total sobre la cantidad de giros disponibles.

Estructura general de la vista

Incluye:

Contenedor principal con título y descripción.

Ruleta con elementos superpuestos mediante posicionamiento absoluto.

Panel lateral de botones.

Popup de premio oculto inicialmente.

Enlace auxiliar a tienda.

# Panel de Usuario y Administración

## Descripción general

FigusApp distingue a los usuarios según su rol asignado en el sistema:

- Los **usuarios comunes** acceden a una página de configuración donde pueden visualizar y actualizar los datos de su perfil.
- Los **administradores** aaacceden a un panel ABM (Alta, Baja, Modificación) para gestionar las entidades del sistema en la base de datos: **figuritas**, **sobres**, **álbumes** y **usuarios**.

Ambas paginas cuentan con un menú lateral que facilita la navegación entre secciones.

El menú lateral del usuario común contiene:

- **Foto de perfil**
- **Correo electrónico**
- **Botón “Cerrar sesión”**
- Sección **“Mi cuenta”**
  - Botón **“Mis álbumes”**
  - _(Próximamente)_ Botón **“Historial de compras”**

---

### Administrador

El menú lateral del administrador contiene:

- **Foto de perfil**
- **Correo electrónico**
- **Botón “Cerrar sesión”**
- Sección **“Administración”** con los siguientes botones y submenus asociados:

#### **Listar**

- Listar figuritas
- Listar sobres
- Listar álbumes
- Listar usuarios

#### **Agregar**

- Agregar figuritas
- Agregar sobres
- Agregar álbumes
- Agregar usuarios

#### **Modificar**

- Modificar figuritas
- Modificar sobres
- Modificar álbumes
- Modificar usuarios

#### **Eliminar**

- Eliminar figuritas
- Eliminar sobres
- Eliminar álbumes
- Eliminar usuarios

Cada boton despliega submenús con botones asociados a cada entidad a tratar, permitiendo acceder a formularios específicos y diferenciados de forma mas fluida.

Los formularios del sistema trabajan con los id de las entidades a tratar y parametros adicionales como por ejemplo, limites numericos para controlar la cantidad de datos solicitados en los metodos de listados. Por lo tanto los formularios permiten:

- Agregar registros nuevos
- Consultar la información disponible
- Modificar datos existentes
- Eliminar registros

Los datos obtenidos por las operaciones de cada formulario se obtienen como una tabla generada dinamicamente que contiene los datos asociados a las entidades tratadas.

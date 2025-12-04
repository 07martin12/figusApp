# Ruleta Dinámica de Premios

> Ruleta de premios para obtener recompensas aleatorias.

## Descripción

La **Ruleta Dinámica de Premios** permite a los usuarios obtener recompensas aleatorias mediante distintas modalidades de giro: giros múltiples y giros automáticos.

La ruleta está compuesta por 8 secciones (una por cada premio) y dispone de controles para realizar paquetes de giros o giros consecutivos en modo automático.

---

## Controles de giro

### Botones laterales (giros múltiples)

- **5 giros**
- **10 giros**
- **15 giros**

Estos botones permiten ejecutar el número de giros seleccionado de forma consecutiva.

### Botón “Automático”

- Activa giros consecutivos automáticos hasta agotar los giros disponibles del usuario.
- El modo automático se detiene si el usuario se queda sin giros o si el usuario cancela la acción.

---

## Composición de la ruleta y premios

La ruleta contiene 8 secciones. Cada sección corresponde a un premio o resultado:

1. **Sobre Dorado**
   - Otorga un sobre dorado que contiene figuritas con altas probabilidades de ser **especiales** o **legendarias**.

2. **Sobre Gris**
   - Otorga un sobre gris que contiene figuritas **comunes**.

3. **Figurita Aleatoria**
   - Entrega una figurita aleatoria que puede ser **común**, **especial** o **legendaria**.

4. **Giro Gratis**
   - Añade un giro gratuito al total disponible del usuario.

5. **Nada**
   - Casilla intercalada entre premios para asegurar baja probabilidad y aleatoriedad de los premios especiales.

> **Nota:** Las 8 secciones incluyen casillas "Nada" intercaladas para balancear las probabilidades.

---

## Gestión de giros y recompensas

- Si un usuario se queda sin giros, puede adquirir más en la **Tienda** de la aplicación.
- Los usuarios también pueden recibir giros gratis como **recompensa diaria** por iniciar sesión con frecuencia.

---

# Panel de Usuario y Panel de Administración

## Visión general

FigusApp distingue a los usuarios por su **rol** en el sistema:

- **Usuarios comunes**: Acceden a una página de configuración donde pueden ver y actualizar sus datos de perfil.
- **Administradores**: Acceden a un panel ABM (Alta, Baja, Modificación) para gestionar las entidades del sistema en la base de datos: **figuritas**, **sobres**, **álbumes** y **usuarios**.

Ambas interfaces cuentan con un **menú lateral** que facilita la navegación entre secciones.

---

## Menú lateral — Usuario común

El menú lateral para usuarios comunes incluye:

- Foto de perfil
- Correo electrónico
- Botón **Cerrar sesión**
- Sección **Mi cuenta**
  - Botón **Mis álbumes**
  - _(Próximamente)_ Botón **Historial de compras**

---

## Menú lateral — Administrador

El menú lateral para administradores incluye:

- Foto de perfil
- Correo electrónico
- Botón **Cerrar sesión**
- Sección **Administración** con las siguientes secciones y submenus asociados:

### Listar

- Listar figuritas
- Listar sobres
- Listar álbumes
- Listar usuarios

### Agregar

- Agregar figuritas
- Agregar sobres
- Agregar álbumes
- Agregar usuarios

### Modificar

- Modificar figuritas
- Modificar sobres
- Modificar álbumes
- Modificar usuarios

### Eliminar

- Eliminar figuritas
- Eliminar sobres
- Eliminar álbumes
- Eliminar usuarios

Cada botón despliega submenús con accesos a formularios específicos para cada entidad, permitiendo realizar operaciones de forma fluida.

---

## Formularios y operaciones

Los formularios del sistema trabajan con los **ID** de las entidades a tratar y aceptan parámetros adicionales (por ejemplo, límites numéricos para paginado y control de cantidad en los métodos de listado). Las operaciones soportadas por los formularios son:

- Crear (Alta) — agregar registros nuevos.
- Consultar (Listar) — obtener información disponible.
- Actualizar (Modificar) — cambiar datos existentes.
- Eliminar (Baja) — eliminar registros.

Los resultados de las operaciones se presentan como **tablas generadas dinámicamente** que muestran los datos asociados a las entidades tratadas.

---

## Mejoras futuras

- Historial de compras para el usuario.
- Seccion de ofertas para cambio de figuritas.

---

//ruleta dinamica

# Panel de Usuario y Administración

## Descripción general

FigusApp distingue a los usuarios según su rol asignado en el sistema:

- Los **usuarios comunes** acceden a una página de configuración donde pueden visualizar y actualizar los datos de su perfil.
- Los **administradores** acceden a un panel ABM (Alta, Baja, Modificación) para gestionar las entidades del sistema en la base de datos: **figuritas**, **sobres**, **álbumes** y **usuarios**.

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

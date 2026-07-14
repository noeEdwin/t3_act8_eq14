<div align="center">

# Actividad 8. Dashboard Administrativo con API

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF6F61?style=for-the-badge&logo=javascript&logoColor=white)

---

**Instituto Tecnológico Nacional de México - Instituto Tecnológico de Oaxaca**

| | |
|---|---|
| **Carrera** | Ingeniería en Sistemas Computacionales |
| **Materia** | Programación Web |
| **Docente** | Adelina Martínez Nieto |
| **Actividad** | Actividad 8. Dashboard Administrativo con API |
| **Integrantes** | Sánchez Hernández Diego Alonso <br>Sánchez Chávez Edwin Noé |
| **Fecha de entrega** | 14 de julio del 2026 |

[![GitHub Diego](https://img.shields.io/badge/GitHub-Diego-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/diegooash)
[![GitHub Edwin](https://img.shields.io/badge/GitHub-Edwin-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/noeEdwin)
[![Repositorio](https://img.shields.io/badge/GitHub-Repositorio-222222?style=for-the-badge&logo=github&logoColor=white)](https://github.com/noeEdwin/t3_act8_eq14)

Link a la página con IP: http://142.93.14.114/t3_act8_eq14/

Link a la página con dominio: https://auramusic.lat/t3_act8_eq14/
</div>

---

## Descripción del proyecto

Este proyecto consiste en la creación de una aplicación web tipo dashboard administrativo para la marca ficticia **AURA HOGAR**, enfocada en la gestión visual de productos, consulta de historial de ventas y configuración básica del sistema.

La aplicación fue desarrollada con **React 19**, **Vite**, **JavaScript** y **CSS3**, consumiendo información desde la API pública de **DummyJSON**. Además, integra **SweetAlert2** para mostrar modales, formularios de captura, confirmaciones y mensajes de retroalimentación durante las operaciones del sistema.

El proyecto funciona como una **Single Page Application (SPA)**: primero muestra una pantalla de acceso y, después de autenticar al usuario, renderiza el panel principal sin cambiar de documento HTML.

---

## Flujo del sistema y arquitectura

El sistema se divide en dos etapas principales: una pantalla de acceso y un panel interno con navegación lateral. La sesión se administra en el estado principal de React mediante `useState`.

| Vista o módulo | Descripción |
| --- | --- |
| **Login (`LoginPage.jsx`)** | Pantalla inicial de acceso. Valida que el usuario y la contraseña no estén vacíos, llama al servicio de autenticación y muestra mensajes de error si las credenciales son incorrectas. |
| **Dashboard (`DashboardPage.jsx`)** | Contenedor principal del sistema. Administra la vista activa y conecta la barra superior, el menú lateral y los módulos internos. |
| **Catálogo (`CatalogView.jsx`)** | Módulo principal para consultar productos desde DummyJSON. Incluye búsqueda, filtros por categoría, filtros por stock, paginación y operaciones CRUD simuladas. |
| **Historial (`HistoryView.jsx`)** | Módulo que genera un historial de ventas a partir de productos de la API. Permite filtrar, paginar, registrar, editar y eliminar ventas dentro de la sesión actual. |
| **Configuración (`SettingsView.jsx`)** | Vista visual de preferencias del negocio, interfaz y parámetros operativos del catálogo. |

### Estructura del repositorio

```text
t3_act8_eq14/
├── README.md                         # Documentación técnica del proyecto
├── index.html                        # Archivo base cargado por Vite
├── package.json                      # Dependencias y scripts de ejecución
├── package-lock.json                 # Versiones exactas instaladas
├── vite.config.js                    # Configuración de Vite con React
├── eslint.config.js                  # Configuración de ESLint
├── public/
│   ├── favicon.svg                   # Ícono principal del sitio
│   └── icons.svg                     # Recursos SVG públicos
└── src/
    ├── main.jsx                      # Punto de entrada de React
    ├── App.jsx                       # Control de sesión y render principal
    ├── App.css                       # Estilos generales, login y dashboard
    ├── index.css                     # Estilos base globales
    ├── assets/
    │   └── hero.png                  # Recurso gráfico del proyecto
    ├── pages/
    │   ├── LoginPage.jsx             # Pantalla de autenticación
    │   └── DashboardPage.jsx         # Contenedor del panel administrativo
    ├── components/
    │   ├── CatalogView.jsx           # Catálogo de productos y CRUD
    │   ├── DataTable.jsx             # Tabla reutilizada para productos
    │   ├── HistoryView.jsx           # Historial de ventas
    │   ├── Navbar.jsx                # Barra superior con datos del usuario
    │   ├── Pagination.jsx            # Componente de paginación
    │   ├── SettingsView.jsx          # Vista general de configuración
    │   ├── Sidebar.jsx               # Menú lateral de navegación
    │   └── settings/
    │       ├── BusinessInfoSection.jsx
    │       ├── CatalogSettingsSection.jsx
    │       ├── InterfacePreferencesSection.jsx
    │       ├── SettingsCard.jsx
    │       └── SettingsHero.jsx
    └── services/
        ├── alertService.js           # Modales, formularios y alertas con SweetAlert2
        ├── authService.js            # Autenticación contra DummyJSON
        ├── historyService.js         # Transformación de productos a historial de ventas
        └── productsService.js        # Consumo de productos, categorías y CRUD simulado
```

---

## Documentación técnica

### 1. Framework y librerías utilizadas

Se utilizó **React** como biblioteca principal para construir la interfaz por componentes y **Vite** como herramienta de desarrollo, empaquetado y servidor local.

El diseño visual se resolvió con **CSS personalizado**, fuentes externas de Google Fonts (`Inter` y `Montserrat`) e iconos de **Material Symbols**. Para las ventanas modales, confirmaciones y formularios emergentes se integró **SweetAlert2**.

### 2. ¿Cómo fluye el Login hacia el Sistema?

El acceso se realiza desde `LoginPage.jsx` y se conecta con el servicio `authService.js`:

1. El usuario ingresa un identificador y contraseña.
2. El formulario valida que ambos campos tengan contenido.
3. La función `loginUser()` limpia espacios y prepara la petición.
4. Si el identificador incluye `@`, primero busca el usuario por correo en `https://dummyjson.com/users`.
5. Después envía las credenciales a `https://dummyjson.com/auth/login`.
6. Si la respuesta es correcta, `App.jsx` guarda los datos básicos del usuario en `currentUser`.
7. Al existir `currentUser`, React deja de mostrar el login y renderiza `DashboardPage.jsx`.

Credenciales de prueba recomendadas por DummyJSON:

```text
Usuario: michaelw
Contraseña: michaelwpass
```

### 3. ¿Cómo se muestra el usuario en el Navbar?

Cuando la autenticación es exitosa, `App.jsx` conserva los datos del usuario autenticado:

```js
setCurrentUser({
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  image: user.image,
  email: user.email,
})
```

Después, `DashboardPage.jsx` envía ese objeto al componente `Navbar.jsx`. La barra superior construye el nombre completo, muestra el nombre de usuario con `@username` y renderiza la imagen del perfil si la API la proporciona.

Al presionar **Cerrar sesión**, se ejecuta `handleLogout()`, que limpia `currentUser` y regresa automáticamente a la pantalla de acceso. La sesión no se guarda en `localStorage`, por lo que al recargar la página se vuelve al login.

### 4. Catálogo de productos y consumo de API

El módulo de catálogo utiliza `productsService.js` para obtener información desde DummyJSON:

* Consulta productos con paginación usando `limit` y `skip`.
* Permite búsqueda por texto con el endpoint `/products/search`.
* Permite filtrar por categoría mediante `/products/category/:category`.
* Aplica filtros locales para estado de stock: **En stock**, **Pocas unidades** y **Agotado**.
* Sincroniza búsqueda, categoría, estado de stock, página y límite con los parámetros de la URL.

Las acciones de **registrar**, **editar** y **eliminar** productos usan los endpoints simulados de DummyJSON (`POST`, `PUT` y `DELETE`). La API responde como si los cambios fueran aplicados, aunque no persisten en el servidor real.

### 5. Historial de ventas

El historial se construye desde `historyService.js`. Este servicio toma productos de DummyJSON y los transforma en ventas simuladas con folio, categoría, unidades, total, fecha y estado.

El módulo permite:

* Buscar por folio, producto o marca.
* Filtrar por estado: **Enviado**, **Pendiente** o **Preparando**.
* Filtrar por categoría.
* Paginar resultados.
* Registrar nuevas ventas dentro de la sesión actual.
* Editar ventas remotas o creadas localmente.
* Ocultar ventas eliminadas en la vista actual.

### 6. Configuración del sistema

La vista de configuración está organizada en tarjetas visuales:

| Sección | Función |
| --- | --- |
| **Información del negocio** | Muestra campos para nombre comercial, correo, teléfono, dominio y mensaje institucional. |
| **Preferencias de experiencia** | Presenta opciones para idioma, densidad visual, vista inicial y tema. |
| **Parámetros operativos** | Contiene opciones relacionadas con registros por página, umbral de stock bajo y notas internas. |

Esta vista funciona como una maqueta interactiva de configuración, pero no guarda cambios en una base de datos.

## Proceso de creación paso a paso

### Paso 1: Configuración inicial del proyecto

Se creó una aplicación con **Vite + React**, se instalaron las dependencias necesarias y se definió la estructura base del repositorio con carpetas para páginas, componentes, servicios, estilos y recursos públicos.

### Paso 2: Construcción del módulo de acceso

Se desarrolló `LoginPage.jsx` con una interfaz visual para **AURA HOGAR**, campos controlados mediante `useState`, validaciones de campos requeridos y mensajes de error visibles en pantalla.

También se conectó el formulario con `authService.js` para autenticar usuarios reales de la API pública DummyJSON.

### Paso 3: Maquetado del dashboard principal

Se implementó `DashboardPage.jsx` como contenedor del sistema. Dentro de esta vista se integraron:

* Un **Sidebar** con navegación entre Catálogo, Historial y Configuración.
* Un **Navbar** con nombre, usuario, avatar y botón de cierre de sesión.
* Un área de contenido dinámico que cambia según la opción activa.

### Paso 4: Integración del catálogo con API

Se conectó el módulo `CatalogView.jsx` con `productsService.js` para consumir productos desde DummyJSON. Se añadieron búsqueda, filtros, estados de carga, manejo de errores y paginación.

Los parámetros de consulta se sincronizaron con la URL para conservar el estado de búsqueda, página, categoría y límite seleccionado.

### Paso 5: Implementación de CRUD simulado con SweetAlert2

Se creó `alertService.js` para centralizar los modales del sistema. Con este servicio se implementaron formularios emergentes para productos y ventas, confirmaciones antes de editar o eliminar y alertas de éxito o error.

Las operaciones de productos usan los endpoints simulados de DummyJSON, por lo que el sistema muestra el flujo completo de un CRUD aunque la información no se guarde permanentemente en el servidor externo.

### Paso 6: Desarrollo del historial de ventas

Se creó `HistoryView.jsx` y `historyService.js` para transformar productos en ventas simuladas. El historial cuenta con filtros, búsqueda, paginación, registro de nuevas ventas, edición y eliminación visual de registros.

### Paso 7: Vista de configuración y responsividad

Se agregó `SettingsView.jsx` con tarjetas para datos del negocio, preferencias de interfaz y parámetros del catálogo. Finalmente, se aplicaron media queries en `App.css` para adaptar el login, sidebar, tablas, filtros y tarjetas a pantallas pequeñas.

---

## Cómo ejecutar en local

1. Clonar este repositorio en tu máquina local:

```bash
git clone https://github.com/noeEdwin/t3_act8_eq14.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd t3_act8_eq14
```

3. Instalar las dependencias:

```bash
npm install
```

4. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir la URL local que muestra Vite, normalmente:

```text
http://localhost:5173/
```

---

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo con Vite. |
| `npm run build` | Genera la versión optimizada de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión generada por `build`. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |

---

## API utilizada

El proyecto consume la API pública de DummyJSON:

**[https://dummyjson.com](https://dummyjson.com)**

Endpoints principales utilizados:

| Endpoint | Uso |
| --- | --- |
| `/auth/login` | Autenticación de usuario. |
| `/users` | Búsqueda de usuario por correo. |
| `/products` | Consulta general de productos. |
| `/products/search` | Búsqueda de productos por texto. |
| `/products/category/:category` | Consulta de productos por categoría. |
| `/products/categories` | Lista de categorías disponibles. |
| `/products/add` | Registro simulado de productos. |
| `/products/:id` | Edición y eliminación simulada de productos. |

---

## Notas importantes

* Las operaciones de creación, edición y eliminación se simulan mediante DummyJSON; la API responde correctamente, pero no persiste cambios reales en el servidor.
* La sesión se mantiene únicamente en memoria con React. Si se recarga la página, el usuario debe iniciar sesión de nuevo.
* El proyecto requiere conexión a internet para autenticar usuarios, cargar productos, obtener categorías, mostrar fuentes externas y usar imágenes remotas.
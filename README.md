# Filmax

Filmax es una pequeña aplicación web para explorar películas: listados por categoría (populares, mejor valoradas, próximos estrenos, en cartelera), búsqueda por título y una vista de detalle con reparto y equipo técnico. Todos los datos vienen de la API de The Movie Database (TMDB).

El proyecto está hecho en JavaScript vanilla, sin frameworks, manipulando el DOM directamente. La idea era trabajar bien la parte de eventos, estado de la aplicación y consumo de una API real, sin depender de React ni de ninguna librería de UI más allá de Bootstrap para el layout.

## Cómo funciona

La aplicación arranca pidiendo a la API el listado de películas por defecto (próximos estrenos) y lo pinta en pantalla en formato grid. A partir de ahí todo se mueve por eventos: cambiar el tipo de listado dispara una nueva petición a la API, hacer click en una película pide sus detalles y sustituye el listado por la ficha completa, el botón de volver limpia esa ficha y recupera el listado que había antes, y los botones de paginación piden la página siguiente o anterior según el contexto en el que estés (listado normal o resultado de una búsqueda).

Para no perder el hilo de en qué vista estás y qué se ha pedido la última vez, hay un objeto de estado (`applicationStatus`) que guarda el tipo de listado activo, la página actual, el modo de vista (grid o lista) y si estás dentro de una búsqueda o no. Ese estado es el que decide qué pedir a la API cada vez que se interactúa con algo.

Aquí va un esquema de cómo se relacionan estas piezas:

![Diagrama de funcionamiento](./public/Diagrama%20funcionamiento.png)

## Estructura del proyecto

```
src/
  api/              llamadas a TMDB y configuración (claves, urls, traducciones)
  components/       generación de tarjetas de película y de reparto
  events/           listeners: cambio de vista, selects, formulario de búsqueda, paginación
  list-toolbar/     barra de herramientas con el selector de categoría y los botones de vista
  movie-list/       construcción del listado y la paginación
  movie-details/    construcción de la ficha de detalle (reparto y equipo técnico incluidos)
  util/             helpers de DOM compartidos
  scss/             estilos, separados por bloque (header, footer, paginación, etc.)
```

## Tecnologías

- Vite como bundler y servidor de desarrollo
- JavaScript con módulos ES, sin frameworks
- Axios para las peticiones a la API
- Sass para los estilos, apoyado en Bootstrap para la rejilla y algunos componentes
- API de TMDB como fuente de datos

## Cómo levantarlo en local

Antes de nada, crea un archivo `.env` en la raíz del proyecto con tu propia API key de TMDB:

```
VITE_TMDB_API_KEY=tu_api_key_aqui
```

Puedes basarte en `.env.example`, que ya tiene esta variable definida sin valor. La key se puede generar gratis creando una cuenta en [TMDB](https://www.themoviedb.org/) y solicitándola desde la sección de ajustes de la API.

Con eso ya puesto, instala dependencias y levanta el entorno de desarrollo:

```bash
npm install
npm run dev
```

Para generar la build de producción:

```bash
npm run build
```

## Licencia

MIT
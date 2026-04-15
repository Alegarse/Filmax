# De JavaScript a TypeScript — Web de información de películas

Repositorio que documenta la **migración de un proyecto JavaScript a TypeScript**, tomando como base una aplicación web de consulta de películas construida con la API de [The Movie Database (TMDB)](https://www.themoviedb.org/).

El objetivo no es solo que el código funcione, sino aprender a pensar con tipos: qué forma tienen los datos, qué puede fallar, y cómo el compilador puede ayudarnos a detectarlo antes de ejecutar nada.

---

## ¿Qué hace la aplicación?

- Muestra listados de películas en 4 categorías: Populares, Mejor valoradas, Próximamente y En cartelera
- Permite buscar películas por título
- Muestra el detalle de cada película: sinopsis, reparto y equipo técnico
- Cambia entre vista en cuadrícula y vista en lista
- Incluye paginación para navegar entre resultados

---

## Tecnologías

[![My Skills](https://skillicons.dev/icons?i=html,css,js,ts,vite,git,github,vscode)](https://skillicons.dev)

- **TypeScript** — tipado estático sobre el código JavaScript original
- **Vite** — bundler y entorno de desarrollo
- **Axios** — cliente HTTP para las llamadas a la API de TMDB
- **Bootstrap + SCSS** — estilos y maquetación

---

## Qué se aprendió en la migración

### Añadido en TypeScript

- **Interfaces** para todos los objetos del dominio: `MovieObject`, `MovieCast`, `MovieCrew`, `ApplicationStatus`, `ApiConfig`… Sin ellas, los datos de la API son cajas negras; con ellas, el editor sabe exactamente qué propiedades existen y de qué tipo son.
- **Tipado de funciones**: parámetros y valores de retorno explícitos, incluido `Promise<MovieObjectsArray | null>` en las llamadas asíncronas.
- **Tipos literales**: se sustituyó `role: string` por un tipo `ButtonRole = 'back' | 'next' | 'actual'`, eliminando la posibilidad de pasar valores inesperados.
- **`import type`**: usado para importaciones que solo se necesitan en tiempo de compilación, sin coste en el bundle final.
- **Manejo de `null`**: la migración obligó a revisar todos los puntos donde la API puede devolver `null` (respuestas vacías, imágenes sin poster…) y gestionarlos explícitamente en lugar de dejar que fallaran en silencio.

### Errores del proyecto JS que TypeScript habría detectado

- Desestructuración directa de una respuesta de API que podía ser `null`, causando un crash en runtime.
- Uso de `classList` como si fuera una propiedad de texto asignable directamente (es un `DOMTokenList` de solo lectura).
- Tipado incorrecto de eventos de clic como `HTMLSelectElement` en lugar de `HTMLElement`.
- Objeto de estado global inicializado con `undefined` en un campo que no lo admitía.

---

## Estructura del proyecto

```
src/
├── api/            # Llamadas a TMDB y configuración global de estado
├── components/     # Construcción de elementos del DOM (tarjetas, detalles, paginación...)
├── events/         # Listeners de eventos separados por responsabilidad
├── interfaces/     # Todas las interfaces y tipos TypeScript
├── utils/          # Utilidades de manipulación del DOM
└── scss/           # Estilos con Bootstrap y variables personalizadas
```

---

## Diagrama de funcionamiento

<p align="center">
  <img src="./Diagrama funcionamiento.png" alt="Diagrama de funcionamiento" width="775">
</p>

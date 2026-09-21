# Guía para Agentes de IA 🤖

Este archivo contiene instrucciones específicas para los agentes de IA (como Antigravity) que trabajan en este proyecto. Sigue estas normas para mantener la consistencia y calidad del desarrollo.

## 📅 Lógica del Calendario y Menú Mensual

### 1. Flujo de Publicación Anticipada
* El propietario de la web actualiza los platos del menú mensual en [`data/dishes.json`](file:///c:/Users/regua/Documents/camarena-webapp/data/dishes.json) **a finales de mes** (típicamente entre los días 28 y 31), antes de que comience el nuevo mes.
* La web está generada con Astro en modo estático (SSG), por lo que la cuadrícula del calendario se calcula durante el `build`.

### 2. Umbral de Transición de Mes (`MONTH_TRANSITION_DAY_THRESHOLD = 28`)
En [`src/utils/dateUtils.ts`](file:///c:/Users/regua/Documents/camarena-webapp/src/utils/dateUtils.ts):
* **Días 1 al 27:** El calendario calcula los huecos iniciales y el número de días para el **mes en curso**.
* **Días 28 al 31 (últimos días del mes):** El calendario detecta automáticamente que los platos subidos corresponden al **mes entrante**. Por tanto, calcula el primer día de la semana y el total de días para el mes siguiente (por ejemplo, el 31 de agosto construye el calendario de septiembre empezando en martes con 30 días).

### 3. Resaltado del Día Actual y Móvil
* **Resaltado (`isDateToday` / script cliente):** Se resalta siempre en amarillo (`bg-amarillo`) la tarjeta cuyo número coincida con el día del mes actual (`new Date().getDate()`), salvo si es un día de cierre (que mantiene el color rojo).
* **Scroll en móvil:** Al cargar la página en pantallas pequeñas, el slider se centra automáticamente sobre la tarjeta del día en curso.

---

## 📝 Convenciones de Git para Menús Diarios

Cuando se actualicen los platos en el archivo `data/dishes.json` o similar, se **debe** seguir un patrón estricto para realizar el commit. 

### Patrón del Mensaje de Commit
El mensaje debe seguir este formato exacto:
`git commit -m "month dishes update"`

### Regla para el Nombre del Mes
Sustituye `month` por el nombre en **inglés** del mes que está por comenzar o ha comenzado recientemente para el cual se aplican los datos.

*   **Regla:** Si estamos a finales de un mes (ej. día 28, 29, 30 o 31) o a principios del mes siguiente (ej. día 1), el commit debe referirse al **mes entrante**.
*   **Ejemplos:**
    *   Si hoy es 29 de febrero: `git commit -m "march dishes update"`
    *   Si hoy es 1 de marzo: `git commit -m "march dishes update"`
    *   Si hoy es 31 de mayo: `git commit -m "june dishes update"`
    *   Si hoy es 31 de agosto: `git commit -m "september dishes update"`

---

## 🛠 Entorno de Desarrollo
*   **Framework:** Astro 🚀
*   **Estilos:** Tailwind CSS
*   **Gestión de datos:** Archivos JSON en la carpeta `data/`.
*   **Tests:** Vitest (`npx vitest run`).

---

## 📌 Recordatorios
*   Mantén la coherencia en las fechas dentro del JSON de platos (`data/dishes.json`).
*   Asegúrate de no introducir inconsistencias en los días del mes (ej. no incluir platos para un día 31 en meses de 30 días como septiembre, abril, junio o noviembre).
*   Si el restaurante cierra un día, el valor en el JSON debe ser `["-", "-", "-", "-"]` para que la tarjeta se muestre en rojo translúcido (`transparent-card`).

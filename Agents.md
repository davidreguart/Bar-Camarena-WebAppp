# Guía para Agentes de IA 🤖

Este archivo contiene instrucciones específicas para los agentes de IA (como Antigravity) que trabajan en este proyecto. Sigue estas normas para mantener la consistencia y calidad del desarrollo.

## 📝 Convenciones de Git para Menús Diarios

Cuando se actualicen los platos en el archivo `data/dishes.json` o similar, se **debe** seguir un patrón estricto para realizar el commit. 

### Patrón del Mensaje de Commit
El mensaje debe seguir este formato exacto:
`git commit -m "month dishes update"`

### Regla para el Nombre del Mes
Sustituye `month` por el nombre en **inglés** del mes que está por comenzar o ha comenzado recientemente para el cual se aplican los datos.

*   **Regla:** Si estamos a finales de un mes (ej. día 28, 29 o 30) o a principios del mes siguiente (ej. día 1), el commit debe referirse al **mes entrante**.
*   **Ejemplos:**
    *   Si hoy es 29 de febrero: `git commit -m "march dishes update"`
    *   Si hoy es 1 de marzo: `git commit -m "march dishes update"`
    *   Si hoy es 31 de mayo: `git commit -m "june dishes update"`

## 🛠 Entorno de Desarrollo
*   **Framework:** Astro 🚀
*   **Estilos:** Tailwind CSS
*   **Gestión de datos:** Archivos JSON en la carpeta `data/`.

## 📌 Recordatorios
*   Mantén la coherencia en las fechas dentro del JSON de platos.
*   Asegúrate de no introducir inconsistencias en los días del mes (ej. platos para un día 31 en meses de 30 días).

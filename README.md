# Código desde Cero

App para aprender programación desde cero: 19 lecciones (pseudocódigo en español → JavaScript), laboratorio con intérprete de pseudocódigo y modo paso a paso, retos con corrección automática, machetes por clase y exámenes.

## Estructura

- `src/pseudo.js`: intérprete de pseudocódigo (estilo PSeInt, arreglos con índice base 0).
- `src/jsrunner.js`: ejecuta JavaScript en un Web Worker con límite de tiempo.
- `src/content/`: contenido del curso (un archivo por módulo).
- `src/app.js`, `src/styles.css`, `src/index.html`: interfaz.
- `tools/validate.js`: ejecuta todos los ejemplos y las soluciones de los retos.
- `tools/build.js`: genera `dist/app.html` (para publicar) y `dist/index.html` (documento completo).

## Comandos

```
node tools/validate.js
node tools/build.js
```

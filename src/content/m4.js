/* MÓDULO 4 · Del pseudocódigo a JavaScript */
MOD({
  id: "m4", n: 4, title: "Del pseudocódigo a JavaScript", lang: "js",
  desc: "Traducir todo lo aprendido a un lenguaje real, usado en millones de sitios y apps.",
  lessons: ["l14", "l15", "l16", "l17"],
  exam: {
    extra: [
      { q: "¿Cuál es la traducción de <code>Escribir \"Hola\"</code> a JavaScript?", opts: ["print(\"Hola\")", "console.log(\"Hola\")", "echo \"Hola\"", "Escribir(\"Hola\")"], a: 1, why: "console.log muestra un valor en la consola." },
      { q: "¿Qué muestra <code>console.log(\"5\" + 3)</code>?", opts: ["8", "53", "Error", "\"8\""], a: 1, why: "Si uno es texto, + concatena: \"53\"." },
      { q: "¿Qué palabra usas para una variable que NO va a cambiar?", opts: ["let", "var", "const", "fixed"], a: 2, why: "const declara una constante; intentar reasignarla da error." },
      { q: "¿Cuál compara valor y tipo a la vez?", opts: ["=", "==", "===", "=>"], a: 2, why: "=== es la comparación estricta, la recomendada." },
      { q: "¿Qué devuelve <code>[10, 20, 30].length</code>?", opts: ["2", "3", "30", "60"], a: 1, why: "length es la cantidad de elementos." },
      { q: "¿Qué hace <code>return</code> dentro de una función?", opts: ["Muestra el valor", "Devuelve el valor y termina la función", "Repite la función", "Nada"], a: 1, why: "Igual que Retornar en pseudocódigo." },
      { q: "¿Qué muestra?", code: "let total = 0;\nfor (let i = 1; i <= 4; i++) {\n  total += i;\n}\nconsole.log(total);", lang: "js", opts: ["4", "10", "5", "0"], a: 1, why: "1+2+3+4 = 10." },
      { q: "¿Qué devuelve <code>[1, 2, 3].map(x => x * 10)</code>?", opts: ["[10, 20, 30]", "60", "[1, 2, 3, 10]", "30"], a: 0, why: "map crea un arreglo nuevo aplicando la función a cada elemento." },
      { q: "¿Cómo accedes a la propiedad <code>nombre</code> del objeto <code>persona</code>?", opts: ["persona[nombre]", "persona.nombre", "persona->nombre", "nombre.persona"], a: 1, why: "Con punto: persona.nombre (o persona[\"nombre\"] con comillas)." },
      { fill: true, q: "Completa para que el bucle se repita mientras <code>n</code> sea mayor que 0: <code>___ (n > 0) { n--; }</code>", a: ["while"], why: "while es el Mientras de JavaScript." },
    ],
    challenge: {
      id: "ex_m4", title: "Resumen de ventas", lang: "js",
      text: "Escribe una función <code>resumen(ventas)</code> que reciba un arreglo de números y devuelva un <b>objeto</b> con <code>total</code> (suma), <code>maximo</code> (el mayor) y <code>cantidad</code> (cuántos hay). Ejemplo: <code>resumen([10, 40, 25])</code> → <code>{ total: 75, maximo: 40, cantidad: 3 }</code>.",
      starter: "function resumen(ventas) {\n  // completa\n}\n\nconsole.log(resumen([10, 40, 25]));",
      tests: [{ expr: "resumen([10, 40, 25])", expect: { total: 75, maximo: 40, cantidad: 3 } }, { expr: "resumen([5])", expect: { total: 5, maximo: 5, cantidad: 1 } }, { expr: "resumen([-3, -1, -7])", expect: { total: -11, maximo: -1, cantidad: 3 } }],
      hint: "Recorre con for...of acumulando total y actualizando maximo (empieza con ventas[0]). cantidad es ventas.length. Devuelve { total, maximo, cantidad }.",
      solution: "function resumen(ventas) {\n  let total = 0;\n  let maximo = ventas[0];\n  for (const v of ventas) {\n    total += v;\n    if (v > maximo) maximo = v;\n  }\n  return { total: total, maximo: maximo, cantidad: ventas.length };\n}\n\nconsole.log(resumen([10, 40, 25]));"
    }
  }
});

L({
  id: "l14", module: "m4", title: "Tu primer JavaScript", minutes: 35, lang: "js",
  summary: "Mostrar datos, variables con let y const, tipos y operadores en un lenguaje real.",
  sections: [
    { h: "¿Por qué JavaScript?", body: `
<p>Ya sabes programar: variables, decisiones, bucles, arreglos y funciones son ideas que dominas. Ahora vamos a escribirlas en un <b>lenguaje real</b>. Elegimos <b>JavaScript</b> porque:</p>
<ul><li>Es el lenguaje de la web: funciona en cualquier navegador, incluido el de tu móvil, sin instalar nada.</li><li>Sirve para páginas web (frontend), servidores (backend con Node.js), apps móviles (React Native) y más.</li><li>Es uno de los lenguajes con más ofertas de trabajo en el mundo.</li></ul>
${PRO("Muchas personas que se dedican a programar empezaron justamente por JavaScript. Una vez que lo manejas, aprender Python, Java o C# es mucho más fácil: los conceptos son los mismos.")}` },
    { h: "Mostrar datos: console.log", body: `
<p><code>console.log()</code> es el <code>Escribir</code> de JavaScript. Muestra valores en la consola:</p>
${CJ(`console.log("Hola, mundo");
console.log(2 + 3);
console.log("El total es", 150);`)}
<p>Reglas de escritura nuevas:</p>
<ul><li>Los textos van entre comillas <code>"..."</code> o <code>'...'</code>.</li><li>Cada instrucción termina con punto y coma <code>;</code> (en realidad es opcional, pero se recomienda).</li><li>Los comentarios también son <code>//</code>.</li><li><b>Mayúsculas y minúsculas importan</b>: <code>console.log</code> funciona, <code>Console.Log</code> no.</li></ul>` },
    { h: "Variables: let y const", body: `
<p>En JavaScript declaras variables con <code>let</code> (si va a cambiar) o <code>const</code> (si no va a cambiar). La asignación se hace con <code>=</code> (lo que en pseudocódigo era <code>&lt;-</code>):</p>
${TABLE(["Pseudocódigo", "JavaScript"], [["<code>Definir edad Como Entero</code><br><code>edad &lt;- 25</code>", "<code>let edad = 25;</code>"], ["<code>edad &lt;- edad + 1</code>", "<code>edad = edad + 1;</code> o <code>edad++;</code>"], ["(un valor fijo)", "<code>const PI = 3.1416;</code>"]])}
${CJ(`let puntos = 10;
puntos = puntos + 5;
puntos += 5;       // atajo de puntos = puntos + 5
puntos++;          // atajo de puntos = puntos + 1
console.log(puntos);

const nombre = "Ada";
console.log("Hola", nombre);
// nombre = "Grace";  // esto daría error: es const`)}
${TIP("Regla práctica: usa <code>const</code> por defecto y cambia a <code>let</code> solo si necesitas reasignar. Verás también <code>var</code> en código viejo: evítalo.")}` },
    { h: "Tipos de datos en JavaScript", body: `
${TABLE(["Pseudocódigo", "JavaScript", "Ejemplo"], [["Entero / Real", "<code>number</code> (un solo tipo para ambos)", "<code>42</code>, <code>3.14</code>"], ["Cadena", "<code>string</code>", "<code>\"Hola\"</code>"], ["Logico", "<code>boolean</code>", "<code>true</code>, <code>false</code>"], ["(sin valor)", "<code>undefined</code> / <code>null</code>", ""]])}
${CJ(`console.log(typeof 42);
console.log(typeof "hola");
console.log(typeof true);
let algo;
console.log(algo);   // undefined: declarada sin valor`)}
<p>JavaScript no te obliga a definir el tipo, y una variable puede cambiar de tipo. Eso da libertad, pero también errores sorprendentes:</p>
${CJ(`console.log("5" + 3);    // "53": concatena
console.log("5" - 3);    // 2: convierte a número
console.log(Number("5") + 3);  // 8: conversión explícita`)}
${WARN("Cuando un dato viene del usuario (un formulario, <code>prompt</code>) llega como <b>texto</b>. Conviértelo con <code>Number()</code> antes de hacer cuentas.")}` },
    { h: "Operadores", body: `
${TABLE(["Pseudocódigo", "JavaScript"], [["<code>+ - * /</code>", "<code>+ - * /</code>"], ["<code>MOD</code>", "<code>%</code>"], ["<code>^</code>", "<code>**</code>"], ["<code>trunc(x)</code>", "<code>Math.trunc(x)</code>"], ["<code>=</code> (comparar)", "<code>===</code>"], ["<code>&lt;&gt;</code>", "<code>!==</code>"], ["<code>Y</code> / <code>O</code> / <code>NO</code>", "<code>&amp;&amp;</code> / <code>||</code> / <code>!</code>"], ["<code>raiz(x)</code>", "<code>Math.sqrt(x)</code>"], ["<code>aleatorio(1,6)</code>", "<code>Math.floor(Math.random() * 6) + 1</code>"]])}
${CJ(`const edad = 20;
console.log(17 % 5);
console.log(2 ** 10);
console.log(edad >= 18 && edad < 65);
console.log(edad === 20);
console.log(!(edad > 30));`)}
${WARN("En JavaScript <code>=</code> asigna y <code>===</code> compara. También existe <code>==</code>, pero convierte tipos de forma confusa (<code>\"5\" == 5</code> es true). Usa siempre <code>===</code> y <code>!==</code>.")}` },
    { h: "Plantillas de texto", body: `
<p>Para armar textos con variables, JavaScript tiene las <b>plantillas</b> (template strings): se escriben entre acentos graves <code>\`</code> y las variables van dentro de <code>\${ }</code>:</p>
${CJ(`const producto = "Café";
const precio = 3.5;
const cantidad = 4;
console.log(\`\${cantidad} x \${producto} = $\${precio * cantidad}\`);`)}
<p>Es mucho más cómodo que concatenar con <code>+</code>. En el teclado del móvil, el acento grave suele estar manteniendo pulsada la tecla del apóstrofo, o en el panel de símbolos. También tienes un botón en el editor.</p>` },
  ],
  cheat: [
    { h: "Mostrar", body: CN(`console.log("texto", variable);`, "js") },
    { h: "Variables", body: CN(`let x = 5;        // puede cambiar
const PI = 3.14;  // no cambia
x += 2;  x++;`, "js") },
    { h: "Tipos", body: `<code>number</code> · <code>string</code> · <code>boolean</code> · <code>undefined</code> · <code>null</code><br><code>typeof x</code> dice el tipo. <code>Number(\"5\")</code> convierte.` },
    { h: "Traducción rápida", body: TABLE(["Pseudo", "JS"], [["&lt;-", "="], ["=", "==="], ["&lt;&gt;", "!=="], ["MOD", "%"], ["Y O NO", "&amp;&amp; || !"], ["^", "**"]]) },
    { h: "Plantilla", body: CN("`Hola ${nombre}, tienes ${edad} años`", "js") },
  ],
  quiz: [
    { q: "¿Cómo se declara una variable que cambiará de valor?", opts: ["const x = 1;", "let x = 1;", "Definir x;", "x <- 1;"], a: 1, why: "let para variables que se reasignan." },
    { q: "¿Qué muestra <code>console.log(10 % 4)</code>?", opts: ["2.5", "2", "6", "40"], a: 1, why: "% es MOD: 10 entre 4 sobra 2." },
    { q: "¿Qué da <code>\"7\" === 7</code>?", opts: ["true", "false", "Error", "\"77\""], a: 1, why: "=== compara también el tipo: string no es igual a number." },
    { q: "¿Cuál es el equivalente de <code>edad >= 18 Y tieneDni</code>?", opts: ["edad >= 18 and tieneDni", "edad >= 18 && tieneDni", "edad >= 18 || tieneDni", "edad >= 18 & tieneDni"], a: 1, why: "&& es el Y lógico." },
    { q: "¿Qué muestra?", code: "const a = 3;\nconst b = 4;\nconsole.log(`${a} + ${b} = ${a + b}`);", lang: "js", opts: ["${a} + ${b} = ${a + b}", "3 + 4 = 7", "3 + 4 = 34", "Error"], a: 1, why: "Las plantillas reemplazan cada ${...} por su valor." },
    { q: "¿Qué pasa al ejecutar <code>const x = 1; x = 2;</code>?", opts: ["x vale 2", "Error: no se puede reasignar una constante", "x vale 1 y 2", "Nada"], a: 1, why: "const no permite reasignar." },
    { fill: true, q: "¿Qué muestra <code>console.log(typeof \"hola\")</code>?", a: ["string"], why: "Los textos son de tipo string." },
  ],
  exercises: [
    { id: "ex14a", title: "Calcular el IVA", lang: "js",
      text: "Crea una constante <code>precio</code> con valor 200 y otra <code>iva</code> con 0.21. Muestra con <code>console.log</code> exactamente: <code>Precio final: 242</code>",
      starter: "const precio = 200;\n\n",
      tests: [{ out: "Precio final: 242" }],
      hint: "console.log(`Precio final: ${precio * (1 + iva)}`) o console.log(\"Precio final:\", precio + precio * iva)",
      solution: "const precio = 200;\nconst iva = 0.21;\nconsole.log(\"Precio final:\", precio + precio * iva);" },
    { id: "ex14b", title: "De texto a número", lang: "js",
      text: "Tienes <code>const a = \"12\";</code> y <code>const b = \"30\";</code> (textos, como si vinieran de un formulario). Muestra su <b>suma numérica</b>: la salida debe ser <code>42</code>.",
      starter: "const a = \"12\";\nconst b = \"30\";\n",
      tests: [{ out: "42" }],
      hint: "Number(a) + Number(b)",
      solution: "const a = \"12\";\nconst b = \"30\";\nconsole.log(Number(a) + Number(b));" },
    { id: "ex14c", title: "Leer datos con leer()", lang: "js",
      text: "En este Laboratorio, <code>leer()</code> devuelve (como texto) la siguiente línea del cuadro <b>Entradas</b>. Lee dos números, y muestra como última línea su promedio. Ejemplo: entradas 4 y 7 → <code>5.5</code>",
      starter: "const x = Number(leer());\n",
      tests: [{ in: ["4", "7"], out: "5.5" }, { in: ["10", "20"], out: "15" }],
      hint: "const y = Number(leer()); console.log((x + y) / 2);",
      solution: "const x = Number(leer());\nconst y = Number(leer());\nconsole.log((x + y) / 2);" },
  ]
});

L({
  id: "l15", module: "m4", title: "Decisiones y bucles en JavaScript", minutes: 35, lang: "js",
  summary: "if / else, switch, while y for: las estructuras de control con sintaxis real.",
  sections: [
    { h: "Llaves y paréntesis", body: `
<p>En JavaScript los bloques no terminan con <code>FinSi</code> o <code>FinPara</code>: se encierran entre <b>llaves</b> <code>{ }</code>. Y las condiciones van entre <b>paréntesis</b> <code>( )</code>.</p>
${TABLE(["Pseudocódigo", "JavaScript"], [["<code>Si cond Entonces</code><br>&nbsp;&nbsp;...<br><code>SiNo</code><br>&nbsp;&nbsp;...<br><code>FinSi</code>", "<code>if (cond) {</code><br>&nbsp;&nbsp;...<br><code>} else {</code><br>&nbsp;&nbsp;...<br><code>}</code>"], ["<code>Mientras cond Hacer ... FinMientras</code>", "<code>while (cond) { ... }</code>"], ["<code>Repetir ... Hasta Que cond</code>", "<code>do { ... } while (!cond);</code>"], ["<code>Para i &lt;- 1 Hasta 10 Hacer</code>", "<code>for (let i = 1; i &lt;= 10; i++) {</code>"], ["<code>Segun x Hacer</code>", "<code>switch (x) {</code>"]])}` },
    { h: "if, else if, else", body: `
${CJ(`const nota = 8;
if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 7) {
  console.log("Muy bien");
} else if (nota >= 4) {
  console.log("Aprobado");
} else {
  console.log("Desaprobado");
}`)}
<p>¡Mira qué limpio queda! <code>else if</code> evita tener que anidar como hacíamos en pseudocódigo. Es lo mismo, solo que más cómodo de escribir.</p>
${TIP("Cuando un if tiene una sola instrucción las llaves son técnicamente opcionales, pero ponlas siempre. Evitan errores muy difíciles de ver.")}` },
    { h: "switch", body: `
${CJ(`const dia = 6;
switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 6:
  case 7:
    console.log("Fin de semana");
    break;
  default:
    console.log("Otro día");
}`)}
${WARN("Cada <code>case</code> necesita <code>break;</code> al final. Si lo olvidas, se siguen ejecutando los casos de abajo. Es un error muy común.")}` },
    { h: "while y do...while", body: `
${CJ(`let n = 1;
while (n <= 100) {
  n = n * 2;
}
console.log("Primera potencia de 2 mayor que 100:", n);

let intentos = 0;
do {
  intentos++;
} while (intentos < 3);
console.log("Intentos:", intentos);`)}` },
    { h: "for", body: `
<p>El <code>for</code> tiene tres partes separadas por <code>;</code>: <b>inicio</b>, <b>condición</b> y <b>actualización</b>. ¡Son las tres partes de un bucle que ya conoces!</p>
${CJ(`for (let i = 1; i <= 5; i++) {
  console.log(\`7 x \${i} = \${7 * i}\`);
}

// Contar hacia atrás de 2 en 2
for (let i = 10; i >= 0; i -= 2) {
  console.log(i);
}`)}
<p>Además existen <code>break</code> (salir del bucle ya) y <code>continue</code> (saltar a la siguiente vuelta):</p>
${CJ(`for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue;   // salta los pares
  if (i > 7) break;            // corta al pasar 7
  console.log(i);
}`)}
${PRO("El 80% de los bucles en código profesional moderno de JavaScript recorren arreglos, y para eso se usan formas aún más cortas (<code>for...of</code>, <code>.map</code>, <code>.filter</code>) que verás en la lección siguiente.")}` },
  ],
  cheat: [
    { h: "if / else if / else", body: CN(`if (x > 0) {
  ...
} else if (x === 0) {
  ...
} else {
  ...
}`, "js") },
    { h: "Bucles", body: CN(`while (cond) { ... }

do { ... } while (cond);

for (let i = 0; i < n; i++) { ... }`, "js") },
    { h: "switch", body: CN(`switch (op) {
  case 1: ...; break;
  default: ...
}`, "js") },
    { h: "Control", body: `<code>break</code> sale del bucle · <code>continue</code> pasa a la siguiente vuelta` },
  ],
  quiz: [
    { q: "¿Qué muestra?", code: "const x = 5;\nif (x > 10) {\n  console.log(\"A\");\n} else if (x > 3) {\n  console.log(\"B\");\n} else {\n  console.log(\"C\");\n}", lang: "js", opts: ["A", "B", "C", "B y C"], a: 1, why: "5 > 10 no; 5 > 3 sí: muestra B y no revisa el resto." },
    { q: "¿Cuántas veces se repite? <code>for (let i = 0; i &lt; 5; i++)</code>", opts: ["4", "5", "6", "Infinitas"], a: 1, why: "i toma 0, 1, 2, 3, 4." },
    { q: "¿Qué pasa si olvidas <code>break</code> en un case de switch?", opts: ["Error de sintaxis", "Se ejecutan también los casos siguientes", "No pasa nada", "Se repite el switch"], a: 1, why: "La ejecución «cae» a los casos de abajo hasta encontrar un break." },
    { q: "¿Qué hace <code>continue</code>?", opts: ["Termina el bucle", "Salta a la siguiente vuelta del bucle", "Repite la vuelta actual", "Termina el programa"], a: 1, why: "Ignora el resto del bloque en esa vuelta y sigue con la próxima." },
    { q: "¿Qué muestra?", code: "let s = 0;\nfor (let i = 2; i <= 6; i += 2) {\n  s += i;\n}\nconsole.log(s);", lang: "js", opts: ["12", "20", "6", "8"], a: 0, why: "2 + 4 + 6 = 12." },
  ],
  exercises: [
    { id: "ex15a", title: "FizzBuzz", lang: "js",
      text: "El clásico de las entrevistas: muestra los números del 1 al 15, uno por línea, pero si es múltiplo de 3 muestra <code>Fizz</code>, si es múltiplo de 5 muestra <code>Buzz</code> y si es múltiplo de ambos <code>FizzBuzz</code>.",
      starter: "for (let i = 1; i <= 15; i++) {\n  \n}",
      tests: [{ out: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz" }],
      hint: "Pregunta primero por múltiplo de 15 (o de 3 y 5 a la vez), después por 3, después por 5, y si no, el número.",
      solution: "for (let i = 1; i <= 15; i++) {\n  if (i % 15 === 0) {\n    console.log(\"FizzBuzz\");\n  } else if (i % 3 === 0) {\n    console.log(\"Fizz\");\n  } else if (i % 5 === 0) {\n    console.log(\"Buzz\");\n  } else {\n    console.log(i);\n  }\n}" },
    { id: "ex15b", title: "Clasificar temperatura", lang: "js",
      text: "Lee una temperatura con <code>Number(leer())</code> y muestra: <code>Frío</code> si es menor que 10, <code>Templado</code> si está entre 10 y 24 (incluidos), <code>Calor</code> si es 25 o más.",
      starter: "const t = Number(leer());\n",
      tests: [{ in: ["5"], out: "Frío" }, { in: ["10"], out: "Templado" }, { in: ["24"], out: "Templado" }, { in: ["31"], out: "Calor" }],
      hint: "if (t < 10) ... else if (t < 25) ... else ...",
      solution: "const t = Number(leer());\nif (t < 10) {\n  console.log(\"Frío\");\n} else if (t < 25) {\n  console.log(\"Templado\");\n} else {\n  console.log(\"Calor\");\n}" },
    { id: "ex15c", title: "Dígitos de un número", lang: "js",
      text: "Lee un número entero positivo y muestra cuántos dígitos tiene, <b>usando un while</b> (sin convertirlo a texto). Ejemplo: 4827 → <code>4</code>",
      starter: "let n = Number(leer());\nlet digitos = 0;\n",
      tests: [{ in: ["4827"], out: "4" }, { in: ["7"], out: "1" }, { in: ["100000"], out: "6" }],
      hint: "Mientras n > 0: n = Math.trunc(n / 10) y suma 1 al contador.",
      solution: "let n = Number(leer());\nlet digitos = 0;\nwhile (n > 0) {\n  n = Math.trunc(n / 10);\n  digitos++;\n}\nconsole.log(digitos);" },
  ]
});

L({
  id: "l16", module: "m4", title: "Funciones en JavaScript", minutes: 35, lang: "js",
  summary: "function, return, parámetros por defecto y funciones flecha.",
  sections: [
    { h: "Declarar y llamar funciones", body: `
${TABLE(["Pseudocódigo", "JavaScript"], [["<code>Funcion r &lt;- Doble(n)</code><br>&nbsp;&nbsp;<code>r &lt;- n * 2</code><br><code>FinFuncion</code>", "<code>function doble(n) {</code><br>&nbsp;&nbsp;<code>return n * 2;</code><br><code>}</code>"]])}
${CJ(`function doble(n) {
  return n * 2;
}

function saludar(nombre) {
  console.log("Hola, " + nombre);
}

console.log(doble(21));
saludar("Ada");`)}
<p>En JavaScript no hay diferencia de sintaxis entre «función» y «subproceso»: una función sin <code>return</code> simplemente devuelve <code>undefined</code>.</p>
${TIP("Convención de nombres: las funciones se nombran con un <b>verbo</b> en camelCase que diga qué hacen: <code>calcularTotal</code>, <code>esValido</code>, <code>obtenerUsuario</code>.")}` },
    { h: "Parámetros y valores por defecto", body: `
${CJ(`function precioFinal(precio, descuento = 0) {
  return precio - precio * descuento / 100;
}

console.log(precioFinal(1000));       // sin descuento
console.log(precioFinal(1000, 15));   // con 15%`)}
<p>Si no pasas un argumento, el parámetro vale <code>undefined</code>, salvo que le hayas dado un <b>valor por defecto</b> con <code>=</code>.</p>` },
    { h: "Funciones flecha", body: `
<p>Es una forma más corta de escribir funciones, muy usada en JavaScript moderno:</p>
${CJ(`// Forma clásica
function cuadrado(x) {
  return x * x;
}

// Forma flecha
const cuadrado2 = (x) => x * x;

// Flecha con varias líneas
const describir = (nombre, edad) => {
  const etapa = edad >= 18 ? "adulto" : "menor";
  return \`\${nombre} es \${etapa}\`;
};

console.log(cuadrado(5), cuadrado2(5));
console.log(describir("Luis", 15));`)}
<p>Arriba aparece otra herramienta: el <b>operador ternario</b> <code>condición ? siVerdadero : siFalso</code>, un if/else compacto que devuelve un valor.</p>` },
    { h: "Ámbito y funciones puras", body: `
${CJ(`const IMPUESTO = 0.21;   // variable global (se ve desde todo el archivo)

function conImpuesto(precio) {
  const total = precio * (1 + IMPUESTO);   // local
  return total;
}

console.log(conImpuesto(100));
// console.log(total);  // error: total solo existe dentro de la función`)}
<p>Una <b>función pura</b> es la que solo depende de sus parámetros y no modifica nada de afuera: dados los mismos datos, siempre devuelve lo mismo. Son las más fáciles de probar y reutilizar.</p>
${PRO("En los equipos de desarrollo se escriben <b>tests automáticos</b>: pequeños programas que llaman a tus funciones con datos conocidos y verifican el resultado. ¡Es exactamente lo que hace el botón <b>Comprobar</b> de los retos de esta app!")}` },
  ],
  cheat: [
    { h: "Declarar", body: CN(`function sumar(a, b) {
  return a + b;
}
const sumar2 = (a, b) => a + b;`, "js") },
    { h: "Por defecto y ternario", body: CN(`function saludar(n = "invitado") { ... }
const tipo = edad >= 18 ? "adulto" : "menor";`, "js") },
    { h: "Recuerda", body: `<ul><li><code>return</code> devuelve y termina.</li><li>Sin return → <code>undefined</code>.</li><li>Nombres con verbo: <code>calcularTotal</code>.</li><li>Prefiere funciones puras.</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué muestra?", code: "function f(x) {\n  return x + 1;\n  console.log(\"hola\");\n}\nconsole.log(f(1));", lang: "js", opts: ["hola y 2", "2", "hola", "undefined"], a: 1, why: "return termina la función: el console.log de adentro nunca se ejecuta." },
    { q: "¿Qué devuelve una función sin return?", opts: ["0", "null", "undefined", "Error"], a: 2, why: "Devuelve undefined." },
    { q: "¿Qué valor tiene <code>r</code>?", code: "const area = (b, h = 2) => b * h;\nconst r = area(5);", lang: "js", opts: ["5", "10", "NaN", "undefined"], a: 1, why: "h toma el valor por defecto 2: 5 × 2 = 10." },
    { q: "¿Qué da <code>10 > 5 ? \"sí\" : \"no\"</code>?", opts: ["\"sí\"", "\"no\"", "true", "10"], a: 0, why: "La condición es verdadera, devuelve el primer valor." },
    { q: "¿Cuál es el mejor nombre para una función que verifica si un email es válido?", opts: ["email", "x", "esEmailValido", "Funcion1"], a: 2, why: "Verbo + qué hace, en camelCase. Para funciones que devuelven boolean es común empezar con «es» o «tiene»." },
  ],
  exercises: [
    { id: "ex16a", title: "esPar", lang: "js",
      text: "Escribe una función <code>esPar(n)</code> que devuelva <code>true</code> si n es par y <code>false</code> si no.",
      starter: "function esPar(n) {\n  \n}\n\nconsole.log(esPar(4), esPar(7));",
      tests: [{ expr: "esPar(4)", expect: true }, { expr: "esPar(7)", expect: false }, { expr: "esPar(0)", expect: true }, { expr: "esPar(-2)", expect: true }],
      hint: "return n % 2 === 0;",
      solution: "function esPar(n) {\n  return n % 2 === 0;\n}\n\nconsole.log(esPar(4), esPar(7));" },
    { id: "ex16b", title: "Calcular IMC", lang: "js",
      text: "Escribe <code>imc(peso, altura)</code> que devuelva el índice de masa corporal (peso / altura²) <b>redondeado a 1 decimal</b>. Pista: <code>Math.round(x * 10) / 10</code>.",
      starter: "function imc(peso, altura) {\n  \n}\n\nconsole.log(imc(70, 1.75));",
      tests: [{ expr: "imc(70, 1.75)", expect: 22.9 }, { expr: "imc(50, 1.6)", expect: 19.5 }, { expr: "imc(90, 1.8)", expect: 27.8 }],
      hint: "const valor = peso / (altura ** 2); return Math.round(valor * 10) / 10;",
      solution: "function imc(peso, altura) {\n  const valor = peso / (altura ** 2);\n  return Math.round(valor * 10) / 10;\n}\n\nconsole.log(imc(70, 1.75));" },
    { id: "ex16c", title: "Contar vocales", lang: "js",
      text: "Escribe <code>contarVocales(texto)</code> que devuelva cuántas vocales (a, e, i, o, u, sin importar mayúsculas) tiene el texto. Puedes recorrer un texto con <code>for (const letra of texto)</code> y usar <code>\"aeiou\".includes(letra)</code>.",
      starter: "function contarVocales(texto) {\n  \n}\n\nconsole.log(contarVocales(\"Hola Mundo\"));",
      tests: [{ expr: "contarVocales(\"Hola Mundo\")", expect: 4 }, { expr: "contarVocales(\"AEIOU\")", expect: 5 }, { expr: "contarVocales(\"xyz\")", expect: 0 }],
      hint: "Pasa el texto a minúsculas con texto.toLowerCase() y usa un contador.",
      solution: "function contarVocales(texto) {\n  let c = 0;\n  for (const letra of texto.toLowerCase()) {\n    if (\"aeiou\".includes(letra)) c++;\n  }\n  return c;\n}\n\nconsole.log(contarVocales(\"Hola Mundo\"));" },
  ]
});

L({
  id: "l17", module: "m4", title: "Arreglos y objetos en JavaScript", minutes: 45, lang: "js",
  summary: "Arrays con sus métodos (push, map, filter...) y objetos para modelar datos reales.",
  sections: [
    { h: "Arrays", body: `
<p>En JavaScript los arreglos se escriben entre corchetes y, a diferencia del pseudocódigo, <b>pueden crecer</b>: no necesitas indicar el tamaño.</p>
${CJ(`const frutas = ["manzana", "pera", "uva"];
console.log(frutas[0]);         // primera
console.log(frutas.length);     // cantidad
frutas.push("kiwi");            // agrega al final
console.log(frutas);
const ultima = frutas.pop();    // quita el último y lo devuelve
console.log(ultima, frutas);
console.log(frutas.indexOf("pera"));    // posición, o -1
console.log(frutas.includes("uva"));    // ¿está?`)}` },
    { h: "Recorrer arrays", body: `
${CJ(`const notas = [7, 9, 5, 10];

// for clásico (cuando necesitas el índice)
for (let i = 0; i < notas.length; i++) {
  console.log(\`Nota \${i}: \${notas[i]}\`);
}

// for...of (más simple, cuando solo necesitas el valor)
let suma = 0;
for (const nota of notas) {
  suma += nota;
}
console.log("Promedio:", suma / notas.length);`)}` },
    { h: "Métodos poderosos: map, filter, reduce, sort", body: `
<p>Los arrays traen métodos que reemplazan los patrones de bucles que ya conoces. Reciben una <b>función</b> (normalmente una flecha) que se aplica a cada elemento:</p>
${TABLE(["Método", "Qué hace", "Patrón que reemplaza"], [["<code>map</code>", "Transforma cada elemento → arreglo nuevo", "Recorrer y construir otra lista"], ["<code>filter</code>", "Se queda con los que cumplen la condición", "Recorrer con un Si"], ["<code>reduce</code>", "Combina todos en un solo valor", "Acumulador"], ["<code>find</code>", "Primer elemento que cumple", "Búsqueda lineal"], ["<code>sort</code>", "Ordena", "Burbuja (pero más eficiente)"]])}
${CJ(`const precios = [120, 85, 300, 45, 210];

const conIva = precios.map((p) => p * 1.21);
const baratos = precios.filter((p) => p < 100);
const total = precios.reduce((acum, p) => acum + p, 0);
const primeroCaro = precios.find((p) => p > 200);
const ordenados = [...precios].sort((a, b) => a - b);

console.log(conIva);
console.log(baratos);
console.log(total);
console.log(primeroCaro);
console.log(ordenados);`)}
${WARN("<code>sort()</code> sin función ordena como <b>texto</b>: <code>[10, 9, 100].sort()</code> da <code>[10, 100, 9]</code>. Para números usa siempre <code>sort((a, b) =&gt; a - b)</code>.")}` },
    { h: "Objetos", body: `
<p>Un <b>objeto</b> agrupa datos relacionados con <b>nombre</b>. En lugar de posiciones numéricas, usa <b>propiedades</b>. Es la forma de representar «cosas» del mundo real: un usuario, un producto, un pedido.</p>
${CJ(`const persona = {
  nombre: "Ada",
  edad: 36,
  lenguajes: ["JavaScript", "Python"],
};

console.log(persona.nombre);
console.log(persona["edad"]);
persona.edad = 37;              // modificar
persona.ciudad = "Londres";     // agregar
console.log(persona);
console.log(persona.lenguajes.length);`)}` },
    { h: "Arrays de objetos: datos reales", body: `
<p>Casi todos los datos de una aplicación real tienen esta forma: una lista de objetos. Así llegan los productos de una tienda, los mensajes de un chat o los resultados de una búsqueda.</p>
${CJ(`const productos = [
  { nombre: "Teclado", precio: 45, stock: 10 },
  { nombre: "Monitor", precio: 220, stock: 0 },
  { nombre: "Mouse", precio: 20, stock: 35 },
  { nombre: "Auriculares", precio: 80, stock: 4 },
];

const disponibles = productos.filter((p) => p.stock > 0);
const nombres = disponibles.map((p) => p.nombre);
const valorInventario = productos.reduce((t, p) => t + p.precio * p.stock, 0);
const masBarato = [...productos].sort((a, b) => a.precio - b.precio)[0];

console.log("Disponibles:", nombres);
console.log("Valor del inventario: $" + valorInventario);
console.log("Más barato:", masBarato.nombre);`)}
${PRO("Este formato (objetos y arreglos) es casi idéntico a <b>JSON</b>, el formato con el que se comunican prácticamente todas las aplicaciones y servidores de internet. Cuando consultes una API, recibirás datos así.")}` },
  ],
  cheat: [
    { h: "Arrays", body: CN(`const a = [1, 2, 3];
a.length  a[0]  a.push(4)  a.pop()
a.indexOf(2)  a.includes(2)
for (const x of a) { ... }`, "js") },
    { h: "Métodos", body: CN(`a.map(x => x * 2)
a.filter(x => x > 1)
a.reduce((acc, x) => acc + x, 0)
a.find(x => x > 1)
[...a].sort((x, y) => x - y)`, "js") },
    { h: "Objetos", body: CN(`const p = { nombre: "Ana", edad: 30 };
p.nombre      p["edad"]
p.ciudad = "Lima";`, "js") },
  ],
  quiz: [
    { q: "¿Qué muestra?", code: "const a = [3, 6, 9];\na.push(12);\nconsole.log(a.length);", lang: "js", opts: ["3", "4", "12", "30"], a: 1, why: "push agregó un elemento: ahora hay 4." },
    { q: "¿Qué devuelve <code>[1, 2, 3, 4].filter(x =&gt; x % 2 === 0)</code>?", opts: ["[2, 4]", "[1, 3]", "2", "true"], a: 0, why: "Se queda con los pares." },
    { q: "¿Qué devuelve <code>[1, 2, 3].reduce((acc, x) =&gt; acc + x, 0)</code>?", opts: ["[1, 2, 3]", "6", "0", "3"], a: 1, why: "Acumula: 0+1+2+3 = 6." },
    { q: "¿Qué muestra?", code: "const auto = { marca: \"Fiat\", anio: 2020 };\nconsole.log(auto.anio + 1);", lang: "js", opts: ["2021", "20201", "undefined", "Error"], a: 0, why: "auto.anio es el número 2020." },
    { q: "¿Por qué conviene <code>sort((a, b) =&gt; a - b)</code> para números?", opts: ["Es más rápido", "Sin función, sort ordena como texto", "Para ordenar al revés", "No hace diferencia"], a: 1, why: "Por defecto compara como texto: 100 queda antes que 9." },
    { q: "¿Qué devuelve <code>[\"a\", \"b\"].indexOf(\"z\")</code>?", opts: ["0", "-1", "undefined", "2"], a: 1, why: "-1 indica que no está." },
  ],
  exercises: [
    { id: "ex17a", title: "Aprobados", lang: "js",
      text: "Escribe <code>aprobados(notas)</code> que reciba un arreglo de notas y devuelva un arreglo nuevo solo con las que son 6 o más.",
      starter: "function aprobados(notas) {\n  \n}\n\nconsole.log(aprobados([4, 8, 6, 3, 10]));",
      tests: [{ expr: "aprobados([4, 8, 6, 3, 10])", expect: [8, 6, 10] }, { expr: "aprobados([1, 2])", expect: [] }],
      hint: "return notas.filter((n) => n >= 6);",
      solution: "function aprobados(notas) {\n  return notas.filter((n) => n >= 6);\n}\n\nconsole.log(aprobados([4, 8, 6, 3, 10]));" },
    { id: "ex17b", title: "Nombres en mayúsculas", lang: "js",
      text: "Escribe <code>nombresMayus(personas)</code> que reciba un arreglo de objetos <code>{ nombre, edad }</code> y devuelva un arreglo con los nombres en mayúsculas de quienes tienen 18 años o más.",
      starter: "function nombresMayus(personas) {\n  \n}\n\nconsole.log(nombresMayus([{ nombre: \"ana\", edad: 20 }, { nombre: \"leo\", edad: 15 }]));",
      tests: [{ expr: "nombresMayus([{ nombre: \"ana\", edad: 20 }, { nombre: \"leo\", edad: 15 }])", expect: ["ANA"] }, { expr: "nombresMayus([{ nombre: \"sol\", edad: 18 }, { nombre: \"max\", edad: 40 }])", expect: ["SOL", "MAX"] }],
      hint: "Encadena: personas.filter(p => p.edad >= 18).map(p => p.nombre.toUpperCase())",
      solution: "function nombresMayus(personas) {\n  return personas\n    .filter((p) => p.edad >= 18)\n    .map((p) => p.nombre.toUpperCase());\n}\n\nconsole.log(nombresMayus([{ nombre: \"ana\", edad: 20 }, { nombre: \"leo\", edad: 15 }]));" },
    { id: "ex17c", title: "Total del carrito", lang: "js",
      text: "Escribe <code>totalCarrito(items)</code> que reciba un arreglo de objetos <code>{ precio, cantidad }</code> y devuelva el total a pagar.",
      starter: "function totalCarrito(items) {\n  \n}\n\nconsole.log(totalCarrito([{ precio: 10, cantidad: 3 }, { precio: 5, cantidad: 2 }]));",
      tests: [{ expr: "totalCarrito([{ precio: 10, cantidad: 3 }, { precio: 5, cantidad: 2 }])", expect: 40 }, { expr: "totalCarrito([])", expect: 0 }],
      hint: "items.reduce((total, it) => total + it.precio * it.cantidad, 0)",
      solution: "function totalCarrito(items) {\n  return items.reduce((total, it) => total + it.precio * it.cantidad, 0);\n}\n\nconsole.log(totalCarrito([{ precio: 10, cantidad: 3 }, { precio: 5, cantidad: 2 }]));" },
  ]
});

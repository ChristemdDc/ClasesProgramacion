/* MÓDULO 1 · Pensar como programador */
MOD({
  id: "m1", n: 1, title: "Pensar como programador", lang: "pseudo",
  desc: "Qué es programar, algoritmos, variables, datos, entrada/salida y operaciones. La base de todo lo demás.",
  lessons: ["l01", "l02", "l03", "l04"],
  exam: {
    extra: [
      { q: "¿Qué valor tiene <code>x</code> al final?", code: "x <- 4\nx <- x * 2\nx <- x - 3", opts: ["4", "5", "8", "-3"], a: 1, why: "Se ejecuta en orden: x=4, luego 4*2=8, luego 8-3=5." },
      { q: "¿Qué tipo de dato usarías para guardar el precio de un producto, por ejemplo 19.99?", opts: ["Entero", "Real", "Cadena", "Logico"], a: 1, why: "Tiene decimales, así que es Real." },
      { q: "¿Cuál es el resultado de <code>17 MOD 5</code>?", opts: ["3", "2", "3.4", "12"], a: 1, why: "17 dividido 5 da 3 y sobran 2. MOD devuelve lo que sobra: 2." },
      { q: "¿Qué muestra este programa?", code: 'a <- "3"\nb <- "4"\nEscribir a + b', opts: ["7", "34", "a+b", "Error"], a: 1, why: "Son textos (están entre comillas). Sumar textos los une: \"3\" + \"4\" = \"34\"." },
      { q: "¿Cuánto vale <code>2 + 3 * 4</code>?", opts: ["20", "14", "24", "9"], a: 1, why: "Primero la multiplicación: 3*4=12, luego 2+12=14." },
      { q: "¿Qué da <code>(5 > 3) Y (2 > 8)</code>?", opts: ["VERDADERO", "FALSO", "Error", "5"], a: 1, why: "Con Y ambas partes deben ser verdaderas. 2 > 8 es falso, así que todo es FALSO." },
      { q: "Un algoritmo debe ser...", opts: ["Largo y detallado", "Preciso, ordenado y finito", "Escrito en inglés", "Ejecutado solo por computadoras"], a: 1, why: "Un algoritmo es una secuencia de pasos precisos, en orden, que termina." },
      { q: "¿Qué instrucción guarda en la variable <code>edad</code> lo que escribe la persona usuaria?", opts: ["Escribir edad", "edad <- Leer", "Leer edad", "Definir edad"], a: 2, why: "Leer espera a que la persona escriba algo y lo guarda en la variable indicada." },
      { fill: true, q: "Completa: para asignar el valor 10 a la variable <code>puntos</code> se escribe <code>puntos ___ 10</code>", a: ["<-", "←"], why: "La flecha <- significa \"recibe\": puntos recibe 10." },
      { q: "¿Cuál de estos nombres de variable es válido?", opts: ["2numero", "mi nombre", "total_ventas", "Si"], a: 2, why: "No puede empezar con número, ni tener espacios, ni ser palabra reservada como Si." },
    ],
    challenge: {
      id: "ex_m1", title: "Calculadora de propina",
      text: "Lee el total de una cuenta (número real) y el porcentaje de propina (entero). Calcula la propina y el total a pagar. La <b>última línea</b> que muestres debe ser:<br><code>Total a pagar: X</code><br>donde X es la cuenta más la propina.",
      lang: "pseudo",
      starter: 'Algoritmo Propina\n\tDefinir cuenta, propina Como Real\n\tDefinir porcentaje Como Entero\n\tEscribir "Total de la cuenta:"\n\tLeer cuenta\n\t// Completa aquí\n\nFinAlgoritmo',
      tests: [{ in: ["100", "10"], out: "Total a pagar: 110" }, { in: ["80", "15"], out: "Total a pagar: 92" }, { in: ["45.5", "20"], out: "Total a pagar: 54.6" }],
      hint: "La propina es cuenta * porcentaje / 100. Luego suma la cuenta y la propina.",
      solution: 'Algoritmo Propina\n\tDefinir cuenta, propina Como Real\n\tDefinir porcentaje Como Entero\n\tEscribir "Total de la cuenta:"\n\tLeer cuenta\n\tEscribir "Porcentaje de propina:"\n\tLeer porcentaje\n\tpropina <- cuenta * porcentaje / 100\n\tEscribir "Propina: ", propina\n\tEscribir "Total a pagar: ", cuenta + propina\nFinAlgoritmo'
    }
  }
});

L({
  id: "l01", module: "m1", title: "¿Qué es programar?", minutes: 20,
  summary: "Algoritmos, cómo «piensa» una computadora y tu primer programa.",
  sections: [
    { h: "Programar es dar instrucciones", body: `
<p>Una computadora es una máquina muy rápida y muy obediente, pero que <b>no entiende nada por su cuenta</b>. Hace exactamente lo que le dices, ni más ni menos. Programar es escribir esas instrucciones de una forma tan clara que una máquina pueda seguirlas sin adivinar.</p>
${IDEA("Imagina que le explicas a alguien, por teléfono, cómo preparar un café, pero esa persona nunca vio una cocina. No puedes decir «prepara un café»; tienes que decir «toma la taza del estante de la izquierda», «llena la pava con agua», «enciéndela»... Esa es la mentalidad de un programador: <b>dividir un problema en pasos pequeños y precisos</b>.")}
<p>La buena noticia: no necesitas ser un genio de las matemáticas. Necesitas aprender a <b>ordenar ideas</b>, tener paciencia y practicar. Eso se entrena.</p>` },
    { h: "¿Qué es un algoritmo?", body: `
<p>Un <b>algoritmo</b> es una lista de pasos ordenados para resolver un problema. Una receta de cocina es un algoritmo. Las instrucciones para armar un mueble también.</p>
<p>Para que un algoritmo sirva tiene que ser:</p>
<ul>
<li><b>Preciso:</b> cada paso dice exactamente qué hacer, sin ambigüedad.</li>
<li><b>Ordenado:</b> los pasos van en una secuencia. El orden importa: no puedes servir el café antes de calentar el agua.</li>
<li><b>Finito:</b> tiene que terminar en algún momento.</li>
</ul>
<p>Ejemplo de algoritmo, en español común, para saber si puedes cruzar la calle:</p>
<ol><li>Mira el semáforo peatonal.</li><li>Si está en verde, cruza.</li><li>Si no, espera y vuelve al paso 1.</li></ol>
<p>Fíjate que ya aparecen ideas que vas a usar todo el tiempo: <b>decisiones</b> («si está en verde») y <b>repeticiones</b> («vuelve al paso 1»).</p>` },
    { h: "Entrada, proceso y salida", body: `
<p>Casi todos los programas siguen el mismo esquema:</p>
${TABLE(["Parte", "Qué es", "Ejemplo en una calculadora"], [["<b>Entrada</b>", "Los datos que recibe el programa", "Los números que tecleas"], ["<b>Proceso</b>", "Lo que hace con esos datos", "Sumarlos"], ["<b>Salida</b>", "El resultado que muestra", "El total en la pantalla"]])}
<p>Cuando enfrentes un problema nuevo, hazte siempre estas tres preguntas: <i>¿qué datos tengo?, ¿qué tengo que hacer con ellos?, ¿qué tengo que mostrar?</i></p>` },
    { h: "Pseudocódigo: programar en español", body: `
<p>Los lenguajes de programación reales (JavaScript, Python, Java...) tienen reglas de escritura estrictas y están en inglés. Al principio eso distrae: pasas más tiempo peleando con un punto y coma que pensando la solución.</p>
<p>Por eso empezamos con <b>pseudocódigo</b>: una forma de escribir algoritmos en español, con pocas reglas, que se parece mucho a un lenguaje real. Lo que aprendas aquí (variables, decisiones, bucles, funciones) es <b>exactamente lo mismo</b> que usarás después en cualquier lenguaje. Solo cambian las palabras.</p>
${PRO("Los programadores profesionales escriben pseudocódigo en papel o en una pizarra antes de programar algo difícil. Es una herramienta para pensar, no solo para principiantes.")}
<p>En esta app, el pseudocódigo se puede <b>ejecutar de verdad</b> en el Laboratorio. Sigue el estilo de PSeInt, un programa muy usado para aprender en universidades y escuelas de habla hispana.</p>` },
    { h: "Tu primer programa", body: `
<p>Tradicionalmente, el primer programa que escribe cualquier persona muestra el mensaje «Hola, mundo». Aquí está:</p>
${C(`Algoritmo HolaMundo
	Escribir "Hola, mundo"
FinAlgoritmo`)}
<p>Línea por línea:</p>
<ul>
<li><code>Algoritmo HolaMundo</code>: indica dónde empieza el programa y le da un nombre.</li>
<li><code>Escribir "Hola, mundo"</code>: muestra en pantalla el texto que está entre comillas.</li>
<li><code>FinAlgoritmo</code>: indica dónde termina.</li>
</ul>
<p>Toca <b>Probar</b> en el bloque de arriba para abrirlo en el Laboratorio y ejecútalo. Después cambia el mensaje y vuelve a ejecutar.</p>
<p>Puedes escribir varias instrucciones; se ejecutan <b>de arriba hacia abajo</b>, una por una:</p>
${C(`Algoritmo Presentacion
	// Esto es un comentario: la computadora lo ignora
	Escribir "Hola, me llamo Ada"
	Escribir "Estoy aprendiendo a programar"
	Escribir "¡Y me está gustando!"
FinAlgoritmo`)}
<p>Las líneas que empiezan con <code>//</code> son <b>comentarios</b>: notas para las personas que leen el código. La computadora las ignora.</p>
${TIP("La sangría (el espacio al inicio de las líneas de adentro) no es obligatoria, pero hace el código mucho más fácil de leer. Acostúmbrate a usarla desde el principio. En el editor puedes usar el botón ⇥ para insertarla.")}` },
    { h: "Los errores son normales", body: `
<p>Vas a ver muchos mensajes de error. <b>Todos los programadores los ven todos los días</b>, incluso con 20 años de experiencia. Un error no significa que lo estás haciendo mal: es la computadora diciéndote qué no entendió.</p>
<p>Prueba ejecutar este programa, que tiene un error a propósito:</p>
${C(`Algoritmo ConError
	Escribir "Falta cerrar las comillas
FinAlgoritmo`)}
<p>El mensaje te dice <b>en qué línea</b> está el problema y <b>qué</b> pasó. Acostúmbrate a leerlo con calma: casi siempre te da la pista exacta.</p>
${WARN("Las comillas tienen que ser rectas <code>\"</code>. Si copias texto de Word o de un chat a veces aparecen comillas curvas “ ” que pueden dar problemas en lenguajes reales.")}` },
  ],
  cheat: [
    { h: "Estructura de un programa", body: CN(`Algoritmo NombreDelPrograma
	// instrucciones aquí
FinAlgoritmo`) },
    { h: "Mostrar texto", body: CN(`Escribir "texto entre comillas"`) },
    { h: "Comentarios", body: CN(`// La computadora ignora esta línea`) },
    { h: "Ideas clave", body: `<ul><li><b>Algoritmo</b>: pasos precisos, ordenados y finitos.</li><li>Esquema <b>entrada → proceso → salida</b>.</li><li>Las instrucciones se ejecutan <b>de arriba hacia abajo</b>.</li><li>Un error indica la <b>línea</b> y el <b>motivo</b>: léelo.</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué es un algoritmo?", opts: ["Un tipo de computadora", "Una secuencia de pasos ordenados para resolver un problema", "Un lenguaje de programación", "Un error del programa"], a: 1, why: "Un algoritmo es una lista de pasos precisos y ordenados. Una receta de cocina es un ejemplo." },
    { q: "La computadora...", opts: ["Adivina lo que quisiste decir", "Hace exactamente lo que le indicas", "Corrige tus errores sola", "Entiende cualquier idioma"], a: 1, why: "Sigue las instrucciones al pie de la letra. Por eso hay que ser precisos." },
    { q: "En una app que convierte dólares a pesos, ¿cuál es la entrada?", opts: ["El resultado en pesos", "La cantidad de dólares que escribe la persona", "La fórmula de conversión", "La pantalla"], a: 1, why: "La entrada son los datos que recibe el programa: la cantidad en dólares." },
    { q: "¿Qué muestra este programa?", code: 'Algoritmo Prueba\n\tEscribir "Uno"\n\t// Escribir "Dos"\n\tEscribir "Tres"\nFinAlgoritmo', opts: ["Uno Dos Tres", "Uno y Tres", "Solo Tres", "Nada, da error"], a: 1, why: "La línea con // es un comentario y no se ejecuta." },
    { q: "¿Por qué empezamos con pseudocódigo?", opts: ["Porque es el lenguaje más usado en empresas", "Para concentrarnos en la lógica sin pelear con reglas de escritura", "Porque las computadoras lo prefieren", "Porque no tiene errores"], a: 1, why: "Te permite pensar la solución. Luego traducirla a cualquier lenguaje es fácil." },
    { q: "Un programa muestra un error en la línea 3. ¿Qué es lo mejor que puedes hacer?", opts: ["Borrar todo y empezar de nuevo", "Leer el mensaje y revisar la línea 3", "Ignorarlo", "Rendirse: programar no es para mí"], a: 1, why: "El mensaje de error es una pista. Leerlo con calma es una de las habilidades más importantes." },
    { q: "¿Qué propiedad NO cumple este «algoritmo»? <i>1. Toma un número. 2. Súmale 1. 3. Vuelve al paso 2.</i>", opts: ["Preciso", "Ordenado", "Finito", "Todas las cumple"], a: 2, why: "Nunca termina: vuelve al paso 2 para siempre. Un algoritmo tiene que terminar." },
  ],
  exercises: [
    { id: "ex01a", title: "Hola, mundo", lang: "pseudo",
      text: "Escribe un programa que muestre exactamente estas dos líneas:<br><code>Hola, mundo</code><br><code>Estoy aprendiendo a programar</code>",
      starter: "Algoritmo Saludo\n\t\nFinAlgoritmo",
      tests: [{ in: [], out: "Hola, mundo\nEstoy aprendiendo a programar", exact: true }],
      hint: "Usa una instrucción Escribir para cada línea. El texto va entre comillas.",
      solution: 'Algoritmo Saludo\n\tEscribir "Hola, mundo"\n\tEscribir "Estoy aprendiendo a programar"\nFinAlgoritmo' },
    { id: "ex01b", title: "Dibujar un rectángulo", lang: "pseudo",
      text: "Muestra este dibujo hecho con asteriscos, usando tres instrucciones Escribir:<br><pre class=\"mini\">*****\n*   *\n*****</pre>",
      starter: "Algoritmo Rectangulo\n\t\nFinAlgoritmo",
      tests: [{ in: [], out: "*****\n*   *\n*****", exact: true, keepSpaces: true }],
      hint: "La línea del medio tiene un asterisco, tres espacios y otro asterisco.",
      solution: 'Algoritmo Rectangulo\n\tEscribir "*****"\n\tEscribir "*   *"\n\tEscribir "*****"\nFinAlgoritmo' },
  ]
});

L({
  id: "l02", module: "m1", title: "Variables y tipos de datos", minutes: 30,
  summary: "Cómo guarda información un programa: variables, asignación y tipos.",
  sections: [
    { h: "Una variable es una caja con nombre", body: `
<p>Los programas necesitan <b>recordar</b> datos: el nombre de alguien, un precio, cuántos puntos lleva un jugador. Para eso usamos <b>variables</b>.</p>
${IDEA("Una variable es como una caja con una etiqueta. La etiqueta es el <b>nombre</b> (por ejemplo <code>edad</code>) y dentro guardas un <b>valor</b> (por ejemplo <code>25</code>). Puedes mirar qué hay dentro o reemplazarlo por otra cosa, pero la caja solo guarda un valor a la vez.")}
<p>Para guardar un valor en una variable usamos la flecha <code>&lt;-</code>, que se lee <b>«recibe»</b>:</p>
${C(`Algoritmo Variables
	edad <- 25
	nombre <- "Ada"
	Escribir nombre
	Escribir edad
FinAlgoritmo`)}
<p><code>edad &lt;- 25</code> se lee «edad recibe 25». Esta operación se llama <b>asignación</b>.</p>
${TIP("Fíjate en la diferencia: <code>Escribir nombre</code> muestra el <i>contenido</i> de la variable (Ada). <code>Escribir \"nombre\"</code> muestra literalmente la palabra nombre.")}` },
    { h: "El valor puede cambiar", body: `
<p>Por eso se llama <i>variable</i>. Cuando asignas un valor nuevo, el anterior <b>se pierde</b>:</p>
${C(`Algoritmo Cambia
	puntos <- 10
	Escribir puntos
	puntos <- 50
	Escribir puntos
FinAlgoritmo`)}
<p>Algo muy común es calcular el nuevo valor <b>a partir del anterior</b>. Mira esto:</p>
${C(`Algoritmo Incrementar
	vidas <- 3
	vidas <- vidas + 1
	Escribir vidas
FinAlgoritmo`)}
<p><code>vidas &lt;- vidas + 1</code> no es una ecuación matemática. Se ejecuta así: <b>primero</b> se calcula el lado derecho (3 + 1 = 4) y <b>después</b> ese resultado se guarda en <code>vidas</code>. Regla de oro: <b>la derecha se calcula primero, luego se guarda a la izquierda</b>.</p>` },
    { h: "Tipos de datos", body: `
<p>No todos los datos son iguales. No es lo mismo un número que un texto. Estos son los tipos básicos:</p>
${TABLE(["Tipo", "Qué guarda", "Ejemplos"], [["<b>Entero</b>", "Números sin decimales", "<code>7</code>, <code>-3</code>, <code>2026</code>"], ["<b>Real</b>", "Números con decimales", "<code>3.14</code>, <code>-0.5</code>, <code>19.99</code>"], ["<b>Cadena</b>", "Texto (siempre entre comillas)", "<code>\"Hola\"</code>, <code>\"Ana\"</code>, <code>\"123\"</code>"], ["<b>Logico</b>", "Solo dos valores: verdadero o falso", "<code>Verdadero</code>, <code>Falso</code>"]])}
<p>Se recomienda <b>definir</b> el tipo de cada variable antes de usarla con <code>Definir</code>:</p>
${C(`Algoritmo Tipos
	Definir edad Como Entero
	Definir altura Como Real
	Definir nombre Como Cadena
	Definir esEstudiante Como Logico

	edad <- 30
	altura <- 1.68
	nombre <- "Grace"
	esEstudiante <- Verdadero

	Escribir nombre, " tiene ", edad, " años"
	Escribir "¿Estudia? ", esEstudiante
FinAlgoritmo`)}
<p>¿Por qué definir? Porque así la computadora te avisa si te equivocas. Prueba esto:</p>
${C(`Algoritmo TipoIncorrecto
	Definir edad Como Entero
	edad <- "treinta"
FinAlgoritmo`)}
${WARN("<code>\"123\"</code> (con comillas) es un texto, no un número. No puedes hacer cuentas con él. <code>123</code> (sin comillas) sí es un número.")}
${PRO("En lenguajes como Java, C# o TypeScript es obligatorio indicar el tipo. En JavaScript o Python no, pero los tipos siguen existiendo y causan muchos errores si no los entiendes. Por eso aprenderlos ahora es tan valioso.")}` },
    { h: "Cómo nombrar variables", body: `
<p>Reglas que <b>debes</b> cumplir:</p>
<ul><li>Empezar con una letra (no con un número).</li><li>Sin espacios: usa <code>totalVentas</code> o <code>total_ventas</code>.</li><li>No usar palabras reservadas como <code>Si</code>, <code>Escribir</code>, <code>Y</code>, <code>O</code>.</li></ul>
<p>Buenas prácticas que <b>conviene</b> seguir:</p>
<ul><li>Nombres que expliquen qué guardan: <code>precioFinal</code> es mejor que <code>pf</code> o <code>x</code>.</li><li>Evita tildes y la ñ en los nombres (en muchos lenguajes dan problemas): <code>anio</code> en lugar de <code>año</code>.</li><li>Elige un estilo y mantenlo. El más usado es <b>camelCase</b>: la primera palabra en minúscula y las siguientes empiezan con mayúscula (<code>cantidadDeAlumnos</code>).</li></ul>
${TABLE(["Nombre", "¿Válido?", "Por qué"], [["<code>nombre</code>", "✔", "Claro y simple"], ["<code>precioTotal</code>", "✔", "camelCase"], ["<code>2do_lugar</code>", "✘", "Empieza con número"], ["<code>mi edad</code>", "✘", "Tiene un espacio"], ["<code>Si</code>", "✘", "Es palabra reservada"], ["<code>x</code>", "✔ pero...", "Válido, pero no dice qué guarda"]])}` },
    { h: "Prueba de escritorio", body: `
<p>Una <b>prueba de escritorio</b> es seguir un programa a mano, paso a paso, anotando cuánto vale cada variable. Es la mejor forma de entender qué hace un código. Hagámosla con este:</p>
${C(`Algoritmo Prueba
	a <- 5
	b <- 3
	a <- a + b
	b <- a - b
	Escribir a, " ", b
FinAlgoritmo`)}
${TABLE(["Línea", "a", "b"], [["a <- 5", "5", "—"], ["b <- 3", "5", "3"], ["a <- a + b", "8", "3"], ["b <- a - b", "8", "5"]])}
<p>Resultado: muestra <code>8 5</code>. En el Laboratorio tienes el botón <b>Paso a paso</b>, que hace esta tabla automáticamente: ejecuta una línea por vez y te muestra el valor de cada variable.</p>
${TIP("Cuando un programa no hace lo que esperas, haz una prueba de escritorio. En el 90% de los casos encontrarás el error.")}` },
  ],
  cheat: [
    { h: "Asignar (guardar un valor)", body: CN(`variable <- valor
contador <- contador + 1   // derecha primero, luego guarda`) },
    { h: "Definir tipos", body: CN(`Definir edad Como Entero
Definir precio Como Real
Definir nombre Como Cadena
Definir activo Como Logico`) },
    { h: "Tipos", body: TABLE(["Tipo", "Ejemplo"], [["Entero", "42"], ["Real", "3.75"], ["Cadena", "\"Hola\""], ["Logico", "Verdadero / Falso"]]) },
    { h: "Nombres", body: `<ul><li>Empiezan con letra, sin espacios, sin palabras reservadas.</li><li>Descriptivos y en camelCase: <code>precioFinal</code>.</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué muestra este programa?", code: "x <- 7\nx <- 2\nEscribir x", opts: ["7", "2", "9", "72"], a: 1, why: "Al asignar 2, el valor 7 se pierde. Una variable guarda un solo valor." },
    { q: "¿Qué valor tiene <code>total</code> al final?", code: "total <- 10\ntotal <- total + 5\ntotal <- total * 2", opts: ["10", "15", "30", "25"], a: 2, why: "10, luego 10+5=15, luego 15*2=30." },
    { q: "¿Qué tipo de dato es <code>\"2026\"</code>?", opts: ["Entero", "Real", "Cadena", "Logico"], a: 2, why: "Está entre comillas, así que es texto (Cadena), aunque contenga dígitos." },
    { q: "¿Qué tipo usarías para guardar si una persona aceptó los términos y condiciones?", opts: ["Entero", "Cadena", "Logico", "Real"], a: 2, why: "Solo hay dos posibilidades (aceptó o no): Logico." },
    { q: "¿Cuál es un buen nombre de variable para la cantidad de alumnos?", opts: ["c", "cantidad alumnos", "cantidadAlumnos", "3alumnos"], a: 2, why: "Es descriptivo, no tiene espacios y no empieza con número." },
    { q: "Después de ejecutar esto, ¿cuánto valen a y b?", code: "a <- 1\nb <- a\na <- 9", opts: ["a=9, b=9", "a=9, b=1", "a=1, b=1", "a=1, b=9"], a: 1, why: "b recibió una copia del valor de a (1) en ese momento. Cambiar a después no afecta a b." },
    { fill: true, q: "¿Qué muestra?", code: 'nombre <- "Lin"\nEscribir "nombre"', a: ["nombre"], why: "Entre comillas es un texto literal. Para mostrar el contenido se escribe sin comillas." },
  ],
  exercises: [
    { id: "ex02a", title: "Área de un rectángulo", lang: "pseudo",
      text: "Guarda en variables la base (8) y la altura (5) de un rectángulo. Calcula el área en otra variable y muéstrala así:<br><code>Área: 40</code>",
      starter: "Algoritmo Area\n\tDefinir base, altura, area Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: [], out: "Área: 40" }],
      hint: "area <- base * altura. Para mostrar texto y variable juntos: Escribir \"Área: \", area",
      solution: 'Algoritmo Area\n\tDefinir base, altura, area Como Entero\n\tbase <- 8\n\taltura <- 5\n\tarea <- base * altura\n\tEscribir "Área: ", area\nFinAlgoritmo' },
    { id: "ex02b", title: "Intercambiar valores", lang: "pseudo",
      text: "Tienes <code>a &lt;- 5</code> y <code>b &lt;- 8</code>. Intercambia sus valores (que a valga 8 y b valga 5) <b>sin escribir los números 5 u 8 de nuevo</b>. Al final muestra:<br><code>a=8 b=5</code>",
      starter: 'Algoritmo Intercambio\n\ta <- 5\n\tb <- 8\n\t// Intercambia aquí\n\n\tEscribir "a=", a, " b=", b\nFinAlgoritmo',
      tests: [{ in: [], out: "a=8 b=5" }],
      hint: "Usa una tercera variable auxiliar como «vaso vacío»: guarda a en aux, luego pon b en a, y por último aux en b.",
      solution: 'Algoritmo Intercambio\n\ta <- 5\n\tb <- 8\n\taux <- a\n\ta <- b\n\tb <- aux\n\tEscribir "a=", a, " b=", b\nFinAlgoritmo' },
  ]
});

L({
  id: "l03", module: "m1", title: "Entrada y salida de datos", minutes: 25,
  summary: "Leer lo que escribe la persona usuaria y mostrar resultados claros.",
  sections: [
    { h: "Leer: pedir datos", body: `
<p>Hasta ahora los valores estaban escritos dentro del programa. Pero lo interesante es que el programa trabaje con datos que <b>da la persona que lo usa</b>. Para eso está <code>Leer</code>:</p>
${C(`Algoritmo Saludo
	Definir nombre Como Cadena
	Escribir "¿Cómo te llamas?"
	Leer nombre
	Escribir "¡Hola, ", nombre, "!"
FinAlgoritmo`)}
<p>Cuando el programa llega a <code>Leer nombre</code>, <b>se detiene y espera</b> a que escribas algo. Lo que escribas se guarda en la variable <code>nombre</code>. En el Laboratorio aparecerá un campo en la consola para que escribas tu respuesta.</p>
${TIP("Siempre muestra un mensaje antes de Leer para que la persona sepa qué tiene que escribir. Un programa que se queda esperando sin decir nada es confuso.")}` },
    { h: "Escribir: mostrar varias cosas", body: `
<p>Con <code>Escribir</code> puedes mostrar varias cosas separadas por comas. Se muestran pegadas, así que tú controlas los espacios:</p>
${C(`Algoritmo Mostrar
	precio <- 250
	cantidad <- 3
	Escribir "Precio: ", precio
	Escribir "Llevas ", cantidad, " unidades"
	Escribir "Total: ", precio * cantidad
FinAlgoritmo`)}
<p>Observa la última línea: puedes poner una <b>operación</b> directamente y se muestra el resultado.</p>
<p>Normalmente cada <code>Escribir</code> termina con un salto de línea. Si quieres seguir en la misma línea usa <code>Escribir Sin Saltar</code>:</p>
${C(`Algoritmo SinSaltar
	Escribir Sin Saltar "Cargando"
	Escribir Sin Saltar "..."
	Escribir " listo"
FinAlgoritmo`)}` },
    { h: "Leer números", body: `
<p>Si la variable está definida como número, lo que escribas se convierte a número y puedes hacer cuentas:</p>
${C(`Algoritmo Suma
	Definir a, b Como Entero
	Escribir "Primer número:"
	Leer a
	Escribir "Segundo número:"
	Leer b
	Escribir "La suma es ", a + b
FinAlgoritmo`)}
<p>Prueba ejecutarlo y escribe un texto en lugar de un número. Verás que el programa avisa del error: esperaba un número entero.</p>
<p>También puedes leer varios datos en una sola línea de código: <code>Leer a, b</code> pide primero <code>a</code> y después <code>b</code>.</p>` },
    { h: "Unir textos", body: `
<p>Con <code>+</code> entre textos los <b>unes</b> (esto se llama <b>concatenar</b>):</p>
${C(`Algoritmo Concatenar
	Definir nombre, apellido, completo Como Cadena
	nombre <- "Alan"
	apellido <- "Turing"
	completo <- nombre + " " + apellido
	Escribir completo
FinAlgoritmo`)}
${WARN("<code>\"5\" + \"5\"</code> da <code>\"55\"</code> (une textos), mientras que <code>5 + 5</code> da <code>10</code>. Este error es clásico en JavaScript cuando los datos vienen de un formulario: siempre llegan como texto.")}` },
    { h: "Diseñar un programa completo", body: `
<p>Juntemos todo con el esquema entrada → proceso → salida. Problema: <i>calcular cuántos años tendrá alguien en 2030</i>.</p>
<ol><li><b>Entrada:</b> nombre y edad actual (del año 2026).</li><li><b>Proceso:</b> edad + (2030 − 2026).</li><li><b>Salida:</b> un mensaje claro.</li></ol>
${C(`Algoritmo Edad2030
	Definir nombre Como Cadena
	Definir edad, edadFutura Como Entero

	// Entrada
	Escribir "¿Tu nombre?"
	Leer nombre
	Escribir "¿Tu edad?"
	Leer edad

	// Proceso
	edadFutura <- edad + (2030 - 2026)

	// Salida
	Escribir nombre, ", en 2030 tendrás ", edadFutura, " años"
FinAlgoritmo`)}
${PRO("Separar el código en bloques con comentarios (entrada / proceso / salida) es una costumbre muy valorada: hace que otras personas entiendan tu código rápido. En los equipos, el código se lee muchas más veces de las que se escribe.")}` },
  ],
  cheat: [
    { h: "Pedir un dato", body: CN(`Escribir "¿Tu edad?"
Leer edad`) },
    { h: "Mostrar varias cosas", body: CN(`Escribir "Total: ", total, " pesos"
Escribir Sin Saltar "misma línea"`) },
    { h: "Unir textos", body: CN(`completo <- nombre + " " + apellido`) },
    { h: "Recuerda", body: `<ul><li>Mensaje claro antes de cada <code>Leer</code>.</li><li><code>\"5\"+\"5\"</code> = <code>\"55\"</code>; <code>5+5</code> = <code>10</code>.</li><li>Esquema: entrada → proceso → salida.</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué hace <code>Leer precio</code>?", opts: ["Muestra el precio", "Espera que la persona escriba un valor y lo guarda en precio", "Borra la variable precio", "Define el tipo de precio"], a: 1, why: "Leer detiene el programa hasta que la persona escribe algo y lo guarda en la variable." },
    { q: "¿Qué muestra?", code: 'a <- 4\nEscribir "a", a', opts: ["a4", "44", "a a", "4"], a: 0, why: "Primero el texto literal \"a\" y luego el valor de la variable a (4), pegados: a4." },
    { q: "¿Qué muestra?", code: 'x <- "10"\ny <- "20"\nEscribir x + y', opts: ["30", "1020", "x+y", "Error"], a: 1, why: "Son textos: + los concatena." },
    { q: "Si escribes <i>hola</i> cuando el programa hace <code>Leer n</code> y <code>n</code> es Entero...", opts: ["n vale 0", "n vale \"hola\"", "Da un error porque se esperaba un número", "Se ignora"], a: 2, why: "La variable es Entero y \"hola\" no es un número: el programa avisa del error." },
    { q: "¿Cuál es la mejor forma de pedir la edad?", opts: ["Leer edad", "Escribir \"Edad:\" y luego Leer edad", "Escribir edad", "Leer \"edad\""], a: 1, why: "Siempre conviene avisar qué dato se espera antes de leerlo." },
    { q: "¿Qué muestra?", code: 'Escribir Sin Saltar "Ho"\nEscribir "la"', opts: ["Ho la (en dos líneas)", "Hola", "Ho la", "Error"], a: 1, why: "Sin Saltar no hace salto de línea, así que \"la\" se escribe a continuación." },
  ],
  exercises: [
    { id: "ex03a", title: "Saludo personalizado", lang: "pseudo",
      text: "Pide el nombre de la persona y muestra como <b>última línea</b>:<br><code>Hola, NOMBRE. ¡Bienvenida al curso!</code><br>(reemplazando NOMBRE por lo que se escribió).",
      starter: "Algoritmo Saludo\n\tDefinir nombre Como Cadena\n\t\nFinAlgoritmo",
      tests: [{ in: ["Ana"], out: "Hola, Ana. ¡Bienvenida al curso!" }, { in: ["Luis"], out: "Hola, Luis. ¡Bienvenida al curso!" }],
      hint: "Escribir \"Hola, \", nombre, \". ¡Bienvenida al curso!\"",
      solution: 'Algoritmo Saludo\n\tDefinir nombre Como Cadena\n\tEscribir "¿Cómo te llamas?"\n\tLeer nombre\n\tEscribir "Hola, ", nombre, ". ¡Bienvenida al curso!"\nFinAlgoritmo' },
    { id: "ex03b", title: "Total de una compra", lang: "pseudo",
      text: "Pide el precio de un producto (Real) y la cantidad (Entero). La última línea debe ser:<br><code>Total: X</code>",
      starter: "Algoritmo Compra\n\tDefinir precio Como Real\n\tDefinir cantidad Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["250", "3"], out: "Total: 750" }, { in: ["19.5", "2"], out: "Total: 39" }],
      hint: "Lee los dos datos y luego Escribir \"Total: \", precio * cantidad",
      solution: 'Algoritmo Compra\n\tDefinir precio Como Real\n\tDefinir cantidad Como Entero\n\tEscribir "Precio:"\n\tLeer precio\n\tEscribir "Cantidad:"\n\tLeer cantidad\n\tEscribir "Total: ", precio * cantidad\nFinAlgoritmo' },
    { id: "ex03c", title: "Nombre completo", lang: "pseudo",
      text: "Pide nombre y apellido por separado. Guarda en una variable <code>completo</code> el apellido, una coma, un espacio y el nombre, y muéstrala. Ejemplo: con <i>Ada</i> y <i>Lovelace</i> la última línea es <code>Lovelace, Ada</code>",
      starter: "Algoritmo NombreCompleto\n\tDefinir nombre, apellido, completo Como Cadena\n\t\nFinAlgoritmo",
      tests: [{ in: ["Ada", "Lovelace"], out: "Lovelace, Ada" }, { in: ["Alan", "Turing"], out: "Turing, Alan" }],
      hint: "completo <- apellido + \", \" + nombre",
      solution: 'Algoritmo NombreCompleto\n\tDefinir nombre, apellido, completo Como Cadena\n\tEscribir "Nombre:"\n\tLeer nombre\n\tEscribir "Apellido:"\n\tLeer apellido\n\tcompleto <- apellido + ", " + nombre\n\tEscribir completo\nFinAlgoritmo' },
  ]
});

L({
  id: "l04", module: "m1", title: "Operadores y expresiones", minutes: 35,
  summary: "Cuentas, comparaciones y lógica: las herramientas para calcular y decidir.",
  sections: [
    { h: "Operadores aritméticos", body: `
${TABLE(["Operador", "Significado", "Ejemplo", "Resultado"], [["<code>+</code>", "Suma", "<code>7 + 2</code>", "9"], ["<code>-</code>", "Resta", "<code>7 - 2</code>", "5"], ["<code>*</code>", "Multiplicación", "<code>7 * 2</code>", "14"], ["<code>/</code>", "División", "<code>7 / 2</code>", "3.5"], ["<code>^</code>", "Potencia", "<code>2 ^ 3</code>", "8"], ["<code>MOD</code>", "Resto de la división", "<code>7 MOD 2</code>", "1"]])}
${C(`Algoritmo Cuentas
	Escribir 7 + 2
	Escribir 7 / 2
	Escribir 2 ^ 10
	Escribir 7 MOD 2
	Escribir trunc(7 / 2)
FinAlgoritmo`)}
<p><code>trunc()</code> corta los decimales (división entera). Junto con <code>MOD</code> sirve para muchas cosas, como pasar segundos a minutos.</p>` },
    { h: "MOD: el resto, un operador muy útil", body: `
<p><code>MOD</code> devuelve lo que <b>sobra</b> en una división. 17 entre 5 cabe 3 veces (15) y sobran 2, así que <code>17 MOD 5 = 2</code>.</p>
<p>¿Para qué sirve? Para muchísimas cosas:</p>
<ul><li><b>Saber si un número es par:</b> <code>n MOD 2 = 0</code>.</li><li><b>Saber si es divisible:</b> <code>n MOD 3 = 0</code> significa que n es múltiplo de 3.</li><li><b>Obtener el último dígito:</b> <code>1234 MOD 10 = 4</code>.</li><li><b>Convertir unidades:</b> 125 segundos son <code>trunc(125/60) = 2</code> minutos y <code>125 MOD 60 = 5</code> segundos.</li></ul>
${C(`Algoritmo Tiempo
	Definir total, minutos, segundos Como Entero
	total <- 125
	minutos <- trunc(total / 60)
	segundos <- total MOD 60
	Escribir total, " segundos son ", minutos, " min y ", segundos, " s"
FinAlgoritmo`)}` },
    { h: "Orden de las operaciones", body: `
<p>Como en matemáticas, no todas las operaciones se hacen de izquierda a derecha. El orden es:</p>
<ol><li>Paréntesis <code>( )</code></li><li>Potencia <code>^</code></li><li>Multiplicación, división y MOD <code>* / MOD</code></li><li>Suma y resta <code>+ -</code></li></ol>
${C(`Algoritmo Orden
	Escribir 2 + 3 * 4
	Escribir (2 + 3) * 4
	// Promedio de tres notas: ¡los paréntesis son clave!
	Escribir (7 + 8 + 9) / 3
	Escribir 7 + 8 + 9 / 3
FinAlgoritmo`)}
${WARN("El error del promedio sin paréntesis es uno de los más comunes. Si dudas, usa paréntesis: nunca está mal ser explícito.")}` },
    { h: "Operadores de comparación", body: `
<p>Comparan dos valores y el resultado es siempre un <b>valor lógico</b>: <code>VERDADERO</code> o <code>FALSO</code>.</p>
${TABLE(["Operador", "Pregunta", "Ejemplo", "Resultado"], [["<code>=</code>", "¿Son iguales?", "<code>5 = 5</code>", "VERDADERO"], ["<code>&lt;&gt;</code>", "¿Son distintos?", "<code>5 &lt;&gt; 3</code>", "VERDADERO"], ["<code>&lt;</code>", "¿Menor que?", "<code>2 &lt; 1</code>", "FALSO"], ["<code>&gt;</code>", "¿Mayor que?", "<code>9 &gt; 4</code>", "VERDADERO"], ["<code>&lt;=</code>", "¿Menor o igual?", "<code>3 &lt;= 3</code>", "VERDADERO"], ["<code>&gt;=</code>", "¿Mayor o igual?", "<code>2 &gt;= 5</code>", "FALSO"]])}
${C(`Algoritmo Comparar
	edad <- 17
	Escribir "¿Es mayor de edad? ", edad >= 18
	Escribir "¿Es par? ", edad MOD 2 = 0
	Escribir "¿Se llama Ana? ", "Ana" = "Ana"
FinAlgoritmo`)}
${TIP("No confundas <code>&lt;-</code> (asignar: guardar un valor) con <code>=</code> (comparar: preguntar si son iguales). En JavaScript serán <code>=</code> y <code>===</code>, y confundirlos es un error clásico.")}` },
    { h: "Operadores lógicos: Y, O, NO", body: `
<p>Sirven para combinar condiciones.</p>
<ul><li><b>Y</b>: verdadero solo si <b>ambas</b> partes son verdaderas. «Puedes entrar si tienes entrada <b>y</b> eres mayor de edad».</li><li><b>O</b>: verdadero si <b>al menos una</b> es verdadera. «Hay descuento si eres estudiante <b>o</b> jubilado».</li><li><b>NO</b>: invierte el valor. <code>NO Verdadero</code> es <code>FALSO</code>.</li></ul>
<p><b>Tablas de verdad</b> (V = verdadero, F = falso):</p>
${TABLE(["A", "B", "A Y B", "A O B", "NO A"], [["V", "V", "V", "V", "F"], ["V", "F", "F", "V", "F"], ["F", "V", "F", "V", "V"], ["F", "F", "F", "F", "V"]])}
${C(`Algoritmo Logicos
	edad <- 25
	tieneEntrada <- Verdadero
	Escribir "¿Puede entrar? ", edad >= 18 Y tieneEntrada
	Escribir "¿Edad entre 18 y 30? ", edad >= 18 Y edad <= 30
	Escribir "¿Es niño o jubilado? ", edad < 12 O edad >= 65
	Escribir "¿No tiene entrada? ", NO tieneEntrada
FinAlgoritmo`)}
${WARN("Para comprobar un rango hay que repetir la variable: <code>edad &gt;= 18 Y edad &lt;= 30</code>. Escribir <code>18 &lt;= edad &lt;= 30</code> como en matemáticas no funciona.")}` },
    { h: "Funciones matemáticas incluidas", body: `
${TABLE(["Función", "Qué hace", "Ejemplo"], [["<code>raiz(x)</code>", "Raíz cuadrada", "<code>raiz(25)</code> → 5"], ["<code>abs(x)</code>", "Valor absoluto", "<code>abs(-4)</code> → 4"], ["<code>trunc(x)</code>", "Quita los decimales", "<code>trunc(3.9)</code> → 3"], ["<code>redon(x)</code>", "Redondea", "<code>redon(3.6)</code> → 4"], ["<code>azar(n)</code>", "Número al azar de 0 a n−1", "<code>azar(6)</code> → 0..5"], ["<code>aleatorio(a,b)</code>", "Número al azar entre a y b", "<code>aleatorio(1,6)</code>"]])}
${C(`Algoritmo Dado
	Escribir "Tiraste un dado y salió: ", aleatorio(1, 6)
	Escribir "La hipotenusa de 3 y 4 es: ", raiz(3^2 + 4^2)
FinAlgoritmo`)}` },
  ],
  cheat: [
    { h: "Aritméticos", body: TABLE(["Op", "Ejemplo", "="], [["+ - * /", "7 / 2", "3.5"], ["^", "2 ^ 3", "8"], ["MOD", "7 MOD 2", "1"], ["trunc()", "trunc(7/2)", "3"]]) },
    { h: "Comparación (dan V/F)", body: `<code>=</code> igual · <code>&lt;&gt;</code> distinto · <code>&lt; &gt; &lt;= &gt;=</code>` },
    { h: "Lógicos", body: `<ul><li><b>Y</b>: las dos verdaderas.</li><li><b>O</b>: al menos una.</li><li><b>NO</b>: invierte.</li></ul>` },
    { h: "Orden", body: `<code>( )</code> → <code>^</code> → <code>* / MOD</code> → <code>+ -</code> → comparaciones → <code>NO</code> → <code>Y</code> → <code>O</code>` },
    { h: "Trucos con MOD", body: CN(`n MOD 2 = 0      // ¿es par?
n MOD 10         // último dígito
trunc(s / 60)    // minutos
s MOD 60         // segundos que sobran`) },
  ],
  quiz: [
    { q: "¿Cuánto da <code>10 MOD 3</code>?", opts: ["3", "1", "3.33", "0"], a: 1, why: "10 entre 3 cabe 3 veces (9) y sobra 1." },
    { q: "¿Cuánto da <code>(4 + 6) / 2 * 3</code>?", opts: ["15", "1.66", "11", "30"], a: 0, why: "Paréntesis: 10. Luego de izquierda a derecha: 10/2=5, 5*3=15." },
    { q: "¿Qué condición dice si <code>n</code> es múltiplo de 5?", opts: ["n / 5 = 0", "n MOD 5 = 0", "n MOD 5 = 5", "n = 5"], a: 1, why: "Si el resto de dividir entre 5 es 0, es múltiplo de 5." },
    { q: "¿Qué da <code>Verdadero O Falso</code>?", opts: ["VERDADERO", "FALSO", "Error", "Depende"], a: 0, why: "Con O basta que una sea verdadera." },
    { q: "¿Qué da <code>NO (3 > 1)</code>?", opts: ["VERDADERO", "FALSO", "3", "Error"], a: 1, why: "3 > 1 es verdadero; NO lo invierte a falso." },
    { q: "¿Cuál comprueba que la nota esté entre 1 y 10 (incluidos)?", opts: ["1 <= nota <= 10", "nota >= 1 Y nota <= 10", "nota >= 1 O nota <= 10", "nota = 1 Y nota = 10"], a: 1, why: "Hay que repetir la variable y unir con Y. Con O cualquier número cumpliría." },
    { q: "¿Qué muestra <code>Escribir 9 - 3 * 2</code>?", opts: ["12", "3", "15", "6"], a: 1, why: "Primero 3*2=6, luego 9-6=3." },
    { fill: true, q: "¿Cuál es el último dígito de 4827? Escribe el resultado de <code>4827 MOD 10</code>", a: ["7"], why: "El resto de dividir entre 10 es siempre el último dígito." },
  ],
  exercises: [
    { id: "ex04a", title: "Convertir segundos", lang: "pseudo",
      text: "Lee una cantidad de segundos (entero) y muestra cuántas horas, minutos y segundos son. La última línea debe tener el formato:<br><code>H h M min S s</code><br>Ejemplo: con 3725 → <code>1 h 2 min 5 s</code>",
      starter: "Algoritmo Segundos\n\tDefinir total, h, m, s Como Entero\n\tEscribir \"Segundos:\"\n\tLeer total\n\t\nFinAlgoritmo",
      tests: [{ in: ["3725"], out: "1 h 2 min 5 s" }, { in: ["59"], out: "0 h 0 min 59 s" }, { in: ["7200"], out: "2 h 0 min 0 s" }],
      hint: "Una hora tiene 3600 segundos. h <- trunc(total / 3600). Lo que sobra es total MOD 3600; de eso saca los minutos con 60.",
      solution: 'Algoritmo Segundos\n\tDefinir total, h, m, s Como Entero\n\tEscribir "Segundos:"\n\tLeer total\n\th <- trunc(total / 3600)\n\tm <- trunc((total MOD 3600) / 60)\n\ts <- total MOD 60\n\tEscribir h, " h ", m, " min ", s, " s"\nFinAlgoritmo' },
    { id: "ex04b", title: "Grados Celsius a Fahrenheit", lang: "pseudo",
      text: "Lee una temperatura en grados Celsius (Real) y muéstrala en Fahrenheit con la fórmula F = C × 9 / 5 + 32. Última línea: <code>X °F</code>",
      starter: "Algoritmo Temperatura\n\tDefinir c Como Real\n\t\nFinAlgoritmo",
      tests: [{ in: ["100"], out: "212 °F" }, { in: ["0"], out: "32 °F" }, { in: ["36.5"], out: "97.7 °F" }],
      hint: "Escribir c * 9 / 5 + 32, \" °F\"",
      solution: 'Algoritmo Temperatura\n\tDefinir c Como Real\n\tEscribir "Grados Celsius:"\n\tLeer c\n\tEscribir c * 9 / 5 + 32, " °F"\nFinAlgoritmo' },
    { id: "ex04c", title: "¿Es par?", lang: "pseudo",
      text: "Lee un número entero y muestra en la última línea <code>VERDADERO</code> si es par o <code>FALSO</code> si es impar. (Todavía sin usar Si: solo con una comparación).",
      starter: "Algoritmo EsPar\n\tDefinir n Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["8"], out: "VERDADERO" }, { in: ["7"], out: "FALSO" }, { in: ["0"], out: "VERDADERO" }],
      hint: "Escribir n MOD 2 = 0",
      solution: 'Algoritmo EsPar\n\tDefinir n Como Entero\n\tEscribir "Número:"\n\tLeer n\n\tEscribir n MOD 2 = 0\nFinAlgoritmo' },
  ]
});

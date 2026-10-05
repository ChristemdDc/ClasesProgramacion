/* MÓDULO 3 · Organizar datos y código */
MOD({
  id: "m3", n: 3, title: "Organizar datos y código", lang: "pseudo",
  desc: "Arreglos, texto, funciones y los algoritmos clásicos de búsqueda y ordenamiento.",
  lessons: ["l10", "l11", "l12", "l13"],
  exam: {
    extra: [
      { q: "Con <code>Dimension v[6]</code>, ¿cuál es la última posición válida?", opts: ["6", "5", "7", "0"], a: 1, why: "Las posiciones van de 0 a 5 (6 posiciones en total)." },
      { q: "¿Qué muestra?", code: "Dimension v[3]\nv[0] <- 4\nv[1] <- v[0] * 2\nv[2] <- v[0] + v[1]\nEscribir v[2]", opts: ["4", "8", "12", "6"], a: 2, why: "v[0]=4, v[1]=8, v[2]=4+8=12." },
      { q: "¿Qué devuelve <code>Longitud(\"Hola mundo\")</code>?", opts: ["9", "10", "2", "11"], a: 1, why: "Cuenta todos los caracteres, el espacio incluido: 10." },
      { q: "¿Cuál es la principal ventaja de usar funciones?", opts: ["El programa corre más rápido", "Reutilizar código y dividir el problema en partes", "No hace falta usar variables", "Evitan todos los errores"], a: 1, why: "Escribes una vez, usas muchas, y cada parte se entiende por separado." },
      { q: "¿Qué muestra?", code: "Funcion r <- triple(x)\n\tr <- x * 3\nFinFuncion\nAlgoritmo P\n\tEscribir triple(triple(2))\nFinAlgoritmo", opts: ["6", "9", "18", "12"], a: 2, why: "triple(2)=6 y triple(6)=18." },
      { q: "La búsqueda binaria requiere que la lista esté...", opts: ["Vacía", "Ordenada", "Con números pares", "Al revés"], a: 1, why: "Descarta la mitad en cada paso comparando con el medio; solo funciona si está ordenada." },
      { q: "En el ordenamiento burbuja, ¿qué se hace cuando dos elementos vecinos están en el orden incorrecto?", opts: ["Se borran", "Se intercambian", "Se suman", "Se termina el algoritmo"], a: 1, why: "Se intercambian, y así los mayores van «flotando» al final." },
      { q: "Una variable creada dentro de una función...", opts: ["Se puede usar en todo el programa", "Solo existe dentro de esa función", "Se guarda para siempre", "Es siempre de tipo Cadena"], a: 1, why: "Es una variable local: su ámbito es la función." },
      { fill: true, q: "¿Qué devuelve <code>Subcadena(\"programa\", 0, 3)</code>?", a: ["prog"], why: "Desde la posición 0 hasta la 3 inclusive: p-r-o-g." },
      { q: "Para recorrer todas las posiciones de <code>Dimension notas[n]</code> usas...", opts: ["Para i <- 1 Hasta n", "Para i <- 0 Hasta n - 1", "Para i <- 0 Hasta n", "Para i <- n Hasta n"], a: 1, why: "Las posiciones van de 0 a n-1." },
    ],
    challenge: {
      id: "ex_m3", title: "Estadísticas de una lista",
      text: "Lee N y luego N números enteros en un arreglo. Escribe una función <code>Promedio</code> y muestra como últimas dos líneas:<br><code>Promedio: X</code><br><code>Mayores al promedio: K</code><br>donde K es cuántos números superan el promedio.",
      lang: "pseudo",
      starter: "Funcion p <- Promedio(v, n)\n\t// completa\nFinFuncion\n\nAlgoritmo Estadisticas\n\tDefinir n Como Entero\n\tLeer n\n\tDimension datos[n]\n\t\nFinAlgoritmo",
      tests: [{ in: ["4", "2", "4", "6", "8"], out: "Promedio: 5\nMayores al promedio: 2" }, { in: ["3", "10", "10", "10"], out: "Promedio: 10\nMayores al promedio: 0" }, { in: ["5", "1", "2", "3", "4", "100"], out: "Promedio: 22\nMayores al promedio: 1" }],
      hint: "La función suma v[0] a v[n-1] y divide entre n. En el algoritmo, guarda el promedio en una variable y recorre de nuevo el arreglo contando.",
      solution: 'Funcion p <- Promedio(v, n)\n\tsuma <- 0\n\tPara i <- 0 Hasta n - 1 Hacer\n\t\tsuma <- suma + v[i]\n\tFinPara\n\tp <- suma / n\nFinFuncion\n\nAlgoritmo Estadisticas\n\tDefinir n Como Entero\n\tLeer n\n\tDimension datos[n]\n\tPara i <- 0 Hasta n - 1 Hacer\n\t\tLeer datos[i]\n\tFinPara\n\tprom <- Promedio(datos, n)\n\tc <- 0\n\tPara i <- 0 Hasta n - 1 Hacer\n\t\tSi datos[i] > prom Entonces\n\t\t\tc <- c + 1\n\t\tFinSi\n\tFinPara\n\tEscribir "Promedio: ", prom\n\tEscribir "Mayores al promedio: ", c\nFinAlgoritmo'
    }
  }
});

L({
  id: "l10", module: "m3", title: "Arreglos (vectores y matrices)", minutes: 40,
  summary: "Guardar muchos valores bajo un mismo nombre y recorrerlos con bucles.",
  sections: [
    { h: "El problema", body: `
<p>Si quieres guardar las notas de 30 alumnos, ¿crearías 30 variables (<code>nota1</code>, <code>nota2</code>...)? Sería imposible de manejar. Un <b>arreglo</b> (también llamado vector, array o lista) guarda <b>muchos valores bajo un solo nombre</b>, cada uno en una posición numerada.</p>
${IDEA("Un arreglo es como una fila de casilleros numerados. Todos se llaman <code>notas</code>, y para elegir uno dices su número: <code>notas[0]</code>, <code>notas[1]</code>...")}
${C(`Algoritmo PrimerArreglo
	Dimension notas[4]
	notas[0] <- 7
	notas[1] <- 9
	notas[2] <- 5
	notas[3] <- 10
	Escribir "La segunda nota es ", notas[1]
	Escribir notas
FinAlgoritmo`)}
<p><code>Dimension notas[4]</code> crea un arreglo de 4 posiciones. El número entre corchetes al usarlo se llama <b>índice</b>.</p>
${WARN("Las posiciones empiezan en <b>0</b>. Un arreglo de 4 posiciones tiene los índices 0, 1, 2 y 3. Así funcionan JavaScript, Python, Java, C y casi todos los lenguajes. (En PSeInt, según la configuración, pueden empezar en 1; en esta app siempre empiezan en 0 para que te acostumbres a lo que usarás después).")}
<p>Si usas un índice que no existe, obtienes un error. Pruébalo:</p>
${C(`Algoritmo FueraDeRango
	Dimension v[3]
	v[3] <- 1
FinAlgoritmo`)}` },
    { h: "Recorrer un arreglo con Para", body: `
<p>La combinación más poderosa: un arreglo y un bucle Para que pase por todas sus posiciones. El índice deja de ser un número fijo y pasa a ser la variable del bucle:</p>
${C(`Algoritmo CargarYMostrar
	Definir n Como Entero
	n <- 5
	Dimension cuadrados[n]
	// Cargar
	Para i <- 0 Hasta n - 1 Hacer
		cuadrados[i] <- i * i
	FinPara
	// Mostrar
	Para i <- 0 Hasta n - 1 Hacer
		Escribir "Posición ", i, ": ", cuadrados[i]
	FinPara
FinAlgoritmo`)}
<p>Observa el <code>Hasta n - 1</code>: con n = 5 las posiciones van de 0 a 4.</p>` },
    { h: "Operaciones típicas", body: `
<p>Todos los patrones que aprendiste (acumulador, contador, máximo) funcionan con arreglos:</p>
${C(`Algoritmo Operaciones
	Dimension precios[5]
	precios[0] <- 120
	precios[1] <- 85
	precios[2] <- 300
	precios[3] <- 45
	precios[4] <- 210

	total <- 0
	caro <- precios[0]
	baratos <- 0
	Para i <- 0 Hasta 4 Hacer
		total <- total + precios[i]
		Si precios[i] > caro Entonces
			caro <- precios[i]
		FinSi
		Si precios[i] < 100 Entonces
			baratos <- baratos + 1
		FinSi
	FinPara
	Escribir "Total: ", total
	Escribir "Promedio: ", total / 5
	Escribir "Más caro: ", caro
	Escribir "Cuestan menos de 100: ", baratos
FinAlgoritmo`)}
<p><b>Buscar un elemento:</b> recorre y compara, usando una bandera o guardando la posición:</p>
${C(`Algoritmo Buscar
	Dimension nombres[4]
	nombres[0] <- "Ana"
	nombres[1] <- "Luis"
	nombres[2] <- "Sofía"
	nombres[3] <- "Pedro"
	buscado <- "Sofía"
	posicion <- -1
	Para i <- 0 Hasta 3 Hacer
		Si nombres[i] = buscado Entonces
			posicion <- i
		FinSi
	FinPara
	Si posicion = -1 Entonces
		Escribir buscado, " no está"
	SiNo
		Escribir buscado, " está en la posición ", posicion
	FinSi
FinAlgoritmo`)}
${TIP("Usar <code>-1</code> para indicar «no encontrado» es una convención muy común. En JavaScript, <code>indexOf</code> devuelve exactamente -1 cuando no encuentra algo.")}` },
    { h: "Matrices: arreglos de dos dimensiones", body: `
<p>Una <b>matriz</b> es una tabla con filas y columnas. Se crea con dos tamaños y se accede con dos índices: <code>[fila, columna]</code>. Se recorre con dos bucles anidados.</p>
${C(`Algoritmo Matriz
	Dimension m[3, 4]
	// Llenar: cada celda = fila * 10 + columna
	Para f <- 0 Hasta 2 Hacer
		Para c <- 0 Hasta 3 Hacer
			m[f, c] <- f * 10 + c
		FinPara
	FinPara
	// Mostrar como tabla
	Para f <- 0 Hasta 2 Hacer
		Para c <- 0 Hasta 3 Hacer
			Escribir Sin Saltar m[f, c], "	"
		FinPara
		Escribir ""
	FinPara
FinAlgoritmo`)}
${PRO("Las matrices aparecen en tableros de juegos (ta-te-ti, ajedrez), hojas de cálculo e imágenes digitales, que son matrices de píxeles. En JavaScript una matriz se escribe como un arreglo de arreglos: <code>m[f][c]</code>.")}` },
  ],
  cheat: [
    { h: "Crear y usar", body: CN(`Dimension v[5]        // posiciones 0 a 4
v[0] <- 10
Escribir v[0]
Dimension m[3, 3]     // matriz 3x3
m[1, 2] <- 7`) },
    { h: "Recorrer", body: CN(`Para i <- 0 Hasta n - 1 Hacer
	Escribir v[i]
FinPara`) },
    { h: "Buscar", body: CN(`pos <- -1
Para i <- 0 Hasta n - 1 Hacer
	Si v[i] = buscado Entonces
		pos <- i
	FinSi
FinPara`) },
    { h: "Recuerda", body: `<ul><li>Índices desde <b>0</b> hasta <b>tamaño − 1</b>.</li><li>Índice fuera de rango = error.</li><li>Matriz: dos índices y dos bucles anidados.</li></ul>` },
  ],
  quiz: [
    { q: "Con <code>Dimension datos[10]</code>, ¿cuántos valores puede guardar?", opts: ["9", "10", "11", "Ilimitados"], a: 1, why: "10 posiciones, de la 0 a la 9." },
    { q: "¿Qué muestra?", code: "Dimension v[3]\nv[0] <- 5\nv[1] <- 3\nv[2] <- v[0] - v[1]\nEscribir v[2]", opts: ["5", "3", "2", "8"], a: 2, why: "v[2] = 5 - 3 = 2." },
    { q: "¿Qué ocurre con <code>v[5] &lt;- 1</code> si <code>v</code> tiene 5 posiciones?", opts: ["Guarda en la última posición", "Error: índice fuera de rango", "Agranda el arreglo", "Nada"], a: 1, why: "Las posiciones válidas son 0..4." },
    { q: "¿Qué muestra?", code: "Dimension v[4]\nPara i <- 0 Hasta 3 Hacer\n\tv[i] <- i * 2\nFinPara\nEscribir v[3]", opts: ["3", "6", "8", "4"], a: 1, why: "v[3] = 3 * 2 = 6." },
    { q: "En <code>m[2, 1]</code>, ¿qué indica el 2?", opts: ["La columna", "La fila", "El valor", "El tamaño"], a: 1, why: "Por convención, primero la fila y luego la columna." },
    { q: "¿Para qué sirve guardar <code>posicion &lt;- -1</code> antes de buscar?", opts: ["Para que el bucle empiece al revés", "Para indicar «no encontrado» si nunca se cambia", "Para borrar el arreglo", "No sirve"], a: 1, why: "-1 no es una posición válida, así que si sigue en -1 sabes que no se encontró." },
  ],
  exercises: [
    { id: "ex10a", title: "Al revés", lang: "pseudo",
      text: "Lee 5 números en un arreglo y muéstralos en orden inverso, uno por línea.",
      starter: "Algoritmo AlReves\n\tDimension v[5]\n\t\nFinAlgoritmo",
      tests: [{ in: ["1", "2", "3", "4", "5"], out: "5\n4\n3\n2\n1" }, { in: ["9", "0", "7", "3", "8"], out: "8\n3\n7\n0\n9" }],
      hint: "Carga con Para i <- 0 Hasta 4, y muestra con Para i <- 4 Hasta 0 Con Paso -1.",
      solution: 'Algoritmo AlReves\n\tDimension v[5]\n\tPara i <- 0 Hasta 4 Hacer\n\t\tLeer v[i]\n\tFinPara\n\tPara i <- 4 Hasta 0 Con Paso -1 Hacer\n\t\tEscribir v[i]\n\tFinPara\nFinAlgoritmo' },
    { id: "ex10b", title: "¿Cuántas veces aparece?", lang: "pseudo",
      text: "Lee 6 números en un arreglo y después un número a buscar. Muestra como última línea <code>Aparece K veces</code>.",
      starter: "Algoritmo Apariciones\n\tDimension v[6]\n\t\nFinAlgoritmo",
      tests: [{ in: ["3", "1", "3", "7", "3", "2", "3"], out: "Aparece 3 veces" }, { in: ["1", "2", "3", "4", "5", "6", "9"], out: "Aparece 0 veces" }],
      hint: "Primero un Para para leer. Luego Leer buscado. Luego otro Para con un contador.",
      solution: 'Algoritmo Apariciones\n\tDimension v[6]\n\tPara i <- 0 Hasta 5 Hacer\n\t\tLeer v[i]\n\tFinPara\n\tLeer buscado\n\tc <- 0\n\tPara i <- 0 Hasta 5 Hacer\n\t\tSi v[i] = buscado Entonces\n\t\t\tc <- c + 1\n\t\tFinSi\n\tFinPara\n\tEscribir "Aparece ", c, " veces"\nFinAlgoritmo' },
    { id: "ex10c", title: "Suma de una matriz", lang: "pseudo",
      text: "Lee una matriz de 2 filas y 3 columnas (6 números, fila por fila). Muestra la suma de cada fila con el formato <code>Fila 0: X</code> y <code>Fila 1: Y</code>.",
      starter: "Algoritmo SumaFilas\n\tDimension m[2, 3]\n\t\nFinAlgoritmo",
      tests: [{ in: ["1", "2", "3", "4", "5", "6"], out: "Fila 0: 6\nFila 1: 15" }, { in: ["0", "0", "1", "10", "10", "10"], out: "Fila 0: 1\nFila 1: 30" }],
      hint: "Dos Para anidados para leer. Para sumar: por cada fila, un acumulador que empieza en 0 y recorre las columnas.",
      solution: 'Algoritmo SumaFilas\n\tDimension m[2, 3]\n\tPara f <- 0 Hasta 1 Hacer\n\t\tPara c <- 0 Hasta 2 Hacer\n\t\t\tLeer m[f, c]\n\t\tFinPara\n\tFinPara\n\tPara f <- 0 Hasta 1 Hacer\n\t\ts <- 0\n\t\tPara c <- 0 Hasta 2 Hacer\n\t\t\ts <- s + m[f, c]\n\t\tFinPara\n\t\tEscribir "Fila ", f, ": ", s\n\tFinPara\nFinAlgoritmo' },
  ]
});

L({
  id: "l11", module: "m3", title: "Trabajar con texto", minutes: 30,
  summary: "Longitud, extraer partes, mayúsculas y recorrer un texto letra por letra.",
  sections: [
    { h: "Un texto es una secuencia de caracteres", body: `
<p>Una cadena como <code>"Hola"</code> es una fila de <b>caracteres</b> (letras, números, espacios, signos), cada uno en una posición, empezando en 0. Se parece mucho a un arreglo.</p>
${TABLE(["Posición", "0", "1", "2", "3"], [["Carácter", "H", "o", "l", "a"]])}
<p>Funciones disponibles:</p>
${TABLE(["Función", "Qué hace", "Ejemplo → resultado"], [["<code>Longitud(t)</code>", "Cantidad de caracteres", "<code>Longitud(\"Hola\")</code> → 4"], ["<code>Subcadena(t, desde, hasta)</code>", "Parte del texto (ambas posiciones incluidas)", "<code>Subcadena(\"Hola\", 1, 2)</code> → \"ol\""], ["<code>Mayusculas(t)</code>", "Todo en mayúsculas", "→ \"HOLA\""], ["<code>Minusculas(t)</code>", "Todo en minúsculas", "→ \"hola\""], ["<code>ConvertirANumero(t)</code>", "Texto a número", "<code>\"42\"</code> → 42"], ["<code>ConvertirATexto(n)</code>", "Número a texto", "42 → <code>\"42\"</code>"]])}
${C(`Algoritmo Funciones
	t <- "Programar"
	Escribir Longitud(t)
	Escribir Mayusculas(t)
	Escribir Subcadena(t, 0, 2)
	Escribir "Primera letra: ", Subcadena(t, 0, 0)
	Escribir "Última letra: ", Subcadena(t, Longitud(t) - 1, Longitud(t) - 1)
FinAlgoritmo`)}` },
    { h: "Recorrer un texto letra por letra", body: `
<p>Con un Para de 0 a <code>Longitud(t) - 1</code> y <code>Subcadena(t, i, i)</code> obtienes cada letra:</p>
${C(`Algoritmo ContarVocales
	Definir frase, letra Como Cadena
	frase <- "Aprender a programar"
	vocales <- 0
	Para i <- 0 Hasta Longitud(frase) - 1 Hacer
		letra <- Minusculas(Subcadena(frase, i, i))
		Si letra = "a" O letra = "e" O letra = "i" O letra = "o" O letra = "u" Entonces
			vocales <- vocales + 1
		FinSi
	FinPara
	Escribir "La frase tiene ", vocales, " vocales"
FinAlgoritmo`)}
<p>Fíjate en el truco: pasamos cada letra a minúsculas antes de comparar, así cuenta «A» y «a» por igual.</p>` },
    { h: "Construir textos nuevos", body: `
<p>Puedes armar un texto nuevo agregando partes con <code>+</code>. Por ejemplo, invertir una palabra:</p>
${C(`Algoritmo Invertir
	Definir palabra, invertida Como Cadena
	palabra <- "reconocer"
	invertida <- ""
	Para i <- Longitud(palabra) - 1 Hasta 0 Con Paso -1 Hacer
		invertida <- invertida + Subcadena(palabra, i, i)
	FinPara
	Escribir invertida
	Si invertida = palabra Entonces
		Escribir "¡Es un palíndromo!"
	FinSi
FinAlgoritmo`)}
<p>El texto vacío <code>""</code> es el «cero» de los textos: el valor inicial de un acumulador de texto.</p>
${PRO("Validar y transformar texto es parte del día a día: comprobar que un email tenga @, normalizar nombres, formatear números de teléfono. En JavaScript tendrás métodos como <code>.length</code>, <code>.slice()</code>, <code>.toUpperCase()</code> e <code>.includes()</code>, que son los mismos conceptos.")}` },
  ],
  cheat: [
    { h: "Funciones de texto", body: CN(`Longitud("Hola")            // 4
Subcadena("Hola", 1, 2)     // "ol"
Mayusculas("Hola")          // "HOLA"
Minusculas("Hola")          // "hola"
ConvertirANumero("42")      // 42
ConvertirATexto(42)         // "42"`) },
    { h: "Recorrer letras", body: CN(`Para i <- 0 Hasta Longitud(t) - 1 Hacer
	letra <- Subcadena(t, i, i)
FinPara`) },
    { h: "Recuerda", body: `<ul><li>Posiciones desde 0.</li><li>Mayúsculas y minúsculas son distintas al comparar.</li><li><code>\"\"</code> es el texto vacío.</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué devuelve <code>Longitud(\"Sol y mar\")</code>?", opts: ["7", "9", "3", "8"], a: 1, why: "S-o-l-espacio-y-espacio-m-a-r: 9 caracteres." },
    { q: "¿Qué devuelve <code>Subcadena(\"computadora\", 3, 5)</code>?", opts: ["put", "mpu", "puta", "omp"], a: 0, why: "Posiciones 3, 4 y 5: p, u, t." },
    { q: "¿Qué da <code>\"Hola\" = \"hola\"</code>?", opts: ["VERDADERO", "FALSO", "Error", "4"], a: 1, why: "Las mayúsculas cuentan: H y h son caracteres distintos." },
    { q: "¿Cómo obtienes la primera letra de <code>nombre</code>?", opts: ["Subcadena(nombre, 1, 1)", "Subcadena(nombre, 0, 0)", "nombre[1]", "Longitud(nombre)"], a: 1, why: "La primera letra está en la posición 0." },
    { q: "¿Qué muestra?", code: 'r <- ""\nPara i <- 1 Hasta 3 Hacer\n\tr <- r + "ab"\nFinPara\nEscribir r', opts: ["ab", "ababab", "3ab", "ab3"], a: 1, why: "Se agrega \"ab\" tres veces al texto." },
  ],
  exercises: [
    { id: "ex11a", title: "Iniciales", lang: "pseudo",
      text: "Lee un nombre y un apellido y muestra sus iniciales en mayúsculas seguidas de punto. Ejemplo: <i>ada</i>, <i>lovelace</i> → <code>A.L.</code>",
      starter: "Algoritmo Iniciales\n\tDefinir nombre, apellido Como Cadena\n\t\nFinAlgoritmo",
      tests: [{ in: ["ada", "lovelace"], out: "A.L." }, { in: ["Grace", "Hopper"], out: "G.H." }],
      hint: "Mayusculas(Subcadena(nombre, 0, 0)) + \".\" + ...",
      solution: 'Algoritmo Iniciales\n\tDefinir nombre, apellido Como Cadena\n\tLeer nombre\n\tLeer apellido\n\tEscribir Mayusculas(Subcadena(nombre, 0, 0)), ".", Mayusculas(Subcadena(apellido, 0, 0)), "."\nFinAlgoritmo' },
    { id: "ex11b", title: "Contar una letra", lang: "pseudo",
      text: "Lee una frase y una letra. Muestra como última línea cuántas veces aparece la letra en la frase (sin distinguir mayúsculas de minúsculas).",
      starter: "Algoritmo ContarLetra\n\tDefinir frase, letra Como Cadena\n\t\nFinAlgoritmo",
      tests: [{ in: ["Banana", "a"], out: "3" }, { in: ["Hola Mundo", "O"], out: "2" }, { in: ["xyz", "a"], out: "0" }],
      hint: "Pasa la letra y cada carácter de la frase a minúsculas antes de comparar.",
      solution: 'Algoritmo ContarLetra\n\tDefinir frase, letra Como Cadena\n\tLeer frase\n\tLeer letra\n\tc <- 0\n\tPara i <- 0 Hasta Longitud(frase) - 1 Hacer\n\t\tSi Minusculas(Subcadena(frase, i, i)) = Minusculas(letra) Entonces\n\t\t\tc <- c + 1\n\t\tFinSi\n\tFinPara\n\tEscribir c\nFinAlgoritmo' },
    { id: "ex11c", title: "¿Palíndromo?", lang: "pseudo",
      text: "Lee una palabra y muestra <code>Palíndromo</code> si se lee igual al derecho y al revés (sin importar mayúsculas), o <code>No es palíndromo</code>.",
      starter: "Algoritmo Palindromo\n\tDefinir p, inv Como Cadena\n\t\nFinAlgoritmo",
      tests: [{ in: ["Neuquen"], out: "Palíndromo" }, { in: ["casa"], out: "No es palíndromo" }, { in: ["oso"], out: "Palíndromo" }],
      hint: "Construye la palabra invertida y compara ambas en minúsculas.",
      solution: 'Algoritmo Palindromo\n\tDefinir p, inv Como Cadena\n\tLeer p\n\tp <- Minusculas(p)\n\tinv <- ""\n\tPara i <- Longitud(p) - 1 Hasta 0 Con Paso -1 Hacer\n\t\tinv <- inv + Subcadena(p, i, i)\n\tFinPara\n\tSi inv = p Entonces\n\t\tEscribir "Palíndromo"\n\tSiNo\n\t\tEscribir "No es palíndromo"\n\tFinSi\nFinAlgoritmo' },
  ]
});

L({
  id: "l12", module: "m3", title: "Funciones y subprocesos", minutes: 40,
  summary: "Dividir un programa en piezas reutilizables con nombre, parámetros y resultado.",
  sections: [
    { h: "¿Qué es una función?", body: `
<p>Una <b>función</b> es un bloque de código con nombre que hace una tarea concreta. La defines una vez y la <b>llamas</b> (la usas) las veces que quieras. Ya usaste funciones que vienen incluidas: <code>raiz()</code>, <code>Longitud()</code>... Ahora vas a crear las tuyas.</p>
${IDEA("Una función es como una máquina: le das ingredientes (<b>parámetros</b>), hace su trabajo y te devuelve un producto (<b>valor de retorno</b>). No necesitas saber cómo funciona por dentro para usarla, igual que no necesitas saber cómo funciona una licuadora.")}
${C(`Funcion resultado <- Cuadrado(n)
	resultado <- n * n
FinFuncion

Algoritmo UsarFuncion
	Escribir Cuadrado(4)
	Escribir Cuadrado(9)
	x <- Cuadrado(3) + Cuadrado(4)
	Escribir x
FinAlgoritmo`)}
<ul><li><code>Funcion resultado &lt;- Cuadrado(n)</code>: se llama <b>Cuadrado</b>, recibe un dato <b>n</b> y lo que valga <b>resultado</b> al final es lo que devuelve.</li><li>Las funciones se escriben <b>fuera</b> del Algoritmo (antes o después).</li><li>También puedes devolver con <code>Retornar valor</code>, que termina la función en ese momento.</li></ul>` },
    { h: "Parámetros: los datos de entrada", body: `
<p>Una función puede recibir varios parámetros, separados por comas. Al llamarla, pasas los valores en el mismo orden:</p>
${C(`Funcion r <- AreaRectangulo(base, altura)
	r <- base * altura
FinFuncion

Funcion r <- Maximo(a, b)
	Si a > b Entonces
		r <- a
	SiNo
		r <- b
	FinSi
FinFuncion

Algoritmo Parametros
	Escribir "Área: ", AreaRectangulo(5, 3)
	Escribir "Máximo: ", Maximo(12, 30)
	// Puedes combinar llamadas
	Escribir "Máximo de tres: ", Maximo(Maximo(4, 17), 9)
FinAlgoritmo`)}` },
    { h: "Subprocesos: funciones que no devuelven nada", body: `
<p>A veces una función solo <b>hace algo</b> (mostrar un mensaje, dibujar) sin devolver un valor. Se llama <b>subproceso</b> o procedimiento. Se define sin la parte <code>resultado &lt;-</code> y se llama como una instrucción:</p>
${C(`SubProceso Linea(largo)
	Para i <- 1 Hasta largo Hacer
		Escribir Sin Saltar "="
	FinPara
	Escribir ""
FinSubProceso

SubProceso Titulo(texto)
	Linea(Longitud(texto))
	Escribir Mayusculas(texto)
	Linea(Longitud(texto))
FinSubProceso

Algoritmo Subprocesos
	Titulo("Menú principal")
	Escribir "1) Jugar"
	Escribir "2) Salir"
FinAlgoritmo`)}` },
    { h: "Ámbito: cada función tiene sus propias variables", body: `
<p>Las variables creadas dentro de una función son <b>locales</b>: solo existen ahí adentro. La función no puede ver las variables del algoritmo principal y viceversa. Lo único que entra son los parámetros y lo único que sale es el resultado.</p>
${C(`Funcion r <- Doble(n)
	temporal <- n * 2
	r <- temporal
FinFuncion

Algoritmo Ambito
	Escribir Doble(5)
	Escribir temporal
FinAlgoritmo`)}
<p>El segundo <code>Escribir</code> da error porque <code>temporal</code> solo existió dentro de <code>Doble</code>. Esto es algo <b>bueno</b>: cada función es independiente y no puede romper accidentalmente las variables de otra parte del programa.</p>
${TIP("<b>Por Referencia</b>: si quieres que una función pueda modificar una variable de quien la llama, declara el parámetro así: <code>Funcion Intercambiar(a Por Referencia, b Por Referencia)</code>. Los arreglos siempre se comparten (se pasan por referencia).")}` },
    { h: "¿Por qué usar funciones?", body: `
<ul><li><b>No repetir código.</b> Si algo se hace en tres lugares, escríbelo una vez como función. Si hay que corregirlo, se corrige en un solo lugar. (Principio DRY: <i>Don't Repeat Yourself</i>).</li><li><b>Dividir problemas grandes.</b> Un problema enorme se vuelve varios problemas pequeños, cada uno con un nombre claro.</li><li><b>Probar por partes.</b> Puedes verificar que cada función funciona sola.</li><li><b>Leer mejor.</b> <code>Si EsPrimo(n) Entonces</code> se entiende sin leer cómo está hecho.</li></ul>
${C(`Funcion r <- EsPrimo(n)
	r <- n > 1
	d <- 2
	Mientras d * d <= n Y r Hacer
		Si n MOD d = 0 Entonces
			r <- Falso
		FinSi
		d <- d + 1
	FinMientras
FinFuncion

Algoritmo PrimosHasta50
	Para i <- 1 Hasta 50 Hacer
		Si EsPrimo(i) Entonces
			Escribir Sin Saltar i, " "
		FinSi
	FinPara
	Escribir ""
FinAlgoritmo`)}
${PRO("En el trabajo real, el código se organiza casi todo en funciones pequeñas con nombres que explican qué hacen. Una regla práctica: si una función no entra en la pantalla, probablemente hace demasiadas cosas y conviene dividirla.")}` },
  ],
  cheat: [
    { h: "Función que devuelve", body: CN(`Funcion r <- Sumar(a, b)
	r <- a + b
FinFuncion

// o con Retornar:
Funcion Sumar(a, b)
	Retornar a + b
FinFuncion`) },
    { h: "Subproceso (no devuelve)", body: CN(`SubProceso Saludar(nombre)
	Escribir "Hola ", nombre
FinSubProceso

// llamada:
Saludar("Ana")`) },
    { h: "Recuerda", body: `<ul><li>Se definen fuera del Algoritmo.</li><li>Los parámetros se pasan en orden.</li><li>Variables internas = <b>locales</b>.</li><li><code>Por Referencia</code> permite modificar la variable original.</li><li>Una función = una tarea, con nombre claro.</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué muestra?", code: "Funcion r <- Sumar1(x)\n\tr <- x + 1\nFinFuncion\nAlgoritmo A\n\tEscribir Sumar1(Sumar1(5))\nFinAlgoritmo", opts: ["6", "7", "5", "11"], a: 1, why: "Sumar1(5)=6, Sumar1(6)=7." },
    { q: "¿Cuál es la diferencia entre una función y un subproceso?", opts: ["No hay diferencia", "La función devuelve un valor; el subproceso solo realiza acciones", "El subproceso es más rápido", "La función no tiene parámetros"], a: 1, why: "Un subproceso hace algo pero no devuelve un resultado para usar en una expresión." },
    { q: "Si una función define <code>total &lt;- 0</code> dentro, ¿se puede usar <code>total</code> en el Algoritmo principal?", opts: ["Sí", "No, es una variable local", "Solo si es Entero", "Solo después de llamarla"], a: 1, why: "Las variables locales solo existen dentro de su función." },
    { q: "¿Qué recibe <code>a</code> en la llamada <code>Restar(10, 3)</code> si la función es <code>Funcion r &lt;- Restar(a, b)</code>?", opts: ["3", "10", "7", "Nada"], a: 1, why: "Los parámetros se asignan en orden: a=10, b=3." },
    { q: "¿Cuál es un buen motivo para crear una función?", opts: ["El mismo cálculo se repite en varias partes", "Para que el programa tenga más líneas", "Para usar menos variables", "Nunca conviene"], a: 0, why: "Evita repetir código y facilita los cambios." },
    { q: "¿Qué hace <code>Retornar</code>?", opts: ["Repite la función", "Devuelve un valor y termina la función", "Vuelve al inicio del programa", "Muestra un valor"], a: 1, why: "Sale de la función entregando ese valor a quien la llamó." },
  ],
  exercises: [
    { id: "ex12a", title: "Función Potencia", lang: "pseudo",
      text: "Escribe una función <code>Potencia(base, exponente)</code> que calcule base elevado a exponente <b>usando un bucle</b> (sin usar ^). El programa lee base y exponente y muestra el resultado en la última línea.",
      starter: "Funcion r <- Potencia(base, exponente)\n\t\nFinFuncion\n\nAlgoritmo Pot\n\tLeer b, e\n\tEscribir Potencia(b, e)\nFinAlgoritmo",
      tests: [{ in: ["2", "10"], out: "1024" }, { in: ["5", "0"], out: "1" }, { in: ["3", "4"], out: "81" }],
      hint: "r empieza en 1 y se multiplica por base, exponente veces.",
      solution: "Funcion r <- Potencia(base, exponente)\n\tr <- 1\n\tPara i <- 1 Hasta exponente Hacer\n\t\tr <- r * base\n\tFinPara\nFinFuncion\n\nAlgoritmo Pot\n\tLeer b, e\n\tEscribir Potencia(b, e)\nFinAlgoritmo" },
    { id: "ex12b", title: "Función Factorial", lang: "pseudo",
      text: "Escribe una función <code>Factorial(n)</code>. El programa lee N y muestra los factoriales de 0 a N con el formato <code>i! = valor</code>. Recuerda que 0! = 1.",
      starter: "Funcion r <- Factorial(n)\n\t\nFinFuncion\n\nAlgoritmo Factoriales\n\tLeer n\n\t\nFinAlgoritmo",
      tests: [{ in: ["4"], out: "0! = 1\n1! = 1\n2! = 2\n3! = 6\n4! = 24" }, { in: ["0"], out: "0! = 1" }],
      hint: "Dentro de la función: r <- 1 y un Para de 1 a n multiplicando. En el algoritmo, un Para de 0 a n.",
      solution: 'Funcion r <- Factorial(n)\n\tr <- 1\n\tPara i <- 1 Hasta n Hacer\n\t\tr <- r * i\n\tFinPara\nFinFuncion\n\nAlgoritmo Factoriales\n\tLeer n\n\tPara i <- 0 Hasta n Hacer\n\t\tEscribir i, "! = ", Factorial(i)\n\tFinPara\nFinAlgoritmo' },
    { id: "ex12c", title: "Validar contraseña", lang: "pseudo",
      text: "Escribe una función <code>EsSegura(clave)</code> que devuelva Verdadero si la clave tiene <b>al menos 8 caracteres</b> y <b>contiene al menos un dígito</b> (0-9). El programa lee una clave y muestra <code>Segura</code> o <code>Insegura</code>.",
      starter: "Funcion r <- EsSegura(clave)\n\t\nFinFuncion\n\nAlgoritmo Claves\n\tDefinir c Como Cadena\n\tLeer c\n\t\nFinAlgoritmo",
      tests: [{ in: ["password1"], out: "Segura" }, { in: ["corta1"], out: "Insegura" }, { in: ["sindigitos"], out: "Insegura" }, { in: ["12345678"], out: "Segura" }],
      hint: "Recorre la clave con una bandera tieneDigito. Un carácter es dígito si está entre \"0\" y \"9\": letra >= \"0\" Y letra <= \"9\".",
      solution: 'Funcion r <- EsSegura(clave)\n\ttieneDigito <- Falso\n\tPara i <- 0 Hasta Longitud(clave) - 1 Hacer\n\t\tletra <- Subcadena(clave, i, i)\n\t\tSi letra >= "0" Y letra <= "9" Entonces\n\t\t\ttieneDigito <- Verdadero\n\t\tFinSi\n\tFinPara\n\tr <- Longitud(clave) >= 8 Y tieneDigito\nFinFuncion\n\nAlgoritmo Claves\n\tDefinir c Como Cadena\n\tLeer c\n\tSi EsSegura(c) Entonces\n\t\tEscribir "Segura"\n\tSiNo\n\t\tEscribir "Insegura"\n\tFinSi\nFinAlgoritmo' },
  ]
});

L({
  id: "l13", module: "m3", title: "Algoritmos clásicos: buscar y ordenar", minutes: 45,
  summary: "Búsqueda lineal y binaria, ordenamiento burbuja y una primera idea de eficiencia.",
  sections: [
    { h: "Por qué estudiar algoritmos clásicos", body: `
<p>Buscar y ordenar son de las tareas más comunes en la informática: buscar un contacto, ordenar productos por precio, mostrar el ranking de un juego. Estudiar cómo se hacen te entrena en pensamiento lógico y es un tema habitual en <b>entrevistas técnicas</b>.</p>` },
    { h: "Búsqueda lineal", body: `
<p>La más simple: revisar los elementos uno por uno hasta encontrarlo. Funciona siempre, esté o no ordenada la lista.</p>
${C(`Funcion pos <- BuscarLineal(v, n, x)
	pos <- -1
	i <- 0
	Mientras i < n Y pos = -1 Hacer
		Si v[i] = x Entonces
			pos <- i
		FinSi
		i <- i + 1
	FinMientras
FinFuncion

Algoritmo Lineal
	Dimension v[6]
	v[0] <- 15
	v[1] <- 3
	v[2] <- 42
	v[3] <- 8
	v[4] <- 23
	v[5] <- 4
	Escribir "El 23 está en la posición ", BuscarLineal(v, 6, 23)
	Escribir "El 99 está en la posición ", BuscarLineal(v, 6, 99)
FinAlgoritmo`)}
<p>Fíjate en la condición <code>pos = -1</code>: en cuanto lo encuentra, deja de buscar. Si la lista tiene un millón de elementos, en el peor caso revisa el millón.</p>` },
    { h: "Búsqueda binaria", body: `
<p>Si la lista está <b>ordenada</b>, hay algo mucho mejor. Piensa en buscar una palabra en un diccionario de papel: abres por la mitad y, según la letra, descartas la mitad izquierda o la derecha. Repites con la mitad que queda.</p>
${C(`Funcion pos <- BuscarBinaria(v, n, x)
	pos <- -1
	izq <- 0
	der <- n - 1
	Mientras izq <= der Y pos = -1 Hacer
		medio <- trunc((izq + der) / 2)
		Si v[medio] = x Entonces
			pos <- medio
		SiNo
			Si v[medio] < x Entonces
				izq <- medio + 1
			SiNo
				der <- medio - 1
			FinSi
		FinSi
	FinMientras
FinFuncion

Algoritmo Binaria
	Dimension v[8]
	Para i <- 0 Hasta 7 Hacer
		v[i] <- (i + 1) * 5
	FinPara
	Escribir v
	Escribir "El 35 está en la posición ", BuscarBinaria(v, 8, 35)
FinAlgoritmo`)}
${TABLE(["Elementos", "Lineal (peor caso)", "Binaria (peor caso)"], [["10", "10 pasos", "4 pasos"], ["1.000", "1.000 pasos", "10 pasos"], ["1.000.000", "1.000.000 pasos", "20 pasos"]])}
<p>¡La diferencia es enorme! Cada paso de la binaria descarta la mitad.</p>` },
    { h: "Ordenamiento burbuja", body: `
<p>Para ordenar de menor a mayor, la idea más simple: recorre la lista comparando cada par de vecinos; si están al revés, <b>intercámbialos</b>. Después de una pasada completa, el mayor «burbujea» hasta el final. Repite hasta que todo esté ordenado.</p>
${C(`Algoritmo Burbuja
	Dimension v[6]
	v[0] <- 29
	v[1] <- 10
	v[2] <- 14
	v[3] <- 37
	v[4] <- 13
	v[5] <- 5
	n <- 6
	Escribir "Antes:   ", v
	Para pasada <- 1 Hasta n - 1 Hacer
		Para i <- 0 Hasta n - 1 - pasada Hacer
			Si v[i] > v[i + 1] Entonces
				aux <- v[i]
				v[i] <- v[i + 1]
				v[i + 1] <- aux
			FinSi
		FinPara
		Escribir "Pasada ", pasada, ": ", v
	FinPara
FinAlgoritmo`)}
<p>¿Recuerdas el ejercicio de intercambiar dos variables con una auxiliar? Aquí lo usas para intercambiar dos posiciones del arreglo.</p>
${TIP("Ejecuta este programa <b>Paso a paso</b> y mira cómo se mueven los números. Entender visualmente un algoritmo de ordenamiento es muy satisfactorio.")}` },
    { h: "Una primera idea de eficiencia", body: `
<p>No todos los algoritmos que resuelven un problema son igual de buenos. Los programadores miden <b>cómo crece el trabajo</b> cuando crecen los datos. Esto se escribe con la notación <b>O grande</b> (Big O):</p>
${TABLE(["Notación", "Nombre", "Ejemplo", "Con 1.000 datos"], [["O(1)", "Constante", "Leer v[5]", "1 paso"], ["O(log n)", "Logarítmica", "Búsqueda binaria", "~10 pasos"], ["O(n)", "Lineal", "Búsqueda lineal, sumar todo", "~1.000 pasos"], ["O(n²)", "Cuadrática", "Burbuja (dos bucles anidados)", "~1.000.000 pasos"]])}
<p>Regla práctica: <b>un bucle que recorre todo es O(n); dos bucles anidados que recorren todo son O(n²)</b>.</p>
${PRO("En la práctica casi nunca programas tu propio ordenamiento: los lenguajes traen uno muy eficiente (en JavaScript, <code>array.sort()</code>). Pero entender estas ideas te permite elegir bien, detectar código lento y responder preguntas de entrevistas técnicas.")}` },
  ],
  cheat: [
    { h: "Intercambio", body: CN(`aux <- v[i]
v[i] <- v[j]
v[j] <- aux`) },
    { h: "Búsqueda binaria (lista ordenada)", body: CN(`izq <- 0
der <- n - 1
Mientras izq <= der Hacer
	medio <- trunc((izq + der) / 2)
	// igual → encontrado
	// menor → izq <- medio + 1
	// mayor → der <- medio - 1
FinMientras`) },
    { h: "Burbuja", body: CN(`Para pasada <- 1 Hasta n - 1 Hacer
	Para i <- 0 Hasta n - 1 - pasada Hacer
		Si v[i] > v[i + 1] Entonces
			// intercambiar
		FinSi
	FinPara
FinPara`) },
    { h: "Eficiencia", body: `O(1) &lt; O(log n) &lt; O(n) &lt; O(n²)<br>Un bucle completo ≈ O(n). Dos anidados ≈ O(n²).` },
  ],
  quiz: [
    { q: "¿Qué búsqueda funciona en una lista desordenada?", opts: ["Binaria", "Lineal", "Ninguna", "Las dos"], a: 1, why: "La binaria necesita orden para descartar mitades." },
    { q: "En una lista ordenada de 1.000.000 elementos, ¿cuántos pasos necesita como máximo la búsqueda binaria?", opts: ["1.000.000", "500.000", "Unos 20", "1"], a: 2, why: "Cada paso divide a la mitad: 2^20 ≈ 1.000.000." },
    { q: "Después de la primera pasada de burbuja (orden ascendente), ¿qué se sabe con seguridad?", opts: ["El menor está al principio", "El mayor está al final", "Todo está ordenado", "Nada"], a: 1, why: "El mayor va «burbujeando» hasta la última posición." },
    { q: "Un algoritmo con dos bucles anidados que recorren toda la lista es aproximadamente...", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], a: 3, why: "n vueltas por cada una de n vueltas: n × n." },
    { q: "En la búsqueda binaria, si <code>v[medio] &lt; x</code>, ¿qué haces?", opts: ["der <- medio - 1", "izq <- medio + 1", "Terminar", "medio <- medio + 1"], a: 1, why: "El buscado es mayor que el medio: está a la derecha, se descarta la izquierda." },
  ],
  exercises: [
    { id: "ex13a", title: "Ordenar de mayor a menor", lang: "pseudo",
      text: "Lee 5 números en un arreglo, ordénalos de <b>mayor a menor</b> con burbuja y muéstralos uno por línea.",
      starter: "Algoritmo OrdenDesc\n\tDimension v[5]\n\tPara i <- 0 Hasta 4 Hacer\n\t\tLeer v[i]\n\tFinPara\n\t\nFinAlgoritmo",
      tests: [{ in: ["3", "9", "1", "7", "5"], out: "9\n7\n5\n3\n1" }, { in: ["10", "20", "30", "40", "50"], out: "50\n40\n30\n20\n10" }],
      hint: "Es el mismo burbuja, pero intercambia cuando v[i] < v[i + 1].",
      solution: 'Algoritmo OrdenDesc\n\tDimension v[5]\n\tPara i <- 0 Hasta 4 Hacer\n\t\tLeer v[i]\n\tFinPara\n\tPara p <- 1 Hasta 4 Hacer\n\t\tPara i <- 0 Hasta 4 - p Hacer\n\t\t\tSi v[i] < v[i + 1] Entonces\n\t\t\t\taux <- v[i]\n\t\t\t\tv[i] <- v[i + 1]\n\t\t\t\tv[i + 1] <- aux\n\t\t\tFinSi\n\t\tFinPara\n\tFinPara\n\tPara i <- 0 Hasta 4 Hacer\n\t\tEscribir v[i]\n\tFinPara\nFinAlgoritmo' },
    { id: "ex13b", title: "Pasos de la búsqueda binaria", lang: "pseudo",
      text: "El arreglo tiene los múltiplos de 3 del 3 al 30 (10 elementos, ya ordenados). Lee un número X, búscalo con búsqueda binaria y muestra en la última línea <code>Encontrado en P tras K comparaciones</code> o <code>No está tras K comparaciones</code>. Cuenta una comparación cada vez que miras <code>v[medio]</code>.",
      starter: "Algoritmo PasosBinaria\n\tDimension v[10]\n\tPara i <- 0 Hasta 9 Hacer\n\t\tv[i] <- (i + 1) * 3\n\tFinPara\n\tLeer x\n\t\nFinAlgoritmo",
      tests: [{ in: ["15"], out: "Encontrado en 4 tras 1 comparaciones" }, { in: ["30"], out: "Encontrado en 9 tras 4 comparaciones" }, { in: ["7"], out: "No está tras 3 comparaciones" }],
      hint: "Usa izq, der, medio <- trunc((izq + der) / 2) y un contador que aumenta en cada vuelta del Mientras.",
      solution: 'Algoritmo PasosBinaria\n\tDimension v[10]\n\tPara i <- 0 Hasta 9 Hacer\n\t\tv[i] <- (i + 1) * 3\n\tFinPara\n\tLeer x\n\tizq <- 0\n\tder <- 9\n\tpos <- -1\n\tk <- 0\n\tMientras izq <= der Y pos = -1 Hacer\n\t\tmedio <- trunc((izq + der) / 2)\n\t\tk <- k + 1\n\t\tSi v[medio] = x Entonces\n\t\t\tpos <- medio\n\t\tSiNo\n\t\t\tSi v[medio] < x Entonces\n\t\t\t\tizq <- medio + 1\n\t\t\tSiNo\n\t\t\t\tder <- medio - 1\n\t\t\tFinSi\n\t\tFinSi\n\tFinMientras\n\tSi pos = -1 Entonces\n\t\tEscribir "No está tras ", k, " comparaciones"\n\tSiNo\n\t\tEscribir "Encontrado en ", pos, " tras ", k, " comparaciones"\n\tFinSi\nFinAlgoritmo' },
  ]
});

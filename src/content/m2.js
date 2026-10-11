/* MÓDULO 2 · Controlar el flujo */
MOD({
  id: "m2", n: 2, title: "Decisiones y repeticiones", lang: "pseudo",
  desc: "Hacer que el programa tome decisiones (Si, Segun) y repita tareas (Mientras, Repetir, Para).",
  lessons: ["l05", "l06", "l07", "l08", "l09"],
  exam: {
    extra: [
      { q: "¿Cuántas veces se muestra «Hola»?", code: 'Para i = 1 Hasta 4 Hacer\n\tEscribir "Hola"\nFinPara', opts: ["3", "4", "5", "Infinitas"], a: 1, why: "i toma los valores 1, 2, 3 y 4: cuatro vueltas." },
      { q: "¿Qué muestra?", code: 'x = 15\nSi x > 10 Entonces\n\tEscribir "A"\nSiNo\n\tEscribir "B"\nFinSi', opts: ["A", "B", "A y B", "Nada"], a: 0, why: "15 > 10 es verdadero, se ejecuta la rama Entonces." },
      { q: "¿Qué valor tiene <code>suma</code> al final?", code: "suma = 0\nPara i = 1 Hasta 3 Hacer\n\tsuma = suma + i\nFinPara", opts: ["3", "6", "4", "0"], a: 1, why: "0+1=1, 1+2=3, 3+3=6. Es un acumulador." },
      { q: "¿Cuál es la diferencia principal entre Mientras y Repetir?", opts: ["No hay diferencia", "Repetir ejecuta su bloque al menos una vez", "Mientras siempre es infinito", "Repetir no usa condición"], a: 1, why: "Repetir revisa la condición al final, así que entra al menos una vez. Mientras la revisa antes de entrar." },
      { q: "¿Qué pasa con este código?", code: "i = 1\nMientras i <= 5 Hacer\n\tEscribir i\nFinMientras", opts: ["Muestra 1 a 5", "Bucle infinito: i nunca cambia", "No muestra nada", "Error de sintaxis"], a: 1, why: "Falta i = i + 1. La condición nunca se vuelve falsa." },
      { q: "¿Cuál es la mejor estructura para un menú con opciones 1, 2, 3 y 4?", opts: ["Para", "Segun", "Mientras", "Definir"], a: 1, why: "Segun compara una variable con varios valores posibles de forma clara." },
      { q: "¿Qué muestra?", code: "c = 0\nPara i = 1 Hasta 10 Hacer\n\tSi i MOD 3 == 0 Entonces\n\t\tc = c + 1\n\tFinSi\nFinPara\nEscribir c", opts: ["3", "10", "4", "0"], a: 0, why: "Cuenta los múltiplos de 3 entre 1 y 10: 3, 6 y 9." },
      { q: "¿Qué valores toma i?", code: "Para i = 10 Hasta 0 Con Paso -5 Hacer\n\tEscribir i\nFinPara", opts: ["10, 5, 0", "10, 5", "0, 5, 10", "Ninguno"], a: 0, why: "Empieza en 10 y resta 5 cada vez mientras no pase de 0: 10, 5, 0." },
      { fill: true, q: "¿Qué palabra cierra un bloque <code>Si</code>?", a: ["finsi", "fin si"], why: "Cada Si se cierra con FinSi." },
      { q: "Para encontrar el número mayor de una lista que vas leyendo, ¿con qué valor conviene inicializar <code>mayor</code>?", opts: ["Con 0 siempre", "Con el primer número leído", "Con 1000", "No hace falta inicializarlo"], a: 1, why: "Si todos los números fueran negativos, empezar en 0 daría un resultado falso. Lo seguro es usar el primer valor." },
    ],
    challenge: {
      id: "ex_m2", title: "Adivina el número (versión verificable)",
      text: "El número secreto es <b>37</b>. Lee intentos uno tras otro. Para cada intento muestra <code>Más alto</code> si el secreto es mayor, o <code>Más bajo</code> si es menor. Cuando acierte, muestra como última línea <code>¡Correcto en N intentos!</code>",
      lang: "pseudo",
      starter: "Algoritmo Adivina\n\tDefinir secreto, intento, intentos Como Entero\n\tsecreto = 37\n\tintentos = 0\n\t\nFinAlgoritmo",
      tests: [{ in: ["50", "25", "37"], out: "¡Correcto en 3 intentos!" }, { in: ["37"], out: "¡Correcto en 1 intentos!" }, { in: ["10", "20", "30", "40", "38", "37"], out: "¡Correcto en 6 intentos!" }],
      hint: "Usa Repetir ... Hasta Que intento == secreto. Dentro: Leer, sumar 1 a intentos, y un Si para dar la pista.",
      solution: 'Algoritmo Adivina\n\tDefinir secreto, intento, intentos Como Entero\n\tsecreto = 37\n\tintentos = 0\n\tRepetir\n\t\tEscribir "Tu intento:"\n\t\tLeer intento\n\t\tintentos = intentos + 1\n\t\tSi intento < secreto Entonces\n\t\t\tEscribir "Más alto"\n\t\tSiNo\n\t\t\tSi intento > secreto Entonces\n\t\t\t\tEscribir "Más bajo"\n\t\t\tFinSi\n\t\tFinSi\n\tHasta Que intento == secreto\n\tEscribir "¡Correcto en ", intentos, " intentos!"\nFinAlgoritmo'
    }
  }
});

L({
  id: "l05", module: "m2", title: "Decisiones: Si / SiNo", minutes: 35,
  summary: "Hacer que el programa elija qué camino seguir según una condición.",
  sections: [
    { h: "Programas que deciden", body: `
<p>Hasta ahora los programas ejecutaban todas las líneas, siempre, en orden. Pero la vida real está llena de decisiones: <i>si llueve, llevo paraguas</i>. Para eso existe la estructura <b>Si</b>:</p>
${C(`Algoritmo Paraguas
	Definir llueve Como Logico
	llueve = Verdadero
	Si llueve Entonces
		Escribir "Lleva paraguas"
	FinSi
	Escribir "Que tengas un buen día"
FinAlgoritmo`)}
<p>Las instrucciones entre <code>Entonces</code> y <code>FinSi</code> solo se ejecutan si la condición es <b>verdadera</b>. Cambia <code>Verdadero</code> por <code>Falso</code> y ejecuta de nuevo.</p>` },
    { h: "Dos caminos: SiNo", body: `
<p>Con <code>SiNo</code> indicas qué hacer cuando la condición es <b>falsa</b>. Siempre se ejecuta uno de los dos caminos, nunca ambos:</p>
${C(`Algoritmo MayorDeEdad
	Definir edad Como Entero
	Escribir "¿Cuántos años tienes?"
	Leer edad
	Si edad >= 18 Entonces
		Escribir "Eres mayor de edad"
	SiNo
		Escribir "Eres menor de edad"
		Escribir "Te faltan ", 18 - edad, " años"
	FinSi
FinAlgoritmo`)}
${CN(`Si condición Entonces
	// se ejecuta si es VERDADERO
SiNo
	// se ejecuta si es FALSO
FinSi`)}
${TIP("Usa sangría dentro de cada rama. Ver de un vistazo qué está «adentro» del Si evita muchos errores.")}` },
    { h: "Condiciones compuestas", body: `
<p>Puedes usar <code>Y</code>, <code>O</code> y <code>NO</code> para condiciones más ricas:</p>
${C(`Algoritmo Descuento
	Definir edad Como Entero
	Definir esEstudiante Como Logico
	edad = 70
	esEstudiante = Falso
	Si edad >= 65 O esEstudiante Entonces
		Escribir "Tienes 50% de descuento"
	SiNo
		Escribir "Precio normal"
	FinSi
FinAlgoritmo`)}` },
    { h: "Decisiones anidadas", body: `
<p>Cuando hay más de dos posibilidades, puedes poner un Si dentro de otro. Esto se llama <b>anidar</b>:</p>
${C(`Algoritmo Calificacion
	Definir nota Como Real
	Escribir "Nota (0 a 10):"
	Leer nota
	Si nota >= 9 Entonces
		Escribir "Excelente"
	SiNo
		Si nota >= 7 Entonces
			Escribir "Muy bien"
		SiNo
			Si nota >= 4 Entonces
				Escribir "Aprobado"
			SiNo
				Escribir "Desaprobado"
			FinSi
		FinSi
	FinSi
FinAlgoritmo`)}
<p>Fíjate en el <b>orden</b>: preguntamos primero por la nota más alta. Si la nota es 9.5, entra en la primera rama y no revisa las demás. Si preguntaras primero <code>nota &gt;= 4</code>, un 9.5 diría «Aprobado».</p>
${WARN("Cada <code>Si</code> necesita su propio <code>FinSi</code>. Si te falta uno, el mensaje de error te dirá en qué línea empezó el Si que quedó abierto.")}` },
    { h: "Errores típicos", body: `
<ul>
<li><b>Usar = en vez de == para comparar.</b> <code>Si x = 5</code> da error; se escribe <code>Si x == 5</code>. Recuerda: un <code>=</code> guarda, dos <code>==</code> comparan.</li>
<li><b>Olvidar Entonces o FinSi.</b></li>
<li><b>Condiciones que se pisan.</b> En el ejemplo de notas, el orden de las preguntas importa.</li>
<li><b>Comparar textos con distinta escritura.</b> <code>"si" == "Si"</code> es FALSO: mayúsculas y minúsculas cuentan.</li>
</ul>
${PRO("Las condiciones son la base de cualquier aplicación: validar un formulario, mostrar u ocultar un botón, decidir si un pago se aprueba. Probar <b>todos los caminos</b> (qué pasa si es verdadero, si es falso, y en el límite exacto, como edad = 18) es lo que hacen los testers profesionales.")}` },
  ],
  cheat: [
    { h: "Si simple", body: CN(`Si condición Entonces
	instrucciones
FinSi`) },
    { h: "Si / SiNo", body: CN(`Si edad >= 18 Entonces
	Escribir "Mayor"
SiNo
	Escribir "Menor"
FinSi`) },
    { h: "Anidado (varios casos)", body: CN(`Si nota >= 9 Entonces
	Escribir "Excelente"
SiNo
	Si nota >= 4 Entonces
		Escribir "Aprobado"
	SiNo
		Escribir "Desaprobado"
	FinSi
FinSi`) },
    { h: "Recuerda", body: `<ul><li>Comparar con <code>==</code>, asignar con <code>=</code>.</li><li>Cada Si cierra con su FinSi.</li><li>En casos escalonados, pregunta del más exigente al menos exigente.</li><li>Prueba el valor límite (ej: exactamente 18).</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué muestra si <code>x</code> vale 3?", code: 'Si x > 5 Entonces\n\tEscribir "Grande"\nFinSi\nEscribir "Fin"', opts: ["Grande Fin", "Fin", "Grande", "Nada"], a: 1, why: "3 > 5 es falso: se salta el bloque, pero «Fin» está fuera del Si y siempre se muestra." },
    { q: "¿Qué muestra si <code>edad</code> vale 18?", code: 'Si edad > 18 Entonces\n\tEscribir "Mayor"\nSiNo\n\tEscribir "Menor"\nFinSi', opts: ["Mayor", "Menor", "Las dos", "Error"], a: 1, why: "18 > 18 es falso. Para incluir el 18 había que usar >=. ¡Por eso hay que probar los límites!" },
    { q: "¿Cuál condición es verdadera solo si n está entre 1 y 100?", opts: ["n > 1 O n < 100", "n >= 1 Y n <= 100", "n = 1 Y n = 100", "NO (n > 1)"], a: 1, why: "Ambas condiciones deben cumplirse: Y." },
    { q: "Con <code>nota = 9.5</code>, ¿qué muestra?", code: 'Si nota >= 4 Entonces\n\tEscribir "Aprobado"\nSiNo\n\tSi nota >= 9 Entonces\n\t\tEscribir "Excelente"\n\tFinSi\nFinSi', opts: ["Excelente", "Aprobado", "Aprobado y Excelente", "Nada"], a: 1, why: "Entra en la primera rama (9.5 >= 4) y nunca llega a revisar >= 9. El orden de las preguntas está mal." },
    { q: "¿Qué está mal aquí? <code>Si total = 100 Entonces</code>", opts: ["Nada", "Se usa = (guardar) en lugar de == (comparar)", "Falta SiNo", "100 debería ir entre comillas"], a: 1, why: "Para preguntar si son iguales se usan dos signos: ==." },
    { q: "En un Si / SiNo, ¿cuántas ramas se ejecutan?", opts: ["Ninguna", "Exactamente una", "Las dos", "Depende del FinSi"], a: 1, why: "Siempre una: la del Entonces si es verdadera, la del SiNo si es falsa." },
  ],
  exercises: [
    { id: "ex05a", title: "Par o impar", lang: "pseudo",
      text: "Lee un número entero. La última línea debe decir <code>Es par</code> o <code>Es impar</code>.",
      starter: "Algoritmo ParImpar\n\tDefinir n Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["4"], out: "Es par" }, { in: ["7"], out: "Es impar" }, { in: ["0"], out: "Es par" }, { in: ["-3"], out: "Es impar" }],
      hint: "Si n MOD 2 == 0 Entonces ... SiNo ... FinSi",
      solution: 'Algoritmo ParImpar\n\tDefinir n Como Entero\n\tEscribir "Número:"\n\tLeer n\n\tSi n MOD 2 == 0 Entonces\n\t\tEscribir "Es par"\n\tSiNo\n\t\tEscribir "Es impar"\n\tFinSi\nFinAlgoritmo' },
    { id: "ex05b", title: "El mayor de tres", lang: "pseudo",
      text: "Lee tres números enteros distintos y muestra como última línea <code>El mayor es X</code>.",
      starter: "Algoritmo MayorDeTres\n\tDefinir a, b, c Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["3", "9", "5"], out: "El mayor es 9" }, { in: ["10", "2", "7"], out: "El mayor es 10" }, { in: ["-1", "-8", "4"], out: "El mayor es 4" }],
      hint: "Si a > b Y a > c entonces el mayor es a. Si no, compara b con c.",
      solution: 'Algoritmo MayorDeTres\n\tDefinir a, b, c Como Entero\n\tEscribir "Tres números:"\n\tLeer a, b, c\n\tSi a > b Y a > c Entonces\n\t\tEscribir "El mayor es ", a\n\tSiNo\n\t\tSi b > c Entonces\n\t\t\tEscribir "El mayor es ", b\n\t\tSiNo\n\t\t\tEscribir "El mayor es ", c\n\t\tFinSi\n\tFinSi\nFinAlgoritmo' },
    { id: "ex05c", title: "Año bisiesto", lang: "pseudo",
      text: "Un año es bisiesto si es divisible por 4 y no por 100, <b>o</b> si es divisible por 400. Lee un año y muestra <code>Bisiesto</code> o <code>No bisiesto</code>.",
      starter: "Algoritmo Bisiesto\n\tDefinir anio Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["2024"], out: "Bisiesto" }, { in: ["1900"], out: "No bisiesto" }, { in: ["2000"], out: "Bisiesto" }, { in: ["2026"], out: "No bisiesto" }],
      hint: "(anio MOD 4 == 0 Y anio MOD 100 <> 0) O anio MOD 400 == 0",
      solution: 'Algoritmo Bisiesto\n\tDefinir anio Como Entero\n\tEscribir "Año:"\n\tLeer anio\n\tSi (anio MOD 4 == 0 Y anio MOD 100 <> 0) O anio MOD 400 == 0 Entonces\n\t\tEscribir "Bisiesto"\n\tSiNo\n\t\tEscribir "No bisiesto"\n\tFinSi\nFinAlgoritmo' },
  ]
});

L({
  id: "l06", module: "m2", title: "Selección múltiple: Segun", minutes: 20,
  summary: "Elegir entre muchas opciones de forma ordenada. Ideal para menús.",
  sections: [
    { h: "Cuando hay muchas opciones", body: `
<p>Imagina un programa que muestra el nombre del día según un número del 1 al 7. Con Si anidados quedaría larguísimo. Para esto existe <b>Segun</b>, que compara una variable con varios valores posibles:</p>
${C(`Algoritmo DiaSemana
	Definir dia Como Entero
	Escribir "Número de día (1-7):"
	Leer dia
	Segun dia Hacer
		1: Escribir "Lunes"
		2: Escribir "Martes"
		3: Escribir "Miércoles"
		4: Escribir "Jueves"
		5: Escribir "Viernes"
		6, 7:
			Escribir "Fin de semana"
		De Otro Modo:
			Escribir "Ese día no existe"
	FinSegun
FinAlgoritmo`)}
<ul><li>Cada opción es un valor seguido de dos puntos <code>:</code>.</li><li>Puedes agrupar varios valores con coma: <code>6, 7:</code>.</li><li><code>De Otro Modo:</code> se ejecuta si ningún valor coincide. Es opcional pero muy recomendable.</li></ul>` },
    { h: "Un menú de opciones", body: `
<p>Segun es perfecto para menús, algo que verás en muchísimas aplicaciones:</p>
${C(`Algoritmo Calculadora
	Definir a, b Como Real
	Definir opcion Como Entero
	Escribir "Primer número:"
	Leer a
	Escribir "Segundo número:"
	Leer b
	Escribir "1) Sumar  2) Restar  3) Multiplicar  4) Dividir"
	Leer opcion
	Segun opcion Hacer
		1: Escribir "Resultado: ", a + b
		2: Escribir "Resultado: ", a - b
		3: Escribir "Resultado: ", a * b
		4:
			Si b == 0 Entonces
				Escribir "No se puede dividir entre cero"
			SiNo
				Escribir "Resultado: ", a / b
			FinSi
		De Otro Modo:
			Escribir "Opción no válida"
	FinSegun
FinAlgoritmo`)}
<p>Observa que dentro de una opción puedes poner cualquier instrucción, incluso un Si.</p>` },
    { h: "Segun también funciona con textos", body: `
${C(`Algoritmo Semaforo
	Definir color Como Cadena
	color = "amarillo"
	Segun color Hacer
		"verde": Escribir "Avanza"
		"amarillo": Escribir "Precaución"
		"rojo": Escribir "Detente"
		De Otro Modo: Escribir "Color desconocido"
	FinSegun
FinAlgoritmo`)}
${TIP("Segun solo compara por <b>igualdad exacta</b>. Si necesitas rangos (nota mayor que 7, edad entre 18 y 30), usa Si.")}
${PRO("En JavaScript, Java o C esto se llama <code>switch</code>. En Python se usa <code>match</code> o una cadena de <code>if/elif</code>.")}` },
  ],
  cheat: [
    { h: "Estructura", body: CN(`Segun variable Hacer
	1: instrucción
	2, 3:
		instrucciones
	De Otro Modo:
		instrucciones
FinSegun`) },
    { h: "Cuándo usarlo", body: `<ul><li>Una variable con <b>varios valores exactos</b> posibles (menús, códigos, días).</li><li>Para rangos o condiciones complejas usa <b>Si</b>.</li><li>Incluye siempre <code>De Otro Modo</code> para valores inesperados.</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué muestra si <code>op</code> vale 3?", code: 'Segun op Hacer\n\t1: Escribir "A"\n\t2, 3: Escribir "B"\n\tDe Otro Modo: Escribir "C"\nFinSegun', opts: ["A", "B", "C", "B y C"], a: 1, why: "3 está en la opción «2, 3»." },
    { q: "¿Y si <code>op</code> vale 9?", code: 'Segun op Hacer\n\t1: Escribir "A"\n\t2, 3: Escribir "B"\n\tDe Otro Modo: Escribir "C"\nFinSegun', opts: ["A", "B", "C", "Nada"], a: 2, why: "Ninguna opción coincide: se ejecuta De Otro Modo." },
    { q: "¿Para qué caso NO es adecuado Segun?", opts: ["Un menú con opciones 1 a 5", "Mostrar el nombre del mes según su número", "Clasificar una temperatura como fría (< 10) o cálida (>= 25)", "Traducir un código de color"], a: 2, why: "Son rangos, no valores exactos. Para eso conviene Si." },
    { q: "¿Qué hace <code>De Otro Modo</code>?", opts: ["Repite el Segun", "Se ejecuta cuando ningún valor coincide", "Termina el programa", "Es obligatorio"], a: 1, why: "Es la opción por defecto para cualquier otro valor." },
    { q: "¿Cuántas opciones de un Segun se ejecutan como máximo?", opts: ["Todas las que coincidan", "Una", "Dos", "Ninguna"], a: 1, why: "Se ejecuta solo la primera opción que coincide (o De Otro Modo)." },
  ],
  exercises: [
    { id: "ex06a", title: "Nombre del mes", lang: "pseudo",
      text: "Lee un número del 1 al 12 y muestra el nombre del mes (por ejemplo <code>Marzo</code>). Para cualquier otro número muestra <code>Mes inválido</code>. Solo se verifican los meses 1, 3, 12 y un caso inválido, pero escríbelos todos.",
      starter: "Algoritmo Mes\n\tDefinir m Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["1"], out: "Enero" }, { in: ["3"], out: "Marzo" }, { in: ["12"], out: "Diciembre" }, { in: ["13"], out: "Mes inválido" }],
      hint: "Segun m Hacer, una opción por mes y De Otro Modo para el resto.",
      solution: 'Algoritmo Mes\n\tDefinir m Como Entero\n\tEscribir "Número de mes:"\n\tLeer m\n\tSegun m Hacer\n\t\t1: Escribir "Enero"\n\t\t2: Escribir "Febrero"\n\t\t3: Escribir "Marzo"\n\t\t4: Escribir "Abril"\n\t\t5: Escribir "Mayo"\n\t\t6: Escribir "Junio"\n\t\t7: Escribir "Julio"\n\t\t8: Escribir "Agosto"\n\t\t9: Escribir "Septiembre"\n\t\t10: Escribir "Octubre"\n\t\t11: Escribir "Noviembre"\n\t\t12: Escribir "Diciembre"\n\t\tDe Otro Modo: Escribir "Mes inválido"\n\tFinSegun\nFinAlgoritmo' },
    { id: "ex06b", title: "Conversor de unidades", lang: "pseudo",
      text: "Lee una cantidad de metros (Real) y luego una opción: <b>1</b> = a centímetros, <b>2</b> = a kilómetros, <b>3</b> = a milímetros. Muestra solo el número resultante en la última línea. Si la opción no existe, muestra <code>Opción inválida</code>.",
      starter: "Algoritmo Conversor\n\tDefinir metros Como Real\n\tDefinir op Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["2", "1"], out: "200" }, { in: ["1500", "2"], out: "1.5" }, { in: ["0.5", "3"], out: "500" }, { in: ["1", "7"], out: "Opción inválida" }],
      hint: "1 m = 100 cm; 1 km = 1000 m; 1 m = 1000 mm.",
      solution: 'Algoritmo Conversor\n\tDefinir metros Como Real\n\tDefinir op Como Entero\n\tEscribir "Metros:"\n\tLeer metros\n\tEscribir "1) cm 2) km 3) mm"\n\tLeer op\n\tSegun op Hacer\n\t\t1: Escribir metros * 100\n\t\t2: Escribir metros / 1000\n\t\t3: Escribir metros * 1000\n\t\tDe Otro Modo: Escribir "Opción inválida"\n\tFinSegun\nFinAlgoritmo' },
  ]
});

L({
  id: "l07", module: "m2", title: "Bucles: Mientras y Repetir", minutes: 35,
  summary: "Repetir instrucciones mientras se cumpla una condición.",
  sections: [
    { h: "¿Por qué repetir?", body: `
<p>Imagina que tienes que mostrar los números del 1 al 1000. ¿Escribirías 1000 instrucciones? Las computadoras son geniales repitiendo cosas. Para eso existen los <b>bucles</b> (también llamados ciclos o loops).</p>
<p>El bucle <b>Mientras</b> repite un bloque <b>mientras</b> una condición sea verdadera:</p>
${C(`Algoritmo Contar
	Definir i Como Entero
	i = 1
	Mientras i <= 5 Hacer
		Escribir i
		i = i + 1
	FinMientras
	Escribir "¡Listo!"
FinAlgoritmo`)}
<p>Cómo funciona, paso a paso:</p>
<ol><li>Revisa la condición <code>i &lt;= 5</code>. Si es verdadera, entra al bloque.</li><li>Ejecuta el bloque (muestra i y le suma 1).</li><li>Vuelve al paso 1.</li><li>Cuando la condición es falsa (i vale 6), sale y sigue con lo que está después del FinMientras.</li></ol>
${TIP("Usa el botón <b>Paso a paso</b> del Laboratorio con este programa. Ver cómo cambia i en cada vuelta es la mejor forma de entender un bucle.")}` },
    { h: "Las tres partes de un bucle", body: `
<p>Casi todos los bucles tienen tres partes. Si falta alguna, hay problemas:</p>
${TABLE(["Parte", "En el ejemplo", "Si la olvidas..."], [["<b>Inicialización</b>", "<code>i = 1</code>", "Error: la variable no tiene valor"], ["<b>Condición</b>", "<code>i &lt;= 5</code>", "No sabe cuándo parar"], ["<b>Actualización</b>", "<code>i = i + 1</code>", "<b>Bucle infinito</b>: la condición nunca cambia"]])}
<p>Un <b>bucle infinito</b> es un programa que nunca termina. Prueba este (el Laboratorio lo detendrá automáticamente):</p>
${C(`Algoritmo Infinito
	i = 1
	Mientras i <= 5 Hacer
		Escribir i
		// Falta: i = i + 1
	FinMientras
FinAlgoritmo`)}
${WARN("Si tu programa «se cuelga» o no termina nunca, sospecha de un bucle infinito. Revisa que la variable de la condición cambie dentro del bucle.")}` },
    { h: "Mientras con datos del usuario", body: `
<p>El Mientras brilla cuando no sabes de antemano cuántas veces repetir. Por ejemplo, sumar números hasta que la persona escriba 0:</p>
${C(`Algoritmo SumarHastaCero
	Definir n, suma Como Real
	suma = 0
	Escribir "Número (0 para terminar):"
	Leer n
	Mientras n <> 0 Hacer
		suma = suma + n
		Escribir "Número (0 para terminar):"
		Leer n
	FinMientras
	Escribir "La suma total es ", suma
FinAlgoritmo`)}
<p>Al valor que indica «terminar» (aquí el 0) se le llama <b>centinela</b>.</p>` },
    { h: "Repetir ... Hasta Que", body: `
<p>Es parecido, pero revisa la condición <b>al final</b>. Por eso el bloque se ejecuta <b>al menos una vez</b>. Además, se repite <b>hasta que</b> la condición sea verdadera (al revés que Mientras):</p>
${C(`Algoritmo PedirPositivo
	Definir n Como Entero
	Repetir
		Escribir "Escribe un número positivo:"
		Leer n
		Si n <= 0 Entonces
			Escribir "Ese no es positivo, intenta de nuevo"
		FinSi
	Hasta Que n > 0
	Escribir "Gracias, elegiste ", n
FinAlgoritmo`)}
<p>Es ideal para <b>validar datos</b>: pedir algo una y otra vez hasta que sea correcto.</p>
${TABLE(["", "Mientras", "Repetir"], [["Revisa la condición", "Antes de cada vuelta", "Después de cada vuelta"], ["Mínimo de vueltas", "0", "1"], ["Sigue repitiendo cuando la condición es", "Verdadera", "Falsa (hasta que sea verdadera)"]])}` },
  ],
  cheat: [
    { h: "Mientras", body: CN(`i = 1                 // inicializar
Mientras i <= 10 Hacer  // condición
	Escribir i
	i = i + 1         // actualizar
FinMientras`) },
    { h: "Repetir", body: CN(`Repetir
	Leer n
Hasta Que n > 0   // sale cuando es VERDADERO`) },
    { h: "Recuerda", body: `<ul><li>Tres partes: inicializar, condición, actualizar.</li><li>Sin actualizar = <b>bucle infinito</b>.</li><li>Repetir entra al menos una vez: ideal para validar.</li><li><b>Centinela</b>: valor especial que indica fin (ej: 0).</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué muestra?", code: "i = 3\nMientras i > 0 Hacer\n\tEscribir i\n\ti = i - 1\nFinMientras", opts: ["3 2 1", "3 2 1 0", "1 2 3", "Infinito"], a: 0, why: "Cuando i llega a 0, la condición i > 0 es falsa y sale sin mostrarlo." },
    { q: "¿Cuántas veces se ejecuta el bloque?", code: "i = 10\nMientras i < 5 Hacer\n\tEscribir i\nFinMientras", opts: ["0", "1", "5", "Infinitas"], a: 0, why: "La condición es falsa desde el principio: nunca entra." },
    { q: "¿Cuántas veces se ejecuta el bloque?", code: "i = 10\nRepetir\n\tEscribir i\nHasta Que i > 5", opts: ["0", "1", "5", "Infinitas"], a: 1, why: "Repetir siempre entra una vez y recién después revisa (10 > 5 es verdadero, sale)." },
    { q: "¿Qué le falta a este bucle para no ser infinito?", code: "x = 1\nMientras x < 100 Hacer\n\tEscribir x\nFinMientras", opts: ["Un SiNo", "Actualizar x dentro del bucle", "Definir x como Real", "Nada"], a: 1, why: "x nunca cambia, así que x < 100 siempre es verdadero." },
    { q: "¿Qué valor tiene <code>n</code> al final?", code: "n = 1\nMientras n < 20 Hacer\n\tn = n * 2\nFinMientras", opts: ["16", "20", "32", "64"], a: 2, why: "1, 2, 4, 8, 16, 32. Con 32 la condición es falsa y sale." },
    { q: "¿Qué estructura es mejor para pedir una contraseña hasta que sea correcta?", opts: ["Segun", "Repetir ... Hasta Que", "Si", "Definir"], a: 1, why: "Hay que pedirla al menos una vez y repetir hasta que sea correcta." },
  ],
  exercises: [
    { id: "ex07a", title: "Cuenta regresiva", lang: "pseudo",
      text: "Lee un número entero N y muestra una cuenta regresiva desde N hasta 1, un número por línea. Después muestra <code>¡Despegue!</code>",
      starter: "Algoritmo Regresiva\n\tDefinir n Como Entero\n\tLeer n\n\t\nFinAlgoritmo",
      tests: [{ in: ["3"], out: "3\n2\n1\n¡Despegue!" }, { in: ["5"], out: "5\n4\n3\n2\n1\n¡Despegue!" }],
      hint: "Mientras n >= 1 Hacer: Escribir n, y luego n = n - 1.",
      solution: 'Algoritmo Regresiva\n\tDefinir n Como Entero\n\tLeer n\n\tMientras n >= 1 Hacer\n\t\tEscribir n\n\t\tn = n - 1\n\tFinMientras\n\tEscribir "¡Despegue!"\nFinAlgoritmo' },
    { id: "ex07b", title: "Promedio hasta cero", lang: "pseudo",
      text: "Lee números hasta que se ingrese 0 (el 0 no cuenta). Muestra como última línea <code>Promedio: X</code>. Si el primer número ya es 0, muestra <code>No hay datos</code>.",
      starter: "Algoritmo Promedio\n\tDefinir n, suma Como Real\n\tDefinir cantidad Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["4", "6", "8", "0"], out: "Promedio: 6" }, { in: ["10", "0"], out: "Promedio: 10" }, { in: ["0"], out: "No hay datos" }, { in: ["1", "2", "0"], out: "Promedio: 1.5" }],
      hint: "Necesitas un acumulador (suma) y un contador (cantidad). Al final, si cantidad > 0 divide suma entre cantidad.",
      solution: 'Algoritmo Promedio\n\tDefinir n, suma Como Real\n\tDefinir cantidad Como Entero\n\tsuma = 0\n\tcantidad = 0\n\tLeer n\n\tMientras n <> 0 Hacer\n\t\tsuma = suma + n\n\t\tcantidad = cantidad + 1\n\t\tLeer n\n\tFinMientras\n\tSi cantidad > 0 Entonces\n\t\tEscribir "Promedio: ", suma / cantidad\n\tSiNo\n\t\tEscribir "No hay datos"\n\tFinSi\nFinAlgoritmo' },
    { id: "ex07c", title: "Contraseña", lang: "pseudo",
      text: "La contraseña correcta es <code>secreto</code>. Pídela hasta que la escriban bien. Por cada intento incorrecto muestra <code>Incorrecta</code>. Al acertar, la última línea debe ser <code>Acceso concedido</code>.",
      starter: "Algoritmo Clave\n\tDefinir clave Como Cadena\n\t\nFinAlgoritmo",
      tests: [{ in: ["hola", "1234", "secreto"], out: "Acceso concedido" }, { in: ["secreto"], out: "Acceso concedido" }],
      hint: "Repetir: Leer clave; Si clave <> \"secreto\" Entonces Escribir \"Incorrecta\". Hasta Que clave == \"secreto\".",
      solution: 'Algoritmo Clave\n\tDefinir clave Como Cadena\n\tRepetir\n\t\tEscribir "Contraseña:"\n\t\tLeer clave\n\t\tSi clave <> "secreto" Entonces\n\t\t\tEscribir "Incorrecta"\n\t\tFinSi\n\tHasta Que clave == "secreto"\n\tEscribir "Acceso concedido"\nFinAlgoritmo' },
  ]
});

L({
  id: "l08", module: "m2", title: "Bucle Para, contadores y acumuladores", minutes: 35,
  summary: "Repetir un número conocido de veces y llevar cuentas y totales.",
  sections: [
    { h: "El bucle Para", body: `
<p>Cuando sabes <b>cuántas veces</b> repetir, el bucle <b>Para</b> es más cómodo: inicializa, revisa y actualiza la variable por ti.</p>
${C(`Algoritmo TablaDel7
	Para i = 1 Hasta 10 Hacer
		Escribir "7 x ", i, " = ", 7 * i
	FinPara
FinAlgoritmo`)}
<p><code>Para i = 1 Hasta 10</code> significa: «i empieza en 1, en cada vuelta aumenta en 1, y la última vuelta es con i = 10».</p>
<p>Este Para hace exactamente lo mismo que este Mientras:</p>
${CN(`i = 1
Mientras i <= 10 Hacer
	Escribir "7 x ", i, " = ", 7 * i
	i = i + 1
FinMientras`)}` },
    { h: "Con Paso: saltos y cuenta atrás", body: `
<p>Con <code>Con Paso</code> cambias cuánto avanza la variable en cada vuelta:</p>
${C(`Algoritmo Pasos
	Escribir "Pares del 0 al 10:"
	Para i = 0 Hasta 10 Con Paso 2 Hacer
		Escribir Sin Saltar i, " "
	FinPara
	Escribir ""
	Escribir "Cuenta atrás:"
	Para i = 5 Hasta 1 Con Paso -1 Hacer
		Escribir Sin Saltar i, " "
	FinPara
	Escribir ""
FinAlgoritmo`)}` },
    { h: "Contadores", body: `
<p>Un <b>contador</b> es una variable que suma <b>1</b> cada vez que pasa algo. Sirve para responder «¿cuántos...?».</p>
${C(`Algoritmo ContarAprobados
	Definir nota Como Real
	Definir aprobados Como Entero
	aprobados = 0
	Para i = 1 Hasta 5 Hacer
		Escribir "Nota del alumno ", i, ":"
		Leer nota
		Si nota >= 6 Entonces
			aprobados = aprobados + 1
		FinSi
	FinPara
	Escribir "Aprobaron ", aprobados, " de 5"
FinAlgoritmo`)}
<p>Patrón: <b>empieza en 0</b> antes del bucle, y dentro haces <code>contador = contador + 1</code>.</p>` },
    { h: "Acumuladores", body: `
<p>Un <b>acumulador</b> va sumando <b>valores</b> (no de 1 en 1). Sirve para totales, promedios, etc.</p>
${C(`Algoritmo SumaHastaN
	Definir n, suma Como Entero
	Escribir "¿Hasta qué número sumo?"
	Leer n
	suma = 0
	Para i = 1 Hasta n Hacer
		suma = suma + i
	FinPara
	Escribir "1 + 2 + ... + ", n, " = ", suma
FinAlgoritmo`)}
${TABLE(["", "Contador", "Acumulador"], [["Valor inicial", "0", "0 (sumas) o 1 (productos)"], ["Dentro del bucle", "<code>c = c + 1</code>", "<code>total = total + valor</code>"], ["Responde", "¿Cuántos?", "¿Cuánto en total?"]])}
${WARN("Inicializa el acumulador <b>antes</b> del bucle. Si lo pones dentro, se reinicia en cada vuelta y siempre tendrás solo el último valor.")}
<p>Para multiplicar, el acumulador empieza en <b>1</b>. Ejemplo: el factorial de 5 es 1×2×3×4×5:</p>
${C(`Algoritmo Factorial
	Definir n, fact Como Entero
	n = 5
	fact = 1
	Para i = 1 Hasta n Hacer
		fact = fact * i
	FinPara
	Escribir n, "! = ", fact
FinAlgoritmo`)}` },
    { h: "Bucles anidados", body: `
<p>Un bucle dentro de otro. Por cada vuelta del bucle de afuera, el de adentro hace <b>todas</b> sus vueltas:</p>
${C(`Algoritmo Tablas
	Para tabla = 1 Hasta 3 Hacer
		Escribir "--- Tabla del ", tabla, " ---"
		Para i = 1 Hasta 5 Hacer
			Escribir tabla, " x ", i, " = ", tabla * i
		FinPara
	FinPara
FinAlgoritmo`)}
${C(`Algoritmo Triangulo
	Para fila = 1 Hasta 5 Hacer
		Para col = 1 Hasta fila Hacer
			Escribir Sin Saltar "*"
		FinPara
		Escribir ""
	FinPara
FinAlgoritmo`)}
${PRO("Los bucles anidados aparecen al recorrer tablas, imágenes (filas y columnas de píxeles) o comparar todos los elementos de una lista con todos los de otra. También son la razón por la que algunos programas se vuelven lentos: 1000 × 1000 = un millón de vueltas.")}` },
  ],
  cheat: [
    { h: "Para", body: CN(`Para i = 1 Hasta 10 Hacer
	Escribir i
FinPara

Para i = 10 Hasta 0 Con Paso -2 Hacer
	...
FinPara`) },
    { h: "Contador y acumulador", body: CN(`c = 0
total = 0
Para i = 1 Hasta n Hacer
	c = c + 1             // contador
	total = total + i     // acumulador
FinPara`) },
    { h: "¿Qué bucle uso?", body: TABLE(["Situación", "Bucle"], [["Sé cuántas vueltas", "Para"], ["Depende de una condición", "Mientras"], ["Al menos una vez / validar", "Repetir"]]) },
  ],
  quiz: [
    { q: "¿Cuántas vueltas da?", code: "Para i = 0 Hasta 9 Hacer\n\tEscribir i\nFinPara", opts: ["9", "10", "11", "0"], a: 1, why: "De 0 a 9 inclusive son 10 valores." },
    { q: "¿Qué muestra?", code: "Para i = 1 Hasta 10 Con Paso 3 Hacer\n\tEscribir Sin Saltar i, \" \"\nFinPara", opts: ["1 4 7 10", "1 3 6 9", "3 6 9", "1 4 7"], a: 0, why: "1, 1+3=4, 7, 10. El 10 todavía cumple (no supera 10)." },
    { q: "¿Qué valor tiene <code>p</code> al final?", code: "p = 1\nPara i = 1 Hasta 4 Hacer\n\tp = p * 2\nFinPara", opts: ["8", "16", "4", "2"], a: 1, why: "1·2·2·2·2 = 16. Es 2 elevado a 4." },
    { q: "¿Qué está mal?", code: "Para i = 1 Hasta 5 Hacer\n\tsuma = 0\n\tsuma = suma + i\nFinPara\nEscribir suma", opts: ["Nada, muestra 15", "El acumulador se reinicia en cada vuelta: muestra 5", "Falta Con Paso", "i debería empezar en 0"], a: 1, why: "suma = 0 debe ir antes del bucle." },
    { q: "¿Cuántas veces se muestra «*»?", code: "Para a = 1 Hasta 3 Hacer\n\tPara b = 1 Hasta 4 Hacer\n\t\tEscribir \"*\"\n\tFinPara\nFinPara", opts: ["7", "12", "3", "4"], a: 1, why: "Por cada una de las 3 vueltas de afuera, 4 de adentro: 3×4 = 12." },
    { q: "Un contador sirve para responder...", opts: ["¿Cuánto suman?", "¿Cuántos hay?", "¿Cuál es el mayor?", "¿Dónde está?"], a: 1, why: "Cuenta ocurrencias sumando de 1 en 1." },
  ],
  exercises: [
    { id: "ex08a", title: "Tabla de multiplicar", lang: "pseudo",
      text: "Lee un número N y muestra su tabla del 1 al 10 con el formato <code>N x i = resultado</code>. Por ejemplo, para 3 la primera línea es <code>3 x 1 = 3</code>.",
      starter: "Algoritmo Tabla\n\tDefinir n Como Entero\n\tLeer n\n\t\nFinAlgoritmo",
      tests: [{ in: ["3"], out: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30" }],
      hint: "Para i = 1 Hasta 10 Hacer: Escribir n, \" x \", i, \" = \", n * i",
      solution: 'Algoritmo Tabla\n\tDefinir n Como Entero\n\tLeer n\n\tPara i = 1 Hasta 10 Hacer\n\t\tEscribir n, " x ", i, " = ", n * i\n\tFinPara\nFinAlgoritmo' },
    { id: "ex08b", title: "Suma de pares", lang: "pseudo",
      text: "Lee un número N y muestra como última línea la suma de todos los números pares entre 1 y N (incluido N si es par).",
      starter: "Algoritmo SumaPares\n\tDefinir n, suma Como Entero\n\tLeer n\n\t\nFinAlgoritmo",
      tests: [{ in: ["10"], out: "30" }, { in: ["7"], out: "12" }, { in: ["1"], out: "0" }],
      hint: "Puedes recorrer de 2 a N con paso 2, o recorrer todos y sumar solo si i MOD 2 == 0.",
      solution: 'Algoritmo SumaPares\n\tDefinir n, suma Como Entero\n\tLeer n\n\tsuma = 0\n\tPara i = 2 Hasta n Con Paso 2 Hacer\n\t\tsuma = suma + i\n\tFinPara\n\tEscribir suma\nFinAlgoritmo' },
    { id: "ex08c", title: "Contar positivos y negativos", lang: "pseudo",
      text: "Lee 5 números. Muestra como últimas dos líneas:<br><code>Positivos: P</code><br><code>Negativos: N</code><br>(el 0 no cuenta como ninguno).",
      starter: "Algoritmo Signos\n\tDefinir x Como Real\n\tDefinir pos, neg Como Entero\n\t\nFinAlgoritmo",
      tests: [{ in: ["3", "-1", "0", "8", "-5"], out: "Positivos: 2\nNegativos: 2" }, { in: ["1", "2", "3", "4", "5"], out: "Positivos: 5\nNegativos: 0" }],
      hint: "Dos contadores en 0. Dentro de un Para de 1 a 5: Leer x, y con Si decide cuál aumentar.",
      solution: 'Algoritmo Signos\n\tDefinir x Como Real\n\tDefinir pos, neg Como Entero\n\tpos = 0\n\tneg = 0\n\tPara i = 1 Hasta 5 Hacer\n\t\tLeer x\n\t\tSi x > 0 Entonces\n\t\t\tpos = pos + 1\n\t\tSiNo\n\t\t\tSi x < 0 Entonces\n\t\t\t\tneg = neg + 1\n\t\t\tFinSi\n\t\tFinSi\n\tFinPara\n\tEscribir "Positivos: ", pos\n\tEscribir "Negativos: ", neg\nFinAlgoritmo' },
    { id: "ex08d", title: "Pirámide de números", lang: "pseudo",
      text: "Lee N y muestra N filas: la fila k tiene los números del 1 al k pegados. Para N = 4:<br><pre class=\"mini\">1\n12\n123\n1234</pre>",
      starter: "Algoritmo Piramide\n\tDefinir n Como Entero\n\tLeer n\n\t\nFinAlgoritmo",
      tests: [{ in: ["4"], out: "1\n12\n123\n1234" }, { in: ["2"], out: "1\n12" }],
      hint: "Bucle anidado: afuera fila de 1 a n; adentro col de 1 a fila con Escribir Sin Saltar col; al terminar cada fila, Escribir \"\".",
      solution: 'Algoritmo Piramide\n\tDefinir n Como Entero\n\tLeer n\n\tPara fila = 1 Hasta n Hacer\n\t\tPara col = 1 Hasta fila Hacer\n\t\t\tEscribir Sin Saltar col\n\t\tFinPara\n\t\tEscribir ""\n\tFinPara\nFinAlgoritmo' },
  ]
});

L({
  id: "l09", module: "m2", title: "Patrones con bucles y depuración", minutes: 35,
  summary: "Máximos, mínimos, banderas, validación y cómo encontrar errores.",
  sections: [
    { h: "Patrones: soluciones que se repiten", body: `
<p>Los programadores no inventan todo desde cero: reconocen <b>patrones</b>. Ya conoces dos (contador y acumulador). Veamos otros que aparecen en cientos de problemas.</p>` },
    { h: "Máximo y mínimo", body: `
<p>Para encontrar el mayor de muchos valores: guarda el primero como «mayor provisional» y compara cada nuevo valor con él.</p>
${C(`Algoritmo MayorYMenor
	Definir n, x, mayor, menor Como Real
	Escribir "¿Cuántos números?"
	Leer n
	Escribir "Número 1:"
	Leer x
	mayor = x
	menor = x
	Para i = 2 Hasta n Hacer
		Escribir "Número ", i, ":"
		Leer x
		Si x > mayor Entonces
			mayor = x
		FinSi
		Si x < menor Entonces
			menor = x
		FinSi
	FinPara
	Escribir "Mayor: ", mayor, " / Menor: ", menor
FinAlgoritmo`)}
${WARN("No inicialices <code>mayor = 0</code>: si todos los números son negativos, el resultado sería 0, que ni siquiera está en la lista. Usa el primer valor.")}` },
    { h: "Bandera (indicador)", body: `
<p>Una <b>bandera</b> es una variable lógica que «se levanta» cuando ocurre algo. Responde preguntas de sí/no como «¿apareció algún número negativo?».</p>
${C(`Algoritmo HayNegativo
	Definir x Como Entero
	Definir hayNegativo Como Logico
	hayNegativo = Falso
	Para i = 1 Hasta 4 Hacer
		Leer x
		Si x < 0 Entonces
			hayNegativo = Verdadero
		FinSi
	FinPara
	Si hayNegativo Entonces
		Escribir "Hubo al menos un negativo"
	SiNo
		Escribir "Todos fueron positivos o cero"
	FinSi
FinAlgoritmo`)}
<p>Otro uso clásico: saber si un número es <b>primo</b> (solo divisible por 1 y por sí mismo):</p>
${C(`Algoritmo Primo
	Definir n Como Entero
	Definir esPrimo Como Logico
	n = 29
	esPrimo = n > 1
	d = 2
	Mientras d * d <= n Y esPrimo Hacer
		Si n MOD d == 0 Entonces
			esPrimo = Falso
		FinSi
		d = d + 1
	FinMientras
	Si esPrimo Entonces
		Escribir n, " es primo"
	SiNo
		Escribir n, " no es primo"
	FinSi
FinAlgoritmo`)}` },
    { h: "Recorrer los dígitos de un número", body: `
<p>Combinando <code>MOD 10</code> (último dígito) y <code>trunc(n / 10)</code> (quitar el último dígito) puedes procesar un número cifra por cifra:</p>
${C(`Algoritmo SumaDigitos
	Definir n, suma Como Entero
	n = 4827
	suma = 0
	Mientras n > 0 Hacer
		suma = suma + n MOD 10
		n = trunc(n / 10)
	FinMientras
	Escribir "La suma de los dígitos es ", suma
FinAlgoritmo`)}` },
    { h: "Depurar: encontrar y corregir errores", body: `
<p>A los errores en programas se les llama <b>bugs</b> y a corregirlos, <b>depurar</b> (debugging). Hay dos tipos:</p>
<ul><li><b>Errores de sintaxis:</b> escribiste algo que el lenguaje no entiende (falta un FinSi, comillas sin cerrar). El programa ni arranca. Son los fáciles: el mensaje te dice dónde.</li><li><b>Errores de lógica:</b> el programa funciona pero da un resultado incorrecto. Son los difíciles.</li></ul>
<p>Método para errores de lógica:</p>
<ol><li><b>Reproduce:</b> encuentra una entrada concreta que da mal.</li><li><b>Predice:</b> ¿qué debería dar? Calcúlalo a mano.</li><li><b>Observa:</b> usa <b>Paso a paso</b> o agrega <code>Escribir</code> temporales para ver los valores intermedios.</li><li><b>Compara:</b> ¿en qué línea lo que pasa deja de coincidir con lo que esperabas? Ahí está el bug.</li></ol>
<p>Este programa debería mostrar el promedio de 1, 2 y 3 (que es 2), pero no lo hace. Ejecútalo paso a paso y encuentra el error:</p>
${C(`Algoritmo PromedioConBug
	suma = 0
	Para i = 1 Hasta 3 Hacer
		suma = suma + i
	FinPara
	Escribir "Promedio: ", suma / i
FinAlgoritmo`)}
${TIP("Pista: ¿cuánto vale i después de que termina el Para? Mira la tabla de variables. Lección: no uses la variable del Para fuera del bucle; usa la cantidad real (3).")}
${PRO("Depurar es probablemente lo que más tiempo ocupa en el trabajo de un programador. Las herramientas profesionales (el depurador de VS Code o de Chrome) hacen exactamente lo mismo que el botón Paso a paso: pausar, avanzar línea por línea y mirar variables.")}` },
  ],
  cheat: [
    { h: "Máximo", body: CN(`Leer x
mayor = x            // primer valor, no 0
Para i = 2 Hasta n Hacer
	Leer x
	Si x > mayor Entonces
		mayor = x
	FinSi
FinPara`) },
    { h: "Bandera", body: CN(`encontrado = Falso
// dentro del bucle:
Si condición Entonces
	encontrado = Verdadero
FinSi`) },
    { h: "Dígitos", body: CN(`ultimo = n MOD 10
n = trunc(n / 10)    // quita el último`) },
    { h: "Depurar", body: `<ol><li>Reproduce con un caso concreto.</li><li>Calcula a mano qué debería dar.</li><li>Paso a paso o <code>Escribir</code> temporales.</li><li>Busca la primera línea donde no coincide.</li></ol>` },
  ],
  quiz: [
    { q: "Para buscar el menor de una lista, ¿cómo inicializas <code>menor</code>?", opts: ["menor = 0", "menor = 999", "menor = primer valor", "No hace falta"], a: 2, why: "Cualquier número fijo puede fallar con ciertos datos. El primer valor siempre es seguro." },
    { q: "¿Qué tipo de dato es una bandera normalmente?", opts: ["Entero", "Cadena", "Logico", "Real"], a: 2, why: "Indica sí/no: es lógica." },
    { q: "¿Qué da <code>trunc(593 / 10)</code>?", opts: ["3", "59", "59.3", "593"], a: 1, why: "593/10 = 59.3, trunc quita los decimales: 59. Quita el último dígito." },
    { q: "El programa funciona pero da un resultado incorrecto. Es un error de...", opts: ["Sintaxis", "Lógica", "Hardware", "Internet"], a: 1, why: "Los de sintaxis impiden ejecutar; los de lógica dan resultados equivocados." },
    { q: "¿Qué muestra?", code: "c = 0\nn = 1000\nMientras n > 1 Hacer\n\tn = n / 10\n\tc = c + 1\nFinMientras\nEscribir c", opts: ["2", "3", "4", "1000"], a: 1, why: "1000 → 100 → 10 → 1: tres divisiones." },
    { q: "¿Cuál es el primer paso para corregir un error de lógica?", opts: ["Reescribir todo", "Encontrar una entrada concreta que produzca el error", "Agregar más bucles", "Cambiar los nombres de variables"], a: 1, why: "Sin un caso que falle de forma reproducible, es difícil saber qué buscar." },
  ],
  exercises: [
    { id: "ex09a", title: "La nota más alta", lang: "pseudo",
      text: "Lee primero la cantidad de alumnos N y luego N notas. Muestra como última línea <code>Nota más alta: X</code>.",
      starter: "Algoritmo NotaMax\n\tDefinir n Como Entero\n\tDefinir nota, maxima Como Real\n\t\nFinAlgoritmo",
      tests: [{ in: ["3", "7", "9.5", "6"], out: "Nota más alta: 9.5" }, { in: ["1", "4"], out: "Nota más alta: 4" }, { in: ["4", "2", "3", "1", "8"], out: "Nota más alta: 8" }],
      hint: "Lee la primera nota fuera del bucle y úsala como máxima inicial. Luego Para i = 2 Hasta n.",
      solution: 'Algoritmo NotaMax\n\tDefinir n Como Entero\n\tDefinir nota, maxima Como Real\n\tLeer n\n\tLeer nota\n\tmaxima = nota\n\tPara i = 2 Hasta n Hacer\n\t\tLeer nota\n\t\tSi nota > maxima Entonces\n\t\t\tmaxima = nota\n\t\tFinSi\n\tFinPara\n\tEscribir "Nota más alta: ", maxima\nFinAlgoritmo' },
    { id: "ex09b", title: "¿Es primo?", lang: "pseudo",
      text: "Lee un número entero y muestra <code>Primo</code> o <code>No primo</code>. Recuerda: 1 no es primo, 2 sí.",
      starter: "Algoritmo EsPrimo\n\tDefinir n, d Como Entero\n\tDefinir primo Como Logico\n\tLeer n\n\t\nFinAlgoritmo",
      tests: [{ in: ["7"], out: "Primo" }, { in: ["12"], out: "No primo" }, { in: ["1"], out: "No primo" }, { in: ["2"], out: "Primo" }, { in: ["97"], out: "Primo" }],
      hint: "Bandera primo = n > 1. Prueba divisores d desde 2 mientras d * d <= n. Si n MOD d == 0, baja la bandera.",
      solution: 'Algoritmo EsPrimo\n\tDefinir n, d Como Entero\n\tDefinir primo Como Logico\n\tLeer n\n\tprimo = n > 1\n\td = 2\n\tMientras d * d <= n Hacer\n\t\tSi n MOD d == 0 Entonces\n\t\t\tprimo = Falso\n\t\tFinSi\n\t\td = d + 1\n\tFinMientras\n\tSi primo Entonces\n\t\tEscribir "Primo"\n\tSiNo\n\t\tEscribir "No primo"\n\tFinSi\nFinAlgoritmo' },
    { id: "ex09c", title: "Invertir un número", lang: "pseudo",
      text: "Lee un número entero positivo y muéstralo con sus dígitos al revés. Ejemplo: 1234 → <code>4321</code>.",
      starter: "Algoritmo Invertir\n\tDefinir n, invertido Como Entero\n\tLeer n\n\t\nFinAlgoritmo",
      tests: [{ in: ["1234"], out: "4321" }, { in: ["5"], out: "5" }, { in: ["908"], out: "809" }],
      hint: "invertido empieza en 0. En cada vuelta: invertido = invertido * 10 + n MOD 10, y n = trunc(n / 10).",
      solution: 'Algoritmo Invertir\n\tDefinir n, invertido Como Entero\n\tLeer n\n\tinvertido = 0\n\tMientras n > 0 Hacer\n\t\tinvertido = invertido * 10 + n MOD 10\n\t\tn = trunc(n / 10)\n\tFinMientras\n\tEscribir invertido\nFinAlgoritmo' },
  ]
});

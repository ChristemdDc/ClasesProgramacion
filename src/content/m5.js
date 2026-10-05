/* MÓDULO 5 · Camino profesional */
MOD({
  id: "m5", n: 5, title: "Hacia tu primer trabajo", lang: "none",
  desc: "Las herramientas del oficio y una ruta concreta para dedicarte a programar.",
  lessons: ["l18", "l19"],
  exam: null
});

L({
  id: "l18", module: "m5", title: "Las herramientas del oficio", minutes: 30,
  summary: "Editor, terminal, Git y GitHub, cómo buscar ayuda y cómo usar la IA para aprender.",
  sections: [
    { h: "Tu editor de código", body: `
<p>Para programar en serio necesitas una computadora (en el móvil se aprende la lógica, pero se trabaja en una PC o notebook, no hace falta que sea potente). El editor más usado del mundo es <b>Visual Studio Code</b> (VS Code): gratuito, para Windows, Mac y Linux.</p>
<p>Lo que te da: colores en el código, autocompletado, aviso de errores mientras escribes, un depurador como el <b>Paso a paso</b> de esta app, y extensiones para cualquier lenguaje.</p>
${TIP("Primer paso concreto: instala VS Code y Node.js (desde nodejs.org). Crea un archivo <code>hola.js</code> con <code>console.log(\"Hola\")</code> y ejecútalo en la terminal con <code>node hola.js</code>. ¡Ya estás programando como un profesional!")}` },
    { h: "La terminal", body: `
<p>La <b>terminal</b> (o consola, o línea de comandos) es una forma de usar la computadora escribiendo comandos en lugar de hacer clic. Al principio impresiona, pero se usan pocos comandos:</p>
${TABLE(["Comando", "Qué hace"], [["<code>pwd</code>", "Muestra en qué carpeta estás"], ["<code>ls</code> (o <code>dir</code> en Windows)", "Lista los archivos"], ["<code>cd carpeta</code>", "Entra a una carpeta"], ["<code>cd ..</code>", "Sube una carpeta"], ["<code>mkdir nombre</code>", "Crea una carpeta"], ["<code>node archivo.js</code>", "Ejecuta un programa JavaScript"]])}` },
    { h: "Git y GitHub", body: `
<p><b>Git</b> es un sistema de control de versiones: guarda «fotos» (llamadas <b>commits</b>) de tu proyecto a lo largo del tiempo. Si rompes algo, vuelves atrás. Si trabajas en equipo, permite combinar el trabajo de varias personas.</p>
<p><b>GitHub</b> es un sitio web donde se guardan proyectos con Git. Es, además, tu <b>portafolio</b>: las empresas miran tu GitHub para ver qué sabes hacer.</p>
${CN(`git init                  # empezar a usar git en una carpeta
git add .                 # preparar los cambios
git commit -m "mensaje"   # guardar una foto con un mensaje
git push                  # subir a GitHub`, "none")}
${PRO("En prácticamente todas las empresas de software se usa Git todos los días. Saber usarlo es tan básico como saber programar. Aprende al menos: <code>clone</code>, <code>add</code>, <code>commit</code>, <code>push</code>, <code>pull</code> y qué es una <b>rama</b> (branch) y un <b>pull request</b>.")}` },
    { h: "Cómo buscar ayuda", body: `
<p>Nadie memoriza todo. Una habilidad profesional clave es <b>saber buscar</b>:</p>
<ol><li><b>Lee el mensaje de error completo.</b> Copia la parte importante y búscala tal cual.</li><li><b>Busca en inglés</b> cuando puedas: hay 10 veces más respuestas. «javascript sort array of numbers» encuentra todo.</li><li><b>Documentación oficial:</b> para JavaScript, <b>MDN Web Docs</b> (developer.mozilla.org) tiene todo, también en español.</li><li><b>Stack Overflow:</b> preguntas y respuestas de programadores. Casi siempre alguien tuvo tu mismo problema.</li></ol>` },
    { h: "La IA como tutor (y no como muleta)", body: `
<p>Herramientas como Claude pueden explicarte conceptos, revisar tu código y ayudarte a entender errores. Son excelentes para aprender <b>si las usas bien</b>:</p>
<ul><li>✔ Pide que te <b>explique</b> por qué falla tu código, no que te lo arregle.</li><li>✔ Pide <b>pistas</b> en vez de soluciones completas.</li><li>✔ Pide que te genere <b>ejercicios nuevos</b> para practicar un tema.</li><li>✔ Después de leer una solución, ciérrala y escríbela tú sin mirar.</li><li>✘ Copiar y pegar código que no entiendes: en una entrevista o en el trabajo lo vas a necesitar entender.</li></ul>
<p>En el Laboratorio de esta app tienes el botón <b>Pedir ayuda</b>, configurado para darte pistas y explicaciones sin resolverte el ejercicio.</p>
${PRO("Hoy los equipos profesionales usan IA a diario para escribir código más rápido. Lo que hace valioso a un programador es <b>entender</b> el código, saber si está bien, y saber qué pedir. Eso es exactamente lo que estás entrenando.")}` },
  ],
  cheat: [
    { h: "Para empezar en tu PC", body: `<ol><li>Instalar VS Code.</li><li>Instalar Node.js.</li><li>Crear cuenta en GitHub.</li><li>Instalar Git.</li></ol>` },
    { h: "Terminal", body: CN(`pwd   ls   cd carpeta   cd ..   mkdir nueva
node archivo.js`, "none") },
    { h: "Git", body: CN(`git clone URL
git add .
git commit -m "qué cambié"
git push
git pull`, "none") },
    { h: "Buscar ayuda", body: `Error completo → buscar en inglés → MDN → Stack Overflow → IA para que te <b>explique</b>.` },
  ],
  quiz: [
    { q: "¿Para qué sirve Git?", opts: ["Para diseñar páginas", "Para guardar versiones del código y trabajar en equipo", "Para ejecutar JavaScript", "Para buscar errores automáticamente"], a: 1, why: "Es un control de versiones: historial de cambios y colaboración." },
    { q: "¿Cuál es la mejor forma de usar la IA para aprender a programar?", opts: ["Pedir siempre la solución completa y copiarla", "Pedir explicaciones y pistas, y luego escribir el código uno mismo", "No usarla nunca", "Usarla solo para escribir comentarios"], a: 1, why: "Así aprendes de verdad y puedes usarla como acelerador más adelante." },
    { q: "¿Qué comando de terminal entra en una carpeta?", opts: ["ls", "pwd", "cd", "mkdir"], a: 2, why: "cd = change directory." },
    { q: "¿Dónde está la documentación más completa de JavaScript?", opts: ["MDN Web Docs", "Wikipedia", "Un foro cualquiera", "No existe"], a: 0, why: "MDN (developer.mozilla.org) es la referencia de la web." },
    { q: "¿Qué es un commit?", opts: ["Un error", "Una foto guardada del estado del proyecto con un mensaje", "Un lenguaje", "Una página web"], a: 1, why: "Cada commit registra los cambios en un momento dado." },
  ],
  exercises: []
});

L({
  id: "l19", module: "m5", title: "Tu ruta para dedicarte a esto", minutes: 25,
  summary: "Especialidades, un plan de estudio de 12 meses, proyectos para tu portafolio y cómo conseguir tu primer trabajo.",
  sections: [
    { h: "Especialidades", body: `
${TABLE(["Área", "Qué haces", "Tecnologías típicas"], [["<b>Frontend</b>", "La parte visible de webs y apps: lo que el usuario ve y toca", "HTML, CSS, JavaScript, React"], ["<b>Backend</b>", "Servidores, bases de datos, lógica de negocio", "Node.js, Python, Java, C#, SQL"], ["<b>Full stack</b>", "Frontend + backend", "Combinaciones de las anteriores"], ["<b>Móvil</b>", "Apps para Android e iOS", "React Native, Flutter, Kotlin, Swift"], ["<b>Datos</b>", "Analizar datos, reportes, inteligencia artificial", "Python, SQL, pandas"], ["<b>QA / Testing</b>", "Asegurar que el software funcione bien", "Testing manual y automatizado"]])}
<p>Un camino muy recomendado para empezar: <b>frontend con JavaScript</b>. Ves resultados visuales rápido (motiva), hay mucha demanda, y luego puedes ir hacia full stack.</p>` },
    { h: "Un plan de 12 meses", body: `
<p>Con constancia (1 a 2 horas por día) este es un ritmo realista:</p>
${TABLE(["Meses", "Qué estudiar", "Resultado"], [["1", "Esta app completa: lógica con pseudocódigo y bases de JavaScript", "Piensas como programador"], ["2–3", "HTML y CSS: estructura y diseño de páginas. Git y GitHub", "Páginas estáticas publicadas en GitHub Pages"], ["3–5", "JavaScript en el navegador: el DOM, eventos, fetch y APIs", "Páginas interactivas: calculadora, lista de tareas, app del clima"], ["5–8", "Un framework (React) y buenas prácticas", "2 o 3 proyectos completos en tu portafolio"], ["8–10", "Backend básico: Node.js, una base de datos, SQL", "Una app full stack sencilla"], ["10–12", "Portafolio, CV, LinkedIn, practicar entrevistas, postular", "Primeras entrevistas"]])}
${TIP("Recursos gratuitos excelentes: <b>freeCodeCamp</b> (en español), <b>MDN Web Docs</b>, <b>The Odin Project</b> y <b>JavaScript.info</b> (tiene versión en español).")}` },
    { h: "Proyectos para tu portafolio", body: `
<p>Las empresas que contratan perfiles junior quieren ver que puedes <b>construir cosas</b>. Ideas en orden de dificultad:</p>
<ol><li>Tu página personal (quién eres, qué sabes, tus proyectos).</li><li>Lista de tareas que se guarde en el navegador.</li><li>App del clima que consulte una API pública.</li><li>Un juego simple: adivina el número, ta-te-ti, memoria.</li><li>Una tienda simple con carrito de compras.</li><li>Un proyecto que resuelva un problema real tuyo o de alguien cercano (el más valioso en entrevistas).</li></ol>
${PRO("Un proyecto propio terminado, publicado y con un README claro vale más que diez tutoriales copiados. Cuando te pregunten en una entrevista, vas a poder contar qué problema tuviste y cómo lo resolviste.")}` },
    { h: "Hábitos que marcan la diferencia", body: `
<ul><li><b>Constancia sobre intensidad.</b> Una hora todos los días rinde más que diez horas un domingo.</li><li><b>Programa más de lo que lees.</b> Por cada video, escribe código.</li><li><b>Atascarse es parte del proceso.</b> Si llevas 30 minutos atascado, pide ayuda o tómate un descanso: muchas soluciones aparecen al volver.</li><li><b>Aprende en público.</b> Sube tus proyectos, comparte lo que aprendes en LinkedIn. Te conecta con gente y oportunidades.</li><li><b>Inglés técnico.</b> Leer documentación en inglés multiplica tus recursos y tus oportunidades laborales (incluido trabajo remoto).</li><li><b>Comunidad.</b> Busca grupos de programación en tu ciudad o en Discord. Aprender con otros sostiene la motivación.</li></ul>
<p>Tú ya diste el paso más difícil: empezar desde cero con la intención de aprender. Vuelve a esta app cuando quieras repasar: los machetes y el laboratorio siempre estarán aquí.</p>` },
  ],
  cheat: [
    { h: "Ruta sugerida", body: `Lógica → HTML/CSS → Git → JavaScript en el navegador → React → Node + SQL → Portafolio → Postular` },
    { h: "Recursos gratuitos", body: `<ul><li>freeCodeCamp (español)</li><li>MDN Web Docs</li><li>JavaScript.info</li><li>The Odin Project</li></ul>` },
    { h: "Portafolio mínimo", body: `<ul><li>Página personal</li><li>2–3 proyectos propios publicados</li><li>README claro en cada uno</li><li>GitHub y LinkedIn actualizados</li></ul>` },
  ],
  quiz: [
    { q: "¿Qué área se ocupa de la parte visible de una web?", opts: ["Backend", "Frontend", "Datos", "QA"], a: 1, why: "Frontend es lo que el usuario ve y usa." },
    { q: "¿Qué es lo que más valora una empresa en un perfil junior?", opts: ["Haber visto muchos tutoriales", "Proyectos propios terminados y poder explicarlos", "Saber 10 lenguajes", "Tener la computadora más cara"], a: 1, why: "Demuestran que sabes construir y resolver problemas." },
    { q: "Llevas una hora atascado en un error. ¿Qué haces?", opts: ["Abandonar programación", "Tomar un descanso, buscar el error o pedir ayuda explicando lo que intentaste", "Borrar el proyecto", "Esperar a que se arregle solo"], a: 1, why: "Atascarse es normal. Pedir ayuda bien (con contexto) es una habilidad profesional." },
    { q: "¿Qué es más efectivo para aprender?", opts: ["10 horas un solo día por semana", "1 hora todos los días", "Solo ver videos", "Leer sin practicar"], a: 1, why: "La práctica constante consolida lo aprendido." },
  ],
  exercises: []
});

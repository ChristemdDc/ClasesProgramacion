/* Valida el contenido del curso: ejecuta todos los ejemplos y las soluciones de los retos.
   Uso: node tools/validate.js */
const path = require("path");
const fs = require("fs");
globalThis.window = globalThis;
const src = path.join(__dirname, "..", "src");
require(path.join(src, "pseudo.js"));
require(path.join(src, "checker.js"));
for (const f of ["base", "m1", "m2", "m3", "m4", "m5"]) require(path.join(src, "content", f + ".js"));

const P = globalThis.Pseudo;
const { checkOutput, deepEqual } = globalThis.Checker;
let fails = 0, ok = 0;

async function runPseudo(code, inputs) {
  let out = "";
  const q = inputs.slice();
  try {
    const prog = P.parse(code);
    await P.run(prog, { write: (t, nl) => { out += t + (nl ? "\n" : ""); }, read: async () => (q.length ? q.shift() : null), clear: () => {} }, { maxSteps: 300000 });
    return { out };
  } catch (e) {
    return { out, error: e.message, line: e.line };
  }
}

function runJS(code, inputs, tests) {
  const queue = inputs.slice();
  let out = "";
  const fmt = (v) => typeof v === "string" ? v : JSON.stringify(v);
  const con = { log: (...a) => { out += a.map(fmt).join(" ") + "\n"; } };
  const leer = () => queue.shift();
  const exprs = (tests || []).map((t) => t.expr ? `(() => { try { return { ok: true, v: (${t.expr}) }; } catch (e) { return { ok: false, e: String(e) }; } })()` : "null");
  try {
    const fn = new Function("console", "leer", "prompt", '"use strict";\n' + code + "\n;return [" + exprs.join(",") + "];");
    const res = fn(con, leer, leer);
    return { out, results: res };
  } catch (e) { return { out, error: String(e) }; }
}

const INTENTIONAL = /Algoritmo (ConError|TipoIncorrecto|FueraDeRango|Infinito|Ambito)\b/;

(async () => {
  const blocks = [];
  for (const id of CURSO.order) {
    const l = CURSO.lessons[id];
    const html = l.sections.map((s) => s.body).join("\n");
    const re = /<div class="code" data-lang="(\w+)"( data-norun="1")? data-src="([^"]*)"><\/div>/g;
    let m;
    while ((m = re.exec(html))) if (!m[2]) blocks.push({ lesson: id, lang: m[1], src: decodeURIComponent(m[3]) });
  }
  for (const b of blocks) {
    if (b.lang === "pseudo") {
      const r = await runPseudo(b.src, Array(40).fill("5"));
      const intentional = INTENTIONAL.test(b.src);
      if (r.error && /no hay más datos/.test(r.error)) r.error = null;
      if (r.error && !intentional) { fails++; console.log(`✘ ejemplo ${b.lesson}: ${r.error} (línea ${r.line})\n${b.src}\n`); }
      else if (!r.error && intentional) { fails++; console.log(`✘ ejemplo ${b.lesson} debía fallar:\n${b.src}\n`); }
      else ok++;
    } else {
      const r = runJS(b.src, Array(10).fill("5"), []);
      const intentional = /total\);/.test(b.src) && false;
      if (r.error && !intentional) { fails++; console.log(`✘ ejemplo JS ${b.lesson}: ${r.error}\n${b.src}\n`); } else ok++;
    }
  }
  const exercises = [];
  for (const id of CURSO.order) for (const ex of CURSO.lessons[id].exercises) exercises.push(ex);
  for (const m of CURSO.modules) if (m.exam && m.exam.challenge) exercises.push(m.exam.challenge);
  for (const ex of exercises) {
    for (const t of ex.tests) {
      let pass, detail;
      if (ex.lang === "pseudo") {
        const r = await runPseudo(ex.solution, t.in || []);
        pass = !r.error && checkOutput(r.out, t.out, t);
        detail = r.error || r.out;
      } else {
        const r = runJS(ex.solution, t.in || [], [t]);
        if (r.error) { pass = false; detail = r.error; }
        else if (t.expr) { const res = r.results[0]; pass = res.ok && deepEqual(res.v, t.expect); detail = JSON.stringify(res); }
        else { pass = checkOutput(r.out, t.out, t); detail = r.out; }
      }
      if (pass) ok++; else { fails++; console.log(`✘ reto ${ex.id} con ${JSON.stringify(t.in || t.expr)}:\n${detail}\nesperado: ${t.out ?? JSON.stringify(t.expect)}\n`); }
    }
    // El código inicial no debe pasar los tests por sí solo
    if (ex.lang === "pseudo") {
      const r = await runPseudo(ex.starter, (ex.tests[0].in || []).slice());
      if (!r.error && checkOutput(r.out, ex.tests[0].out, ex.tests[0])) { fails++; console.log(`✘ el código inicial de ${ex.id} ya pasa el test`); }
    }
  }
  // Preguntas: índices válidos
  const allQ = [];
  for (const id of CURSO.order) allQ.push(...CURSO.lessons[id].quiz.map((q) => [id, q]));
  for (const m of CURSO.modules) if (m.exam) allQ.push(...m.exam.extra.map((q) => [m.id, q]));
  for (const [id, q] of allQ) {
    if (q.fill) { if (!Array.isArray(q.a) || !q.a.length) { fails++; console.log("✘ pregunta sin respuesta", id, q.q); } }
    else if (!(q.a >= 0 && q.a < q.opts.length)) { fails++; console.log("✘ índice de respuesta inválido", id, q.q); }
    if (!q.why) { fails++; console.log("✘ pregunta sin explicación", id, q.q); }
  }
  // El código de las preguntas en pseudocódigo debe ser válido
  for (const [id, q] of allQ) {
    const pseudo = q.code && q.lang !== "js" && !(CURSO.lessons[id] && CURSO.lessons[id].lang === "js") && !(CURSO.modules.find((m) => m.id === id) || {}).lang?.startsWith("js");
    if (!pseudo) continue;
    try { P.parse(q.code); ok++; } catch (e) { fails++; console.log("✘ código de pregunta inválido", id, e.message, "\n" + q.code); }
  }
  const ids = exercises.map((e) => e.id);
  if (new Set(ids).size !== ids.length) { fails++; console.log("✘ ids de retos repetidos"); }
  console.log(`\n${blocks.length} ejemplos, ${exercises.length} retos, ${allQ.length} preguntas. OK: ${ok}  Fallos: ${fails}`);
  process.exit(fails ? 1 : 0);
})();

/* Ejecuta JavaScript del alumno dentro de un Web Worker (aislado y con límite de tiempo).
   Expone window.JSRunner.run(code, {inputs, tests, timeout}) -> Promise<{out, error, results}> */
(function (global) {
  "use strict";
  const WORKER_SRC = `
  const fmt = (v, top) => {
    if (typeof v === "string") return top ? v : JSON.stringify(v);
    if (v === undefined) return "undefined";
    if (typeof v === "function") return "[función " + (v.name || "anónima") + "]";
    if (Array.isArray(v)) return "[" + v.map((x) => fmt(x, false)).join(", ") + "]";
    if (v && typeof v === "object") {
      try { return "{ " + Object.entries(v).map(([k, x]) => k + ": " + fmt(x, false)).join(", ") + " }"; } catch (e) { return String(v); }
    }
    return String(v);
  };
  self.onmessage = (ev) => {
    const { code, inputs, tests } = ev.data;
    const queue = (inputs || []).slice();
    let out = "";
    const log = (...a) => { out += a.map((x) => fmt(x, true)).join(" ") + "\\n"; if (out.length > 200000) throw new Error("Demasiada salida en consola (¿un bucle infinito?)"); };
    const fakeConsole = { log, info: log, warn: log, error: log };
    const leer = (msg) => { if (msg !== undefined) log(msg); if (!queue.length) throw new Error("El programa pidió un dato con leer()/prompt() pero no hay más entradas"); const v = queue.shift(); return v; };
    let results = null, error = null;
    try {
      const testExprs = (tests || []).map((t) => t.expr ? "(() => { try { return { ok: true, v: (" + t.expr + ") }; } catch (e) { return { ok: false, e: String(e && e.message || e) }; } })()" : "null");
      const body = '"use strict";\\n' + code + "\\n;return [" + testExprs.join(",") + "];";
      const fn = new Function("console", "leer", "prompt", body);
      const raw = fn(fakeConsole, leer, leer);
      results = raw.map((r) => r && (r.ok ? { ok: true, v: fmt(r.v, false), raw: (r.v === undefined ? null : JSON.parse(JSON.stringify(r.v === undefined ? null : r.v))) } : r));
    } catch (e) {
      error = { name: e && e.name, message: String(e && e.message || e), line: lineOf(e) };
    }
    self.postMessage({ out, error, results });
  };
  function lineOf(e) {
    const m = String(e && e.stack || "").match(/<anonymous>:(\\d+):(\\d+)/);
    return m ? Number(m[1]) - 3 : null;
  }`;

  let url = null;
  function workerURL() {
    if (!url) url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
    return url;
  }

  const TRANSLATE = [
    [/(\w+) is not defined/, (m) => "'" + m[1] + "' no está definido. ¿Lo escribiste bien o falta declararlo con let/const?"],
    [/Unexpected end of input/, () => "El código termina antes de tiempo: probablemente falta cerrar una llave } o un paréntesis )"],
    [/Unexpected token '?(.+?)'?$/, (m) => "Símbolo inesperado " + m[1] + ". Revisa paréntesis, llaves y comas cerca de ahí"],
    [/Unexpected identifier '?(.+?)'?$/, (m) => "Nombre inesperado '" + m[1] + "'. ¿Falta una coma, un operador o un paréntesis antes?"],
    [/Assignment to constant variable/, () => "Intentaste cambiar una constante (const). Usa let si el valor debe cambiar"],
    [/Cannot read properties of (undefined|null) \(reading '(.+)'\)/, (m) => "Intentaste leer '." + m[2] + "' de algo que es " + m[1] + ". Revisa que la variable tenga valor"],
    [/(.+) is not a function/, (m) => m[1] + " no es una función. Revisa el nombre o los paréntesis"],
    [/Invalid or unexpected token/, () => "Hay un carácter no válido. ¿Comillas sin cerrar o comillas tipográficas “ ”?"],
    [/missing \) after argument list/, () => "Falta cerrar un paréntesis ) en la llamada a una función"],
    [/Identifier '(.+)' has already been declared/, (m) => "'" + m[1] + "' ya fue declarado. Declara cada variable una sola vez con let/const"],
    [/Cannot access '(.+)' before initialization/, (m) => "Usaste '" + m[1] + "' antes de declararla"],
  ];
  function explain(msg) {
    for (const [re, f] of TRANSLATE) { const m = msg.match(re); if (m) return f(m); }
    return msg;
  }

  function run(code, opts = {}) {
    return new Promise((resolve) => {
      let w;
      try { w = new Worker(workerURL()); }
      catch (e) { resolve({ out: "", error: { message: "No se pudo iniciar el ejecutor de JavaScript en este navegador" }, results: null }); return; }
      const timer = setTimeout(() => {
        w.terminate();
        resolve({ out: "", error: { message: "Tu programa tardó demasiado (más de " + ((opts.timeout || 3000) / 1000) + " s). ¿Hay un bucle infinito?" }, results: null, timeout: true });
      }, opts.timeout || 3000);
      w.onmessage = (ev) => {
        clearTimeout(timer); w.terminate();
        const r = ev.data;
        if (r.error) r.error.friendly = explain(r.error.message);
        resolve(r);
      };
      w.onerror = (ev) => {
        clearTimeout(timer); w.terminate();
        ev.preventDefault && ev.preventDefault();
        resolve({ out: "", error: { message: ev.message, friendly: explain(String(ev.message || "").replace(/^Uncaught \w+: /, "")) }, results: null });
      };
      w.postMessage({ code, inputs: opts.inputs || [], tests: opts.tests || [] });
    });
  }

  global.JSRunner = { run, explain };
})(window);

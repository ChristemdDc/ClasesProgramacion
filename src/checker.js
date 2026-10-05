/* Comparación tolerante de salidas para los retos. */
(function (global) {
  "use strict";
  function normLine(s, keepSpaces) {
    let t = s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+$/, "");
    if (!keepSpaces) t = t.replace(/[ \t]+/g, " ").trim();
    return t;
  }
  function lines(s, keepSpaces) {
    return String(s).split("\n").map((l) => normLine(l, keepSpaces)).filter((l) => l.trim() !== "");
  }
  /* exact: toda la salida debe coincidir. Si no, se comparan las últimas líneas (permite mensajes previos). */
  function checkOutput(actual, expected, opts = {}) {
    const a = lines(actual, opts.keepSpaces);
    const e = lines(expected, opts.keepSpaces);
    const tail = opts.exact ? a : a.slice(-e.length);
    if (tail.length !== e.length) return false;
    return tail.every((l, i) => l === e[i]);
  }
  function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  global.Checker = { checkOutput, deepEqual, lines };
})(typeof window !== "undefined" ? window : globalThis);

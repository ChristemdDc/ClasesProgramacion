/* Utilidades para escribir el contenido del curso. */
window.CURSO = { modules: [], lessons: {}, order: [] };
(function () {
  const enc = (s) => encodeURIComponent(s.replace(/^\n+|\s+$/g, ""));
  /* Bloque de pseudocódigo ejecutable */
  window.C = (src) => `<div class="code" data-lang="pseudo" data-src="${enc(src)}"></div>`;
  /* Bloque de JavaScript ejecutable */
  window.CJ = (src) => `<div class="code" data-lang="js" data-src="${enc(src)}"></div>`;
  /* Bloque de código que NO se ejecuta (ejemplos con errores, sintaxis general) */
  window.CN = (src, lang) => `<div class="code" data-lang="${lang || "pseudo"}" data-norun="1" data-src="${enc(src)}"></div>`;
  window.TIP = (t) => `<div class="note note-tip"><b>Tip</b><div>${t}</div></div>`;
  window.WARN = (t) => `<div class="note note-warn"><b>Ojo</b><div>${t}</div></div>`;
  window.PRO = (t) => `<div class="note note-pro"><b>En el trabajo real</b><div>${t}</div></div>`;
  window.IDEA = (t) => `<div class="note note-idea"><b>Analogía</b><div>${t}</div></div>`;
  window.TABLE = (head, rows) => `<div class="tbl"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  window.MOD = (m) => { CURSO.modules.push(m); };
  window.L = (l) => { CURSO.lessons[l.id] = l; CURSO.order.push(l.id); };
})();

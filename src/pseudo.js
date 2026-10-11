/* Intérprete de pseudocódigo en español (estilo PSeInt).
   Expone window.Pseudo = { parse, run, highlight, KEYWORDS }.
   Arreglos con índice base 0. Palabras clave sin distinguir mayúsculas ni tildes. */
(function (global) {
  "use strict";

  class PseError extends Error {
    constructor(msg, line) {
      super(msg);
      this.line = line;
    }
  }

  const strip = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const KEYWORDS = new Set([
    "algoritmo", "finalgoritmo", "proceso", "finproceso", "definir", "como", "dimension", "dimensionar",
    "escribir", "imprimir", "mostrar", "leer", "si", "entonces", "sino", "finsi",
    "segun", "hacer", "de", "finsegun", "mientras", "finmientras", "repetir",
    "hasta", "que", "para", "con", "finpara", "funcion", "finfuncion", "subproceso",
    "finsubproceso", "retornar", "por", "y", "o", "no", "mod", "verdadero",
    "falso", "borrar", "esperar", "limpiar"
  ]);
  /* Palabras con significado solo en cierto contexto: siguen siendo nombres válidos de variables. */

  const TYPES = {
    entero: "Entero", real: "Real", numero: "Real", numerico: "Real",
    cadena: "Cadena", texto: "Cadena", caracter: "Cadena", logico: "Logico", booleano: "Logico"
  };

  /* ---------------- Lexer ---------------- */
  function lex(src) {
    const toks = [];
    let i = 0, line = 1;
    const n = src.length;
    const push = (type, value, raw) => toks.push({ type, value, raw: raw ?? value, line });
    while (i < n) {
      const c = src[i];
      if (c === "\n") { push("NL", "\n"); line++; i++; continue; }
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }
      if (c === "/" && src[i + 1] === "/") { while (i < n && src[i] !== "\n") i++; continue; }
      if (c === ";") { push("NL", ";"); i++; continue; }
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1] || ""))) {
        let j = i;
        while (j < n && /[0-9]/.test(src[j])) j++;
        if (src[j] === "." && /[0-9]/.test(src[j + 1] || "")) { j++; while (j < n && /[0-9]/.test(src[j])) j++; }
        else if (src[j] === "," && /[0-9]/.test(src[j + 1] || "") && false) { /* coma decimal no soportada */ }
        push("NUM", parseFloat(src.slice(i, j)), src.slice(i, j));
        i = j; continue;
      }
      if (c === '"' || c === "'" || c === "“" || c === "”") {
        const close = c === "“" ? "”" : c;
        let j = i + 1, s = "";
        while (j < n && src[j] !== close && !(close === "”" && src[j] === '"') && src[j] !== "\n") { s += src[j]; j++; }
        if (j >= n || src[j] === "\n") throw new PseError("Falta cerrar las comillas del texto que empieza con " + c + s.slice(0, 15) + "…", line);
        push("STR", s, src.slice(i, j + 1));
        i = j + 1; continue;
      }
      if (/[A-Za-z_À-ɏ]/.test(c)) {
        let j = i;
        while (j < n && /[A-Za-z0-9_À-ɏ]/.test(src[j])) j++;
        const raw = src.slice(i, j);
        const k = strip(raw);
        if (KEYWORDS.has(k)) push("KW", k, raw);
        else push("ID", raw.toLowerCase(), raw);
        i = j; continue;
      }
      const two = src.slice(i, i + 2);
      if (["<-", "<=", ">=", "<>", "!=", "==", "&&", "||", ":="].includes(two)) {
        push("OP", two === ":=" ? "<-" : two); i += 2; continue;
      }
      if (c === "←") { push("OP", "<-"); i++; continue; }
      if (c === "≤") { push("OP", "<="); i++; continue; }
      if (c === "≥") { push("OP", ">="); i++; continue; }
      if (c === "≠") { push("OP", "<>"); i++; continue; }
      if ("+-*/^%()[],:=<>&|~!".includes(c)) { push("OP", c); i++; continue; }
      throw new PseError("No entiendo el símbolo '" + c + "'", line);
    }
    push("NL", "\n");
    push("EOF", null);
    return toks;
  }

  /* ---------------- Parser ---------------- */
  function parse(src) {
    const t = lex(src);
    let p = 0;
    const peek = (o = 0) => t[p + o];
    const next = () => t[p++];
    const isKW = (k, o = 0) => peek(o).type === "KW" && peek(o).value === k;
    const isOP = (v, o = 0) => peek(o).type === "OP" && peek(o).value === v;
    const isW = (w, o = 0) => (peek(o).type === "ID" || peek(o).type === "KW") && strip(peek(o).raw) === w;
    function expectW(w, ctx) {
      if (!isW(w)) throw new PseError("Esperaba '" + w + "'" + (ctx ? " " + ctx : "") + " pero encontré " + show(peek()), peek().line);
      return next();
    }
    const show = (tok) => tok.type === "NL" ? "el final de la línea" : tok.type === "EOF" ? "el final del programa" : "'" + tok.raw + "'";
    function expectKW(k, ctx) {
      if (!isKW(k)) throw new PseError("Esperaba '" + nice(k) + "'" + (ctx ? " " + ctx : "") + " pero encontré " + show(peek()), peek().line);
      return next();
    }
    function expectOP(v, ctx) {
      if (!isOP(v)) throw new PseError("Esperaba '" + v + "'" + (ctx ? " " + ctx : "") + " pero encontré " + show(peek()), peek().line);
      return next();
    }
    function endLine() {
      if (peek().type !== "NL" && peek().type !== "EOF") throw new PseError("Sobra " + show(peek()) + " al final de la instrucción", peek().line);
      skipNL();
    }
    function skipNL() { while (peek().type === "NL") next(); }
    function ident(ctx) {
      const tok = peek();
      if (tok.type !== "ID") {
        if (tok.type === "KW") throw new PseError("'" + tok.raw + "' es una palabra reservada y no se puede usar como nombre" + (ctx ? " " + ctx : ""), tok.line);
        throw new PseError("Esperaba un nombre" + (ctx ? " " + ctx : "") + " pero encontré " + show(tok), tok.line);
      }
      next();
      return tok;
    }

    const functions = {};
    let main = null;
    const loose = [];

    skipNL();
    while (peek().type !== "EOF") {
      if (isKW("algoritmo") || isKW("proceso")) {
        const start = next();
        const endKw = start.value === "algoritmo" ? "finalgoritmo" : "finproceso";
        let name = "programa";
        if (peek().type === "ID" || peek().type === "KW") name = next().raw;
        endLine();
        const body = block([endKw], "el '" + start.raw + "' de la línea " + start.line);
        expectKW(endKw); endLine();
        if (main) throw new PseError("Solo puede haber un Algoritmo principal", start.line);
        main = { name, body, line: start.line };
      } else if (isKW("funcion") || isKW("subproceso")) {
        const f = funcDef();
        if (functions[f.name]) throw new PseError("La función '" + f.raw + "' ya está definida", f.line);
        functions[f.name] = f;
      } else {
        loose.push(statement());
      }
    }
    if (!main) main = { name: "programa", body: loose, line: 1 };
    else if (loose.length) throw new PseError("Hay instrucciones fuera del Algoritmo", loose[0].line);
    return { main, functions };

    function nice(k) {
      const map = { finsi: "FinSi", finmientras: "FinMientras", finpara: "FinPara", finsegun: "FinSegun", finfuncion: "FinFuncion", finalgoritmo: "FinAlgoritmo", finproceso: "FinProceso", finsubproceso: "FinSubProceso", entonces: "Entonces", hacer: "Hacer", hasta: "Hasta", que: "Que", como: "Como" };
      return map[k] || k;
    }

    function funcDef() {
      const start = next();
      const endKw = start.value === "funcion" ? "finfuncion" : "finsubproceso";
      let retVar = null;
      let nameTok = ident("para la función");
      if (isOP("<-") || isOP("=")) { next(); retVar = nameTok.value; nameTok = ident("para la función"); }
      const params = [];
      if (isOP("(")) {
        next();
        if (!isOP(")")) {
          do {
            const pt = ident("de parámetro");
            let byRef = false;
            if (isKW("por")) { next(); if (isW("referencia")) { next(); byRef = true; } else expectW("valor"); }
            params.push({ name: pt.value, byRef });
          } while (isOP(",") && next());
        }
        expectOP(")", "para cerrar los parámetros");
      }
      endLine();
      const body = block([endKw, start.value === "funcion" ? "finsubproceso" : "finfuncion"], "la función '" + nameTok.raw + "' de la línea " + start.line);
      next(); endLine();
      return { name: nameTok.value, raw: nameTok.raw, retVar, params, body, line: start.line };
    }

    function block(enders, ctx) {
      const out = [];
      skipNL();
      while (true) {
        const tk = peek();
        if (tk.type === "EOF") throw new PseError("Falta '" + nice(enders[0]) + "' para cerrar " + ctx, tk.line);
        if (tk.type === "KW" && enders.includes(tk.value)) break;
        if (tk.type === "KW" && ["finsi", "finmientras", "finpara", "finsegun", "finfuncion", "finalgoritmo", "finproceso", "sino", "hasta"].includes(tk.value) && !enders.includes(tk.value)) {
          throw new PseError("Encontré '" + tk.raw + "' pero esperaba '" + nice(enders[0]) + "' para cerrar " + ctx, tk.line);
        }
        out.push(statement());
      }
      return out;
    }

    function statement() {
      const tk = peek();
      const line = tk.line;
      if (tk.type === "KW") {
        switch (tk.value) {
          case "definir": {
            next();
            const names = [];
            do { names.push(ident("de variable").value); } while (isOP(",") && next());
            expectKW("como", "después de los nombres de variables");
            const ty = next();
            if ((ty.type !== "KW" && ty.type !== "ID") || !TYPES[strip(ty.raw)]) throw new PseError("Tipo desconocido " + show(ty) + ". Usa Entero, Real, Cadena o Logico", ty.line);
            endLine();
            return { k: "def", names, type: TYPES[strip(ty.raw)], line };
          }
          case "dimension": case "dimensionar": {
            next();
            const items = [];
            do {
              const nm = ident("del arreglo");
              expectOP("[", "después del nombre del arreglo");
              const dims = [expr()];
              while (isOP(",")) { next(); dims.push(expr()); }
              expectOP("]", "para cerrar el tamaño");
              items.push({ name: nm.value, dims });
            } while (isOP(",") && next());
            endLine();
            return { k: "dim", items, line };
          }
          case "escribir": case "imprimir": case "mostrar": {
            next();
            let nl = true;
            if (isW("sin") && isW("saltar", 1)) { next(); next(); nl = false; }
            const items = [];
            if (peek().type !== "NL") {
              do { items.push(expr()); } while (isOP(",") && next());
            }
            if (isW("sin") && isW("saltar", 1)) { next(); next(); nl = false; }
            endLine();
            return { k: "write", items, nl, line };
          }
          case "leer": {
            next();
            const targets = [];
            do { targets.push(lvalue()); } while (isOP(",") && next());
            endLine();
            return { k: "read", targets, line };
          }
          case "si": {
            next();
            const cond = expr();
            if (!isKW("entonces")) {
              if (peek().type === "NL") throw new PseError("Falta 'Entonces' después de la condición del Si", line);
              throw new PseError("Esperaba 'Entonces' después de la condición pero encontré " + show(peek()), peek().line);
            }
            next(); skipNL();
            const then = block(["finsi", "sino"], "el 'Si' de la línea " + line);
            let els = null;
            if (isKW("sino")) { next(); skipNL(); els = block(["finsi"], "el 'Si' de la línea " + line); }
            expectKW("finsi"); endLine();
            return { k: "if", cond, then, els, line };
          }
          case "segun": {
            next();
            const subject = expr();
            expectKW("hacer", "después de la variable del Segun");
            endLine();
            const cases = [];
            let def = null;
            let current = null;
            while (true) {
              const k = peek();
              if (k.type === "EOF") throw new PseError("Falta 'FinSegun' para cerrar el 'Segun' de la línea " + line, k.line);
              if (isKW("finsegun")) break;
              if (isKW("de") && isW("otro", 1)) {
                next(); next(); expectW("modo"); expectOP(":", "después de 'De Otro Modo'"); skipNL();
                def = []; current = def; continue;
              }
              const save = p;
              let labels = null;
              try {
                if (isW("caso") && peek(1).type !== "OP") next();
                const ls = [expr()];
                while (isOP(",")) { next(); ls.push(expr()); }
                if (isOP(":")) { next(); labels = ls; } else p = save;
              } catch (e) { p = save; }
              if (labels) { current = { labels, body: [], line: k.line }; cases.push(current); skipNL(); continue; }
              if (!current) throw new PseError("Dentro del Segun cada opción empieza con un valor y dos puntos, por ejemplo  1:", k.line);
              (current.body || current).push(statement());
            }
            expectKW("finsegun"); endLine();
            return { k: "switch", subject, cases, def, line };
          }
          case "mientras": {
            next();
            const cond = expr();
            expectKW("hacer", "después de la condición del Mientras");
            endLine();
            const body = block(["finmientras"], "el 'Mientras' de la línea " + line);
            next(); endLine();
            return { k: "while", cond, body, line };
          }
          case "repetir": {
            next(); endLine();
            const body = block(["hasta", "mientras"], "el 'Repetir' de la línea " + line);
            let negate = false;
            if (isKW("hasta")) { next(); expectKW("que", "después de 'Hasta'"); }
            else { next(); expectKW("que", "después de 'Mientras'"); negate = true; }
            const cond = expr();
            endLine();
            return { k: "repeat", body, cond, negate, line };
          }
          case "para": {
            next();
            const v = ident("para la variable del Para");
            if (!isOP("<-") && !isOP("=")) throw new PseError("En el Para escribe  variable = inicio Hasta fin, por ejemplo  Para i = 1 Hasta 10 Hacer", peek().line);
            next();
            const from = expr();
            expectKW("hasta", "en el Para");
            const to = expr();
            let step = null;
            if (isKW("con")) { next(); expectW("paso"); step = expr(); }
            expectKW("hacer", "al final de la línea del Para");
            endLine();
            const body = block(["finpara"], "el 'Para' de la línea " + line);
            next(); endLine();
            return { k: "for", v: v.value, from, to, step, body, line };
          }
          case "retornar": {
            next();
            const e = peek().type === "NL" ? null : expr();
            endLine();
            return { k: "return", e, line };
          }
          case "borrar": case "limpiar": {
            next(); expectW("pantalla"); endLine();
            return { k: "cls", line };
          }
          case "esperar": {
            next();
            if (isW("tecla")) { next(); endLine(); return { k: "waitkey", line }; }
            const e = expr();
            if (isW("segundos") || isW("segundo")) next();
            endLine();
            return { k: "wait", e, line };
          }
          case "sino": throw new PseError("'SiNo' sin un 'Si' que lo abra", line);
          case "finsi": case "finmientras": case "finpara": case "finsegun": case "finfuncion": case "finalgoritmo": case "finproceso":
            throw new PseError("'" + tk.raw + "' no cierra nada: revisa que cada bloque tenga su apertura", line);
          case "funcion": case "subproceso":
            throw new PseError("Las funciones se definen fuera del Algoritmo (antes o después)", line);
          case "algoritmo": case "proceso":
            throw new PseError("No se puede abrir un Algoritmo dentro de otro", line);
          default:
            if (["y", "o", "no", "mod", "verdadero", "falso"].includes(tk.value))
              throw new PseError("'" + tk.raw + "' es una palabra reservada del pseudocódigo y no puede usarse como nombre de variable. Prueba con otro nombre, por ejemplo " + tk.raw + "1 o valor_" + tk.raw, line);
            throw new PseError("No esperaba '" + tk.raw + "' al inicio de una instrucción", line);
        }
      }
      if (tk.type === "ID") {
        if (isOP("(", 1)) {
          const save = p;
          const call = primary();
          if (peek().type === "NL" || peek().type === "EOF") { endLine(); return { k: "callst", call, line }; }
          p = save;
        }
        const target = lvalue();
        if (isOP("<-") || isOP("=")) {
          next();
          const e = expr();
          endLine();
          return { k: "assign", target, e, line };
        }
        if (peek().type === "NL") throw new PseError("La instrucción '" + tk.raw + "' está incompleta. Para guardar un valor usa  " + tk.raw + " = valor", line);
        throw new PseError("Esperaba '=' para asignar un valor a '" + tk.raw + "' pero encontré " + show(peek()), peek().line);
      }
      throw new PseError("No esperaba " + show(tk) + " al inicio de una instrucción", line);
    }

    function lvalue() {
      const nm = ident("de variable");
      if (isOP("[")) {
        next();
        const idx = [expr()];
        while (isOP(",")) { next(); idx.push(expr()); }
        expectOP("]", "para cerrar el índice");
        return { k: "idx", name: nm.value, raw: nm.raw, idx, line: nm.line };
      }
      return { k: "var", name: nm.value, raw: nm.raw, line: nm.line };
    }

    function expr() { return orE(); }
    function orE() {
      let l = andE();
      while (isKW("o") || isOP("||") || isOP("|")) { const op = next(); l = { k: "bin", op: "o", l, r: andE(), line: op.line }; }
      return l;
    }
    function andE() {
      let l = notE();
      while (isKW("y") || isOP("&&") || isOP("&")) { const op = next(); l = { k: "bin", op: "y", l, r: notE(), line: op.line }; }
      return l;
    }
    function notE() {
      if (isKW("no") || isOP("~") || isOP("!")) { const op = next(); return { k: "un", op: "no", e: notE(), line: op.line }; }
      return cmpE();
    }
    function cmpE() {
      let l = addE();
      while (peek().type === "OP" && ["=", "==", "<>", "!=", "<", ">", "<=", ">="].includes(peek().value)) {
        const op = next();
        if (op.value === "=") throw new PseError("Para comparar si dos valores son iguales usa == (dos signos igual). Un solo = sirve para guardar un valor en una variable", op.line);
        let o = op.value; if (o === "==") o = "="; if (o === "!=") o = "<>";
        l = { k: "bin", op: o, l, r: addE(), line: op.line };
      }
      return l;
    }
    function addE() {
      let l = mulE();
      while (isOP("+") || isOP("-")) { const op = next(); l = { k: "bin", op: op.value, l, r: mulE(), line: op.line }; }
      return l;
    }
    function mulE() {
      let l = unE();
      while (isOP("*") || isOP("/") || isOP("%") || isKW("mod")) {
        const op = next();
        l = { k: "bin", op: op.value === "%" || op.value === "mod" ? "mod" : op.value, l, r: unE(), line: op.line };
      }
      return l;
    }
    function unE() {
      if (isOP("-")) { const op = next(); return { k: "un", op: "-", e: unE(), line: op.line }; }
      if (isOP("+")) { next(); return unE(); }
      return powE();
    }
    function powE() {
      const b = primary();
      if (isOP("^")) { const op = next(); return { k: "bin", op: "^", l: b, r: unE(), line: op.line }; }
      return b;
    }
    function primary() {
      const tk = peek();
      if (tk.type === "NUM") { next(); return { k: "lit", v: tk.value, line: tk.line }; }
      if (tk.type === "STR") { next(); return { k: "lit", v: tk.value, line: tk.line }; }
      if (tk.type === "KW" && (tk.value === "verdadero" || tk.value === "falso")) { next(); return { k: "lit", v: tk.value === "verdadero", line: tk.line }; }
      if (isOP("(")) {
        next();
        const e = expr();
        expectOP(")", "para cerrar el paréntesis");
        return e;
      }
      if (tk.type === "ID") {
        next();
        if (isOP("(")) {
          next();
          const args = [];
          if (!isOP(")")) { do { args.push(expr()); } while (isOP(",") && next()); }
          expectOP(")", "para cerrar la llamada a " + tk.raw);
          return { k: "call", name: tk.value, raw: tk.raw, args, line: tk.line };
        }
        if (isOP("[")) {
          next();
          const idx = [expr()];
          while (isOP(",")) { next(); idx.push(expr()); }
          expectOP("]", "para cerrar el índice");
          return { k: "idx", name: tk.value, raw: tk.raw, idx, line: tk.line };
        }
        return { k: "var", name: tk.value, raw: tk.raw, line: tk.line };
      }
      if (tk.type === "KW") throw new PseError("'" + tk.raw + "' es una palabra reservada; aquí esperaba un valor o una variable", tk.line);
      throw new PseError("Esperaba un valor pero encontré " + show(tk), tk.line);
    }
  }

  /* ---------------- Runtime ---------------- */
  const RETURN = Symbol("return");

  function fmt(v) {
    if (typeof v === "boolean") return v ? "VERDADERO" : "FALSO";
    if (typeof v === "number") {
      if (!isFinite(v)) return v > 0 ? "Infinito" : v < 0 ? "-Infinito" : "Indefinido";
      if (Number.isInteger(v)) return String(v);
      return String(Number(v.toFixed(8)));
    }
    if (v && v.kind === "array") return "[" + v.data.map((x) => x === undefined ? "?" : fmt(x)).join(", ") + "]";
    return String(v);
  }
  function typeOf(v) {
    if (typeof v === "number") return Number.isInteger(v) ? "Entero" : "Real";
    if (typeof v === "string") return "Cadena";
    if (typeof v === "boolean") return "Logico";
    if (v && v.kind === "array") return "Arreglo";
    return "?";
  }
  const typeName = (v) => ({ Entero: "un número entero", Real: "un número real", Cadena: "un texto", Logico: "un valor lógico", Arreglo: "un arreglo" })[typeOf(v)] || "un valor";

  function makeScope(parent) { return { vars: new Map(), parent }; }

  async function run(program, io, opts = {}) {
    const maxSteps = opts.maxSteps ?? 2000000;
    let steps = 0;
    let stopped = false;
    const globalScope = makeScope(null);
    const callStack = [];
    const control = { stop: () => { stopped = true; } };
    if (opts.onControl) opts.onControl(control);

    async function tick(node, scope) {
      if (stopped) throw new PseError("Ejecución detenida", node.line);
      steps++;
      if (steps > maxSteps) throw new PseError("El programa ejecutó demasiadas instrucciones. ¿Hay un bucle infinito? Revisa que la condición del bucle llegue a cambiar.", node.line);
      if (opts.onStep) { const w = opts.onStep(node.line, () => snapshot(scope)); if (w) await w; }
      if (steps % 4000 === 0) await new Promise((r) => setTimeout(r, 0));
    }

    function snapshot(scope) {
      const out = [];
      for (const [name, cell] of scope.vars) {
        out.push({ name: cell.raw || name, type: cell.arr ? "Arreglo de " + (cell.type || "?") : (cell.type || (cell.value === undefined ? "?" : typeOf(cell.value))), value: cell.value === undefined ? "(sin valor)" : fmt(cell.value) });
      }
      return { fn: callStack.length ? callStack[callStack.length - 1] : null, vars: out };
    }

    function lookup(scope, name) { return scope.vars.get(name); }

    function coerce(cell, v, line, label) {
      if (v && v.kind === "array" && !cell.arr) {
        cell.arr = true;
        return v;
      }
      const ty = cell.type;
      if (!ty) return v;
      if (ty === "Entero") {
        if (typeof v !== "number") throw new PseError("'" + label + "' es Entero y le intentaste guardar " + typeName(v) + " (" + fmt(v) + ")", line);
        if (!Number.isInteger(v)) throw new PseError("'" + label + "' es Entero y no puede guardar " + fmt(v) + ". Usa trunc() o redon(), o defínela como Real", line);
      } else if (ty === "Real") {
        if (typeof v !== "number") throw new PseError("'" + label + "' es Real (número) y le intentaste guardar " + typeName(v) + " (" + fmt(v) + ")", line);
      } else if (ty === "Cadena") {
        if (typeof v !== "string") throw new PseError("'" + label + "' es Cadena (texto) y le intentaste guardar " + typeName(v) + " (" + fmt(v) + "). Escribe el valor entre comillas o usa ConvertirATexto()", line);
      } else if (ty === "Logico") {
        if (typeof v !== "boolean") throw new PseError("'" + label + "' es Logico y solo guarda VERDADERO o FALSO, no " + fmt(v), line);
      }
      return v;
    }

    function arrIndex(cell, idxVals, node) {
      const a = cell.value;
      if (!a || a.kind !== "array") throw new PseError("'" + node.raw + "' no es un arreglo. Créalo antes con  Dimension " + node.raw + "[tamaño]", node.line);
      if (idxVals.length !== a.dims.length) throw new PseError("'" + node.raw + "' tiene " + a.dims.length + " dimensión(es) y usaste " + idxVals.length + " índice(s)", node.line);
      let flat = 0;
      for (let d = 0; d < a.dims.length; d++) {
        const iv = idxVals[d];
        if (typeof iv !== "number" || !Number.isInteger(iv)) throw new PseError("El índice de '" + node.raw + "' debe ser un número entero, no " + fmt(iv), node.line);
        if (iv < 0 || iv >= a.dims[d]) throw new PseError("Índice " + iv + " fuera de rango: '" + node.raw + "' tiene posiciones de 0 a " + (a.dims[d] - 1), node.line);
        flat = flat * a.dims[d] + iv;
      }
      return flat;
    }

    async function evalE(e, scope) {
      switch (e.k) {
        case "lit": return e.v;
        case "var": {
          const cell = lookup(scope, e.name);
          if (!cell) {
            if (BUILTINS[strip(e.name)] && BUILTINS[strip(e.name)].length === 0) return BUILTINS[strip(e.name)]();
            throw new PseError("La variable '" + e.raw + "' no existe todavía. Dale un valor antes de usarla (" + e.raw + " = ...) o léela con Leer", e.line);
          }
          if (cell.value === undefined) throw new PseError("La variable '" + e.raw + "' fue definida pero todavía no tiene valor", e.line);
          return cell.value;
        }
        case "idx": {
          const cell = lookup(scope, e.name);
          if (!cell) throw new PseError("El arreglo '" + e.raw + "' no existe. Créalo con  Dimension " + e.raw + "[tamaño]", e.line);
          const idx = [];
          for (const x of e.idx) idx.push(await getVal(x, scope));
          const f = arrIndex(cell, idx, e);
          const v = cell.value.data[f];
          if (v === undefined) throw new PseError("La posición " + e.raw + "[" + idx.join(",") + "] todavía no tiene valor", e.line);
          return v;
        }
        case "un": {
          const v = await getVal(e.e, scope);
          if (e.op === "-") { if (typeof v !== "number") throw new PseError("No se puede poner signo negativo a " + typeName(v), e.line); return -v; }
          if (typeof v !== "boolean") throw new PseError("NO solo funciona con valores lógicos (VERDADERO/FALSO), no con " + typeName(v), e.line);
          return !v;
        }
        case "bin": {
          if (e.op === "y" || e.op === "o") {
            const l = await getVal(e.l, scope);
            if (typeof l !== "boolean") throw new PseError("'" + (e.op === "y" ? "Y" : "O") + "' necesita condiciones (VERDADERO/FALSO) a ambos lados, no " + typeName(l), e.line);
            if (e.op === "y" && !l) return false;
            if (e.op === "o" && l) return true;
            const r = await getVal(e.r, scope);
            if (typeof r !== "boolean") throw new PseError("'" + (e.op === "y" ? "Y" : "O") + "' necesita condiciones (VERDADERO/FALSO) a ambos lados, no " + typeName(r), e.line);
            return r;
          }
          const l = await getVal(e.l, scope);
          const r = await getVal(e.r, scope);
          return binop(e.op, l, r, e.line);
        }
        case "call": return callFn(e, scope);
      }
      throw new PseError("Expresión desconocida", e.line);
    }

    function binop(op, l, r, line) {
      const num = (x) => typeof x === "number";
      switch (op) {
        case "+":
          if (num(l) && num(r)) return l + r;
          if (typeof l === "string" || typeof r === "string") return fmt(l) + fmt(r);
          throw new PseError("No se puede sumar " + typeName(l) + " con " + typeName(r), line);
        case "-": case "*": case "/": case "^": case "mod": {
          if (!num(l) || !num(r)) throw new PseError("La operación '" + (op === "mod" ? "MOD" : op) + "' necesita números, pero recibió " + typeName(num(l) ? r : l) + " (" + fmt(num(l) ? r : l) + ")", line);
          if (op === "-") return l - r;
          if (op === "*") return l * r;
          if (op === "^") return Math.pow(l, r);
          if (r === 0) throw new PseError(op === "/" ? "División por cero: no se puede dividir entre 0" : "MOD entre 0 no está definido", line);
          if (op === "/") return l / r;
          return l - r * Math.trunc(l / r);
        }
        case "=": case "<>": case "<": case ">": case "<=": case ">=": {
          if (typeof l !== typeof r) throw new PseError("No se puede comparar " + typeName(l) + " con " + typeName(r) + " (" + fmt(l) + " y " + fmt(r) + ")", line);
          if (typeof l === "boolean" && !["=", "<>"].includes(op)) throw new PseError("Los valores lógicos solo se comparan con == o <>", line);
          switch (op) {
            case "=": return l === r;
            case "<>": return l !== r;
            case "<": return l < r;
            case ">": return l > r;
            case "<=": return l <= r;
            case ">=": return l >= r;
          }
        }
      }
      throw new PseError("Operador desconocido " + op, line);
    }

    async function callFn(e, scope) {
      const key = strip(e.name);
      const f = program.functions[e.name];
      if (!f) {
        const b = BUILTINS[key];
        if (!b) throw new PseError("No existe la función '" + e.raw + "'. Revisa cómo está escrita", e.line);
        const args = [];
        for (const a of e.args) args.push(await getVal(a, scope));
        try { return b(...args); } catch (err) { throw new PseError(err.message, e.line); }
      }
      if (e.args.length !== f.params.length) throw new PseError("'" + f.raw + "' recibe " + f.params.length + " dato(s) y le pasaste " + e.args.length, e.line);
      if (callStack.length > 200) throw new PseError("Demasiadas llamadas anidadas a funciones (¿una función que se llama a sí misma sin parar?)", e.line);
      const local = makeScope(null);
      for (let i = 0; i < f.params.length; i++) {
        const prm = f.params[i];
        const a = e.args[i];
        if (prm.byRef) {
          if (a.k !== "var") throw new PseError("El parámetro '" + prm.name + "' es Por Referencia y necesita una variable, no una expresión", e.line);
          let cell = lookup(scope, a.name);
          if (!cell) { cell = { value: undefined, raw: a.raw }; scope.vars.set(a.name, cell); }
          local.vars.set(prm.name, cell);
        } else {
          const v = await getVal(a, scope);
          local.vars.set(prm.name, { value: v, arr: v && v.kind === "array", raw: prm.name });
        }
      }
      if (f.retVar && !local.vars.has(f.retVar)) local.vars.set(f.retVar, { value: undefined, raw: f.retVar });
      callStack.push(f.raw);
      let ret;
      try {
        const r = await execBlock(f.body, local);
        if (r && r.t === RETURN) ret = r.v;
      } finally { callStack.pop(); }
      if (ret === undefined && f.retVar) ret = local.vars.get(f.retVar).value;
      return ret === undefined ? NO_VALUE(f, e) : ret;
    }
    function NO_VALUE(f, e) {
      return { kind: "novalue", f: f.raw, line: e.line };
    }

    async function getVal(e, scope) {
      const v = await evalE(e, scope);
      if (v && v.kind === "novalue") throw new PseError("La función '" + v.f + "' no devolvió ningún valor y se intentó usar su resultado", e.line);
      return v;
    }

    async function assign(target, v, scope, line) {
      if (v && v.kind === "novalue") throw new PseError("La función '" + v.f + "' no devolvió ningún valor", line);
      if (target.k === "var") {
        let cell = lookup(scope, target.name);
        if (!cell) { cell = { value: undefined, raw: target.raw }; scope.vars.set(target.name, cell); }
        if (cell.arr && !(v && v.kind === "array")) throw new PseError("'" + target.raw + "' es un arreglo; para guardar un valor indica la posición, por ejemplo " + target.raw + "[0]", line);
        cell.value = coerce(cell, v, line, target.raw);
        return;
      }
      const cell = lookup(scope, target.name);
      if (!cell) throw new PseError("El arreglo '" + target.raw + "' no existe. Créalo con  Dimension " + target.raw + "[tamaño]", line);
      const idx = [];
      for (const x of target.idx) idx.push(await getVal(x, scope));
      const f = arrIndex(cell, idx, target);
      cell.value.data[f] = coerce({ type: cell.type }, v, line, target.raw + "[" + idx.join(",") + "]");
    }

    function parseInput(s, type) {
      const t = s.trim();
      if (type === "Cadena") return s;
      if (type === "Entero" || type === "Real") {
        const n = Number(t.replace(",", "."));
        if (t === "" || isNaN(n)) return { bad: "un número" };
        if (type === "Entero" && !Number.isInteger(n)) return { bad: "un número entero" };
        return n;
      }
      if (type === "Logico") {
        const k = strip(t);
        if (["verdadero", "v", "si", "true", "1"].includes(k)) return true;
        if (["falso", "f", "no", "false", "0"].includes(k)) return false;
        return { bad: "VERDADERO o FALSO" };
      }
      if (t !== "" && !isNaN(Number(t.replace(",", ".")))) return Number(t.replace(",", "."));
      return s;
    }

    async function execBlock(stmts, scope) {
      for (const s of stmts) {
        const r = await exec(s, scope);
        if (r) return r;
      }
      return null;
    }

    async function exec(s, scope) {
      await tick(s, scope);
      switch (s.k) {
        case "def":
          for (const nm of s.names) {
            const cell = lookup(scope, nm);
            if (cell) {
              if (cell.type && cell.type !== s.type && !cell.arr) throw new PseError("La variable '" + nm + "' ya fue definida como " + cell.type, s.line);
              cell.type = s.type;
              if (cell.value !== undefined && !cell.arr) coerce(cell, cell.value, s.line, nm);
            } else scope.vars.set(nm, { value: undefined, type: s.type, raw: nm });
          }
          return null;
        case "dim":
          for (const it of s.items) {
            const dims = [];
            for (const d of it.dims) {
              const v = await getVal(d, scope);
              if (typeof v !== "number" || !Number.isInteger(v) || v < 1) throw new PseError("El tamaño del arreglo debe ser un entero mayor que 0, no " + fmt(v), s.line);
              if (v > 100000) throw new PseError("El arreglo es demasiado grande (máximo 100000 posiciones)", s.line);
              dims.push(v);
            }
            const total = dims.reduce((a, b) => a * b, 1);
            let cell = lookup(scope, it.name);
            if (!cell) { cell = { raw: it.name }; scope.vars.set(it.name, cell); }
            cell.arr = true;
            cell.value = { kind: "array", dims, data: new Array(total).fill(undefined) };
          }
          return null;
        case "write": {
          const parts = [];
          for (const e of s.items) parts.push(fmt(await getVal(e, scope)));
          io.write(parts.join(""), s.nl);
          return null;
        }
        case "read":
          for (const tgt of s.targets) {
            let type;
            const cell = lookup(scope, tgt.name);
            if (cell) type = cell.type;
            const raw = await io.read(tgt.raw);
            if (raw === null || raw === undefined) throw new PseError("El programa pidió un dato con Leer pero no hay más datos de entrada", s.line);
            let v = parseInput(String(raw), type);
            if (v && v.bad) throw new PseError("Se esperaba " + v.bad + " para '" + tgt.raw + "' pero se escribió \"" + raw + "\"", s.line);
            await assign(tgt, v, scope, s.line);
          }
          return null;
        case "assign": {
          const v = await getVal(s.e, scope);
          await assign(s.target, v, scope, s.line);
          return null;
        }
        case "callst": {
          await evalE(s.call, scope);
          return null;
        }
        case "if": {
          const c = await getVal(s.cond, scope);
          if (typeof c !== "boolean") throw new PseError("La condición del Si debe ser VERDADERO o FALSO, pero dio " + fmt(c) + ". Una condición necesita una comparación, por ejemplo  x == 5  o  x > 3", s.line);
          if (c) return execBlock(s.then, scope);
          if (s.els) return execBlock(s.els, scope);
          return null;
        }
        case "switch": {
          const v = await getVal(s.subject, scope);
          for (const c of s.cases) {
            for (const lbl of c.labels) {
              const lv = await getVal(lbl, scope);
              if (typeof lv === typeof v && lv === v) return execBlock(c.body, scope);
            }
          }
          if (s.def) return execBlock(s.def, scope);
          return null;
        }
        case "while": {
          while (true) {
            const c = await getVal(s.cond, scope);
            if (typeof c !== "boolean") throw new PseError("La condición del Mientras debe ser VERDADERO o FALSO, pero dio " + fmt(c), s.line);
            if (!c) break;
            const r = await execBlock(s.body, scope);
            if (r) return r;
            await tick(s, scope);
          }
          return null;
        }
        case "repeat": {
          while (true) {
            const r = await execBlock(s.body, scope);
            if (r) return r;
            const c = await getVal(s.cond, scope);
            if (typeof c !== "boolean") throw new PseError("La condición del Hasta Que debe ser VERDADERO o FALSO, pero dio " + fmt(c), s.line);
            if (s.negate ? !c : c) break;
            await tick(s, scope);
          }
          return null;
        }
        case "for": {
          const from = await getVal(s.from, scope);
          const to = await getVal(s.to, scope);
          const step = s.step ? await getVal(s.step, scope) : 1;
          if (typeof from !== "number" || typeof to !== "number" || typeof step !== "number") throw new PseError("El Para necesita números en inicio, fin y paso", s.line);
          if (step === 0) throw new PseError("El paso del Para no puede ser 0", s.line);
          const tv = { k: "var", name: s.v, raw: s.v };
          await assign(tv, from, scope, s.line);
          while (true) {
            const cur = lookup(scope, s.v).value;
            if (step > 0 ? cur > to : cur < to) break;
            const r = await execBlock(s.body, scope);
            if (r) return r;
            await tick(s, scope);
            await assign(tv, lookup(scope, s.v).value + step, scope, s.line);
          }
          return null;
        }
        case "return": {
          if (!callStack.length) return { t: RETURN, v: undefined, top: true };
          return { t: RETURN, v: s.e ? await getVal(s.e, scope) : undefined };
        }
        case "cls": if (io.clear) io.clear(); return null;
        case "wait": {
          const secs = await getVal(s.e, scope);
          if (typeof secs === "number" && secs > 0) await new Promise((r) => setTimeout(r, Math.min(secs, 5) * 1000));
          return null;
        }
        case "waitkey": return null;
      }
      throw new PseError("Instrucción desconocida", s.line);
    }

    await execBlock(program.main.body, globalScope);
    return { steps, vars: snapshot(globalScope).vars };
  }

  const need = (cond, msg) => { if (!cond) throw new Error(msg); };
  const isNum = (x) => typeof x === "number";
  const BUILTINS = {
    raiz: (x) => { need(isNum(x), "raiz() necesita un número"); need(x >= 0, "No existe la raíz cuadrada de un número negativo"); return Math.sqrt(x); },
    rc: (x) => BUILTINS.raiz(x),
    abs: (x) => { need(isNum(x), "abs() necesita un número"); return Math.abs(x); },
    trunc: (x) => { need(isNum(x), "trunc() necesita un número"); return Math.trunc(x); },
    redon: (x) => { need(isNum(x), "redon() necesita un número"); return Math.round(x); },
    redondear: (x) => BUILTINS.redon(x),
    azar: (n) => { need(isNum(n) && n >= 1, "azar(n) necesita un entero mayor que 0"); return Math.floor(Math.random() * n); },
    aleatorio: (a, b) => { need(isNum(a) && isNum(b), "aleatorio(min, max) necesita dos números"); return Math.floor(a + Math.random() * (b - a + 1)); },
    ln: (x) => Math.log(x), exp: (x) => Math.exp(x),
    sen: (x) => Math.sin(x), cos: (x) => Math.cos(x), tan: (x) => Math.tan(x),
    pi: () => Math.PI,
    longitud: (s) => { need(typeof s === "string", "longitud() necesita un texto"); return [...s].length; },
    mayusculas: (s) => { need(typeof s === "string", "mayusculas() necesita un texto"); return s.toUpperCase(); },
    minusculas: (s) => { need(typeof s === "string", "minusculas() necesita un texto"); return s.toLowerCase(); },
    subcadena: (s, a, b) => {
      need(typeof s === "string", "subcadena() necesita un texto como primer dato");
      need(isNum(a) && isNum(b), "subcadena(texto, desde, hasta) necesita dos posiciones numéricas");
      return [...s].slice(a, b + 1).join("");
    },
    concatenar: (a, b) => fmt(a) + fmt(b),
    convertiranumero: (s) => { const n = Number(String(s).trim().replace(",", ".")); need(!isNaN(n) && String(s).trim() !== "", "No se puede convertir \"" + s + "\" a número"); return n; },
    convertiratexto: (n) => fmt(n),
  };

  /* ---------------- Resaltado de sintaxis ---------------- */
  const HL_KW = new Set(["algoritmo", "finalgoritmo", "proceso", "finproceso", "definir", "como", "dimension", "dimensionar", "escribir", "imprimir", "mostrar", "leer", "sin", "saltar", "si", "entonces", "sino", "finsi", "segun", "hacer", "caso", "de", "otro", "modo", "finsegun", "mientras", "finmientras", "repetir", "hasta", "que", "para", "con", "paso", "finpara", "funcion", "finfuncion", "subproceso", "finsubproceso", "retornar", "por", "valor", "referencia", "borrar", "pantalla", "esperar", "segundos", "segundo", "tecla", "limpiar"]);
  const HL_OPW = new Set(["y", "o", "no", "mod"]);
  const HL_TY = new Set(["entero", "real", "numero", "numerico", "cadena", "texto", "caracter", "logico", "booleano"]);
  const HL_LIT = new Set(["verdadero", "falso"]);
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function highlight(src, lang) {
    if (lang === "js") return highlightJS(src);
    return src.replace(/(\/\/[^\n]*)|("[^"\n]*"?|'[^'\n]*'?)|(\b[0-9]+(?:\.[0-9]+)?\b)|([A-Za-z_À-ɏ][A-Za-z0-9_À-ɏ]*)|(<-|←|<=|>=|<>|[<>=+\-*/^%])|([^\n]|\n)/g,
      (m, com, str, num, word, op, other) => {
        if (com) return '<span class="t-com">' + esc(com) + "</span>";
        if (str) return '<span class="t-str">' + esc(str) + "</span>";
        if (num) return '<span class="t-num">' + num + "</span>";
        if (word) {
          const k = strip(word);
          if (HL_KW.has(k)) return '<span class="t-kw">' + esc(word) + "</span>";
          if (HL_OPW.has(k)) return '<span class="t-op">' + esc(word) + "</span>";
          if (HL_TY.has(k)) return '<span class="t-ty">' + esc(word) + "</span>";
          if (HL_LIT.has(k)) return '<span class="t-num">' + esc(word) + "</span>";
          if (BUILTINS[k]) return '<span class="t-fn">' + esc(word) + "</span>";
          return esc(word);
        }
        if (op) return '<span class="t-op">' + esc(op) + "</span>";
        return esc(other);
      });
  }
  const JS_KW = new Set(["let", "const", "var", "if", "else", "for", "while", "do", "function", "return", "switch", "case", "break", "default", "continue", "of", "in", "new", "class", "true", "false", "null", "undefined", "typeof", "this"]);
  function highlightJS(src) {
    return src.replace(/(\/\/[^\n]*)|(`[^`]*`?|"[^"\n]*"?|'[^'\n]*'?)|(\b[0-9]+(?:\.[0-9]+)?\b)|([A-Za-z_$][A-Za-z0-9_$]*)|(===|!==|=>|<=|>=|&&|\|\||[<>=+\-*/%!])|([^\n]|\n)/g,
      (m, com, str, num, word, op, other) => {
        if (com) return '<span class="t-com">' + esc(com) + "</span>";
        if (str) return '<span class="t-str">' + esc(str) + "</span>";
        if (num) return '<span class="t-num">' + num + "</span>";
        if (word) {
          if (JS_KW.has(word)) return '<span class="t-kw">' + word + "</span>";
          if (word === "console" || word === "Math" || word === "log") return '<span class="t-fn">' + word + "</span>";
          return esc(word);
        }
        if (op) return '<span class="t-op">' + esc(op) + "</span>";
        return esc(other);
      });
  }

  global.Pseudo = { parse, run, highlight, fmt, PseError, BUILTINS };
})(typeof window !== "undefined" ? window : globalThis);

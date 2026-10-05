/* Código desde Cero — aplicación principal */
(function () {
  "use strict";

  /* ================= Utilidades ================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const strip = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const shuffle = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const pct = (x) => Math.round((x || 0) * 100) + "%";
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
  };
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }
  async function copyText(text, el) {
    try { await navigator.clipboard.writeText(text); toast("Copiado"); }
    catch (e) {
      const pre = el && el.closest(".codeblock") && el.closest(".codeblock").querySelector("pre");
      if (pre) { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Texto seleccionado: cópialo con el menú"); }
    }
  }

  const ICON = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-6h6v6"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
    lab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8l4 4v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M15 4v5h5M10 13h6M10 17h6"/><path d="M4 7v13a1 1 0 0 0 1 1"/></svg>',
    exam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m9 9 2 2 4-4"/><path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
    step: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5v14M10 7l7 5-7 5z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
  };

  /* ================= Curso: índices ================= */
  const C = window.CURSO;
  const MODS = C.modules;
  const LESSONS = C.lessons;
  const ORDER = C.order;
  const modOf = (id) => MODS.find((m) => m.id === id);
  const lessonNum = (id) => ORDER.indexOf(id) + 1;
  const EX = {};
  const EX_OWNER = {};
  for (const id of ORDER) for (const ex of LESSONS[id].exercises) { EX[ex.id] = ex; EX_OWNER[ex.id] = { lesson: id }; }
  for (const m of MODS) if (m.exam && m.exam.challenge) { EX[m.exam.challenge.id] = m.exam.challenge; EX_OWNER[m.exam.challenge.id] = { exam: m.id }; }
  const TOTAL_EX = Object.keys(EX).length;
  const langOfLesson = (l) => (l.lang === "js" ? "js" : "pseudo");

  /* ================= Progreso ================= */
  const KEY = "cdc-progreso-v1";
  const blank = () => ({ v: 1, lessons: {}, ex: {}, exams: {}, final: null, name: "", last: null, days: [], updated: 0 });
  function merge(a, b) {
    const r = blank();
    a = a || blank(); b = b || blank();
    for (const k of new Set([...Object.keys(a.lessons || {}), ...Object.keys(b.lessons || {})])) {
      const x = (a.lessons || {})[k] || {}, y = (b.lessons || {})[k] || {};
      r.lessons[k] = { seen: !!(x.seen || y.seen), quiz: Math.max(x.quiz || 0, y.quiz || 0), done: !!(x.done || y.done) };
    }
    for (const k of new Set([...Object.keys(a.ex || {}), ...Object.keys(b.ex || {})])) r.ex[k] = true;
    for (const k of new Set([...Object.keys(a.exams || {}), ...Object.keys(b.exams || {})])) {
      const x = (a.exams || {})[k] || {}, y = (b.exams || {})[k] || {};
      r.exams[k] = { quiz: Math.max(x.quiz || 0, y.quiz || 0), challenge: !!(x.challenge || y.challenge) };
    }
    const fa = a.final, fb = b.final;
    if (fa || fb) r.final = (fa && fb) ? { best: Math.max(fa.best, fb.best), date: [fa.date, fb.date].filter(Boolean).sort()[0] || null } : (fa || fb);
    r.name = a.name || b.name || "";
    r.last = (a.updated || 0) >= (b.updated || 0) ? (a.last || b.last) : (b.last || a.last);
    r.days = Array.from(new Set([...(a.days || []), ...(b.days || [])])).sort().slice(-400);
    r.updated = Math.max(a.updated || 0, b.updated || 0);
    return r;
  }
  const Store = {
    s: blank(), ref: null, cloud: false, saving: false, again: false, timer: null,
    load() {
      try { const raw = ls.get(KEY); if (raw) this.s = merge(JSON.parse(raw), blank()); } catch (e) { this.s = blank(); }
    },
    async connect() {
      try {
        if (!window.claude || !window.claude.use) return;
        const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
        if (!db || !user) return;
        const uid = await user.id();
        if (!uid) return;
        this.ref = db.doc("data/users/" + uid + "/progreso");
        await this.pull();
        this.cloud = true;
        setSync();
        document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") this.pull().then(() => rerender()); });
      } catch (e) { this.ref = null; }
    },
    async pull() {
      if (!this.ref) return;
      const snap = await this.ref.get();
      if (snap.exists) {
        const before = JSON.stringify(this.s);
        const remote = snap.data();
        this.s = merge(this.s, remote);
        ls.set(KEY, JSON.stringify(this.s));
        if (JSON.stringify(this.s) !== JSON.stringify(merge(remote, blank()))) this.queue();
        if (before !== JSON.stringify(this.s)) rerender();
      } else if (this.s.updated) this.queue();
    },
    save() {
      this.s.updated = Date.now();
      ls.set(KEY, JSON.stringify(this.s));
      this.queue();
    },
    queue() {
      if (!this.ref) return;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.flush(), 1200);
    },
    async flush() {
      if (!this.ref) return;
      if (this.saving) { this.again = true; return; }
      this.saving = true; setSync("saving");
      try { await this.ref.set(JSON.parse(JSON.stringify(this.s))); }
      catch (e) { if (e && (e.code === "invalid_argument" || e.code === "revoked" || e.code === "not_granted")) { this.ref = null; this.cloud = false; } }
      finally {
        this.saving = false; setSync();
        if (this.again) { this.again = false; this.flush(); }
      }
    },
    touchDay() { const d = today(); if (!this.s.days.includes(d)) this.s.days.push(d); },
    lesson(id) { return this.s.lessons[id] || (this.s.lessons[id] = { seen: false, quiz: 0, done: false }); },
  };
  function setSync(state) {
    const el = $("#sync");
    if (!el) return;
    if (state === "saving") { el.dataset.s = "saving"; el.textContent = "Guardando…"; return; }
    const el2 = $("#sync2");
    if (el2) el2.textContent = Store.cloud ? "Tu progreso se guarda en tu cuenta: lo ves en el móvil y en la computadora." : "Tu progreso se guarda en este dispositivo.";
    if (Store.cloud) { el.dataset.s = "cloud"; el.textContent = "En tu cuenta"; el.title = "Tu progreso se guarda en tu cuenta y lo ves en cualquier dispositivo"; }
    else { el.dataset.s = "local"; el.textContent = "En este dispositivo"; el.title = "Tu progreso se guarda en este navegador"; }
  }
  const isDone = (id) => !!(Store.s.lessons[id] && Store.s.lessons[id].done);
  const examPassed = (mid) => { const e = Store.s.exams[mid]; return !!(e && e.quiz >= 0.7 && e.challenge); };
  function streak() {
    const set = new Set(Store.s.days);
    let n = 0;
    const d = new Date();
    if (!set.has(today())) d.setDate(d.getDate() - 1);
    for (;;) {
      const k = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      if (set.has(k)) { n++; d.setDate(d.getDate() - 1); } else break;
    }
    return n;
  }
  function nextLesson() {
    return ORDER.find((id) => !isDone(id)) || null;
  }

  /* ================= Bloques de código ================= */
  function codeBlock(src, lang, runnable) {
    const label = lang === "js" ? "JavaScript" : lang === "none" ? "Terminal" : "Pseudocódigo";
    const hl = lang === "none" ? esc(src) : window.Pseudo.highlight(src, lang);
    return `<div class="codeblock" data-src="${encodeURIComponent(src)}" data-lang="${lang}">
      <div class="cb-head"><span>${label}</span><div class="acts">
        <button class="cb-btn" data-act="copy" aria-label="Copiar código">${ICON.copy}</button>
        ${runnable ? `<button class="cb-btn run" data-act="try">Probar ▶</button>` : ""}
      </div></div><pre><code>${hl}</code></pre></div>`;
  }
  function enhance(root) {
    $$(".code", root).forEach((el) => {
      const src = decodeURIComponent(el.dataset.src);
      const lang = el.dataset.lang;
      const wrap = document.createElement("div");
      wrap.innerHTML = codeBlock(src, lang, !el.dataset.norun && lang !== "none");
      el.replaceWith(wrap.firstElementChild);
    });
  }

  /* ================= Quiz ================= */
  const QUIZ = {};
  function normFill(s) { return strip(s).replace(/\s+/g, " ").replace(/;$/, "").trim(); }
  function prepQuestion(q, lang, mix) {
    const c = Object.assign({}, q, { _lang: q.lang || lang });
    if (!q.fill && mix) {
      const idx = shuffle(q.opts.map((_, i) => i));
      c.opts = idx.map((i) => q.opts[i]);
      c.a = idx.indexOf(q.a);
    }
    return c;
  }
  function quizMount(el, id, qs, opts) {
    QUIZ[id] = { qs, ans: new Array(qs.length).fill(null), graded: false, opts, el };
    renderQuiz(id);
  }
  function renderQuiz(id) {
    const z = QUIZ[id];
    const L = "ABCDEFGH";
    let correct = 0;
    const items = z.qs.map((q, i) => {
      let ok = false;
      if (z.graded) {
        ok = q.fill ? q.a.some((a) => normFill(a) === normFill(z.ans[i] || "")) : z.ans[i] === q.a;
        if (ok) correct++;
      }
      const body = q.fill
        ? `<input class="fill ${z.graded ? (ok ? "right" : "wrong") : ""}" id="fill-${id}-${i}" data-fill="${id}" data-q="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribe tu respuesta" value="${esc(z.ans[i] || "")}" ${z.graded ? "disabled" : ""}>${z.graded && !ok ? `<div class="small">Respuesta correcta: <code>${esc(q.a[0])}</code></div>` : ""}`
        : `<div class="opts">${q.opts.map((o, j) => {
            let cls = "";
            if (z.graded) { if (j === q.a) cls = "right"; else if (z.ans[i] === j) cls = "wrong"; }
            return `<button class="opt ${cls}" data-act="opt" data-quiz="${id}" data-q="${i}" data-o="${j}" aria-pressed="${z.ans[i] === j}" ${z.graded ? "disabled" : ""}><span class="k">${L[j]}</span><span>${o}</span></button>`;
          }).join("")}</div>`;
      return `<div class="q ${z.graded ? (ok ? "ok graded" : "ko graded") : ""}">
        <div class="q-title"><span class="n">${String(i + 1).padStart(2, "0")}</span><div>${q.q}</div></div>
        ${q.code ? codeBlock(q.code, q._lang, false) : ""}
        ${body}
        ${z.graded ? `<div class="why"><b>${ok ? "¡Correcto!" : "Repasemos:"}</b> ${q.why}</div>` : ""}
      </div>`;
    }).join("");
    const score = z.qs.length ? correct / z.qs.length : 0;
    const pass = score >= (z.opts.pass || 0.7);
    const answered = z.ans.filter((a) => a !== null && a !== "").length;
    const banner = z.graded ? `<div class="score ${pass ? "pass" : "fail"}">
        <b>${correct} / ${z.qs.length}</b>
        <div>${pass ? (z.opts.passMsg || "¡Aprobado! Muy buen trabajo.") : "Necesitas al menos " + pct(z.opts.pass || 0.7) + ". Lee las explicaciones y vuelve a intentarlo: así se aprende."}</div>
        <div class="row" style="justify-content:center"><button class="btn" data-act="retry" data-quiz="${id}">Intentar de nuevo</button>${pass && z.opts.after ? z.opts.after : ""}</div>
      </div>` : "";
    z.el.innerHTML = `<div class="quiz">${z.graded ? banner : ""}${items}
      ${z.graded ? banner : `<button class="btn primary" data-act="grade" data-quiz="${id}">Corregir (${answered}/${z.qs.length} respondidas)</button>`}</div>`;
    if (z.graded && !z.reported) { z.reported = true; z.opts.onDone && z.opts.onDone(score); }
  }

  /* ================= Vistas ================= */
  const main = () => $("#main");
  let currentView = "";

  function viewHome() {
    const s = Store.s;
    const done = ORDER.filter(isDone).length;
    const exDone = Object.keys(s.ex).filter((k) => EX[k]).length;
    const nxt = nextLesson();
    const nl = nxt ? LESSONS[nxt] : null;
    const firstTime = !Object.keys(s.lessons).length;
    const cta = nl
      ? `<a class="btn primary" href="#${nxt}">${firstTime ? "Empezar la lección 1" : "Continuar: " + lessonNum(nxt) + ". " + esc(nl.title)}</a>`
      : `<a class="btn primary" href="#examen-final">Rendir el examen final</a>`;
    const path = MODS.map((m) => {
      const ls_ = m.lessons;
      const d = ls_.filter(isDone).length;
      const complete = d === ls_.length && (!m.exam || examPassed(m.id));
      const current = !complete && (d > 0 || (nxt && LESSONS[nxt].module === m.id));
      const dots = ls_.map((id) => `<i class="${isDone(id) ? "on" : ""}" title="${esc(LESSONS[id].title)}"></i>`).join("") + (m.exam ? `<i class="${examPassed(m.id) ? "ex" : ""}" title="Examen"></i>` : "");
      return `<a class="path-mod ${complete ? "done" : current ? "current" : ""}" href="#mod-${m.id}">
        <div class="path-dot">${complete ? ICON.check.replace('stroke-width="2.4"', 'stroke-width="3" width="16" height="16"') : m.n}</div>
        <div><h3>${esc(m.title)}</h3><p class="small muted">${esc(m.desc)}</p><div class="dots">${dots}</div></div></a>`;
    }).join("");
    return `<div class="stack">
      <section class="hero">
        <div class="prompt">&gt; aprender("programación")<span class="cursor"></span></div>
        <h1>${firstTime ? "De cero a programar, paso a paso." : "Hola de nuevo" + (s.name ? ", " + esc(s.name) : "") + ". Sigamos."}</h1>
        <p>${firstTime ? "19 lecciones pensadas para quien no sabe nada todavía. Empezamos con pseudocódigo en español y terminamos con JavaScript real, con prácticas, exámenes y machetes en cada clase." : "Llevas " + done + " de " + ORDER.length + " lecciones. Cada día un poco: así se aprende a programar."}</p>
        <div class="row">${cta}<a class="btn" href="#lab">Abrir el laboratorio</a></div>
      </section>
      <div class="stats">
        <div class="stat"><b>${done}<small class="muted" style="font-size:14px">/${ORDER.length}</small></b><span>lecciones</span></div>
        <div class="stat"><b>${exDone}<small class="muted" style="font-size:14px">/${TOTAL_EX}</small></b><span>retos</span></div>
        <div class="stat"><b>${streak()}</b><span>${streak() === 1 ? "día seguido" : "días seguidos"}</span></div>
      </div>
      <div class="card stack" style="gap:8px">
        <div class="row" style="justify-content:space-between"><b>Progreso del curso</b><span class="chip accent">${pct(done / ORDER.length)}</span></div>
        <div class="bar"><i style="width:${(done / ORDER.length) * 100}%"></i></div>
        <span class="sync-inline" id="sync2">${Store.cloud ? "Tu progreso se guarda en tu cuenta: lo ves en el móvil y en la computadora." : "Tu progreso se guarda en este dispositivo."}</span>
      </div>
      <h2 style="font-size:22px">Tu ruta</h2>
      <div class="path">${path}</div>
      <div class="card stack" style="gap:10px">
        <h3 style="font-size:18px">Cómo estudiar con esta app</h3>
        <ol class="prose" style="padding-left:1.2em;margin:0">
          <li><b>Lee la lección</b> con calma. Toca <b>Probar ▶</b> en cada ejemplo para ejecutarlo.</li>
          <li><b>Haz la prueba rápida</b> del final. Con 70% la lección queda completada.</li>
          <li><b>Resuelve los retos</b> en el Laboratorio. El botón Comprobar te dice si funciona.</li>
          <li>Al terminar cada módulo, <b>rinde su examen</b>: preguntas + un reto práctico.</li>
          <li>Repasa con los <b>Machetes</b> y el <b>Repaso rápido</b> cuando quieras.</li>
        </ol>
      </div>
    </div>`;
  }

  function lessonItem(id) {
    const l = LESSONS[id];
    const st = Store.s.lessons[id];
    const chip = st && st.done ? `<span class="chip done">${ICON.check.replace("<svg", '<svg width="12" height="12"')} ${pct(st.quiz)}</span>` : st && st.seen ? `<span class="chip warn">En curso</span>` : `<span class="chip">${l.minutes} min</span>`;
    return `<a class="lesson-item ${st && st.done ? "is-done" : ""}" href="#${id}"><div class="lesson-num">${String(lessonNum(id)).padStart(2, "0")}</div><div><h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p></div>${chip}</a>`;
  }
  function viewLessons() {
    return `<div class="stack">
      <div><div class="eyebrow">Plan de estudio</div><h1 class="page-title">Lecciones</h1><p class="lead">Cinco módulos, de menor a mayor dificultad. Puedes entrar a cualquiera, pero se recomienda seguir el orden.</p></div>
      ${MODS.map((m) => {
        const d = m.lessons.filter(isDone).length;
        const ex = m.exam ? (() => {
          const e = Store.s.exams[m.id];
          const chip = examPassed(m.id) ? `<span class="chip done">Aprobado</span>` : e && e.quiz ? `<span class="chip warn">${pct(e.quiz)}${e.challenge ? "" : " · falta el reto"}</span>` : `<span class="chip">10 preguntas + reto</span>`;
          return `<a class="lesson-item exam" href="#examen-${m.id}"><div class="lesson-num">${ICON.exam.replace("<svg", '<svg width="20" height="20"')}</div><div><h3>Examen del módulo ${m.n}</h3><p>Demuestra lo aprendido para cerrar el módulo.</p></div>${chip}</a>`;
        })() : "";
        return `<section class="stack" id="mod-${m.id}" style="gap:10px">
          <div class="mod-head"><div><div class="eyebrow">Módulo ${m.n}${m.lang === "js" ? " · JavaScript" : m.lang === "pseudo" ? " · Pseudocódigo" : ""}</div><h2>${esc(m.title)}</h2></div><span class="chip ${d === m.lessons.length ? "done" : ""}">${d}/${m.lessons.length}</span></div>
          <div class="lesson-list">${m.lessons.map(lessonItem).join("")}${ex}</div>
        </section>`;
      }).join("")}
    </div>`;
  }

  function cheatInner(l) {
    return `<div class="cheat-grid">${l.cheat.map((c) => `<div><h4>${c.h}</h4>${c.body}</div>`).join("")}</div>`;
  }

  function viewLesson(id) {
    const l = LESSONS[id];
    const m = modOf(l.module);
    const i = ORDER.indexOf(id);
    const prev = ORDER[i - 1], next = ORDER[i + 1];
    const st = Store.lesson(id);
    if (!st.seen) { st.seen = true; }
    Store.s.last = id; Store.touchDay(); Store.save();
    const exs = l.exercises.map((ex) => `<button class="pick" data-act="open-ex" data-ex="${ex.id}"><div><b>${esc(ex.title)}</b><span>${ex.lang === "js" ? "JavaScript" : "Pseudocódigo"} · ${ex.tests.length} prueba${ex.tests.length > 1 ? "s" : ""} automática${ex.tests.length > 1 ? "s" : ""}</span></div>${Store.s.ex[ex.id] ? `<span class="chip done">Resuelto</span>` : `<span class="chip accent">Resolver</span>`}</button>`).join("");
    return `<article class="stack" style="gap:22px">
      <div class="lesson-head">
        <div><a class="btn ghost small" href="#lecciones" style="margin-left:-10px">← Lecciones</a></div>
        <div class="eyebrow">Módulo ${m.n} · Lección ${lessonNum(id)} de ${ORDER.length} · ${l.minutes} min</div>
        <h1 class="page-title">${esc(l.title)}</h1>
        <p class="lead">${esc(l.summary)}</p>
        <div class="row">${st.done ? `<span class="chip done">Completada · ${pct(st.quiz)}</span>` : `<span class="chip">Completa la prueba rápida para terminarla</span>`}</div>
      </div>
      <nav class="toc" aria-label="Secciones">${l.sections.map((s, k) => `<a href="javascript:void 0" data-act="scroll" data-to="sec-${k}">${esc(s.h)}</a>`).join("")}<a href="javascript:void 0" data-act="scroll" data-to="sec-quiz">Prueba rápida</a>${l.exercises.length ? `<a href="javascript:void 0" data-act="scroll" data-to="sec-ex">Retos</a>` : ""}<a href="javascript:void 0" data-act="scroll" data-to="sec-cheat">Machete</a></nav>
      <div class="lesson-body">
        ${l.sections.map((s, k) => `<section class="sec" id="sec-${k}"><h2><span class="n">${lessonNum(id)}.${k + 1}</span>${esc(s.h)}</h2><div class="prose">${s.body}</div></section>`).join("")}
        <section class="sec" id="sec-quiz"><h2><span class="n">✓</span>Prueba rápida</h2><p class="muted">${l.quiz.length} preguntas. Con 70% o más la lección queda completada.</p><div id="lesson-quiz"></div></section>
        ${l.exercises.length ? `<section class="sec" id="sec-ex"><h2><span class="n">&gt;_</span>Retos de práctica</h2><p class="muted">Se abren en el Laboratorio. El botón <b>Comprobar</b> prueba tu programa con varios datos automáticamente.</p><div class="stack" style="gap:8px">${exs}</div></section>` : ""}
        <section class="sec" id="sec-cheat"><h2><span class="n">≡</span>Machete de esta clase</h2><div class="card">${cheatInner(l)}</div></section>
        ${tutorLessonHTML(id)}
      </div>
      <nav class="lesson-nav">${prev ? `<a href="#${prev}"><span>← Anterior</span><b>${esc(LESSONS[prev].title)}</b></a>` : "<span></span>"}${next ? `<a class="next" href="#${next}"><span>Siguiente →</span><b>${esc(LESSONS[next].title)}</b></a>` : `<a class="next" href="#examenes"><span>Siguiente →</span><b>Exámenes</b></a>`}</nav>
    </article>`;
  }
  function mountLesson(id) {
    const l = LESSONS[id];
    const lang = langOfLesson(l);
    const m = modOf(l.module);
    quizMount($("#lesson-quiz"), "lesson-" + id, l.quiz.map((q) => prepQuestion(q, lang, false)), {
      pass: 0.7,
      passMsg: "¡Lección completada!",
      after: ORDER[ORDER.indexOf(id) + 1] ? `<a class="btn primary" href="#${ORDER[ORDER.indexOf(id) + 1]}">Siguiente lección →</a>` : "",
      onDone: (score) => {
        const st = Store.lesson(id);
        st.quiz = Math.max(st.quiz || 0, score);
        if (score >= 0.7) st.done = true;
        Store.touchDay(); Store.save();
        if (score >= 0.7) {
          if (m.lessons.every(isDone) && m.exam && !examPassed(m.id)) toast("¡Terminaste el módulo! Ya puedes rendir su examen.");
          else toast("Lección completada");
        }
      },
    });
  }

  function viewCheats() {
    const trans = TABLE(["Concepto", "Pseudocódigo", "JavaScript"], [
      ["Mostrar", "<code>Escribir \"Hola\"</code>", "<code>console.log(\"Hola\")</code>"],
      ["Leer dato", "<code>Leer x</code>", "<code>const x = prompt()</code>"],
      ["Variable", "<code>x &lt;- 5</code>", "<code>let x = 5;</code>"],
      ["Comparar", "<code>=</code> <code>&lt;&gt;</code>", "<code>===</code> <code>!==</code>"],
      ["Lógicos", "<code>Y O NO</code>", "<code>&amp;&amp; || !</code>"],
      ["Resto", "<code>MOD</code>", "<code>%</code>"],
      ["Si", "<code>Si c Entonces … SiNo … FinSi</code>", "<code>if (c) { … } else { … }</code>"],
      ["Mientras", "<code>Mientras c Hacer … FinMientras</code>", "<code>while (c) { … }</code>"],
      ["Para", "<code>Para i &lt;- 0 Hasta 9 Hacer</code>", "<code>for (let i = 0; i &lt;= 9; i++)</code>"],
      ["Arreglo", "<code>Dimension v[5]</code>", "<code>const v = [];</code>"],
      ["Largo", "<code>Longitud(t)</code>", "<code>t.length</code>"],
      ["Función", "<code>Funcion r &lt;- F(a) … FinFuncion</code>", "<code>function f(a) { return …; }</code>"],
    ]);
    return `<div class="stack">
      <div><div class="eyebrow">Para repasar</div><h1 class="page-title">Machetes</h1><p class="lead">Lo esencial de cada clase en una sola vista. Ideal para repasar antes de un examen o cuando no recuerdas cómo se escribía algo.</p></div>
      <input class="search" id="cheat-search" type="search" placeholder="Buscar: bucle, MOD, arreglo, función…" autocomplete="off">
      <details class="card cheat" open><summary><div class="lesson-num">⇄</div><div><b>Traductor: pseudocódigo → JavaScript</b><div class="small muted">La tabla para dar el salto al módulo 4</div></div><span class="chev">${ICON.chev}</span></summary><div class="cheat-body">${trans}</div></details>
      <div id="cheat-list" class="stack" style="gap:10px">
      ${ORDER.map((id) => {
        const l = LESSONS[id];
        const text = strip(l.title + " " + l.summary + " " + l.cheat.map((c) => c.h + " " + c.body).join(" ")).replace(/<[^>]+>/g, " ");
        return `<details class="card cheat" data-text="${esc(text)}"><summary><div class="lesson-num">${String(lessonNum(id)).padStart(2, "0")}</div><div><b>${esc(l.title)}</b><div class="small muted">Módulo ${modOf(l.module).n}</div></div><span class="chev">${ICON.chev}</span></summary><div class="cheat-body">${cheatInner(l)}<div><a class="btn small" href="#${id}">Ir a la lección</a></div></div></details>`;
      }).join("")}
      </div>
      <div class="empty" id="cheat-empty" hidden>No hay machetes con esa palabra.</div>
    </div>`;
  }

  function viewExams() {
    const f = Store.s.final;
    return `<div class="stack">
      <div><div class="eyebrow">Evaluación</div><h1 class="page-title">Exámenes y repaso</h1><p class="lead">Cada examen de módulo tiene 10 preguntas al azar y un reto práctico. Para aprobar necesitas 70% en las preguntas y resolver el reto.</p></div>
      <a class="lesson-item" href="#repaso"><div class="lesson-num">${ICON.spark.replace("<svg", '<svg width="20" height="20"')}</div><div><h3>Repaso rápido</h3><p>8 preguntas al azar de las lecciones que ya viste. No cuenta para la nota: es para fijar lo aprendido.</p></div><span class="chip accent">Practicar</span></a>
      <div class="lesson-list">
      ${MODS.filter((m) => m.exam).map((m) => {
        const e = Store.s.exams[m.id];
        const d = m.lessons.filter(isDone).length;
        const chip = examPassed(m.id) ? `<span class="chip done">Aprobado</span>` : e && e.quiz ? `<span class="chip warn">${pct(e.quiz)}${e.challenge ? "" : " · falta el reto"}</span>` : d < m.lessons.length ? `<span class="chip">${d}/${m.lessons.length} lecciones</span>` : `<span class="chip accent">Listo para rendir</span>`;
        return `<a class="lesson-item exam" href="#examen-${m.id}"><div class="lesson-num">M${m.n}</div><div><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></div>${chip}</a>`;
      }).join("")}
      <a class="lesson-item exam" href="#examen-final"><div class="lesson-num">★</div><div><h3>Examen final</h3><p>20 preguntas de todo el curso. Al aprobarlo obtienes tu certificado de finalización.</p></div>${f && f.best >= 0.7 ? `<span class="chip done">Aprobado · ${pct(f.best)}</span>` : f ? `<span class="chip warn">${pct(f.best)}</span>` : `<span class="chip">20 preguntas</span>`}</a>
      </div>
      ${f && f.best >= 0.7 ? `<a class="btn primary" href="#certificado">Ver mi certificado</a>` : ""}
    </div>`;
  }

  function poolFor(m) {
    const pool = [];
    for (const id of m.lessons) for (const q of LESSONS[id].quiz) pool.push(prepQuestion(q, langOfLesson(LESSONS[id]), true));
    for (const q of m.exam.extra) pool.push(prepQuestion(q, m.lang === "js" ? "js" : "pseudo", true));
    return pool;
  }
  function viewExam(mid) {
    const m = modOf(mid);
    if (!m || !m.exam) return viewExams();
    const e = Store.s.exams[mid] || {};
    const ch = m.exam.challenge;
    const missing = m.lessons.filter((id) => !isDone(id));
    return `<div class="stack">
      <div><a class="btn ghost small" href="#examenes" style="margin-left:-10px">← Exámenes</a></div>
      <div><div class="eyebrow">Examen · Módulo ${m.n}</div><h1 class="page-title">${esc(m.title)}</h1><p class="lead">Parte 1: 10 preguntas al azar (necesitas 70%). Parte 2: un reto práctico en el Laboratorio.</p></div>
      ${missing.length ? `<div class="note note-idea"><b>Recomendación</b><div>Te ${missing.length === 1 ? "falta completar la lección" : "faltan completar las lecciones"} ${missing.map((id) => `<a href="#${id}">${lessonNum(id)}. ${esc(LESSONS[id].title)}</a>`).join(", ")}. Puedes rendir igual, pero te irá mejor si las terminas antes.</div></div>` : ""}
      <div class="row"><span class="chip ${e.quiz >= 0.7 ? "done" : e.quiz ? "warn" : ""}">Preguntas: ${e.quiz ? "mejor nota " + pct(e.quiz) : "sin rendir"}</span><span class="chip ${e.challenge ? "done" : ""}">Reto práctico: ${e.challenge ? "resuelto" : "pendiente"}</span></div>
      <section class="sec"><h2><span class="n">1</span>Preguntas</h2><div id="exam-quiz"><button class="btn primary" data-act="start-exam" data-mod="${mid}">Empezar las preguntas</button></div></section>
      <section class="sec"><h2><span class="n">2</span>Reto práctico</h2>
        <div class="card challenge"><h3>${esc(ch.title)}</h3><div class="text">${ch.text}</div><div class="row"><button class="btn primary" data-act="open-ex" data-ex="${ch.id}">${e.challenge ? "Volver a resolverlo" : "Resolver en el Laboratorio"}</button>${e.challenge ? `<span class="chip done">Resuelto</span>` : ""}</div></div>
      </section>
      ${examPassed(mid) ? `<div class="celebrate"><span>¡Módulo ${m.n} aprobado!</span><span style="font-weight:400">Ya dominas: ${esc(m.desc)}</span></div>` : ""}
    </div>`;
  }
  function startExam(mid) {
    const m = modOf(mid);
    const qs = shuffle(poolFor(m)).slice(0, 10);
    quizMount($("#exam-quiz"), "exam-" + mid + "-" + Date.now(), qs, {
      pass: 0.7,
      passMsg: "Aprobaste la parte de preguntas. Ahora, el reto práctico.",
      onDone: (score) => {
        const e = Store.s.exams[mid] || (Store.s.exams[mid] = { quiz: 0, challenge: false });
        e.quiz = Math.max(e.quiz || 0, score);
        Store.touchDay(); Store.save();
        if (examPassed(mid)) toast("¡Examen del módulo " + m.n + " aprobado!");
      },
    });
  }

  function viewFinal() {
    const f = Store.s.final;
    const passed = MODS.filter((m) => m.exam && examPassed(m.id)).length;
    return `<div class="stack">
      <div><a class="btn ghost small" href="#examenes" style="margin-left:-10px">← Exámenes</a></div>
      <div><div class="eyebrow">Examen final</div><h1 class="page-title">Todo el curso</h1><p class="lead">20 preguntas al azar de los módulos 1 a 4. Con 70% o más obtienes tu certificado.</p></div>
      ${passed < 4 ? `<div class="note note-idea"><b>Recomendación</b><div>Aprobaste ${passed} de 4 exámenes de módulo. Se aconseja aprobarlos todos antes del final.</div></div>` : ""}
      ${f ? `<div class="row"><span class="chip ${f.best >= 0.7 ? "done" : "warn"}">Mejor nota: ${pct(f.best)}</span></div>` : ""}
      <div id="final-quiz"><button class="btn primary" data-act="start-final">Empezar el examen final</button></div>
    </div>`;
  }
  function startFinal() {
    let qs = [];
    for (const m of MODS.filter((x) => x.exam)) qs.push(...shuffle(poolFor(m)).slice(0, 5));
    qs = shuffle(qs);
    quizMount($("#final-quiz"), "final-" + Date.now(), qs, {
      pass: 0.7,
      passMsg: "¡Aprobaste el examen final!",
      after: `<a class="btn primary" href="#certificado">Ver mi certificado</a>`,
      onDone: (score) => {
        const f = Store.s.final || { best: 0, date: null };
        f.best = Math.max(f.best, score);
        if (score >= 0.7 && !f.date) f.date = today();
        Store.s.final = f;
        Store.touchDay(); Store.save();
      },
    });
  }
  function viewCert() {
    const f = Store.s.final;
    if (!f || f.best < 0.7) return `<div class="stack"><div class="empty">Aprueba el examen final para obtener tu certificado.</div><a class="btn primary" href="#examen-final">Ir al examen final</a></div>`;
    const date = f.date ? new Date(f.date + "T12:00:00").toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" }) : "";
    return `<div class="stack">
      <div><a class="btn ghost small" href="#examenes" style="margin-left:-10px">← Exámenes</a></div>
      <div class="cert">
        <div class="eyebrow">Certificado de finalización</div>
        <h2>Fundamentos de programación</h2>
        <p class="muted">Se reconoce que</p>
        <div class="who" id="cert-name">${esc(Store.s.name || "Tu nombre")}</div>
        <p>completó las ${ORDER.length} lecciones del curso <b>Código desde Cero</b>: lógica y algoritmos en pseudocódigo, estructuras de control, arreglos, funciones, algoritmos clásicos y fundamentos de JavaScript, con una nota final de <b>${pct(f.best)}</b>.</p>
        <p class="muted small">${date}</p>
        <label class="small muted" for="cert-input">Escribe tu nombre para el certificado</label>
        <input id="cert-input" value="${esc(Store.s.name || "")}" placeholder="Tu nombre" autocomplete="name">
      </div>
      <p class="muted small">Haz una captura de pantalla para guardarlo o compartirlo. Tu próximo paso está en la lección 19: <a href="#l19">Tu ruta para dedicarte a esto</a>.</p>
    </div>`;
  }

  function viewReview() {
    return `<div class="stack">
      <div><a class="btn ghost small" href="#examenes" style="margin-left:-10px">← Exámenes</a></div>
      <div><div class="eyebrow">Práctica</div><h1 class="page-title">Repaso rápido</h1><p class="lead">Preguntas al azar de lo que ya estudiaste. Repetir pocas preguntas con frecuencia ayuda a no olvidar.</p></div>
      <div id="review-quiz"></div>
      <button class="btn" data-act="new-review">Otras preguntas</button>
    </div>`;
  }
  function startReview() {
    let ids = ORDER.filter((id) => Store.s.lessons[id] && Store.s.lessons[id].seen);
    if (!ids.length) ids = ORDER.slice(0, 2);
    const pool = [];
    for (const id of ids) for (const q of LESSONS[id].quiz) pool.push(prepQuestion(q, langOfLesson(LESSONS[id]), true));
    quizMount($("#review-quiz"), "review-" + Date.now(), shuffle(pool).slice(0, 8), { pass: 0.7, passMsg: "¡Buen repaso!", onDone: () => { Store.touchDay(); Store.save(); } });
  }

  /* ================= Tutor (Claude) ================= */
  let sampleFn = null;
  function md(text) {
    const parts = String(text).split(/```[a-zA-Z]*\n?/);
    return parts.map((p, i) => {
      if (i % 2 === 1) return `<pre>${esc(p.replace(/\n$/, ""))}</pre>`;
      const lines = esc(p).split("\n");
      let html = "", list = null;
      const flush = () => { if (list) { html += `<${list.t}>${list.items.map((x) => `<li>${x}</li>`).join("")}</${list.t}>`; list = null; } };
      for (const raw of lines) {
        let l = raw.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>");
        const ul = l.match(/^\s*[-*•]\s+(.*)/), ol = l.match(/^\s*\d+[.)]\s+(.*)/), hd = l.match(/^#{1,4}\s+(.*)/);
        if (ul) { if (!list || list.t !== "ul") { flush(); list = { t: "ul", items: [] }; } list.items.push(ul[1]); }
        else if (ol) { if (!list || list.t !== "ol") { flush(); list = { t: "ol", items: [] }; } list.items.push(ol[1]); }
        else { flush(); if (hd) html += `<p><b>${hd[1]}</b></p>`; else if (l.trim()) html += `<p>${l}</p>`; }
      }
      flush();
      return html;
    }).join("");
  }
  const SAMPLE_ERR = {
    not_granted: "El tutor necesita tu permiso para responder. Puedes darlo desde el menú de permisos del artefacto.",
    sampling_disabled: "El tutor no está disponible para esta cuenta.",
    rate_limited: "Hiciste muchas preguntas seguidas. Espera un momento y vuelve a intentarlo.",
    session_expired: "Tu sesión expiró. Vuelve a iniciar sesión para usar el tutor.",
    refused: "El tutor no puede responder a esa pregunta. Prueba reformularla sobre programación.",
    prompt_too_large: "El código es demasiado largo para enviarlo. Envía solo la parte con el problema.",
  };
  const HIDE_ON = ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"];
  async function askTutor(prompt, outEl, btn, stopBtn) {
    if (!sampleFn) return;
    const ctl = new AbortController();
    outEl.hidden = false;
    outEl.innerHTML = `<div class="thinking">El tutor está pensando…</div>`;
    btn.disabled = true;
    if (stopBtn) { stopBtn.hidden = false; stopBtn.onclick = () => ctl.abort(); }
    try {
      await sampleFn(prompt, { signal: ctl.signal, cache: false, onText: ({ text }) => { outEl.innerHTML = md(text); } });
    } catch (e) {
      const code = e && e.code;
      if (code === "cancelled") { if (!e.text) outEl.innerHTML = `<div class="thinking">Pregunta cancelada.</div>`; }
      else {
        outEl.innerHTML = (e && e.text ? md(e.text) : "") + `<div class="thinking">${esc(SAMPLE_ERR[code] || "No se pudo obtener respuesta. Inténtalo de nuevo en un momento.")}</div>`;
        if (HIDE_ON.includes(code) && code !== "not_granted") { sampleFn = null; $$(".tutor-wrap").forEach((el) => (el.hidden = true)); }
      }
    } finally {
      btn.disabled = false;
      if (stopBtn) stopBtn.hidden = true;
    }
  }
  const TUTOR_RULES = "Eres el tutor de una app para aprender a programar desde cero, en español. La persona no tiene experiencia previa. Responde en español neutro, con frases cortas y claras, tuteando. Explica cualquier término técnico la primera vez que lo uses. Sé cálido y alentador, pero preciso. Máximo 220 palabras.";
  function tutorLessonHTML(id) {
    return `<section class="sec tutor-wrap" id="sec-tutor" ${sampleFn ? "" : "hidden"}><h2><span class="n">?</span>¿Te quedó una duda?</h2>
      <div class="card tutor"><label class="small muted" for="lesson-q">Pregúntale al tutor sobre esta lección. Por ejemplo: «no entiendo la diferencia entre &lt;- y =».</label>
      <textarea id="lesson-q" placeholder="Escribe tu pregunta…"></textarea>
      <div class="row"><button class="btn primary" data-act="ask-lesson" data-id="${id}">Preguntar</button><button class="btn" id="lesson-stop" hidden>Detener</button></div>
      <div class="answer" id="lesson-answer" hidden></div></div></section>`;
  }

  /* ================= Laboratorio ================= */
  const TEMPLATES = {
    pseudo: [
      { name: "Programa vacío", code: "Algoritmo MiPrograma\n\t\nFinAlgoritmo" },
      { name: "Hola mundo", code: 'Algoritmo HolaMundo\n\tEscribir "Hola, mundo"\nFinAlgoritmo' },
      { name: "Leer y mostrar", code: 'Algoritmo Saludo\n\tDefinir nombre Como Cadena\n\tEscribir "¿Cómo te llamas?"\n\tLeer nombre\n\tEscribir "Hola, ", nombre\nFinAlgoritmo' },
      { name: "Si / SiNo", code: 'Algoritmo Decision\n\tDefinir n Como Entero\n\tLeer n\n\tSi n > 0 Entonces\n\t\tEscribir "Positivo"\n\tSiNo\n\t\tEscribir "Cero o negativo"\n\tFinSi\nFinAlgoritmo' },
      { name: "Bucle Para", code: 'Algoritmo Contar\n\tPara i <- 1 Hasta 10 Hacer\n\t\tEscribir i\n\tFinPara\nFinAlgoritmo' },
      { name: "Bucle Mientras", code: 'Algoritmo Mientras\n\ti <- 1\n\tMientras i <= 5 Hacer\n\t\tEscribir i\n\t\ti <- i + 1\n\tFinMientras\nFinAlgoritmo' },
      { name: "Arreglo", code: 'Algoritmo Arreglo\n\tDimension v[5]\n\tPara i <- 0 Hasta 4 Hacer\n\t\tv[i] <- i * 10\n\tFinPara\n\tEscribir v\nFinAlgoritmo' },
      { name: "Función", code: 'Funcion r <- Doble(n)\n\tr <- n * 2\nFinFuncion\n\nAlgoritmo UsarFuncion\n\tEscribir Doble(21)\nFinAlgoritmo' },
      { name: "Juego: adivina el número", code: 'Algoritmo Adivina\n\tsecreto <- aleatorio(1, 100)\n\tintentos <- 0\n\tRepetir\n\t\tEscribir "Adivina (1-100):"\n\t\tLeer n\n\t\tintentos <- intentos + 1\n\t\tSi n < secreto Entonces\n\t\t\tEscribir "Más alto"\n\t\tSiNo\n\t\t\tSi n > secreto Entonces\n\t\t\t\tEscribir "Más bajo"\n\t\t\tFinSi\n\t\tFinSi\n\tHasta Que n = secreto\n\tEscribir "¡Lo lograste en ", intentos, " intentos!"\nFinAlgoritmo' },
    ],
    js: [
      { name: "Hola mundo", code: 'console.log("Hola, mundo");' },
      { name: "Variables", code: 'let nombre = "Ada";\nlet edad = 36;\nconsole.log(`${nombre} tiene ${edad} años`);' },
      { name: "Leer datos", code: 'const n = Number(leer());\nconsole.log("El doble es", n * 2);' },
      { name: "if / else", code: 'const edad = 20;\nif (edad >= 18) {\n  console.log("Mayor de edad");\n} else {\n  console.log("Menor de edad");\n}' },
      { name: "for", code: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}' },
      { name: "Función", code: 'function doble(n) {\n  return n * 2;\n}\n\nconsole.log(doble(21));' },
      { name: "Array y map", code: 'const precios = [10, 25, 40];\nconst conIva = precios.map((p) => p * 1.21);\nconsole.log(conIva);' },
    ],
  };
  const KEYS = {
    pseudo: ["<-", '"', "(", ")", "[", "]", ",", "=", "<>", "<", ">", "+", "-", "*", "/", ":"],
    js: ["{", "}", "(", ")", "[", "]", ";", "=", "===", "=>", "`", "${}", '"', "+", "<", ">", "&&", "||", "!"],
  };
  const SNIPS = {
    pseudo: [
      ["Escribir", 'Escribir ""', -1], ["Leer", "Leer ", 0], ["Definir", "Definir  Como Entero", -12],
      ["Si", "Si  Entonces\n\t\nFinSi", -15], ["SiNo", "SiNo\n\t", 0], ["Mientras", "Mientras  Hacer\n\t\nFinMientras", -20],
      ["Para", "Para i <- 1 Hasta 10 Hacer\n\t\nFinPara", -8], ["Repetir", "Repetir\n\t\nHasta Que ", 0],
    ],
    js: [
      ["log", "console.log();", -2], ["let", "let  = ;", -5], ["if", "if () {\n  \n}", -7], ["else", " else {\n  \n}", -2],
      ["for", "for (let i = 0; i < 10; i++) {\n  \n}", -2], ["while", "while () {\n  \n}", -7], ["function", "function nombre() {\n  return ;\n}", -4],
    ],
  };

  const Lab = {
    lang: "pseudo", ex: null, running: false, stepping: false, control: null, stepResolve: null, readReject: null, lastOut: "", lastErr: "", built: false,
    build() {
      const el = $("#lab");
      el.innerHTML = `<div class="stack" style="gap:12px">
        <div><div class="eyebrow">Laboratorio</div><h1 class="page-title">Prueba tu código</h1></div>
        <div class="lab-top">
          <div class="seg" role="group" aria-label="Lenguaje"><button data-act="lang" data-lang="pseudo" aria-pressed="true">Pseudocódigo</button><button data-act="lang" data-lang="js" aria-pressed="false">JavaScript</button></div>
          <div class="row"><button class="btn small" data-act="pick-ex">Retos</button><button class="btn small" data-act="pick-tpl">Plantillas</button></div>
        </div>
        <div id="lab-challenge"></div>
        <div class="editor" id="editor">
          <div class="gutter" id="gutter"></div>
          <div class="ed-wrap"><pre aria-hidden="true"><code id="hl"></code></pre><div class="line-mark" id="mark"></div><textarea id="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Editor de código"></textarea></div>
        </div>
        <div class="keys" id="keys"></div>
        <div class="inputs-box" id="lab-inputs" hidden><label class="small muted" for="js-inputs">Entradas para <code>leer()</code> / <code>prompt()</code>, una por línea:</label><textarea id="js-inputs" spellcheck="false" autocapitalize="off"></textarea></div>
        <div class="run-bar" id="run-bar">
          <button class="btn primary" data-act="run">${ICON.play} Ejecutar</button>
          <button class="btn" data-act="step" id="btn-step">${ICON.step} Paso a paso</button>
          <button class="btn primary" data-act="next" id="btn-next" hidden>${ICON.step} Siguiente</button>
          <button class="btn" data-act="cont" id="btn-cont" hidden>${ICON.play} Continuar</button>
          <button class="btn" data-act="stop" id="btn-stop" hidden>${ICON.stop} Detener</button>
          <button class="btn" data-act="check" id="btn-check" hidden>${ICON.check} Comprobar</button>
        </div>
        <div id="lab-results"></div>
        <div class="console"><div class="console-head"><span>Consola</span><button class="cb-btn" data-act="clear">Limpiar</button></div><div class="console-body" id="out" aria-live="polite"></div></div>
        <div class="vars" id="vars"></div>
        <div class="card tutor tutor-wrap" id="lab-tutor" ${sampleFn ? "" : "hidden"}>
          <div class="row" style="justify-content:space-between"><b>Tutor</b><span class="small muted">Te da pistas, no la solución</span></div>
          <textarea id="lab-q" placeholder="Opcional: ¿qué no te sale o qué no entiendes?"></textarea>
          <div class="row"><button class="btn primary" data-act="ask-lab">Pedir ayuda</button><button class="btn" id="lab-stop" hidden>Detener</button></div>
          <div class="answer" id="lab-answer" hidden></div>
        </div>
      </div>`;
      const ta = $("#code");
      ta.addEventListener("input", () => { this.refresh(); this.clearMark(); this.saveDraft(); });
      ta.addEventListener("scroll", () => this.sync());
      ta.addEventListener("keydown", (e) => this.keydown(e));
      $("#js-inputs").addEventListener("input", () => ls.set("cdc-inputs", $("#js-inputs").value));
      $("#js-inputs").value = ls.get("cdc-inputs") || "5\n7";
      this.built = true;
      this.setLang(ls.get("cdc-lang") || "pseudo", true);
      this.loadDraft();
      this.sysMsg("Escribe tu programa y toca Ejecutar. Con Paso a paso verás cada línea y el valor de las variables.");
    },
    draftKey() { return "cdc-draft-" + (this.ex ? this.ex.id : "libre-" + this.lang); },
    saveDraft() { clearTimeout(this._dt); this._dt = setTimeout(() => ls.set(this.draftKey(), $("#code").value), 400); },
    loadDraft() {
      const d = ls.get(this.draftKey());
      const def = this.ex ? this.ex.starter : TEMPLATES[this.lang][this.lang === "pseudo" ? 1 : 0].code;
      this.setCode(d !== null && d !== "" ? d : def);
    },
    setLang(lang, silent) {
      if (this.running) this.stop();
      if (!silent) ls.set(this.draftKey(), $("#code").value);
      this.lang = lang;
      ls.set("cdc-lang", lang);
      $$('[data-act="lang"]').forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
      $("#lab-inputs").hidden = lang !== "js";
      $("#btn-step").hidden = lang === "js";
      this.renderKeys();
      if (!silent) { this.loadDraft(); this.clearOut(); }
    },
    renderKeys() {
      const k = KEYS[this.lang].map((x) => `<button class="key" data-key="${esc(x)}">${esc(x)}</button>`).join("");
      const tab = `<button class="key" data-key="\t" aria-label="Tabulación">⇥</button>`;
      const s = SNIPS[this.lang].map(([n, t, off]) => `<button class="key snip" data-snip="${esc(t)}" data-off="${off}">${esc(n)}</button>`).join("");
      $("#keys").innerHTML = tab + k + s;
      $$("#keys .key").forEach((b) => {
        b.addEventListener("pointerdown", (e) => e.preventDefault());
        b.addEventListener("click", () => {
          if (b.dataset.snip !== undefined) this.insertSnippet(b.dataset.snip, Number(b.dataset.off));
          else if (b.dataset.key === "${}") this.insert("${}", -1);
          else this.insert(b.dataset.key, b.dataset.key === '""' ? -1 : 0);
        });
      });
    },
    setCode(code) { $("#code").value = code; this.refresh(); this.clearMark(); },
    getCode() { return $("#code").value; },
    refresh() {
      const code = this.getCode();
      $("#hl").innerHTML = window.Pseudo.highlight(code + "\n", this.lang);
      const n = code.split("\n").length;
      let g = "";
      for (let i = 1; i <= n; i++) g += `<div data-l="${i}">${i}</div>`;
      $("#gutter").innerHTML = g;
      this.sync();
    },
    sync() {
      const ta = $("#code");
      const pre = $(".ed-wrap pre");
      pre.scrollTop = ta.scrollTop; pre.scrollLeft = ta.scrollLeft;
      $("#gutter").scrollTop = ta.scrollTop;
      const mk = $("#mark");
      if (mk.dataset.line) mk.style.top = (10 + (Number(mk.dataset.line) - 1) * 24 - ta.scrollTop) + "px";
    },
    mark(line, kind) {
      const mk = $("#mark");
      if (!line) return this.clearMark();
      mk.dataset.line = line; mk.className = "line-mark " + kind; mk.style.display = "block";
      $$("#gutter div").forEach((d) => d.classList.toggle(kind, Number(d.dataset.l) === line));
      const ta = $("#code");
      const top = (line - 1) * 24;
      if (top < ta.scrollTop || top > ta.scrollTop + ta.clientHeight - 48) ta.scrollTop = Math.max(0, top - ta.clientHeight / 3);
      this.sync();
    },
    clearMark() {
      const mk = $("#mark"); delete mk.dataset.line; mk.style.display = "none";
      $$("#gutter div.err, #gutter div.cur").forEach((d) => d.classList.remove("err", "cur"));
    },
    insert(text, caretOffset) {
      const ta = $("#code");
      ta.focus();
      const s = ta.selectionStart, e = ta.selectionEnd;
      ta.setRangeText(text, s, e, "end");
      if (caretOffset) { const p = ta.selectionEnd + caretOffset; ta.setSelectionRange(p, p); }
      ta.dispatchEvent(new Event("input"));
    },
    insertSnippet(t, off) {
      const ta = $("#code");
      const v = ta.value, s = ta.selectionStart;
      const lineStart = v.lastIndexOf("\n", s - 1) + 1;
      const indent = (v.slice(lineStart, s).match(/^[\t ]*/) || [""])[0];
      const text = t.replace(/\n/g, "\n" + indent);
      const pos = t.length + off;
      const caret = pos + (t.slice(0, pos).match(/\n/g) || []).length * indent.length;
      this.insert(text, caret - text.length);
    },
    keydown(e) {
      const ta = e.target;
      if (e.key === "Tab") { e.preventDefault(); this.insert("\t", 0); return; }
      if (e.key === "Enter" && !e.isComposing) {
        const v = ta.value, s = ta.selectionStart;
        const lineStart = v.lastIndexOf("\n", s - 1) + 1;
        const line = v.slice(lineStart, s);
        let indent = (line.match(/^[\t ]*/) || [""])[0];
        const t = strip(line.trim());
        const opens = this.lang === "pseudo" ? /(entonces|hacer|^sino|^repetir|^algoritmo\b.*|^proceso\b.*|^funcion\b.*|^subproceso\b.*|:)$/.test(t) : /[{[(]$/.test(line.trim());
        if (opens) indent += this.lang === "pseudo" ? "\t" : "  ";
        e.preventDefault();
        this.insert("\n" + indent, 0);
      }
    },
    /* --- Consola --- */
    clearOut() { $("#out").innerHTML = ""; $("#vars").innerHTML = ""; this.lastOut = ""; this.lastErr = ""; },
    out(text) {
      const o = $("#out");
      if (this.lastOut.length > 100000) return;
      this.lastOut += text;
      o.appendChild(document.createTextNode(text));
      o.parentElement.scrollTop = o.parentElement.scrollHeight;
    },
    sysMsg(t, cls = "sys") { const s = document.createElement("span"); s.className = cls; s.textContent = t + "\n"; $("#out").appendChild(s); },
    errMsg(msg, line) {
      const s = document.createElement("span"); s.className = "err";
      s.innerHTML = (line ? `<b>Error en la línea ${line}:</b> ` : "<b>Error:</b> ") + esc(msg);
      $("#out").appendChild(s);
      this.lastErr = (line ? "Línea " + line + ": " : "") + msg;
      if (line) this.mark(line, "err");
    },
    showVars(vars, title) {
      if (!vars || !vars.length) { $("#vars").innerHTML = ""; return; }
      $("#vars").innerHTML = `<div class="small muted" style="margin-bottom:6px">${esc(title)}</div>` + TABLE(["Variable", "Tipo", "Valor"], vars.map((v) => [esc(v.name), esc(v.type), esc(v.value)]));
    },
    readInput(name) {
      return new Promise((resolve, reject) => {
        this.readReject = reject;
        const o = $("#out");
        const row = document.createElement("form");
        row.className = "in-row";
        row.innerHTML = `<input aria-label="Valor para ${esc(name)}" placeholder="Escribe ${esc(name)} y pulsa Enter" autocomplete="off" autocapitalize="off" enterkeyhint="send"><button>OK</button>`;
        o.appendChild(row);
        const inp = row.querySelector("input");
        setTimeout(() => inp.focus({ preventScroll: false }), 30);
        o.parentElement.scrollTop = o.parentElement.scrollHeight;
        row.addEventListener("submit", (e) => {
          e.preventDefault();
          const v = inp.value;
          row.remove();
          const s = document.createElement("span"); s.className = "echo"; s.textContent = v + "\n"; o.appendChild(s);
          this.lastOut += v + "\n";
          this.readReject = null;
          resolve(v);
        });
      });
    },
    setRunning(on, stepping) {
      this.running = on; this.stepping = !!stepping;
      $('[data-act="run"]').hidden = on;
      $("#btn-step").hidden = on || this.lang === "js";
      $("#btn-next").hidden = !(on && stepping);
      $("#btn-cont").hidden = !(on && stepping);
      $("#btn-stop").hidden = !on;
      $("#btn-check").hidden = on || !this.ex;
    },
    async run(step) {
      if (this.running) return;
      this.clearOut(); this.clearMark(); $("#lab-results").innerHTML = "";
      if (this.lang === "js") return this.runJS();
      let prog;
      try { prog = window.Pseudo.parse(this.getCode()); }
      catch (e) { this.errMsg(e.message, e.line); return; }
      this.setRunning(true, step);
      const t0 = performance.now();
      const io = {
        write: (t, nl) => this.out(t + (nl ? "\n" : "")),
        read: (name) => this.readInput(name),
        clear: () => { $("#out").innerHTML = ""; },
      };
      const opts = { onControl: (c) => (this.control = c) };
      if (step) {
        opts.onStep = (line, snap) => {
          if (!this.stepping) return null;
          this.mark(line, "cur");
          const sn = snap();
          this.showVars(sn.vars, sn.fn ? "Variables dentro de la función " + sn.fn + " (antes de ejecutar la línea " + line + ")" : "Variables (antes de ejecutar la línea " + line + ")");
          return new Promise((r) => (this.stepResolve = r));
        };
      }
      try {
        const res = await window.Pseudo.run(prog, io, opts);
        this.clearMark();
        this.sysMsg("— Programa terminado (" + res.steps + " instrucciones, " + Math.max(1, Math.round(performance.now() - t0)) + " ms) —");
        this.showVars(res.vars, "Valores finales de las variables");
      } catch (e) {
        if (e && e.message === "Ejecución detenida") { this.clearMark(); this.sysMsg("— Ejecución detenida —"); }
        else this.errMsg(e.message || String(e), e.line);
      } finally {
        this.setRunning(false);
        this.control = null; this.stepResolve = null; this.readReject = null;
      }
    },
    async runJS() {
      this.setRunning(true);
      this.sysMsg("Ejecutando…");
      const inputs = $("#js-inputs").value.split("\n").filter((x, i, a) => !(i === a.length - 1 && x === ""));
      const r = await window.JSRunner.run(this.getCode(), { inputs, timeout: 3000 });
      $("#out").innerHTML = "";
      if (r.out) this.out(r.out);
      if (r.error) {
        const friendly = r.error.friendly && r.error.friendly !== r.error.message ? r.error.friendly + "\n(" + r.error.message + ")" : r.error.message;
        this.errMsg(friendly, r.error.line > 0 ? r.error.line : null);
      } else this.sysMsg("— Programa terminado —");
      this.setRunning(false);
    },
    next() { if (this.stepResolve) { const r = this.stepResolve; this.stepResolve = null; r(); } },
    cont() { this.stepping = false; $("#btn-next").hidden = true; $("#btn-cont").hidden = true; this.clearMark(); this.next(); },
    stop() {
      if (this.control) this.control.stop();
      if (this.readReject) { const r = this.readReject; this.readReject = null; $$("#out .in-row").forEach((x) => x.remove()); r(new Error("Ejecución detenida")); }
      this.next();
    },
    /* --- Retos --- */
    openEx(id) {
      const ex = EX[id];
      if (!ex) return;
      if (this.running) this.stop();
      ls.set(this.draftKey(), this.getCode());
      this.ex = ex;
      this.setLang(ex.lang, true);
      this.loadDraft();
      this.clearOut();
      $("#lab-results").innerHTML = "";
      this.renderChallenge();
      this.setRunning(false);
      this.sysMsg(ex.lang === "js" ? "Escribe tu solución. Ejecutar la prueba con las entradas del cuadro; Comprobar la verifica con las pruebas automáticas." : "Escribe tu solución. Ejecutar te deja probarla escribiendo tú los datos; Comprobar la verifica automáticamente.");
    },
    renderChallenge() {
      const ex = this.ex;
      const el = $("#lab-challenge");
      if (!ex) { el.innerHTML = ""; return; }
      const own = EX_OWNER[ex.id];
      const back = own.lesson ? `<a class="btn small" href="#${own.lesson}">← Lección ${lessonNum(own.lesson)}</a>` : `<a class="btn small" href="#examen-${own.exam}">← Examen</a>`;
      el.innerHTML = `<div class="card challenge">
        <div class="row" style="justify-content:space-between"><span class="eyebrow">${own.exam ? "Reto del examen" : "Reto"} · ${ex.lang === "js" ? "JavaScript" : "Pseudocódigo"}</span>${Store.s.ex[ex.id] ? `<span class="chip done">Resuelto</span>` : ""}</div>
        <h3>${esc(ex.title)}</h3><div class="text">${ex.text}</div>
        <div class="row">${back}<button class="btn small" data-act="hint">Ver pista</button><button class="btn small" data-act="solution">Ver solución</button><button class="btn small" data-act="reset-ex">Reiniciar código</button><button class="btn small ghost" data-act="leave-ex">Salir del reto</button></div>
        <div id="ex-extra"></div></div>`;
    },
    async check() {
      if (!this.ex || this.running) return;
      const ex = this.ex;
      const code = this.getCode();
      const box = $("#lab-results");
      box.innerHTML = `<div class="small muted">Comprobando…</div>`;
      this.clearMark();
      const results = [];
      if (ex.lang === "pseudo") {
        let prog;
        try { prog = window.Pseudo.parse(code); }
        catch (e) { box.innerHTML = ""; this.clearOut(); this.errMsg(e.message, e.line); return; }
        for (const t of ex.tests) {
          let out = "", err = null;
          const q = (t.in || []).slice();
          try {
            await window.Pseudo.run(prog, { write: (s, nl) => { out += s + (nl ? "\n" : ""); }, read: async () => (q.length ? q.shift() : null), clear: () => {} }, { maxSteps: 400000 });
          } catch (e) { err = (e.line ? "Línea " + e.line + ": " : "") + e.message; }
          results.push({ t, out, err, pass: !err && window.Checker.checkOutput(out, t.out, t) });
        }
      } else {
        for (const t of ex.tests) {
          const r = await window.JSRunner.run(code, { inputs: t.in || [], tests: t.expr ? [t] : [], timeout: 3000 });
          let pass = false, got = r.out, err = r.error ? (r.error.friendly || r.error.message) : null;
          if (!err) {
            if (t.expr) { const res = r.results && r.results[0]; if (res && res.ok) { pass = window.Checker.deepEqual(res.raw, t.expect); got = res.v; } else err = res ? res.e : "Sin resultado"; }
            else pass = window.Checker.checkOutput(r.out, t.out, t);
          }
          results.push({ t, out: got, err, pass });
        }
      }
      const all = results.every((r) => r.pass);
      const fmtExp = (t) => t.expr ? JSON.stringify(t.expect) : t.out;
      box.innerHTML = `<div class="results">${all ? `<div class="celebrate"><span>¡Reto superado! ${results.length}/${results.length} pruebas correctas.</span><span style="font-weight:400">${EX_OWNER[ex.id].exam ? "Completaste la parte práctica del examen." : "Sigue con el próximo reto o vuelve a la lección."}</span></div>` : `<div class="small"><b>${results.filter((r) => r.pass).length} de ${results.length}</b> pruebas correctas. Revisa las que fallaron:</div>`}
        ${results.map((r, i) => `<div class="res ${r.pass ? "pass" : "fail"}"><b>${r.pass ? "✓" : "✗"} Prueba ${i + 1}${r.t.in && r.t.in.length ? " · entradas: " + esc(r.t.in.join(", ")) : r.t.expr ? " · " + esc(r.t.expr) : ""}</b>${r.pass ? "" : `<div>Esperado${r.t.expr ? "" : (r.t.exact ? " (toda la salida)" : " (al final de la salida)")}:</div><pre>${esc(fmtExp(r.t))}</pre><div>${r.err ? "Error:" : "Tu programa mostró:"}</div><pre>${esc(r.err || (String(r.out).trim() || "(nada)"))}</pre>`}</div>`).join("")}</div>`;
      if (all) {
        const first = !Store.s.ex[ex.id];
        Store.s.ex[ex.id] = true;
        const own = EX_OWNER[ex.id];
        if (own.exam) { const e = Store.s.exams[own.exam] || (Store.s.exams[own.exam] = { quiz: 0, challenge: false }); e.challenge = true; }
        Store.touchDay(); Store.save();
        if (first) toast(own.exam && examPassed(own.exam) ? "¡Examen del módulo aprobado!" : "¡Reto resuelto!");
        this.renderChallenge();
      }
      box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },
    tutorPrompt(question) {
      const ex = this.ex;
      const lang = this.lang === "js" ? "JavaScript" : "pseudocódigo en español estilo PSeInt (asignación con <-, arreglos con índice base 0, bloques Si/FinSi, Mientras/FinMientras, Para/FinPara)";
      return TUTOR_RULES + "\n\nLa persona está en el Laboratorio escribiendo " + lang + "." +
        (ex ? "\n\nEstá resolviendo este reto:\nTítulo: " + ex.title + "\nEnunciado: " + ex.text.replace(/<[^>]+>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">") + "\nIMPORTANTE: no escribas la solución completa del reto. Explica qué falla o qué falta y da una pista concreta para el siguiente paso." : "") +
        "\n\nSu código:\n```\n" + this.getCode().slice(0, 6000) + "\n```" +
        (this.lastErr ? "\n\nError que mostró la última ejecución: " + this.lastErr : this.lastOut ? "\n\nSalida de la última ejecución:\n" + this.lastOut.slice(-1500) : "\n\nTodavía no lo ejecutó.") +
        (question ? "\n\nSu pregunta: " + question : "\n\nNo escribió una pregunta: revisa el código, di si ves errores (de sintaxis o de lógica) y explícalos de forma simple.") +
        "\n\nUsa bloques de código cortos solo si son imprescindibles.";
    },
  };

  function openSheet(title, html) {
    closeSheet();
    const bg = document.createElement("div");
    bg.className = "sheet-bg"; bg.id = "sheet";
    bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sheet-head"><h2 style="font-size:20px">${esc(title)}</h2><button class="btn small" data-act="close-sheet">Cerrar</button></div>${html}</div>`;
    bg.addEventListener("click", (e) => { if (e.target === bg) closeSheet(); });
    document.body.appendChild(bg);
  }
  function closeSheet() { const s = $("#sheet"); if (s) s.remove(); }
  function exPicker() {
    const groups = MODS.map((m) => {
      const items = [];
      for (const id of m.lessons) for (const ex of LESSONS[id].exercises) items.push(`<button class="pick" data-act="open-ex" data-ex="${ex.id}"><div><b>${esc(ex.title)}</b><span>Lección ${lessonNum(id)} · ${esc(LESSONS[id].title)}</span></div>${Store.s.ex[ex.id] ? `<span class="chip done">✓</span>` : ""}</button>`);
      if (m.exam && m.exam.challenge) items.push(`<button class="pick" data-act="open-ex" data-ex="${m.exam.challenge.id}"><div><b>${esc(m.exam.challenge.title)}</b><span>Examen del módulo ${m.n}</span></div>${Store.s.ex[m.exam.challenge.id] ? `<span class="chip done">✓</span>` : `<span class="chip warn">Examen</span>`}</button>`);
      return items.length ? `<div class="stack" style="gap:8px"><div class="eyebrow">Módulo ${m.n} · ${esc(m.title)}</div>${items.join("")}</div>` : "";
    }).join("");
    openSheet("Retos", groups);
  }
  function tplPicker() {
    openSheet("Plantillas", `<p class="muted small">Cargar una plantilla reemplaza el código del editor.</p>` + TEMPLATES[Lab.lang].map((t, i) => `<button class="pick" data-act="tpl" data-i="${i}"><div><b>${esc(t.name)}</b></div></button>`).join(""));
  }

  /* ================= Router ================= */
  const TABS = ["inicio", "lecciones", "lab", "machetes", "examenes"];
  function tabFor(r) {
    if (r === "lab") return "lab";
    if (/^l\d+$/.test(r) || r.startsWith("mod-")) return "lecciones";
    if (r === "machetes") return "machetes";
    if (r.startsWith("examen") || r === "repaso" || r === "certificado") return "examenes";
    if (TABS.includes(r)) return r;
    return "inicio";
  }
  function route() {
    const r = decodeURIComponent(location.hash.slice(1)) || "inicio";
    const tab = tabFor(r);
    $$(".tab").forEach((t) => t.toggleAttribute("aria-current", false));
    const cur = $(`.tab[data-tab="${tab}"]`);
    if (cur) cur.setAttribute("aria-current", "page");
    closeSheet();
    if (r === "lab") {
      main().hidden = true; $("#lab").hidden = false;
      if (!Lab.built) Lab.build();
      currentView = "lab";
      window.scrollTo(0, 0);
      return;
    }
    $("#lab").hidden = true; main().hidden = false;
    let html, after;
    if (/^l\d+$/.test(r) && LESSONS[r]) { html = viewLesson(r); after = () => mountLesson(r); }
    else if (r === "lecciones" || r.startsWith("mod-")) { html = viewLessons(); after = () => { if (r.startsWith("mod-")) { const el = document.getElementById(r); if (el) el.scrollIntoView(); } }; }
    else if (r === "machetes") html = viewCheats();
    else if (r === "examenes") html = viewExams();
    else if (r.startsWith("examen-") && r !== "examen-final") html = viewExam(r.slice(7));
    else if (r === "examen-final") html = viewFinal();
    else if (r === "certificado") html = viewCert();
    else if (r === "repaso") { html = viewReview(); after = startReview; }
    else html = viewHome();
    main().innerHTML = html;
    enhance(main());
    currentView = r;
    if (!r.startsWith("mod-")) window.scrollTo(0, 0);
    if (after) after();
  }
  function rerender() {
    if (currentView === "lab") { if (Lab.ex) Lab.renderChallenge(); return; }
    if (/^(inicio|lecciones|examenes|machetes)$/.test(currentView) || currentView === "") {
      const y = window.scrollY; route(); window.scrollTo(0, y);
    }
  }
  function go(h) { if (location.hash === "#" + h) route(); else location.hash = h; }

  /* ================= Acciones ================= */
  const ACT = {
    copy: (b) => copyText(decodeURIComponent(b.closest(".codeblock").dataset.src), b),
    try: (b) => {
      const cb = b.closest(".codeblock");
      const src = decodeURIComponent(cb.dataset.src), lang = cb.dataset.lang;
      if (!Lab.built) Lab.build();
      if (Lab.ex) { ls.set(Lab.draftKey(), Lab.getCode()); Lab.ex = null; Lab.renderChallenge(); }
      Lab.setLang(lang, true);
      Lab.setCode(src);
      Lab.saveDraft();
      go("lab");
      setTimeout(() => Lab.run(false), 60);
    },
    scroll: (b) => { const el = document.getElementById(b.dataset.to); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); },
    opt: (b) => { const z = QUIZ[b.dataset.quiz]; if (!z || z.graded) return; z.ans[Number(b.dataset.q)] = Number(b.dataset.o); renderQuiz(b.dataset.quiz); },
    grade: (b) => { const z = QUIZ[b.dataset.quiz]; if (!z) return; z.graded = true; renderQuiz(b.dataset.quiz); z.el.scrollIntoView({ behavior: "smooth", block: "start" }); },
    retry: (b) => {
      const z = QUIZ[b.dataset.quiz]; if (!z) return;
      if (b.dataset.quiz.startsWith("exam-")) return startExam(b.dataset.quiz.split("-")[1]);
      if (b.dataset.quiz.startsWith("final-")) return startFinal();
      if (b.dataset.quiz.startsWith("review-")) return startReview();
      z.ans = z.ans.map(() => null); z.graded = false; z.reported = false; renderQuiz(b.dataset.quiz);
      z.el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    "start-exam": (b) => startExam(b.dataset.mod),
    "start-final": () => startFinal(),
    "new-review": () => startReview(),
    "open-ex": (b) => { if (!Lab.built) Lab.build(); Lab.openEx(b.dataset.ex); closeSheet(); go("lab"); },
    lang: (b) => { if (Lab.ex && Lab.ex.lang !== b.dataset.lang) { ls.set(Lab.draftKey(), Lab.getCode()); Lab.ex = null; Lab.renderChallenge(); } Lab.setLang(b.dataset.lang); },
    run: () => Lab.run(false),
    step: () => Lab.run(true),
    next: () => Lab.next(),
    cont: () => Lab.cont(),
    stop: () => Lab.stop(),
    check: () => Lab.check(),
    clear: () => Lab.clearOut(),
    "pick-ex": () => exPicker(),
    "pick-tpl": () => tplPicker(),
    "close-sheet": () => closeSheet(),
    tpl: (b) => {
      if (Lab.ex) { ls.set(Lab.draftKey(), Lab.getCode()); Lab.ex = null; Lab.renderChallenge(); $("#btn-check").hidden = true; }
      Lab.setCode(TEMPLATES[Lab.lang][Number(b.dataset.i)].code); Lab.saveDraft(); Lab.clearOut(); closeSheet();
    },
    hint: () => { $("#ex-extra").innerHTML = `<div class="note note-idea"><b>Pista</b><div>${Lab.ex.hint}</div></div>`; },
    solution: (b) => {
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Tocar otra vez para ver"; setTimeout(() => { b.dataset.confirm = ""; b.textContent = "Ver solución"; }, 3500); return; }
      $("#ex-extra").innerHTML = `<div class="stack" style="gap:8px"><div class="note note-pro"><b>Una solución posible</b><div>Hay muchas formas correctas. Léela, entiéndela, y luego intenta escribirla tú sin mirar.</div></div>${codeBlock(Lab.ex.solution, Lab.ex.lang, false)}<div><button class="btn small" data-act="load-sol">Cargar en el editor</button></div></div>`;
    },
    "load-sol": () => { Lab.setCode(Lab.ex.solution); Lab.saveDraft(); toast("Solución cargada en el editor"); },
    "reset-ex": (b) => {
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "¿Seguro? Toca otra vez"; setTimeout(() => { b.dataset.confirm = ""; b.textContent = "Reiniciar código"; }, 3500); return; }
      Lab.setCode(Lab.ex.starter); Lab.saveDraft(); b.dataset.confirm = ""; b.textContent = "Reiniciar código";
    },
    "leave-ex": () => { ls.set(Lab.draftKey(), Lab.getCode()); Lab.ex = null; Lab.renderChallenge(); Lab.loadDraft(); Lab.clearOut(); $("#lab-results").innerHTML = ""; Lab.setRunning(false); },
    "ask-lab": (b) => askTutor(Lab.tutorPrompt($("#lab-q").value.trim()), $("#lab-answer"), b, $("#lab-stop")),
    "ask-lesson": (b) => {
      const q = $("#lesson-q").value.trim();
      if (!q) { toast("Escribe tu pregunta primero"); $("#lesson-q").focus(); return; }
      const l = LESSONS[b.dataset.id];
      const ctx = l.sections.map((s) => "- " + s.h + ": " + s.body.replace(/<div class="code"[^>]*><\/div>/g, " [ejemplo de código] ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 500)).join("\n");
      const prompt = TUTOR_RULES + "\n\nLa persona está leyendo la lección «" + l.title + "» (" + l.summary + ")." + (l.lang === "js" ? " El lenguaje es JavaScript." : " Se usa pseudocódigo en español estilo PSeInt (asignación con <-, arreglos con índice base 0).") + "\nContenido de la lección, resumido:\n" + ctx + "\n\nSu pregunta: " + q + "\n\nResponde la pregunta con un ejemplo pequeño si ayuda.";
      askTutor(prompt, $("#lesson-answer"), b, $("#lesson-stop"));
    },
  };

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const f = ACT[b.dataset.act];
    if (f) { if (b.tagName === "A" && b.getAttribute("href") && b.getAttribute("href").startsWith("javascript")) e.preventDefault(); f(b, e); }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.fill) { const z = QUIZ[t.dataset.fill]; if (z && !z.graded) { z.ans[Number(t.dataset.q)] = t.value; const btn = z.el.querySelector('[data-act="grade"]'); if (btn) btn.textContent = "Corregir (" + z.ans.filter((a) => a !== null && a !== "").length + "/" + z.qs.length + " respondidas)"; } }
    if (t.id === "cheat-search") {
      const q = strip(t.value.trim());
      let n = 0;
      $$("#cheat-list .cheat").forEach((d) => { const hit = !q || d.dataset.text.includes(q); d.hidden = !hit; if (hit) n++; if (q && hit) d.open = true; });
      $("#cheat-empty").hidden = n > 0;
    }
    if (t.id === "cert-input") { Store.s.name = t.value.slice(0, 60); $("#cert-name").textContent = Store.s.name || "Tu nombre"; clearTimeout(t._t); t._t = setTimeout(() => Store.save(), 600); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSheet();
    if (e.target.dataset && e.target.dataset.fill && e.key === "Enter") e.target.blur();
  });

  /* ================= Inicio ================= */
  function init() {
    $$(".tab").forEach((t) => { t.innerHTML = ICON[t.dataset.icon] + `<span>${t.dataset.label}</span>`; });
    Store.load();
    setSync();
    window.addEventListener("hashchange", route);
    route();
    Store.connect();
    if (window.claude && window.claude.use) {
      window.claude.use("sample").then((s) => {
        if (!s) return;
        sampleFn = s;
        $$(".tutor-wrap").forEach((el) => (el.hidden = false));
      }).catch(() => {});
    }
  }
  init();
})();

/* Genera la app en un único archivo HTML.
   - dist/app.html: contenido para publicar como Artifact (sin <html>/<head>/<body>).
   - dist/index.html: documento completo, para abrir localmente o en GitHub Pages.
   Uso: node tools/build.js */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const src = (p) => fs.readFileSync(path.join(root, "src", p), "utf8");

const scripts = ["pseudo.js", "checker.js", "jsrunner.js", "content/base.js", "content/m1.js", "content/m2.js", "content/m3.js", "content/m4.js", "content/m5.js", "app.js"];
const js = scripts.map((f) => `<script>\n/* ${f} */\n${src(f).replace(/<\/script/gi, "<\\/script")}\n</script>`).join("\n");
const page = src("index.html").replace("/*STYLE*/", () => src("styles.css")).replace("<!--SCRIPTS-->", () => js);

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist", "app.html"), page);
const full = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#10191f">
</head>
<body style="margin:0">
${page}
</body>
</html>
`;
fs.writeFileSync(path.join(root, "dist", "index.html"), full);
console.log("dist/app.html", (Buffer.byteLength(page) / 1024).toFixed(0) + " KB");

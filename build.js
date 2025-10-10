const { execSync } = require("child_process");

console.log("🧱 Iniciando build do frontend...");

try {
  execSync("cd frontend && npm install && npm run build", { stdio: "inherit" });
  console.log("✅ Build do frontend concluído!");
} catch (err) {
  console.error("❌ Erro ao construir o frontend:", err);
  process.exit(1);
}

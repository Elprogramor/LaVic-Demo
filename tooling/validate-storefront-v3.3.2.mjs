import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const storefront = path.join(root, "apps", "storefront");
const publicDir = path.join(storefront, "public");

let failed = false;
const pass = (message) => console.log(`[PASS] ${message}`);
const fail = (message) => {
  failed = true;
  console.error(`[FAIL] ${message}`);
};

const requiredAssets = [
  "brand/icon.png",
  "brand/logo.png",
  "flavors/ginger-lime.png",
  "flavors/green-grape.png",
  "flavors/lime.png",
  "flavors/passion-fruit.png",
  "flavors/red-fruits.png",
  "flavors/strawberry.png",
  "home/francis-avatar.png",
  "home/lime.png",
  "home/sparkling.png",
  "kits/discovery.webp",
  "kits/summer.webp",
  "media/lavic-loader.mp4",
  "products/lavic-espumante-composition.jpg",
  "products/lavic-espumante-cutout.png",
  "products/lavic-limao-composition.jpg",
  "products/lavic-limao-cutout.png",
  "products/lavic-morango-cutout.png",
];

for (const relative of requiredAssets) {
  const file = path.join(publicDir, relative);
  if (fs.existsSync(file)) pass(`public/${relative}`);
  else fail(`Asset ausente: apps/storefront/public/${relative}`);
}

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".json"]);
const assetPattern = /["'`](\/[^"'`\s?#]+\.(?:png|jpe?g|webp|gif|svg|mp4|webm|ico))["'`]/gi;
const dangling = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["public", "node_modules", ".next"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(absolute);
      continue;
    }
    if (!sourceExtensions.has(path.extname(entry.name))) continue;

    const source = fs.readFileSync(absolute, "utf8");
    for (const match of source.matchAll(assetPattern)) {
      const publicPath = match[1];
      const asset = path.join(publicDir, publicPath.slice(1));
      if (!fs.existsSync(asset)) {
        dangling.push({
          file: path.relative(storefront, absolute).replaceAll("\\", "/"),
          publicPath,
        });
      }
    }
  }
}

if (!fs.existsSync(storefront)) {
  fail("apps/storefront não encontrado.");
} else {
  walk(storefront);
}

if (dangling.length === 0) {
  pass("Todas as referências estáticas de assets apontam para arquivos existentes em public/.");
} else {
  for (const item of dangling) fail(`${item.file} referencia asset inexistente: ${item.publicPath}`);
}

const forbiddenRefs = [
  "/products/three-lime-bottles.png",
  "/products/lavic-limao-photo.png",
  "/home/lifestyle-01.png",
];

const keyFiles = [
  "components/sections/home-page.tsx",
  "app/sobre/page.tsx",
];

for (const relative of keyFiles) {
  const file = path.join(storefront, relative);
  if (!fs.existsSync(file)) {
    fail(`Arquivo não encontrado: apps/storefront/${relative}`);
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  const stale = forbiddenRefs.filter((ref) => source.includes(ref));
  if (stale.length === 0) pass(`${relative} sem referências antigas removidas do public.`);
  else fail(`${relative} ainda contém: ${stale.join(", ")}`);
}

if (failed) {
  console.error("\nVALIDAÇÃO V3.3.2 FALHOU.");
  console.error("O código ainda não está coeso com a pasta apps/storefront/public atual.");
  process.exit(1);
}

console.log("\nVALIDAÇÃO V3.3.2 PASSOU.");
console.log("Código e public estão coesos para os assets estáticos verificados.");

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const storefront = path.join(root, "apps", "storefront");

const expectedRefs = [
  ["components/sections/home-page.tsx", "/flavors/passion-fruit.png"],
  ["components/sections/home-page.tsx", "/flavors/green-grape.png"],
  ["data/products.ts", "/flavors/passion-fruit.png"],
  ["data/products.ts", "/flavors/ginger-lime.png"],
  ["app/sobre/page.tsx", "/home/lifestyle-01.webp"],
];

const expectedAssets = [
  "public/flavors/lime.png",
  "public/flavors/passion-fruit.png",
  "public/flavors/green-grape.png",
  "public/flavors/ginger-lime.png",
  "public/home/lifestyle-01.webp",
];

let failed = false;
function pass(message) { console.log(`[PASS] ${message}`); }
function fail(message) { failed = true; console.error(`[FAIL] ${message}`); }

for (const [relative, ref] of expectedRefs) {
  const file = path.join(storefront, relative);
  if (!fs.existsSync(file)) {
    fail(`Arquivo não encontrado: apps/storefront/${relative}`);
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  if (source.includes(ref)) pass(`${relative} -> ${ref}`);
  else fail(`Referência PNG ausente em ${relative}: ${ref}`);
}

for (const relative of expectedAssets) {
  const file = path.join(storefront, relative);
  if (fs.existsSync(file)) pass(`Asset encontrado: apps/storefront/${relative}`);
  else fail(`Asset PNG ausente: apps/storefront/${relative}`);
}

const runtimeFiles = [
  "components/sections/home-page.tsx",
  "data/products.ts",
  "app/sobre/page.tsx",
];
for (const relative of runtimeFiles) {
  const source = fs.readFileSync(path.join(storefront, relative), "utf8");
  const stale = source.match(/(?:passion-fruit|green-grape|ginger-lime|lifestyle-01)\.webp/g) ?? [];
  if (stale.length === 0) pass(`Sem referência WEBP antiga em ${relative}`);
  else fail(`Referência WEBP antiga em ${relative}: ${stale.join(", ")}`);
}

if (failed) {
  console.error("\nVALIDAÇÃO V3.3.1 FALHOU.");
  console.error("Confirme que você renomeou/converteu os quatro arquivos físicos para .png antes de rodar novamente.");
  process.exit(1);
}

console.log("\nVALIDAÇÃO V3.3.1 PASSOU.");


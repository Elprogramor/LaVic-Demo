import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
let failed = false;
const pass = (message) => console.log(`PASS: ${message}`);
const fail = (message) => { failed = true; console.error(`FAIL: ${message}`); };

const required = [
  "apps/storefront/components/sections/home-page.tsx",
  "apps/storefront/components/layout/site-footer.tsx",
  "apps/storefront/styles/pages.css",
  "apps/storefront/styles/components.css",
  "apps/storefront/public/home/francis-avatar.png",
  "apps/storefront/components/layout/site-header.tsx",
];

for (const rel of required) {
  const target = path.join(root, rel);
  if (!fs.existsSync(target) || fs.statSync(target).size === 0) fail(`${rel} ausente ou vazio`);
  else pass(`${rel} presente`);
}

const homePath = path.join(root, "apps/storefront/components/sections/home-page.tsx");
const footerPath = path.join(root, "apps/storefront/components/layout/site-footer.tsx");
const pagesPath = path.join(root, "apps/storefront/styles/pages.css");
const componentsPath = path.join(root, "apps/storefront/styles/components.css");
const headerPath = path.join(root, "apps/storefront/components/layout/site-header.tsx");

if (required.every((rel) => fs.existsSync(path.join(root, rel)))) {
  const home = fs.readFileSync(homePath, "utf8");
  const footer = fs.readFileSync(footerPath, "utf8");
  const pages = fs.readFileSync(pagesPath, "utf8");
  const components = fs.readFileSync(componentsPath, "utf8");
  const header = fs.readFileSync(headerPath);

  const headerHash = crypto.createHash("sha256").update(header).digest("hex");
  const expectedHeaderHash = "9417b357231b4b9fb0a9817cd7cf047a6d5bf95fc4b3887aba48513cb9bdb556";
  if (headerHash !== expectedHeaderHash) fail(`site-header.tsx divergiu da v3 congelada: ${headerHash}`);
  else pass("header congelado permanece idêntico à v3");

  const heroChecks = [
    ['<section className="home-hero">', "estrutura do hero preservada"],
    ['<OutlineWord className="home-hero-word">KOMBUCHA</OutlineWord>', "wordmark KOMBUCHA preservado"],
    ['top: 254px;', "posição do KOMBUCHA preservada"],
    ['font-size: 234px;', "escala do KOMBUCHA preservada"],
    ['top: 185px;', "posição base da garrafa preservada"],
    ['width: 457px;', "largura base da garrafa preservada"],
    ['top: 426px;', "fade base preservado"],
    ['height: 430px;', "altura do fade preservada"],
  ];
  for (const [needle, label] of heroChecks) {
    if (!(home + pages).includes(needle)) fail(label); else pass(label);
  }

  const figmaSections = [
    "home-flavor-grid",
    "home-rhythm-stack-card",
    "home-sparkling-purchase",
    "home-trust-grid",
    "home-b2b-bottle--large",
    "home-b2b-bottle--small",
  ];
  for (const cls of figmaSections) {
    if (!home.includes(cls) && !pages.includes(`.${cls}`)) fail(`${cls} ausente`);
    else pass(`${cls} presente`);
  }

  if (home.includes("ProductGrid")) fail("home ainda usa ProductGrid genérico em vez do rail do Figma");
  else pass("home não usa ProductGrid genérico");

  if (!footer.includes("Subscribe Us")) fail("headline do footer não acompanha a referência do Figma");
  else pass("footer recupera composição Subscribe Us");

  if (!components.includes("grid-template-columns: 1.1fr .9fr")) fail("footer grid Figma-style ausente");
  else pass("footer grid Figma-style presente");

  for (const [fileName, source] of [["pages.css", pages], ["components.css", components]]) {
    const opens = (source.match(/{/g) ?? []).length;
    const closes = (source.match(/}/g) ?? []).length;
    if (opens !== closes) fail(`${fileName} desbalanceado: ${opens} vs ${closes}`);
    else pass(`${fileName} balanceado`);
  }

  const forbidden = /f13-|f14-|f16-|f17-|home-figma-v/i;
  if (forbidden.test(home + footer + pages + components)) fail("legado versionado reintroduzido no storefront limpo");
  else pass("sem classes/componentes legados versionados");

  if (/https:\/\/www\.figma\.com\/api\/mcp\/asset/i.test(home + footer + pages + components)) fail("URL temporária do Figma encontrada");
  else pass("sem URLs temporárias do Figma");

  if (/dangerouslySetInnerHTML/.test(home + footer)) fail("dangerouslySetInnerHTML encontrado");
  else pass("sem dangerouslySetInnerHTML");
}

if (failed) process.exit(1);
console.log("\nVALIDAÇÃO ESTÁTICA STOREFRONT V3.1: PASS");

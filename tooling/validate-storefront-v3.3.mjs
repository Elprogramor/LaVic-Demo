import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
let failed = false;
const pass = (message) => console.log(`PASS: ${message}`);
const fail = (message) => { failed = true; console.error(`FAIL: ${message}`); };

const required = [
  'apps/storefront/app/layout.tsx',
  'apps/storefront/components/layout/site-loader.tsx',
  'apps/storefront/styles/components.css',
  'apps/storefront/public/media/lavic-loader.mp4',
  'apps/storefront/components/layout/site-header.tsx',
  'apps/storefront/components/sections/home-page.tsx',
];

for (const rel of required) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) fail(`${rel} ausente ou vazio`);
  else pass(`${rel} presente`);
}

const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const sha256 = (rel) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');

if (required.every((rel) => fs.existsSync(path.join(root, rel)))) {
  const layout = read('apps/storefront/app/layout.tsx');
  const loader = read('apps/storefront/components/layout/site-loader.tsx');
  const css = read('apps/storefront/styles/components.css');

  const checks = [
    [layout.includes('import { SiteLoader } from "@/components/layout/site-loader";'), 'layout importa SiteLoader'],
    [layout.includes('<SiteLoader />'), 'SiteLoader montado antes do storefront'],
    [layout.includes('className="site-reveal-shell"'), 'shell de reveal presente'],
    [loader.includes('REFRESH_PREVIEW_MS = 600'), 'preview de refresh em 600 ms'],
    [loader.includes('FINAL_HOLD_MS = 160'), 'hold final de 160 ms'],
    [loader.includes('REVEAL_MS = 780'), 'crossfade de 780 ms'],
    [loader.includes('window.location.hash === "#intro"'), 'replay forçado por #intro presente'],
    [loader.includes('/media/lavic-loader.mp4'), 'MP4 oficial referenciado'],
    [css.includes('background: #02535c;'), 'fundo teal histórico restaurado'],
    [css.includes('opacity: .74;'), 'estado inicial do storefront restaurado'],
    [css.includes('filter: blur(5px);'), 'blur inicial restaurado'],
    [css.includes('transform: scale(.992);'), 'escala inicial restaurada'],
  ];
  for (const [ok, label] of checks) ok ? pass(label) : fail(label);

  const mediaHash = sha256('apps/storefront/public/media/lavic-loader.mp4');
  const expectedMediaHash = '08c536f893cc0fd7cf6affa70dea9adc76ed305a602310182798015af5e17787';
  if (mediaHash === expectedMediaHash) pass('MP4 corresponde exatamente ao arquivo enviado pelo usuário');
  else fail(`hash inesperado para lavic-loader.mp4: ${mediaHash}`);

  const frozen = [
    ['apps/storefront/components/layout/site-header.tsx', '7a574df691e4ecb352c61824dda693936f480a4181b60e9fad65c6a4faa5250a', 'header v3.2 congelado'],
    ['apps/storefront/components/sections/home-page.tsx', 'be22ba60ab23f9ad4f726e0a67fcd7851ca20c69bf2b35f5fde0c008cb520878', 'home/hero v3.2 congelados'],
  ];
  for (const [rel, expected, label] of frozen) {
    const actual = sha256(rel);
    if (actual === expected) pass(label);
    else fail(`${label} foi alterado (${actual})`);
  }

  for (const [name, source] of [['layout.tsx', layout], ['site-loader.tsx', loader]]) {
    for (const [open, close] of [['(', ')'], ['[', ']'], ['{', '}']]) {
      const a = source.split(open).length - 1;
      const b = source.split(close).length - 1;
      if (a !== b) fail(`${name} desbalanceado em ${open}${close}: ${a}/${b}`);
    }
    pass(`${name} estrutura básica balanceada`);
  }

  const opens = (css.match(/{/g) ?? []).length;
  const closes = (css.match(/}/g) ?? []).length;
  if (opens === closes) pass('CSS balanceado'); else fail(`CSS desbalanceado: ${opens}/${closes}`);

  const adminInPatch = fs.existsSync(path.join(root, 'apps/admin')) && process.env.LAVIC_INCREMENTAL_PATCH === '1';
  if (adminInPatch) fail('patch incremental não deve alterar apps/admin');
}

if (failed) process.exit(1);
console.log('\nVALIDAÇÃO ESTÁTICA STOREFRONT V3.3: PASS');

# LaVic Storefront v3.3 — Branded Loader Restoration

## Objetivo
Restaurar a animação de abertura que existia antes da reconstrução limpa da v3, sem alterar o design aprovado do storefront.

## Fonte restaurada
A implementação foi reconstruída a partir do comportamento aprovado na linha antiga v0.2.10 (crossfade) e usa o arquivo `lavic-loader.mp4` enviado pelo usuário.

## Comportamento
- primeira visita da sessão: toca a animação completa;
- refresh na mesma sessão: preview de 600 ms;
- hold final: 160 ms;
- crossfade: 780 ms;
- página permanece montada atrás do loader;
- durante o reveal: opacity .74 → 1, blur 5px → 0, scale .992 → 1;
- `/#intro` ou `/#intro=1` força replay completo para teste;
- timeout de proteção de 10 s caso o vídeo não consiga iniciar.

## Guardrails
- header da v3.2 preservado por SHA-256;
- home/hero da v3.2 preservados por SHA-256;
- nenhum arquivo do admin faz parte do patch incremental;
- MP4 validado por SHA-256 contra o arquivo enviado.

## Arquivos alterados/novos
- `apps/storefront/app/layout.tsx`
- `apps/storefront/components/layout/site-loader.tsx`
- `apps/storefront/styles/components.css`
- `apps/storefront/public/media/lavic-loader.mp4`
- `tooling/validate-storefront-v3.3.mjs`
- `VALIDAR_STOREFRONT_V3_3.cmd`

## Aplicação
Aplicar sobre a v3.2 (ou sobre a base v3 compatível com a mesma estrutura) e executar `VALIDAR_STOREFRONT_V3_3.cmd`.

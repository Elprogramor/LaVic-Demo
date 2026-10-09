# LaVic Storefront v3.3.2 — Public Asset Cohesion

Esta correção alinha o código com a pasta `apps/storefront/public` enviada pelo usuário.

## Corrigido
- Remove referência inexistente a `/products/three-lime-bottles.png`.
- Remove referência inexistente a `/products/lavic-limao-photo.png`.
- Remove referência inexistente a `/home/lifestyle-01.png`.
- Reutiliza somente assets que existem no `public` atual.
- Preserva o loader `/media/lavic-loader.mp4`.
- Preserva logo, ícone, Francis, produtos e composições oficiais existentes.

## Substituições
- Hero mini + destaque Limão: `/products/lavic-limao-cutout.png`.
- Miniatura complementar do Espumante: `/products/lavic-limao-composition.jpg`.
- Visual editorial da página Sobre: `/products/lavic-limao-composition.jpg`.

## Validação
Execute:

```bat
VALIDAR_STOREFRONT_V3_3_2.cmd
```

O validador percorre as referências estáticas de imagem/vídeo do storefront e confirma que cada arquivo referenciado realmente existe em `apps/storefront/public`.

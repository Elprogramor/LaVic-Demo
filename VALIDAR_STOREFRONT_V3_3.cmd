@echo off
setlocal
node tooling\validate-storefront-v3.3.mjs || exit /b 1
call npm run typecheck -w @lavic/storefront || exit /b 1
call npm run build -w @lavic/storefront || exit /b 1
echo.
echo STOREFRONT V3.3 VALIDADA COM SUCESSO.

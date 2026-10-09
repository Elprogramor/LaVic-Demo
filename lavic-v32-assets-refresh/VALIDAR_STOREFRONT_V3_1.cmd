@echo off
setlocal
node tooling/validate-storefront-v3.1.mjs || exit /b 1
call npm run typecheck -w @lavic/storefront || exit /b 1
call npm run build -w @lavic/storefront || exit /b 1
echo.
echo LAVIC STOREFRONT V3.1 VALIDADO COM SUCESSO.

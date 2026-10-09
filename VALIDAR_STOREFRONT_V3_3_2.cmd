@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo LaVic Storefront v3.3.2 - Public asset cohesion
echo ================================================
node tooling\validate-storefront-v3.3.2.mjs
if errorlevel 1 (
  echo.
  echo VALIDACAO FALHOU.
  exit /b 1
)
echo.
echo Validacao concluida com sucesso.
endlocal

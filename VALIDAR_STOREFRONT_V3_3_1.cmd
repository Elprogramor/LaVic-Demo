@echo off
setlocal
cd /d "%~dp0"
echo ==============================================
echo LaVic Storefront v3.3.1 - PNG asset paths
echo ==============================================
node tooling\validate-storefront-v3.3.1.mjs
if errorlevel 1 (
  echo.
  echo VALIDACAO FALHOU.
  exit /b 1
)
echo.
echo Validacao concluida com sucesso.
endlocal

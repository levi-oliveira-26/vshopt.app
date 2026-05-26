# ========================================
# VSHOPT - Script de Inicialização (Windows)
# ========================================
# Este script ajuda a inicializar e rodar o projeto no Windows

@echo off
echo.
echo ========================================
echo VSHOPT - Loja Digital de Producao Musical
echo ========================================
echo.

REM Verificar se Maven está instalado
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Maven nao encontrado. Instale Maven primeiro.
    pause
    exit /b 1
)

echo [OK] Maven encontrado
echo.

REM Menu de opcoes
echo Escolha uma opcao:
echo 1 - Compilar projeto (mvn clean package)
echo 2 - Rodar projeto (mvn spring-boot:run)
echo 3 - Limpar e compilar
echo 4 - Sair
echo.

set /p opcao="Digite a opcao (1-4): "

if "%opcao%"=="1" (
    echo.
    echo Compilando projeto...
    mvn clean package
    echo.
    echo Compilacao concluida!
    pause
) else if "%opcao%"=="2" (
    echo.
    echo Iniciando aplicacao...
    echo Por favor aguarde...
    echo.
    mvn spring-boot:run
) else if "%opcao%"=="3" (
    echo.
    echo Limpando e compilando...
    mvn clean compile
    echo.
    echo Pronto para rodar!
    pause
) else if "%opcao%"=="4" (
    echo Ate logo!
    exit /b 0
) else (
    echo Opcao invalida
    pause
    exit /b 1
)

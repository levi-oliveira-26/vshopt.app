#!/bin/bash

# ========================================
# VSHOPT - Script de Inicialização
# ========================================
# Este script ajuda a inicializar e rodar o projeto

echo "VSHOPT - Loja Digital de Produção Musical"
echo "=============================================="
echo ""

# Verificar se Maven está instalado
if ! command -v mvn &> /dev/null; then
    echo "Maven não encontrado. Por favor, instale Maven."
    exit 1
fi

echo "Maven encontrado"
echo ""

# Menu de opções
echo "Escolha uma opção:"
echo "1) Compilar projeto (mvn clean package)"
echo "2) Rodar projeto (mvn spring-boot:run)"
echo "3) Limpar e compilar"
echo "4) Ver estrutura de arquivos"
echo "5) Sair"
echo ""

read -p "Digite a opção (1-5): " opcao

case $opcao in
    1)
        echo "Compilando projeto..."
        mvn clean package
        echo "Compilação concluída!"
        ;;
    2)
        echo "Iniciando aplicação..."
        mvn spring-boot:run
        ;;
    3)
        echo "Limpando e compilando..."
        mvn clean compile
        echo "Pronto para rodar!"
        ;;
    4)
        echo "Estrutura de arquivos:"
        tree -L 3 src/
        ;;
    5)
        echo "Até logo!"
        exit 0
        ;;
    *)
        echo "Opção inválida"
        exit 1
        ;;
esac

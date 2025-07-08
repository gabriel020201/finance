#!/bin/bash

echo "🚀 Iniciando Finance Management System..."
echo

echo "📦 Instalando dependências..."
npm run install:all

echo
echo "🔧 Configurando ambiente..."
npm run setup

echo
echo "✅ Setup concluído!"
echo
echo "💡 Para executar o projeto:"
echo "   Backend: npm run dev:backend"
echo "   Frontend: npm run dev:frontend"
echo
echo "📊 URLs:"
echo "   Backend: http://localhost:3000"
echo "   Frontend: http://localhost:3001"
echo

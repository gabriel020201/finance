#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando setup do Finance Management System...\n');

// Função para executar comandos
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`📦 Executando: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    console.log('✅ Comando executado com sucesso!\n');
  } catch (error) {
    console.error(`❌ Erro ao executar: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Função para copiar arquivo
function copyFile(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      console.log(`📄 Arquivo copiado: ${dest}`);
    } else {
      console.log(`📄 Arquivo já existe: ${dest}`);
    }
  } catch (error) {
    console.error(`❌ Erro ao copiar arquivo: ${src} -> ${dest}`);
    console.error(error.message);
  }
}

// Verificar se está na pasta raiz do projeto
const projectRoot = process.cwd();
const serverPath = path.join(projectRoot, 'server');
const webPath = path.join(projectRoot, 'web');

if (!fs.existsSync(serverPath) || !fs.existsSync(webPath)) {
  console.error('❌ Por favor, execute este script na pasta raiz do projeto (finance-main)');
  process.exit(1);
}

console.log('🔧 Configurando Backend...');
process.chdir(serverPath);

// Instalar dependências do backend
runCommand('npm install');

// Copiar arquivo .env
copyFile('.env.example', '.env');

// Gerar cliente Prisma
runCommand('npx prisma generate');

// Executar migrações
runCommand('npx prisma migrate dev');

// Popular banco de dados
runCommand('npm run seed');

console.log('🎨 Configurando Frontend...');
process.chdir(webPath);

// Instalar dependências do frontend
runCommand('npm install');

// Voltar para a pasta raiz
process.chdir(projectRoot);

console.log('✅ Setup concluído com sucesso!');
console.log('\n🚀 Para executar o projeto:');
console.log('📘 Backend: cd server && npm run dev');
console.log('🎨 Frontend: cd web && npm run dev');
console.log('\n📊 URLs:');
console.log('🔗 Backend: http://localhost:3000');
console.log('🔗 Frontend: http://localhost:3001');
console.log('\n💡 Dica: Execute ambos os comandos em terminais separados');

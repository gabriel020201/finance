# Finance Management System

Um sistema completo de gerenciamento financeiro com backend em Node.js/TypeScript e frontend em Next.js.

## 🏗️ Estrutura do Projeto

```
finance-main/
├── server/          # Backend (Node.js + TypeScript + Fastify + Prisma)
├── web/             # Frontend (Next.js + React + TypeScript)
```

## 🚀 Tecnologias

### Backend
- Node.js
- TypeScript
- Fastify
- Prisma ORM
- SQLite

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação Rápida

### Método 1: Setup Automático (Recomendado)

**Windows:**
```bash
# Duplo clique no arquivo start.bat ou execute:
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### Método 2: Setup Manual

#### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd finance-main
```

#### 2. Instale dependências de todos os projetos
```bash
npm run install:all
```

#### 3. Configure o ambiente
```bash
npm run setup
```

#### 4. Execute o projeto
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

### Método 3: Configuração Individual

#### Backend
```bash
cd server
npm install
cp .env.example .env
npm run setup
npm run dev
```

#### Frontend
```bash
cd web
npm install
npm run dev
```

## 🎯 URLs de Acesso

- **Backend:** http://localhost:3000
- **Frontend:** http://localhost:3001

## 📊 Funcionalidades

### ✅ Implementadas
- Gerenciamento de categorias
- Gerenciamento de bancos
- Gerenciamento de transações
- API REST completa
- Interface web responsiva

### 🔄 Em Desenvolvimento
- Autenticação de usuários
- Relatórios financeiros
- Gráficos e análises
- Exportação de dados

## 🚀 Scripts Úteis

### Scripts Globais (pasta raiz)
```bash
npm run setup           # Configuração completa automática
npm run install:all     # Instala dependências de todos os projetos
npm run dev:backend     # Inicia backend
npm run dev:frontend    # Inicia frontend
npm run seed           # Popular banco com dados
npm run db:studio      # Interface do banco
npm run db:reset       # Resetar banco
```

### Backend (pasta `server/`)
```bash
npm run dev          # Servidor em desenvolvimento
npm run setup        # Configuração completa
npm run seed         # Popular banco com dados
npm run db:studio    # Interface do banco
npm run db:reset     # Resetar banco
npm test             # Rodar teste api
```

### Frontend (pasta `web/`)
```bash
npm run dev          # Servidor em desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
```

## 📚 Documentação

- [Backend README](./server/README.md) - Documentação completa da API
- [Frontend README](./web/README.md) - Documentação do frontend

## 🐛 Troubleshooting

### Problema: Servidor não inicia
1. Verifique se o Node.js está instalado
2. Execute `npm install` nas pastas `server` e `web`
3. Verifique se as portas 3000 e 3001 estão disponíveis

### Problema: Banco de dados
1. Execute `cd server && npm run db:reset`
2. Se persistir, delete o arquivo `server/dev.db` e execute `npm run setup`

### Problema: Dependências
1. Delete `node_modules` e `package-lock.json`
2. Execute `npm install` novamente

## 📄 Licença

ISC - Gabriel Ribeiro Vitor

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

Gabriel Ribeiro Vitor - [gutorico29@gmail.com]

Link do projeto: [https://github.com/gabriel020201/finance]

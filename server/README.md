# Finance Backend

Este é o backend do sistema de gerenciamento financeiro construído com Node.js, TypeScript, Fastify e Prisma.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- SQLite
- TSX (TypeScript execution)

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/gabriel020201/finance.git
cd finance-main/server
```

### 2. Instale as dependências
```bash
npm install
ou
npm i
```

### 3. Configure o ambiente
```bash
# Crie o arquivo .env e cole o seguinte texto
DATABASE_URL="file:./dev.db"
```

### 4. Configure o banco de dados
```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev

# Popular o banco com dados de exemplo
npm run seed
```

### 5. Execute o servidor
```bash
npm run dev
```

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm run start` - Inicia o servidor em modo produção
- `npm run setup` - Instala dependências e configura o banco de dados
- `npm run seed` - Popular o banco de dados com dados de exemplo
- `npm run db:migrate` - Executa as migrações do banco de dados
- `npm run db:generate` - Gera o cliente Prisma
- `npm run db:studio` - Abre o Prisma Studio (interface gráfica do banco)
- `npm run db:reset` - Reseta o banco de dados e executa o seed
- `npm test` - Roda um teste da Api verificando as funções do CRUD

## 📊 Estrutura do Banco de Dados

O projeto utiliza as seguintes tabelas:

- **Categories** - Categorias das transações (Alimentação, Transporte, etc.)
- **Banks** - Bancos (Itaú, Nubank, Santander, etc.)
- **Transactions** - Transações financeiras

## 🔗 Endpoints da API

### Categorias
- `GET /categories` - Lista todas as categorias
- `POST /categories` - Cria uma nova categoria
- `GET /categories/:id` - Busca categoria por ID

### Bancos
- `GET /banks` - Lista todos os bancos
- `POST /banks` - Cria um novo banco
- `GET /banks/:id` - Busca banco por ID

### Transações
- `GET /transactions` - Lista todas as transações
- `POST /transactions` - Cria uma nova transação
- `GET /transactions/:id` - Busca transação por ID
- `GET /transactions/category/:categoryId` - Busca transações por categoria
- `GET /transactions/bank/:bankId` - Busca transações por banco

## 🌐 Servidor

O servidor roda por padrão em:
- **Local:** http://localhost:3000
- **Rede:** http://[seu-ip]:3000

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL="file:./dev.db"
```

## 🧪 Dados de Exemplo

O script de seed cria:
- 8 categorias (Alimentação, Saúde, Transporte, etc.)
- 5 bancos (Itaú, Nubank, Santander, etc.)
- 10 transações de exemplo

## 📚 Prisma Studio

Para visualizar e editar os dados do banco:

```bash
npm run db:studio
```

Isso abrirá uma interface web em http://localhost:5555

## 🔄 Resetar o Banco

Para resetar completamente o banco de dados:

```bash
npm run db:reset
```

## 🐛 Troubleshooting

### Erro de banco de dados
Se você encontrar erros relacionados ao banco de dados:

1. Delete o arquivo `dev.db`
2. Execute `npm run db:migrate`
3. Execute `npm run seed`

### Erro de permissão
Se encontrar erros de permissão no Windows:

1. Execute o terminal como administrador
2. Ou use o PowerShell: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

## 📄 Licença

ISC - Gabriel Ribeiro Vitor

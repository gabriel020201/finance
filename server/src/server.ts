import { fastify } from './fastify.js';
import { categoriesRoutes } from './routes/categories-route.js';
import { banksRoutes } from './routes/banks-routes.js';
import { transactionsRoutes } from './routes/transactions-routes.js';
import { CategoryRepositoryPrisma } from './repositories/category-repository-prisma.js';
import { BankRepositoryPrisma } from './repositories/bank-repository-prisma.js';
import { TransactionRepositoryPrisma } from './repositories/transaction-repository-prisma.js';

// Instanciar repositórios Prisma
const categoryRepository = new CategoryRepositoryPrisma();
const bankRepository = new BankRepositoryPrisma();
const transactionRepository = new TransactionRepositoryPrisma();

// Registrar rotas passando os repositórios
await fastify.register(categoriesRoutes, { categoryRepository });
await fastify.register(banksRoutes, { bankRepository });
await fastify.register(transactionsRoutes, { transactionRepository });

// Iniciar servidor
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
  console.log('🚀 Server rodando em http://localhost:3000');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}


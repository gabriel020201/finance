import { fastify } from './fastify.js';
import { categoriesRoutes } from './routes/categories-route.js';
import { banksRoutes } from './routes/banks-routes.js';
import { transactionsRoutes } from './routes/transactions-routes.js';

// Registrar rotas
await fastify.register(categoriesRoutes);
await fastify.register(banksRoutes);
await fastify.register(transactionsRoutes);

// Iniciar servidor
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
  console.log('🚀 Server rodando em http://localhost:3000');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}


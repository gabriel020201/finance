import { FastifyInstance } from "fastify";
import { TransactionsController } from "../controllers/transactions-controller.js";
import { TransactionRepositoryPrisma } from "../repositories/transaction-repository-prisma.js";

export async function transactionsRoutes(fastify: FastifyInstance) {
  const transactionRepository = new TransactionRepositoryPrisma();
  const transactionsController = new TransactionsController(transactionRepository);

  fastify.post('/transactions', (request, reply) => transactionsController.create(request, reply));
  fastify.get('/transactions', (request, reply) => transactionsController.index(request, reply));
  fastify.get('/transactions/:id', (request, reply) => transactionsController.show(request, reply));
  fastify.get('/transactions/category/:categoryId', (request, reply) => transactionsController.findByCategory(request, reply));
  fastify.patch('/transactions/:id', (request, reply) => transactionsController.update(request, reply));
  fastify.delete('/transactions/:id', (request, reply) => transactionsController.delete(request, reply));
}
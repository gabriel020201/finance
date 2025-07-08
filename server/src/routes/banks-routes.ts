import { FastifyInstance } from "fastify";
import { BanksController } from "../controllers/banks-controller.js";
import { BankRepositoryPrisma } from "../repositories/bank-repository-prisma.js";

export async function banksRoutes(fastify: FastifyInstance) {
  const bankRepository = new BankRepositoryPrisma();
  const banksController = new BanksController(bankRepository);

  fastify.post('/banks', (request, reply) => banksController.create(request, reply));
  fastify.get('/banks', (request, reply) => banksController.index(request, reply));
  fastify.get('/banks/:id', (request, reply) => banksController.show(request, reply));
  fastify.patch('/banks/:id', (request, reply) => banksController.update(request, reply));
  fastify.delete('/banks/:id', (request, reply) => banksController.delete(request, reply));
}
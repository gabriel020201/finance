import { FastifyInstance } from "fastify";
import { BanksController } from "../controllers/banks-controller.js";
import { BankInterfaceRepository } from "../repositories/banks-interface-repository.js";

export async function banksRoutes(fastify: FastifyInstance, options: { bankRepository: BankInterfaceRepository }) {
  const { bankRepository } = options;
  const banksController = new BanksController(bankRepository);

  fastify.post('/banks', (request, reply) => banksController.create(request, reply));
  fastify.get('/banks', (request, reply) => banksController.index(request, reply));
  fastify.get('/banks/:id', (request, reply) => banksController.show(request, reply));
  fastify.patch('/banks/:id', (request, reply) => banksController.update(request, reply));
  fastify.delete('/banks/:id', (request, reply) => banksController.delete(request, reply));
}
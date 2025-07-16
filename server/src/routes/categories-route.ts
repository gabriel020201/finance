import { FastifyInstance } from "fastify";
import { CategoriesController } from "../controllers/categories-controller.js";
import { CategoryInterfaceRepository } from "../repositories/category-interface-repository.js";

export async function categoriesRoutes(fastify: FastifyInstance, options: { categoryRepository: CategoryInterfaceRepository }) {
  const { categoryRepository } = options;
  const categoriesController = new CategoriesController(categoryRepository);

  fastify.post('/categories', (request, reply) => categoriesController.create(request, reply));
  fastify.get('/categories', (request, reply) => categoriesController.index(request, reply));
  fastify.get('/categories/:id', (request, reply) => categoriesController.show(request, reply));
  fastify.patch('/categories/:id', (request, reply) => categoriesController.update(request, reply));
  fastify.delete('/categories/:id', (request, reply) => categoriesController.delete(request, reply));
}
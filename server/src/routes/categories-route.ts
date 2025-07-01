import { FastifyInstance } from "fastify";
import { CategoriesController } from "../controllers/categories-controller.js";
import { CategoryRepositoryPrisma } from "../repositories/category-repository-prisma.js";

export async function categoriesRoutes(fastify: FastifyInstance) {
  const categoryRepository = new CategoryRepositoryPrisma();
  const categoriesController = new CategoriesController(categoryRepository);

  fastify.post('/categories', (request, reply) => categoriesController.create(request, reply));
  fastify.get('/categories', (request, reply) => categoriesController.index(request, reply));
  fastify.get('/categories/:id', (request, reply) => categoriesController.show(request, reply));
  fastify.patch('/categories/:id', (request, reply) => categoriesController.update(request, reply));
  fastify.delete('/categories/:id', (request, reply) => categoriesController.delete(request, reply));
}
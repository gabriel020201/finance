import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryInterfaceRepository } from "../repositories/category-interface-repository.js";
import { CreateCategoryService } from "../services/categories/create-category-service.js";

export class CategoriesController {
  constructor(
    private readonly categoryRepository: CategoryInterfaceRepository,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, icon } = request.body as { name: string, icon?: string | null };
    const createCategoryService = new CreateCategoryService(this.categoryRepository);
    const category = await createCategoryService.execute(name, icon);
    return reply.send(category);
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const categories = await this.categoryRepository.findAll();
    return reply.send(categories);
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const category = await this.categoryRepository.findById(id);
    
    if (!category) {
      return reply.status(404).send({ error: 'Category not found' });
    }
    
    return reply.send(category);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { name, icon } = request.body as { name?: string, icon?: string };

    const categoryFinded = await this.categoryRepository.findById(id);
    if (!categoryFinded) {
      return reply.status(404).send({ error: 'Category not found' });
    }

    if (name) categoryFinded.name = name;
    if (icon !== undefined) categoryFinded.icon = icon;

    const updatedCategory = await this.categoryRepository.update(categoryFinded);
    return reply.send(updatedCategory);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const categoryFinded = await this.categoryRepository.findById(id);
    if (!categoryFinded) {
      return reply.status(404).send({ error: 'Category not found' });
    }

    await this.categoryRepository.delete(id);
    return reply.status(204).send();
  }
}
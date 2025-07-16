import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryInterfaceRepository } from "../repositories/category-interface-repository.js";
import { CreateCategoryService } from "../services/categories/create-category-service.js";
import { DeleteCategoryService } from "../services/categories/delete-category-service.js";
import { UpdateCategoryService } from "../services/categories/update-category-service.js";
import { GetCategoryService } from "../services/categories/get-category-service.js";
import { GetAllCategoriesService } from "../services/categories/get-all-categories-service.js";

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
    const getAllCategoriesService = new GetAllCategoriesService(this.categoryRepository);
    const categories = await getAllCategoriesService.execute();
    return reply.send(categories);
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const getCategoryService = new GetCategoryService(this.categoryRepository);
    const category = await getCategoryService.execute(id);
    return reply.send(category);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { name, icon } = request.body as { name?: string, icon?: string };

    const updateCategoryService = new UpdateCategoryService(this.categoryRepository);
    const updatedCategory = await updateCategoryService.execute(id, name, icon);
    return reply.send(updatedCategory);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const deleteCategoryService = new DeleteCategoryService(this.categoryRepository);
    await deleteCategoryService.execute(id);
    return reply.status(204).send();
  }
}
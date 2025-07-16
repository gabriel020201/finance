import { CategoryInterfaceRepository } from "../../repositories/category-interface-repository.js";
import { AppError } from "../../common/AppError.js";
import { Category } from "../../entities/transaction.js";

export class GetCategoryService {
  private categoryRepository: CategoryInterfaceRepository;
  
  constructor(categoryRepository: CategoryInterfaceRepository) {
    this.categoryRepository = categoryRepository;
  }
  
  async execute(id: string): Promise<Category> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new AppError('Categoria não encontrada', 404);
    }

    return category;
  }
}

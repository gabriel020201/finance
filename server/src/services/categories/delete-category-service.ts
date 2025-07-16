import { CategoryInterfaceRepository } from "../../repositories/category-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class DeleteCategoryService {
  private categoryRepository: CategoryInterfaceRepository;
  
  constructor(categoryRepository: CategoryInterfaceRepository) {
    this.categoryRepository = categoryRepository;
  }
  
  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      throw new AppError('Categoria não encontrada', 404);
    }

    await this.categoryRepository.delete(id);
  }
}

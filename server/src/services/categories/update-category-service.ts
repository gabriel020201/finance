import { CategoryInterfaceRepository } from "../../repositories/category-interface-repository.js";
import { AppError } from "../../common/AppError.js";
import { Category } from "../../entities/transaction.js";

export class UpdateCategoryService {
  private categoryRepository: CategoryInterfaceRepository;
  
  constructor(categoryRepository: CategoryInterfaceRepository) {
    this.categoryRepository = categoryRepository;
  }
  
  async execute(id: string, name?: string, icon?: string): Promise<Category> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      throw new AppError('Categoria não encontrada', 404);
    }

    if (name && name !== existingCategory.name) {
      const categoryWithSameName = await this.categoryRepository.findByName(name);
      if (categoryWithSameName) {
        throw new AppError('Categoria com este nome já existe', 409);
      }
    }

    if (name) existingCategory.name = name;
    if (icon !== undefined) existingCategory.icon = icon;

    const updatedCategory = await this.categoryRepository.update(existingCategory);
    return updatedCategory;
  }
}

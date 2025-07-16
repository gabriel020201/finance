import { CategoryInterfaceRepository } from "../../repositories/category-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class CreateCategoryService {
  private categoryRepository: CategoryInterfaceRepository;
  
  constructor(categoryRepository: CategoryInterfaceRepository) {
    this.categoryRepository = categoryRepository;
  }
  
  async execute(name: string, icon?: string | null): Promise<any> {
    if (!name) {
      throw new AppError('Nome é requerido', 400);
    }

    const existingCategory = await this.categoryRepository.findByName(name);
    if (existingCategory) {
      throw new AppError('Categoria com este nome já existe', 409);
    }

    const newCategory = await this.categoryRepository.create({name, icon});

    return newCategory;
  }
}

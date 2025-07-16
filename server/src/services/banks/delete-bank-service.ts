import { BankInterfaceRepository } from "../../repositories/banks-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class DeleteBankService {
  private bankRepository: BankInterfaceRepository;
  
  constructor(bankRepository: BankInterfaceRepository) {
    this.bankRepository = bankRepository;
  }
  
  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const existingBank = await this.bankRepository.findById(id);
    if (!existingBank) {
      throw new AppError('Banco não encontrado', 404);
    }

    await this.bankRepository.delete(id);
  }
}

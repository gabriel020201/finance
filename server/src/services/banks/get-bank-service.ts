import { BankInterfaceRepository } from "../../repositories/banks-interface-repository.js";
import { AppError } from "../../common/AppError.js";
import { Bank } from "../../entities/transaction.js";

export class GetBankService {
  private bankRepository: BankInterfaceRepository;
  
  constructor(bankRepository: BankInterfaceRepository) {
    this.bankRepository = bankRepository;
  }
  
  async execute(id: string): Promise<Bank> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const bank = await this.bankRepository.findById(id);
    if (!bank) {
      throw new AppError('Banco não encontrado', 404);
    }

    return bank;
  }
}

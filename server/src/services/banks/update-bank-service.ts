import { BankInterfaceRepository } from "../../repositories/banks-interface-repository.js";
import { AppError } from "../../common/AppError.js";
import { Bank } from "../../entities/transaction.js";

export class UpdateBankService {
  private bankRepository: BankInterfaceRepository;
  
  constructor(bankRepository: BankInterfaceRepository) {
    this.bankRepository = bankRepository;
  }
  
  async execute(id: string, ispb?: string, name?: string, code?: string, fullName?: string): Promise<Bank> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const existingBank = await this.bankRepository.findById(id);
    if (!existingBank) {
      throw new AppError('Banco não encontrado', 404);
    }

    if (ispb && ispb !== existingBank.ispb) {
      const bankWithSameIspb = await this.bankRepository.findByIspb(ispb);
      if (bankWithSameIspb) {
        throw new AppError('Banco com este ISPB já existe', 409);
      }
    }

    if (name && name !== existingBank.name) {
      const bankWithSameName = await this.bankRepository.findByName(name);
      if (bankWithSameName) {
        throw new AppError('Banco com este nome já existe', 409);
      }
    }

    if (ispb) existingBank.ispb = ispb;
    if (name) existingBank.name = name;
    if (code) existingBank.code = code;
    if (fullName) existingBank.fullName = fullName;

    const updatedBank = await this.bankRepository.update(existingBank);
    return updatedBank;
  }
}

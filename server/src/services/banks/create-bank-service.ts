import { BankInterfaceRepository } from "../../repositories/banks-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class CreateBankService {
  private bankRepository: BankInterfaceRepository;
  
  constructor(bankRepository: BankInterfaceRepository) {
    this.bankRepository = bankRepository;
  }
  
  async execute(ispb: string, name: string, code: string, fullName: string, icon?: string | null): Promise<any> {
    if (!ispb || !name || !code || !fullName) {
      throw new AppError('ISPB, nome, código e nome completo são requeridos', 400);
    }

    const existingBankByIspb = await this.bankRepository.findByIspb(ispb);
    if (existingBankByIspb) {
      throw new AppError('Banco com esse ISPB já existe', 409);
    }

    const existingBankByName = await this.bankRepository.findByName(name);
    if (existingBankByName) {
      throw new AppError('Banco com esse nome já existe', 409);
    }

    const newBank = await this.bankRepository.create({
      ispb,
      name,
      code,
      fullName,
      icon
    });

    return newBank;
  }
}

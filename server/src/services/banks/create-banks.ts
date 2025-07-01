import { BankInterfaceRepository, CreateBankDTO } from "../../repositories/banks-interface-repository.js";

export class CreateBankService {
  private bankRepository: BankInterfaceRepository;

  constructor(bankRepository: BankInterfaceRepository) {
    this.bankRepository = bankRepository;
  }

  async execute(data: CreateBankDTO): Promise<any> {
    
    if (
      !data.ispb ||
      !data.name ||
      !data.code ||
      !data.fullName
    ) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    
    const existingBankByIspb = await this.bankRepository.findByIspb(data.ispb);
    if (existingBankByIspb) {
      throw new Error("Banco com este ISPB já existe");
    }

    
    const existingBankByName = await this.bankRepository.findByName(data.name);
    if (existingBankByName) {
      throw new Error("Banco com este nome já existe");
    }

    const newBank = await this.bankRepository.create(data);
    return newBank;
  }
}


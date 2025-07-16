import { TransactionInterfaceRepository, CreateTransactionDTO } from "../../repositories/transactions-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class CreateTransactionService {
  private transactionRepository: TransactionInterfaceRepository;

  constructor(transactionRepository: TransactionInterfaceRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(data: CreateTransactionDTO): Promise<any> {
   
    if (
      !data.amount ||
      !data.description ||
      !data.date ||
      !data.categoryId ||
      !data.ispb ||
      !data.type
    ) {
      throw new AppError("Todos os campos obrigatórios devem ser preenchidos", 400);
    }

    const newTransaction = await this.transactionRepository.create(data);
    return newTransaction;
  }
}
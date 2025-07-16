import { TransactionInterfaceRepository } from "../../repositories/transactions-interface-repository.js";
import { Transaction } from "../../entities/transaction.js";
import { AppError } from "../../common/AppError.js";

export class GetTransactionsByCategoryService {
  private transactionRepository: TransactionInterfaceRepository;
  
  constructor(transactionRepository: TransactionInterfaceRepository) {
    this.transactionRepository = transactionRepository;
  }
  
  async execute(categoryId: string): Promise<Transaction[]> {
    if (!categoryId) {
      throw new AppError('ID da categoria é requerido', 400);
    }

    const transactions = await this.transactionRepository.findByCategory(categoryId);
    return transactions;
  }
}

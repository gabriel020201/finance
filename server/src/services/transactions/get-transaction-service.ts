import { TransactionInterfaceRepository } from "../../repositories/transactions-interface-repository.js";
import { AppError } from "../../common/AppError.js";
import { Transaction } from "../../entities/transaction.js";

export class GetTransactionService {
  private transactionRepository: TransactionInterfaceRepository;
  
  constructor(transactionRepository: TransactionInterfaceRepository) {
    this.transactionRepository = transactionRepository;
  }
  
  async execute(id: string): Promise<Transaction> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    return transaction;
  }
}

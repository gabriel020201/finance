import { TransactionInterfaceRepository } from "../../repositories/transactions-interface-repository.js";
import { AppError } from "../../common/AppError.js";
import { Transaction } from "../../entities/transaction.js";

export class UpdateTransactionService {
  private transactionRepository: TransactionInterfaceRepository;
  
  constructor(transactionRepository: TransactionInterfaceRepository) {
    this.transactionRepository = transactionRepository;
  }
  
  async execute(
    id: string, 
    amount?: number, 
    description?: string, 
    date?: Date, 
    type?: "income" | "expense"
  ): Promise<Transaction> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const existingTransaction = await this.transactionRepository.findById(id);
    if (!existingTransaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    if (amount !== undefined) existingTransaction.amount = amount;
    if (description) existingTransaction.description = description;
    if (date) existingTransaction.date = date;
    if (type) existingTransaction.type = type;

    const updatedTransaction = await this.transactionRepository.update(existingTransaction);
    return updatedTransaction;
  }
}

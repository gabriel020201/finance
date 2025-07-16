import { TransactionInterfaceRepository } from "../../repositories/transactions-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class DeleteTransactionService {
  private transactionRepository: TransactionInterfaceRepository;
  
  constructor(transactionRepository: TransactionInterfaceRepository) {
    this.transactionRepository = transactionRepository;
  }
  
  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('ID é requerido', 400);
    }

    const existingTransaction = await this.transactionRepository.findById(id);
    if (!existingTransaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    await this.transactionRepository.delete(id);
  }
}

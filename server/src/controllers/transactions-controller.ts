import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionInterfaceRepository } from "../repositories/transactions-interface-repository.js";
import { CreateTransactionService } from "../services/transactions/create-transactions.js";
import { DeleteTransactionService } from "../services/transactions/delete-transaction-service.js";
import { UpdateTransactionService } from "../services/transactions/update-transaction-service.js";
import { GetTransactionService } from "../services/transactions/get-transaction-service.js";
import { GetAllTransactionsService } from "../services/transactions/get-all-transactions-service.js";
import { GetTransactionsByCategoryService } from "../services/transactions/get-transactions-by-category-service.js";

export class TransactionsController {
  constructor(
    private readonly transactionRepository: TransactionInterfaceRepository,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { description, type, amount, date, categoryId, ispb } = request.body as { 
      description: string,
      type: "income" | "expense",
      amount: number,
      date: Date,
      categoryId: string,
      ispb: string
    };
    
    const createTransactionService = new CreateTransactionService(this.transactionRepository);
    const transaction = await createTransactionService.execute({ 
      description, 
      type, 
      amount, 
      date, 
      categoryId, 
      ispb 
    });
    return reply.send(transaction);
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const getAllTransactionsService = new GetAllTransactionsService(this.transactionRepository);
    const transactions = await getAllTransactionsService.execute();
    return reply.send(transactions);
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const getTransactionService = new GetTransactionService(this.transactionRepository);
    const transaction = await getTransactionService.execute(id);
    return reply.send(transaction);
  }

  async findByCategory(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId } = request.params as { categoryId: string };
    const getTransactionsByCategoryService = new GetTransactionsByCategoryService(this.transactionRepository);
    const transactions = await getTransactionsByCategoryService.execute(categoryId);
    return reply.send(transactions);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { description, type, amount, date } = request.body as { 
      description?: string,
      type?: "income" | "expense",
      amount?: number,
      date?: Date
    };

    const updateTransactionService = new UpdateTransactionService(this.transactionRepository);
    const updatedTransaction = await updateTransactionService.execute(id, amount, description, date, type);
    return reply.send(updatedTransaction);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const deleteTransactionService = new DeleteTransactionService(this.transactionRepository);
    await deleteTransactionService.execute(id);
    return reply.status(204).send();
  }
}
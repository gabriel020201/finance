import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionInterfaceRepository } from "../repositories/transactions-interface-repository.js";
import { CreateTransactionService } from "../services/transactions/create-transactions.js";

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
    const transactions = await this.transactionRepository.findAll();
    return reply.send(transactions);
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const transaction = await this.transactionRepository.findById(id);
    
    if (!transaction) {
      return reply.status(404).send({ error: 'Transaction not found' });
    }
    
    return reply.send(transaction);
  }

  async findByCategory(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId } = request.params as { categoryId: string };
    const transactions = await this.transactionRepository.findByCategory(categoryId);
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

    const transactionFinded = await this.transactionRepository.findById(id);
    if (!transactionFinded) {
      return reply.status(404).send({ error: 'Transaction not found' });
    }

    if (description) transactionFinded.description = description;
    if (type) transactionFinded.type = type;
    if (amount) transactionFinded.amount = amount;
    if (date) transactionFinded.date = date;

    const updatedTransaction = await this.transactionRepository.update(transactionFinded);
    return reply.send(updatedTransaction);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const transactionFinded = await this.transactionRepository.findById(id);
    if (!transactionFinded) {
      return reply.status(404).send({ error: 'Transaction not found' });
    }

    await this.transactionRepository.delete(id);
    return reply.status(204).send();
  }
}
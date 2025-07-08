import { prisma } from "../database/prisma.js";
import { Transaction, Category, Bank } from "../entities/transaction.js";
import { TransactionInterfaceRepository, CreateTransactionDTO } from "./transactions-interface-repository.js";

export class TransactionRepositoryPrisma implements TransactionInterfaceRepository {
  
  async findById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        category: true,
        bank: true
      }
    });
    
    if (!transaction) return null;
    
    const category = new Category(
      transaction.category.name,
      transaction.category.icon,
      transaction.category.id,
      transaction.category.createdAt,
      transaction.category.updatedAt
    );
    
    const bank = new Bank(
      transaction.bank.ispb,
      transaction.bank.name,
      transaction.bank.code,
      transaction.bank.fullName,
      transaction.bank.id,
      transaction.bank.createdAt,
      transaction.bank.updatedAt
    );
    
    return new Transaction(
      transaction.description,
      transaction.type as "income" | "expense",
      transaction.amount,
      bank,
      category,
      transaction.date,
      transaction.id,
      transaction.createdAt,
      transaction.updatedAt
    );
  }

  async findAll(): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true,
        bank: true
      }
    });
    
    return transactions.map(transaction => {
      const category = new Category(
        transaction.category.name,
        transaction.category.icon,
        transaction.category.id,
        transaction.category.createdAt,
        transaction.category.updatedAt
      );
      
      const bank = new Bank(
        transaction.bank.ispb,
        transaction.bank.name,
        transaction.bank.code,
        transaction.bank.fullName,
        transaction.bank.id,
        transaction.bank.createdAt,
        transaction.bank.updatedAt
      );
      
      return new Transaction(
        transaction.description,
        transaction.type as "income" | "expense",
        transaction.amount,
        bank,
        category,
        transaction.date,
        transaction.id,
        transaction.createdAt,
        transaction.updatedAt
      );
    });
  }

  async findByCategory(categoryId: string): Promise<Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: { categoryId },
      include: {
        category: true,
        bank: true
      }
    });
    
    return transactions.map(transaction => {
      const category = new Category(
        transaction.category.name,
        transaction.category.icon,
        transaction.category.id,
        transaction.category.createdAt,
        transaction.category.updatedAt
      );
      
      const bank = new Bank(
        transaction.bank.ispb,
        transaction.bank.name,
        transaction.bank.code,
        transaction.bank.fullName,
        transaction.bank.id,
        transaction.bank.createdAt,
        transaction.bank.updatedAt
      );
      
      return new Transaction(
        transaction.description,
        transaction.type as "income" | "expense",
        transaction.amount,
        bank,
        category,
        transaction.date,
        transaction.id,
        transaction.createdAt,
        transaction.updatedAt
      );
    });
  }

  async create(transactionData: CreateTransactionDTO): Promise<Transaction> {
   
    const bank = await prisma.bank.findUnique({
      where: { ispb: transactionData.ispb }
    });
    
    if (!bank) {
      throw new Error("Banco não encontrado");
    }

    const transaction = await prisma.transaction.create({
      data: {
        description: transactionData.description!,
        type: transactionData.type,
        amount: transactionData.amount,
        date: transactionData.date,
        categoryId: transactionData.categoryId!,
        bankId: bank.id
      },
      include: {
        category: true,
        bank: true
      }
    });
    
    const category = new Category(
      transaction.category.name,
      transaction.category.icon,
      transaction.category.id,
      transaction.category.createdAt,
      transaction.category.updatedAt
    );
    
    const bankEntity = new Bank(
      transaction.bank.ispb,
      transaction.bank.name,
      transaction.bank.code,
      transaction.bank.fullName,
      transaction.bank.id,
      transaction.bank.createdAt,
      transaction.bank.updatedAt
    );
    
    return new Transaction(
      transaction.description,
      transaction.type as "income" | "expense",
      transaction.amount,
      bankEntity,
      category,
      transaction.date,
      transaction.id,
      transaction.createdAt,
      transaction.updatedAt
    );
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        description: transaction.description,
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        updatedAt: new Date()
      },
      include: {
        category: true,
        bank: true
      }
    });
    
    const category = new Category(
      updatedTransaction.category.name,
      updatedTransaction.category.icon,
      updatedTransaction.category.id,
      updatedTransaction.category.createdAt,
      updatedTransaction.category.updatedAt
    );
    
    const bank = new Bank(
      updatedTransaction.bank.ispb,
      updatedTransaction.bank.name,
      updatedTransaction.bank.code,
      updatedTransaction.bank.fullName,
      updatedTransaction.bank.id,
      updatedTransaction.bank.createdAt,
      updatedTransaction.bank.updatedAt
    );
    
    return new Transaction(
      updatedTransaction.description,
      updatedTransaction.type as "income" | "expense",
      updatedTransaction.amount,
      bank,
      category,
      updatedTransaction.date,
      updatedTransaction.id,
      updatedTransaction.createdAt,
      updatedTransaction.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.transaction.delete({
      where: { id }
    });
  }
}
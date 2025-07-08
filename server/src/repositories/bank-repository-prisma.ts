import { prisma } from "../database/prisma.js";
import { Bank } from "../entities/transaction.js";
import { BankInterfaceRepository, CreateBankDTO } from "./banks-interface-repository.js";

export class BankRepositoryPrisma implements BankInterfaceRepository {
  
  async findById(id: string): Promise<Bank | null> {
    const bank = await prisma.bank.findUnique({
      where: { id }
    });
    
    if (!bank) return null;
    
    return new Bank(
      bank.ispb,
      bank.name,
      bank.code,
      bank.fullName,
      bank.id,
      bank.createdAt,
      bank.updatedAt
    );
  }

  async findByName(name: string): Promise<Bank | null> {
    const bank = await prisma.bank.findFirst({
      where: { name }
    });
    
    if (!bank) return null;
    
    return new Bank(
      bank.ispb,
      bank.name,
      bank.code,
      bank.fullName,
      bank.id,
      bank.createdAt,
      bank.updatedAt
    );
  }

  async findByIspb(ispb: string): Promise<Bank | null> {
    const bank = await prisma.bank.findUnique({
      where: { ispb }
    });
    
    if (!bank) return null;
    
    return new Bank(
      bank.ispb,
      bank.name,
      bank.code,
      bank.fullName,
      bank.id,
      bank.createdAt,
      bank.updatedAt
    );
  }

  async findAll(): Promise<Bank[]> {
    const banks = await prisma.bank.findMany();
    
    return banks.map(bank => new Bank(
      bank.ispb,
      bank.name,
      bank.code,
      bank.fullName,
      bank.id,
      bank.createdAt,
      bank.updatedAt
    ));
  }

  async create(bankData: CreateBankDTO): Promise<Bank> {
    const bank = await prisma.bank.create({
      data: {
        ispb: bankData.ispb,
        name: bankData.name,
        code: bankData.code,
        fullName: bankData.fullName
      }
    });
    
    return new Bank(
      bank.ispb,
      bank.name,
      bank.code,
      bank.fullName,
      bank.id,
      bank.createdAt,
      bank.updatedAt
    );
  }

  async update(bank: Bank): Promise<Bank> {
    const updatedBank = await prisma.bank.update({
      where: { id: bank.id },
      data: {
        ispb: bank.ispb,
        name: bank.name,
        code: bank.code,
        fullName: bank.fullName,
        updatedAt: new Date()
      }
    });
    
    return new Bank(
      updatedBank.ispb,
      updatedBank.name,
      updatedBank.code,
      updatedBank.fullName,
      updatedBank.id,
      updatedBank.createdAt,
      updatedBank.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.bank.delete({
      where: { id }
    });
  }
}
import { FastifyReply, FastifyRequest } from "fastify";
import { BankInterfaceRepository } from "../repositories/banks-interface-repository.js";
import { CreateBankService } from "../services/banks/create-bank-service.js";
import { DeleteBankService } from "../services/banks/delete-bank-service.js";
import { UpdateBankService } from "../services/banks/update-bank-service.js";
import { GetBankService } from "../services/banks/get-bank-service.js";
import { GetAllBanksService } from "../services/banks/get-all-banks-service.js";

export class BanksController {
  constructor(
    private readonly bankRepository: BankInterfaceRepository,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { ispb, name, code, fullName, icon } = request.body as { 
      ispb: string, 
      name: string, 
      code: string, 
      fullName: string,
      icon?: string
    };
    
    const createBankService = new CreateBankService(this.bankRepository);
    const bank = await createBankService.execute(ispb, name, code, fullName, icon);
    return reply.send(bank);
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const getAllBanksService = new GetAllBanksService(this.bankRepository);
    const banks = await getAllBanksService.execute();
    return reply.send(banks);
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const getBankService = new GetBankService(this.bankRepository);
    const bank = await getBankService.execute(id);
    return reply.send(bank);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { ispb, name, code, fullName } = request.body as { 
      ispb?: string, 
      name?: string, 
      code?: string, 
      fullName?: string 
    };

    const updateBankService = new UpdateBankService(this.bankRepository);
    const updatedBank = await updateBankService.execute(id, ispb, name, code, fullName);
    return reply.send(updatedBank);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const deleteBankService = new DeleteBankService(this.bankRepository);
    await deleteBankService.execute(id);
    return reply.status(204).send();
  }
}
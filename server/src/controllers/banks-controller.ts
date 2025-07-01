import { FastifyReply, FastifyRequest } from "fastify";
import { BankInterfaceRepository } from "../repositories/banks-interface-repository.js";
import { CreateBankService } from "../services/banks/create-banks.js";

export class BanksController {
  constructor(
    private readonly bankRepository: BankInterfaceRepository,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { ispb, name, code, fullName } = request.body as { 
      ispb: string, 
      name: string, 
      code: string, 
      fullName: string 
    };
    
    const createBankService = new CreateBankService(this.bankRepository);
    const bank = await createBankService.execute({ ispb, name, code, fullName });
    return reply.send(bank);
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const banks = await this.bankRepository.findAll();
    return reply.send(banks);
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const bank = await this.bankRepository.findById(id);
    
    if (!bank) {
      return reply.status(404).send({ error: 'Bank not found' });
    }
    
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

    const bankFinded = await this.bankRepository.findById(id);
    if (!bankFinded) {
      return reply.status(404).send({ error: 'Bank not found' });
    }

    if (ispb) bankFinded.ispb = ispb;
    if (name) bankFinded.name = name;
    if (code) bankFinded.code = code;
    if (fullName) bankFinded.fullName = fullName;

    const updatedBank = await this.bankRepository.update(bankFinded);
    return reply.send(updatedBank);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const bankFinded = await this.bankRepository.findById(id);
    if (!bankFinded) {
      return reply.status(404).send({ error: 'Bank not found' });
    }

    await this.bankRepository.delete(id);
    return reply.status(204).send();
  }
}
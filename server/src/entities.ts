import { randomUUID } from "node:crypto";

type TransactionType = 'income' | 'expense';

export class Entity {
  id: string;

  constructor() {
    this.id = randomUUID();
  }
}

export class Category extends Entity {
  name: string;
  icon: string;

  constructor(name: string, icon: string) {
    super();
    this.name = name;
    this.icon = icon;
  }
}

export class Bank extends Entity {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class Transaction extends Entity {
  description: string;
  type: TransactionType;
  amount: number;
  bank: Bank;
  category: Category;
  date: Date;

  constructor(
    description: string,
    type: TransactionType,
    amount: number,
    bank: Bank,
    category: Category,
    date: Date
  ) {
    super();
    this.description = description;
    this.type = type;
    this.amount = amount;
    this.bank = bank;
    this.category = category;
    this.date = date;
  }
}
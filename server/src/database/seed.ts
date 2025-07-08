import { prisma } from './prisma.js';

async function main() {
  // Limpar dados existentes
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.bank.deleteMany();

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Alimentação',
        icon: 'ShoppingBasket'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Refeições',
        icon: 'Utensils'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Saúde',
        icon: 'Dumbbell'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Lazer',
        icon: 'Film'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Rendimentos',
        icon: 'DollarSign'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Transporte',
        icon: 'Car'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Educação',
        icon: 'Book'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Moradia',
        icon: 'Home'
      }
    })
  ]);

  // Criar bancos
  const banks = await Promise.all([
    prisma.bank.create({
      data: {
        ispb: '00000000',
        name: 'Banco do Brasil',
        code: '001',
        fullName: 'Banco do Brasil S.A.'
      }
    }),
    prisma.bank.create({
      data: {
        ispb: '60701190',
        name: 'Itaú',
        code: '341',
        fullName: 'Itaú Unibanco S.A.'
      }
    }),
    prisma.bank.create({
      data: {
        ispb: '90400888',
        name: 'Santander',
        code: '033',
        fullName: 'Banco Santander (Brasil) S.A.'
      }
    }),
    prisma.bank.create({
      data: {
        ispb: '62144175',
        name: 'Nubank',
        code: '260',
        fullName: 'Nu Pagamentos S.A.'
      }
    }),
    prisma.bank.create({
      data: {
        ispb: '00360305',
        name: 'Caixa Econômica',
        code: '104',
        fullName: 'Caixa Econômica Federal'
      }
    })
  ]);

  // Criar transações
  const transactions = [
    {
      description: 'Supermercado',
      type: 'expense',
      amount: 150.0,
      date: new Date('2023-10-01T10:00:00Z'),
      categoryId: categories.find(c => c.name === 'Alimentação')!.id,
      bankId: banks.find(b => b.name === 'Banco do Brasil')!.id
    },
    {
      description: 'Restaurante',
      type: 'expense',
      amount: 80.0,
      date: new Date('2023-10-02T12:30:00Z'),
      categoryId: categories.find(c => c.name === 'Refeições')!.id,
      bankId: banks.find(b => b.name === 'Itaú')!.id
    },
    {
      description: 'Academia',
      type: 'expense',
      amount: 120.0,
      date: new Date('2023-10-03T08:00:00Z'),
      categoryId: categories.find(c => c.name === 'Saúde')!.id,
      bankId: banks.find(b => b.name === 'Santander')!.id
    },
    {
      description: 'Cinema',
      type: 'expense',
      amount: 50.0,
      date: new Date('2023-10-04T20:00:00Z'),
      categoryId: categories.find(c => c.name === 'Lazer')!.id,
      bankId: banks.find(b => b.name === 'Nubank')!.id
    },
    {
      description: 'Salário',
      type: 'income',
      amount: 5000.0,
      date: new Date('2023-10-05T09:00:00Z'),
      categoryId: categories.find(c => c.name === 'Rendimentos')!.id,
      bankId: banks.find(b => b.name === 'Banco do Brasil')!.id
    },
    {
      description: 'Farmácia',
      type: 'expense',
      amount: 30.0,
      date: new Date('2023-10-06T18:00:00Z'),
      categoryId: categories.find(c => c.name === 'Saúde')!.id,
      bankId: banks.find(b => b.name === 'Caixa Econômica')!.id
    },
    {
      description: 'Uber',
      type: 'expense',
      amount: 25.0,
      date: new Date('2023-10-07T22:00:00Z'),
      categoryId: categories.find(c => c.name === 'Transporte')!.id,
      bankId: banks.find(b => b.name === 'Nubank')!.id
    },
    {
      description: 'Livraria',
      type: 'expense',
      amount: 60.0,
      date: new Date('2023-10-08T15:00:00Z'),
      categoryId: categories.find(c => c.name === 'Educação')!.id,
      bankId: banks.find(b => b.name === 'Itaú')!.id
    },
    {
      description: 'Internet',
      type: 'expense',
      amount: 90.0,
      date: new Date('2023-10-09T14:00:00Z'),
      categoryId: categories.find(c => c.name === 'Moradia')!.id,
      bankId: banks.find(b => b.name === 'Santander')!.id
    },
    {
      description: 'Freelance',
      type: 'income',
      amount: 1200.0,
      date: new Date('2023-10-10T16:00:00Z'),
      categoryId: categories.find(c => c.name === 'Rendimentos')!.id,
      bankId: banks.find(b => b.name === 'Nubank')!.id
    }
  ];

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction
    });
  }

  console.log('✅ Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao popular o banco de dados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

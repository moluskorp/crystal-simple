import { countFinisher, createFinisher, insertFinisher } from '../models/finmgr'

async function seedFinisher() {
  const finishers = [
    {
      code: 1,
      description: 'Dinheiro',
    },
    {
      code: 2,
      description: 'Cheque',
    },
    {
      code: 3,
      description: 'Cheque-pre',
    },
    {
      code: 4,
      description: 'Convenio',
    },
    {
      code: 5,
      description: 'Cartao Debito',
    },
    {
      code: 6,
      description: 'Cartao Credito',
    },
  ]
  finishers.forEach(async (finisher) => {
    await insertFinisher({
      code: finisher.code,
      description: finisher.description,
    })
  })
}

export async function migrationFinisherTable() {
  const databaseExists = await countFinisher()
  if (!databaseExists) {
    await createFinisher()
    await seedFinisher()
  }
}

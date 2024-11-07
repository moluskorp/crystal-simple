import {
  countSellsFinalizators,
  createSellFinisherTable,
} from '../models/selfinmgr'

export async function migrationSellsFinalizatorsTable() {
  const databaseExists = await countSellsFinalizators()
  if (!databaseExists) {
    await createSellFinisherTable()
  }
}

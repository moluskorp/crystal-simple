import { countSells, createSellsTable } from '../models/selmgr'

export async function migrationSellsTable() {
  const databaseExists = await countSells()
  if (!databaseExists) {
    await createSellsTable()
  }
}

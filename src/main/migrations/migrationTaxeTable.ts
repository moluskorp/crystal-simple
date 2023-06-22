import { countTaxeTable, createTaxeTable } from '../models/taxmgr'

export async function migrationTaxeTable() {
  const databaseExists = await countTaxeTable()
  if (!databaseExists) {
    await createTaxeTable()
  }
}

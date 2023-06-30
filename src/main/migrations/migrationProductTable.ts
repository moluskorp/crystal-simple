import { countProductTable, createProductTable } from '../models/prdmgr'

export async function migrationProductTable() {
  const databaseExists = await countProductTable()
  if (!databaseExists) {
    await createProductTable()
  }
}

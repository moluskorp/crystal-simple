import { countProductEanTable, createProductEanTable } from '../models/peanmgr'

export async function migrationProductEanTable() {
  const databaseExists = await countProductEanTable()
  if (!databaseExists) {
    await createProductEanTable()
  }
}

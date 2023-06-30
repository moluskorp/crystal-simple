import { countProductEanTable, createProductEanTable } from '../models/peanmgr'

export async function migrationProductEanTable() {
  const databaseExists = await countProductEanTable()
  console.log('oie')
  if (!databaseExists) {
    await createProductEanTable()
  }
}

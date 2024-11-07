import { countPdvTable, createPdvTable } from '../models/pdvmgr'

export async function migrationPdvTable() {
  const databaseExists = await countPdvTable()
  if (!databaseExists) {
    await createPdvTable()
  }
}

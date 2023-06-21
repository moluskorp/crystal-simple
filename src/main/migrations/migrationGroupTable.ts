import { countGroupTable, createGroupTable } from '../models/grpmgr'

export async function migrationGroupTable() {
  const databaseExists = await countGroupTable()
  if (!databaseExists) {
    await createGroupTable()
  }
}

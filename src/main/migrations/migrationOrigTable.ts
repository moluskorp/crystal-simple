import {
  countOrigTable,
  createOrigTable,
  seedOrigTable,
} from '../models/origmgr'

export async function migrationOrigTable() {
  const databaseExists = await countOrigTable()
  if (!databaseExists) {
    await createOrigTable()
    await seedOrigTable()
  }
}

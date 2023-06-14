import {
  countTestTable,
  createTestTable,
  insertTestTable,
} from '../models/testmgr'

export async function testMigrtion() {
  const databaseExists = (await countTestTable()) as any[]
  if (!databaseExists) {
    await createTestTable()
    await insertTestTable()
  }
}

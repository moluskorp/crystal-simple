import { countStoreTable, createStoreTable } from "../models/strmgr";

export async function migrationStoreTable() {
  const databaseExists = await countStoreTable()
  if(!databaseExists) {
    await createStoreTable()
  }
}
import { app } from 'electron'
import { migrationOrigTable } from './migrationOrigTable'
import { testMigrtion } from './testTable'

export async function runMigrations() {
  const version = Number(app.getVersion().replaceAll('.', ''))
  console.log(version)

  await testMigrtion()
  await migrationOrigTable()
}

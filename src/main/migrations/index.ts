// import { app } from 'electron'
import { migrationOrigTable } from './migrationOrigTable'
import { migrationGroupTable } from './migrationGroupTable'
import { testMigrtion } from './testTable'
import { migrationTaxeTable } from './migrationTaxeTable'
import { migrationProductTable } from './migrationProductTable'
import { migrationProductEanTable } from './migrationProductEanTable'
import { migrationUserTable } from './migrationUserTable'

export async function runMigrations() {
  // const version = Number(app.getVersion().replaceAll('.', ''))
  // console.log(version)
  // Salvar no bd a ultima versão que foi feita a migration, se atualizado
  // rodar novamente

  await testMigrtion()
  await migrationOrigTable()
  await migrationGroupTable()
  await migrationTaxeTable()
  await migrationProductTable()
  await migrationProductEanTable()
  await migrationUserTable()
}

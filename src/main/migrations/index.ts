// import { app } from 'electron'
import { migrationOrigTable } from './migrationOrigTable'
import { migrationGroupTable } from './migrationGroupTable'
import { testMigrtion } from './testTable'
import { migrationTaxeTable } from './migrationTaxeTable'
import { migrationProductTable } from './migrationProductTable'
import { migrationProductEanTable } from './migrationProductEanTable'
import { migrationUserTable } from './migrationUserTable'
import { migrationStateTable } from './migrationStateTable'
import { migrationCityTable } from './migrationCityTable'
import { migrationStoreTable } from './migrationStoreTable'
import { migrationIbptTable } from './migrationIbptTable'
import { migrationPdvTable } from './migrationPdvTable'
import { migrationSellsProductTable } from './migrationSellsProductTable'
import { migrationFinisherTable } from './migrationFinisherTable'
import { migrationNcmTable } from './seedsNcm'
import { migrationSellsTable } from './migrationSellsTable'
import { migrationSellsFinalizatorsTable } from './migrationSellFinalizatorsTable'

export async function runMigrations() {
  // const version = Number(app.getVersion().replaceAll('.', ''))
  // console.log(version)
  // Salvar no bd a ultima versão que foi feita a migration, se atualizado
  // rodar novamente

  await migrationIbptTable()
  await migrationCityTable()
  await migrationFinisherTable()
  await migrationGroupTable()
  await migrationOrigTable()
  await migrationPdvTable()
  await migrationProductTable()
  await migrationProductEanTable()
  await migrationStateTable()
  await migrationStoreTable()
  await migrationTaxeTable()
  await migrationUserTable()
  await migrationNcmTable()
  await migrationSellsTable()
  await migrationSellsProductTable()
  await migrationSellsFinalizatorsTable()
  await testMigrtion()
}

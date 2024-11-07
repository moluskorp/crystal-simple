import {
  countTaxeTable,
  createTaxeTable,
  insertTaxeTable,
} from '../models/taxmgr'

export async function migrationTaxeTable() {
  const databaseExists = await countTaxeTable()
  if (!databaseExists) {
    await createTaxeTable()
    await insertTaxeTable({
      ncm: '00000000',
      icmsNature: 'taxed',
      icmsPercentage: '18',
      ipiCst: '53',
      pisCofinsCst: '01',
    })
  }
}

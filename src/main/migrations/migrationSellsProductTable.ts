import { countSellsProduct, createSellsProduct } from '../models/sprodmgr'

export async function migrationSellsProductTable() {
  const databaseExists = await countSellsProduct()
  if (!databaseExists) {
    await createSellsProduct()
  }
}

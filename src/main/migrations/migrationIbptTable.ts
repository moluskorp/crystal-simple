import { ibpt as ibptList } from '../data/ibpt'
import {
  countIbptTable,
  createIbptTable,
  insertIbptTable,
} from '../models/ibptmgr'

export async function migrationIbptTable() {
  const databaseExists = await countIbptTable()
  if (!databaseExists) {
    await createIbptTable()
    for (const ibpt of ibptList) {
      await insertIbptTable({
        description: ibpt.description,
        key: ibpt.key,
        ncm: ibpt.code,
        version: ibpt.version,
        taxState: ibpt.stateTax,
      })
    }
  }
}

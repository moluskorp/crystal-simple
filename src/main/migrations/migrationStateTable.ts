import { states } from '../data/states/states'
import {
  countStateTable,
  createStateTable,
  insertStateTable,
} from '../models/sttmgr'

export async function migrationStateTable() {
  const databaseExists = await countStateTable()
  if (!databaseExists) {
    await createStateTable()
    states.forEach(async (state, index) => {
      const id = index + 1

      await insertStateTable({ stt_uf: state.uF, stt_id: id })
    })
  }
}

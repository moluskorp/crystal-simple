import {
  countUserTable,
  createUserTable,
  insertUserTable,
} from '../models/usrmgr'
import * as bcrypt from 'bcrypt'

export async function migrationUserTable() {
  const databaseExists = await countUserTable()
  if (!databaseExists) {
    await createUserTable()
    const password = bcrypt.hashSync('Moluskete', 10)
    const user = {
      name: 'Junior Baratella',
      username: 'moluskorp',
      password,
    }
    await insertUserTable(user)
  }
}

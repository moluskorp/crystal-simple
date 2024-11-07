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
    const users = [
      {
        name: 'Junior Baratella',
        username: 'moluskorp',
        password,
      },
      {
        name: 'Cesar',
        username: 'cesar',
        password: bcrypt.hashSync('06031961', 10),
      },
    ]
    for (const user of users) {
      await insertUserTable(user)
    }
  }
}

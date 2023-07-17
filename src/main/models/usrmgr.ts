import {
  User,
  deleteUserTableDTO,
  getListUserTableDTO,
  getUserTableDTO,
  insertUserTableDTO,
  updateUserTableDTO,
} from '@shared/types/user'
import { db } from './dbmgr'

export const countUserTable = () => {
  const qry = 'SELECT count(*) FROM usr_user limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createUserTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE usr_user (usr_id INTEGER PRIMARY KEY, usr_name VARCHAR, usr_username VARCHAR, usr_password VARCHAR, usr_active boolean);'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertUserTable = ({
  name,
  username,
  password,
}: insertUserTableDTO): Promise<void> => {
  const qry = `INSERT INTO usr_user (usr_name, usr_username, usr_password, usr_active) VALUES ('${name}', '${username}', '${password}', true);`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const getListUserTable = ({
  name,
  page,
  rows,
}: getListUserTableDTO): Promise<User[]> => {
  const skip = Number(page * rows)
  const take = Number(rows)
  const searchName = name === '*' ? '' : String(name)
  const qry = `SELECT usr_id as id, usr_name as name, usr_username as username, usr_active as active FROM usr_user WHERE usr_name LIKE '%${searchName}%' ORDER BY usr_name LIMIT ${take} OFFSET ${skip}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: User[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getUserTable = ({ id }: getUserTableDTO): Promise<User> => {
  const qry = `SELECT usr_id as id, usr_name as name, usr_username as username, usr_active as active FROM usr_user WHERE usr_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: User[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getUserByUsername = (username: string): Promise<User> => {
  const qry = `SELECT usr_id as id, usr_name as name, usr_username as username, usr_active as active FROM usr_user WHERE usr_username = '${username}'`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: User[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getUserByUsernameLogin = (username: string): Promise<User> => {
  const qry = `SELECT usr_id as id, usr_name as name, usr_username as username, usr_password as password, usr_active as active FROM usr_user WHERE usr_username = '${username}' and usr_active = true`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: User[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const deleteUserTable = ({ id }: deleteUserTableDTO): Promise<void> => {
  const qry = `UPDATE usr_user SET usr_active = false WHERE usr_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const recoverUserTable = ({ id }: deleteUserTableDTO): Promise<void> => {
  const qry = `UPDATE usr_user SET usr_active = true WHERE usr_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const updateUserTable = ({
  active,
  id,
  name,
  username,
  password,
}: updateUserTableDTO): Promise<void> => {
  const qry = `UPDATE usr_user SET usr_active = ${active}, usr_name = '${name}', usr_username = '${username}', usr_password = '${password}' WHERE usr_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

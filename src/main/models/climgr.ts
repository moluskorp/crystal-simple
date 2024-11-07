import { db } from './dbmgr'

export const countClientTable = () => {
  const qry = 'SELECT count(*) FROm cli_clients limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createClientTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE cli_clients (cli_id INTEGER PRIMARY KEY, cli_name VARCHAR, cli_nickname VARCHAR, cli_cpf VARCHAR, cli_rg VARCHAR, cli_postalcode VARCHAR, cli_street VARCHAR, cli_number VARCHAR, cli_complement VARCHAR, cli_district VARCHAR, cli_city VARCHAR, cli_state VARCHAR, cli_limit FLOAT, cli_type VARCHAR, cli_email VARCHAR, cli_phone VARCHAR, cli_cellphone VARCHAR, cli_whatsapp VARCHAR, cli_active BOOLEAN)'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertClientTable = () => {}

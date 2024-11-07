import { Store } from '@shared/types/store'
import { db } from './dbmgr'

export const countStoreTable = () => {
  const qry = 'SELECT count(*) FROM str_stores limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createStoreTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE str_stores (str_id INTEGER PRIMARY KEY, str_name VARCHAR, str_storealias VARCHAR, str_cnpj VARCHAR, str_street VARCHAR, str_number VARCHAR, str_district VARCHAR, str_city VARCHAR, str_state VARCHAR, str_pis FLOAT, str_cofins FLOAT, str_postalcode VARCHAR, str_ie VARCHAR);'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertStoreTable = ({
  city,
  cnpj,
  cofins,
  ie,
  district,
  name,
  number,
  pis,
  postalcode,
  state,
  storeAlias,
  street,
}: Store): Promise<void> => {
  const qry = `INSERT INTO str_stores (str_name, str_storealias, str_cnpj, str_street, str_number, str_district, str_city, str_state, str_pis, str_cofins, str_postalcode, str_ie) VALUES ('${name}', '${storeAlias}', '${cnpj}', '${street}', '${number}', '${district}', '${city}', '${state}', ${pis}, ${cofins}, '${postalcode}', '${ie}')`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const getStoreTable = (): Promise<Store> => {
  const qry =
    'SELECT str_id as id, str_name as name, str_storealias as storeAlias, str_cnpj as cnpj, str_street as street, str_number as number, str_district as district, str_city as city, str_state as state, str_pis as pis, str_cofins as cofins, str_postalcode as postalcode, str_ie as ie FROM str_stores LIMIT 1'
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Store[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const updateStoreTable = ({
  city,
  cnpj,
  cofins,
  district,
  name,
  number,
  ie,
  pis,
  postalcode,
  state,
  storeAlias,
  street,
  id,
}: Store): Promise<void> => {
  const qry = `UPDATE str_stores set str_city = '${city}', str_cnpj = '${cnpj}', str_cofins = ${cofins}, str_district = '${district}', str_name = '${name}', str_number = '${number}', str_pis = ${pis}, str_postalcode = '${postalcode}', str_state = '${state}', str_storealias = '${storeAlias}', str_street = '${street}', str_ie = '${ie}' where str_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

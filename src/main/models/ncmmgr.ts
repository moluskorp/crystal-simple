import { db } from './dbmgr'

import { GetListNcmTableDTO, InsertNcmTableDTO, Ncm } from '@shared/types/ncm'

export const countNcmTable = () => {
  const qry = 'SELECT count(*) FROM ncm_ncm limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createNcmTable = () => {
  const qry =
    'CREATE TABLE ncm_ncm (ncm_id INTEGER PRIMARY KEY, ncm_ncm VARCHAR , ncm_description VARCHAR);'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const insertNcmTable = ({ ncm, description }: InsertNcmTableDTO) => {
  const qry = `INSERT INTO ncm_ncm (ncm_ncm, ncm_description) VALUES ('${ncm}', '${description}')`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const getListNcmTable = ({
  description,
  page,
  rows,
}: GetListNcmTableDTO) => {
  const skip = Number(page * rows)
  const take = Number(rows)
  const searchDescription = description === '*' ? '' : String(description)
  const qry = `SELECT ncm_id as id, ncm_ncm as ncm, ncm_description as description FROM ncm_ncm WHERE ncm_description LIKE '%${searchDescription}%' ORDER BY ncm_ncm LIMIT ${take} OFFSET ${skip}`
  return new Promise((res) => {
    db.all(qry, (_, rows: Ncm[]) => {
      res(rows)
    })
  })
}

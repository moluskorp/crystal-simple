import { Ibpt, InsertIbptTable } from '@shared/types/ibpt'
import { db } from './dbmgr'

export const countIbptTable = () => {
  const qry = 'SELECT count(*) FROM ibpt_ibpt limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createIbptTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE ibpt_ibpt (ibpt_ncm VARCHAR PRIMARY KEY, ibpt_description VARCHAR, ibpt_taxstate FLOAT, ibpt_key VARCHAR, ibpt_version VARCHAR);'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertIbptTable = ({
  description,
  ncm,
  key,
  taxState,
  version,
}: InsertIbptTable): Promise<void> => {
  const qry = `INSERT INTO ibpt_ibpt (ibpt_ncm, ibpt_description, ibpt_taxstate, ibpt_key, ibpt_version) VALUES ('${ncm}', '${description}', '${taxState}', '${key}', '${version}')`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        if (e.message.includes('UNIQUE constraint failed')) {
          res()
          return
        }
        rej(e)
      }
      res()
    })
  })
}

export const getAllIbptTable = (): Promise<Ibpt[]> => {
  const qry =
    'SELECT ibpt_ncm as ncm, ibpt_description as description, ibpt_taxstate as taxState, ibpt_key as key, ibpt_version as version FROM ibpt_ibpt'
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Ibpt[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

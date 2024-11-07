import {
  DeletePdvTableDTO,
  GetPdvByNumberTableDTO,
  GetPdvTableDTO,
  InsertPdvTableDTO,
  Pdv,
  UpdatePdvTableDTO,
} from '@shared/types/pdv'
import { db } from './dbmgr'

export const countPdvTable = () => {
  const qry = 'SELECT count(*) FROM pdv_pdvs limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createPdvTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE pdv_pdvs (pdv_id INTEGER PRIMARY KEY, pdv_number INTEGER, pdv_serial VARCHAR, pdv_active BOOLEAN);'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertPdvTable = ({
  number,
  serial,
}: InsertPdvTableDTO): Promise<void> => {
  const qry = `INSERT INTO pdv_pdvs (pdv_serial, pdv_number, pdv_active) VALUES ('${serial}', ${number}, true)`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const getListPdvTable = (): Promise<Pdv[]> => {
  const qry =
    'SELECT pdv_id as id, pdv_serial as serial, pdv_number as number, pdv_active as active FROM pdv_pdvs WHERE pdv_active = true order by pdv_number'
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Pdv[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getPdvTable = ({ id }: GetPdvTableDTO): Promise<Pdv> => {
  const qry = `SELECT pdv_id as id, pdv_serial as serial, pdv_number as number, pdv_active as active FROM pdv_pdvs WHERE pdv_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Pdv[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getPdvByNumber = ({
  number,
}: GetPdvByNumberTableDTO): Promise<Pdv> => {
  const qry = `SELECT pdv_id as id, pdv_serial as serial, pdv_number as number, pdv_active as active FROM pdv_pdvs WHERE pdv_number = ${number} and pdv_active = true`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Pdv[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const deletePdvTable = ({ id }: DeletePdvTableDTO): Promise<void> => {
  const qry = `UPDATE pdv_pdvs SET pdv_active = false WHERE pdv_id = ${id}`
  console.log('qr', qry)
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const updatePdvTable = ({
  active,
  id,
  number,
  serial,
}: UpdatePdvTableDTO): Promise<void> => {
  const qry = `UPDATE pdv_pdvs SET pdv_number = ${number}, pdv_active = ${active}, pdv_serial = '${serial}' WHERE pdv_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

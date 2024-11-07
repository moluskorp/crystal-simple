import {
  DeleteFinisherTableDTO,
  FetchListFinisherDTO,
  Finisher,
  GetFinisherByCodeTableDTO,
  GetFinisherTableDTO,
  InsertFinisherTableDTO,
  UpdateFinisherTableDTO,
} from '@shared/types/finisher'
import { db } from './dbmgr'

export const countFinisher = () => {
  const qry = 'SELECT count(*) FROM fin_finisher limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createFinisher = (): Promise<void> => {
  const qry =
    'CREATE TABLE fin_finisher (fin_id INTEGER PRIMARY KEY, fin_description VARCHAR, fin_code INTEGER, fin_active BOOLEAN)'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertFinisher = ({
  description,
  code,
}: InsertFinisherTableDTO): Promise<void> => {
  const qry = `INSERT INTO fin_finisher (fin_code, fin_description, fin_active) VALUES (${code}, '${description}', true)`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const deleteFinisher = ({
  id,
}: DeleteFinisherTableDTO): Promise<void> => {
  const qry = `UPDATE fin_finisher SET fin_active = false WHERE fin_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const updateFinisher = ({
  description,
  code,
  id,
  active,
}: UpdateFinisherTableDTO): Promise<void> => {
  const qry = `UPDATE fin_finisher SET fin_description = '${description}', fin_code = ${code}, fin_active = ${active} WHERE fin_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const getAllFinisher = ({
  rowsPerPage,
  page,
}: FetchListFinisherDTO): Promise<Finisher[]> => {
  const offset = page * rowsPerPage
  const qry = `SELECT fin_id as id, fin_description as description, fin_code as code, fin_active as active FROM fin_finisher WHERE fin_active = true ORDER BY fin_code LIMIT ${rowsPerPage} OFFSET ${offset}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Finisher[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getFinisher = ({ id }: GetFinisherTableDTO): Promise<Finisher> => {
  const qry = `SELECT fin_id as id, fin_description as description, fin_code as code, fin_active as active FROM fin_finisher WHERE fin_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Finisher[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getFinisherByCode = ({
  code,
}: GetFinisherByCodeTableDTO): Promise<Finisher> => {
  const qry = `SELECT fin_id as id, fin_description as description, fin_code as code, fin_active as active FROM fin_finisher WHERE fin_code = ${code}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Finisher[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getFinisherByCodeActive = ({
  code,
}: GetFinisherByCodeTableDTO): Promise<Finisher> => {
  const qry = `SELECT fin_id as id, fin_description as description, fin_code as code, fin_active as active FROM fin_finisher WHERE fin_code = ${code} and fin_active = true`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Finisher[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

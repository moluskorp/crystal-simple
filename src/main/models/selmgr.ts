import { db } from './dbmgr'
import {
  InsertSellsTableDTO,
  Sells,
  UpdateSellsTableDTO,
} from '@shared/types/sells'

export const countSells = () => {
  const qry = 'SELECT count(*) FROM sel_sells limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createSellsTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE sel_sells (sel_id INTEGER PRIMARY KEY, pdv_id INTEGER, date DATETIME, sel_total FLOAT, sel_grossvalue FLOAT, sel_discount FLOAT, sel_add FLOAT, FOREIGN KEY (pdv_id) REFERENCES pdv_pdvs(pdv_id))'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        console.log('Erro na tabela sells')
        rej(e)
      }
      res()
    })
  })
}

export const insertSellTable = ({
  date,
  pdv_id,
  total,
  add,
  discount,
  grossValue,
}: InsertSellsTableDTO): Promise<number> => {
  const qry = `INSERT INTO sel_sells (pdv_id, date, sel_total, sel_grossvalue, sel_discount, sel_add) VALUES (${pdv_id}, '${date}', ${total}, ${grossValue}, ${discount}, ${add}) RETURNING pdv_id`
  return new Promise((res, rej) => {
    db.get(qry, (e, row: { pdv_id: number }) => {
      if (e) {
        rej(e)
      }
      res(row.pdv_id)
    })
  })
}

export const getListSellsTable = (): Promise<Sells[]> => {
  const qry =
    'SELECT sel_id as id, pdv_id as pdv_id, date as date, sel_total as total, sel_grossvalue as grossValue, sel_discount as discount, sel_add as add FROM sel_sells order by sel_id'
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Sells[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getListSellsByDateTable = (date: Date): Promise<Sells[]> => {
  const qry = `SELECT sel_id as id, pdv_id as pdv_id, date as date, sel_total as total, sel_grossvalue as grossValue, sel_discount as discount, sel_add as add FROM sel_sells WHERE date = '${date}' order by sel_id`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Sells[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getSellTable = ({ id }: { id: number }): Promise<Sells> => {
  const qry = `SELECT sel_id as id, pdv_id as pdv_id, date as date, sel_total as total, sel_grossvalue as grossValue, sel_discount as discount, sel_add as add FROM sel_sells WHERE sel_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Sells[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const deleteSellTable = ({ id }: { id: number }): Promise<void> => {
  const qry = `DELETE FROM sel_sells WHERE sel_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const updateSellTable = ({
  id,
  pdv_id,
  date,
  total,
  add,
  discount,
  grossValue,
}: UpdateSellsTableDTO): Promise<void> => {
  const qry = `UPDATE sel_sells SET pdv_id = ${pdv_id}, date = '${date}', sel_total = ${total}, sel_grossvalue = ${grossValue}, sel_discount = ${discount}, sel_add = ${add} WHERE sel_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const getSellByPdvId = ({
  pdv_id,
}: {
  pdv_id: number
}): Promise<Sells> => {
  const qry = `SELECT sel_id as id, pdv_id as pdv_id, date as date, sel_total as total, sel_grossvalue as grossValue, sel_discount as discount, sel_add as add FROM sel_sells WHERE pdv_id = ${pdv_id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Sells[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

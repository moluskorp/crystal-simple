import {
  InsertSellFinisherTableDTO,
  SellFinisher,
  UpdateSellFinisherTableDTO,
} from '@shared/types/sellfinisher'
import { db } from './dbmgr'

export const countSellsFinalizators = () => {
  const qry = 'SELECT count(*) FROM sel_finisher limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createSellFinisherTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE sel_finisher (sel_fin_id INTEGER PRIMARY KEY, sel_id INTEGER, fin_id INTEGER, fin_amount FLOAT, FOREIGN KEY(sel_id) REFERENCES sel_sells(sel_id), FOREIGN KEY(fin_id) REFERENCES fin_finisher(fin_code))'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        console.log('Erro na tabela sell_finisher')
        rej(e)
      }
      res()
    })
  })
}

export const insertSellFinisherTable = ({
  amount,
  fin_id,
  sel_id,
}: InsertSellFinisherTableDTO): Promise<void> => {
  const qry = `INSERT INTO sel_finisher (sel_id, fin_id, fin_amount) VALUES (${sel_id}, ${fin_id}, ${amount})`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const deleteSellFinisherTable = ({
  id,
}: {
  id: number
}): Promise<void> => {
  const qry = `DELETE FROM sel_finisher WHERE sel_fin_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const updateSellFinisherTable = ({
  id,
  amount,
  fin_id,
}: UpdateSellFinisherTableDTO): Promise<void> => {
  const qry = `UPDATE sel_finisher SET fin_id = ${fin_id}, fin_amount = ${amount} WHERE sel_fin_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const getSellFinisherBySelId = ({
  sel_id,
}: {
  sel_id: number
}): Promise<SellFinisher> => {
  const qry = `SELECT sel_fin_id as id, sel_id as sel_id, fin_id as fin_id, fin_amount as amount FROM sel_finisher WHERE sel_id = ${sel_id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: SellFinisher[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

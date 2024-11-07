import {
  DeleteSellsProductTableDTO,
  InsertSellsProductTableDTO,
  UpdateSellsProductTableDTO,
} from '@shared/types/sellsproduct'
import { db } from './dbmgr'

export const countSellsProduct = () => {
  const qry = 'SELECT count(*) FROM sprod_sellsproduct limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createSellsProduct = (): Promise<void> => {
  const qry =
    'CREATE TABLE sprod_sellsproduct (sprod_id INTEGER PRIMARY KEY,prd_id INTEGER, sprod_quantity FLOAT, sprod_priceunity FLOAT, sprod_pricetotal FLOAT, sel_id INTEGER, sprod_date DATETIME, FOREIGN KEY (prd_id) REFERENCES prd_product(prd_id), FOREIGN KEY (sel_id) REFERENCES sel_sells(sel_id))'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertSelssProduct = ({
  date,
  sel_id,
  priceTotal,
  priceUnity,
  productCode,
  quantity,
}: InsertSellsProductTableDTO): Promise<void> => {
  const newDate = date.toISOString().replace('T', ' ').replace('.000Z', '')
  const qry = `INSERT INTO sprod_sellsproduct (prd_id, sprod_quantity, sprod_priceunity, sprod_pricetotal, sel_id, sprod_date) VALUES (${productCode}, ${quantity}, ${priceUnity}, ${priceTotal}, ${sel_id}, '${newDate}')`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const deleteSellsProductTable = ({
  id,
}: DeleteSellsProductTableDTO): Promise<void> => {
  const qry = `DELETE FROM sprod_sellsproduct WHERE sprod_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const updateSellsProductTable = ({
  date,
  sel_id,
  id,
  priceTotal,
  priceUnity,
  productCode,
  quantity,
}: UpdateSellsProductTableDTO): Promise<void> => {
  const qry = `UPDATE sprod_sellsproduct SET prd_id = ${productCode}, sprod_quantity = ${quantity}, sprod_priceunity = ${priceUnity}, sprod_pricetotal = ${priceTotal}, sel_id = ${sel_id}, sprod_date = ${date} WHERE sprod_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

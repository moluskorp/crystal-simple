import {
  ProductEan,
  deleteProductEanByProductIdTableDTO,
  deleteProductEanTableDTO,
  getLastGeneratedProductEanDTO,
  getProductEanByEanTableDTO,
  getProductEanByProductIdTableDTO,
  insertProductEanTableDTO,
  updateProductEanTableDTO,
} from '@shared/types/productean'
import { db } from './dbmgr'
import { Fx6 } from '@shared/types/fx'

export const countProductEanTable = () => {
  const qry = 'SELECT count(*) FROM pean_productean limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createProductEanTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE pean_productean (pean_id INTEGER PRIMARY KEY,pean_product_id integer, pean_ean varchar, pean_weightproduct boolean,  pean_generated boolean, pean_generated_ean INTEGER,FOREIGN KEY (pean_product_id) REFERENCES prd_product(prd_id));'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertProductEanTable = ({
  ean,
  prd_id,
  generated,
  weightProduct,
  generated_ean = 0,
}: insertProductEanTableDTO): Promise<ProductEan> => {
  const qry = `INSERT INTO pean_productean (pean_ean, pean_product_id, pean_generated, pean_weightproduct , pean_generated_ean) VALUES ('${ean}', ${prd_id}, ${generated}, ${weightProduct}, ${generated_ean}) RETURNING *`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: ProductEan[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getAllProductEanTable = (): Promise<ProductEan[]> => {
  const qry =
    'SELECT * FROM pean_productean INNER JOIN prd_product ON prd_product.prd_id = pean_productean.pean_product_id where pean_productean.prd_active = true'
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: ProductEan[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getLastGeneratedProductEanTable = ({
  weightProduct,
}: getLastGeneratedProductEanDTO): Promise<{ pean_generated_ean: number }> => {
  const qry = `SELECT pean_generated_ean FROM pean_productean WHERE pean_generated = true and pean_weightproduct = ${weightProduct} order by pean_generated_ean desc limit 1`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: { pean_generated_ean: number[] }) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getProductEanByEanTable = ({
  ean,
}: getProductEanByEanTableDTO): Promise<ProductEan> => {
  const qry = `SELECT * FROM pean_productean INNER JOIN prd_product ON prd_product.prd_id = pean_productean.pean_product_id WHERE pean_ean = '${ean}'`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: ProductEan[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

export const getProductEanByPrdIdTable = ({
  prd_id,
}: getProductEanByProductIdTableDTO): Promise<ProductEan[]> => {
  const qry = `SELECT * FROM pean_productean WHERE pean_product_id = ${prd_id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: ProductEan[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getAllByProductIdProductEanTable = ({
  prd_id,
}: getProductEanByProductIdTableDTO): Promise<ProductEan[]> => {
  const qry = `SELECT * FROM pean_productean WHERE pean_product_id = ${prd_id}`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: ProductEan[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const getAllGenerateFx = (): Promise<Fx6[]> => {
  const qry =
    'SELECT * FROM pean_productean INNER JOIN prd_product as prd ON prd.prd_id = pean_productean.pean_product_id INNER JOIN tax_taxes as tax ON tax.tax_ncm = prd.prd_ncm INNER JOIN orig_origin as orig ON orig.id = prd.prd_origin_id WHERE prd_active = true'
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: Fx6[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const deleteProductEanTable = ({
  id,
}: deleteProductEanTableDTO): Promise<void> => {
  const qry = `DELETE FROM pean_productean WHERE pean_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const delteProductEanByProductIdTable = ({
  prd_id,
}: deleteProductEanByProductIdTableDTO): Promise<void> => {
  const qry = `DELETE FROM pean_productean WHERE pean_product_id = ${prd_id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const updateProductEanTable = ({
  ean,
  id,
  prd_id,
}: updateProductEanTableDTO): Promise<void> => {
  const qry = `UPDATE pean_productean SET pean_product_id = ${prd_id}, pean_ean = '${ean} WHERE pean_id = ${id}'`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

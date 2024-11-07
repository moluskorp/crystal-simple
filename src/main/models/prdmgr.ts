import {
  Product,
  deleteProductTableDTO,
  getListProductTableDTO,
  getProductByIdTableDTO,
  getProductListTableDTO,
  insertProductTableDTO,
  updateProductTableDTO,
} from '@shared/types/product'
import { db } from './dbmgr'

export const countProductTable = () => {
  const qry = 'SELECT count(*) FROM prd_product limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createProductTable = () => {
  const qry =
    'CREATE TABLE prd_product (prd_id INTEGER PRIMARY KEY, prd_description varchar not null, prd_shortdescription varchar not null, prd_weightProduct boolean, prd_ncm varchar, prd_group_id integer not null, prd_origin_id integer not null, prd_price1 float not null, prd_price2 float, prd_coust float, prd_active boolean, FOREIGN KEY (prd_origin_id) REFERENCES orig_origin(id), FOREIGN KEY (prd_group_id) REFERENCES grp_group(grp_id), FOREIGN KEY (prd_ncm) REFERENCES tax_taxes(tax_ncm));'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const insertProductTable = ({
  description,
  group_id,
  origin_id,
  price1: prd_price1,
  shortDescription,
  coust: prd_coust,
  ncm,
  price2: prd_price2,
  weightProduct,
}: insertProductTableDTO): Promise<{ prd_id: number }> => {
  const price1 = Number(String(prd_price1).replaceAll(',', '.'))
  const price2 = Number(String(prd_price2).replaceAll(',', '.'))
  const coust = Number(String(prd_coust).replaceAll(',', '.'))
  const qry = `INSERT INTO prd_product (prd_description, prd_shortdescription, prd_weightProduct, prd_ncm, prd_group_id, prd_origin_id, prd_price1, prd_price2, prd_coust, prd_active) VALUES ('${description}', '${shortDescription}', ${weightProduct}, '${ncm}', ${group_id}, ${origin_id}, ${price1}, ${price2}, ${coust}, true) RETURNING prd_id`
  return new Promise((res, rej) => {
    db.all(qry, (err, rows: { prd_id: number }[]) => {
      if (err) {
        rej(err)
      }
      res(rows[0])
    })
  })
}

export const getAllProductTable = (): Promise<Product[]> => {
  const qry =
    'SELECT prd_id as id, prd_description as description, prd_shortdescription as shortDescription, prd_weightProduct as weightProduct, prd_ncm as ncm, prd_group_id as group_id, prd_origin_id as origin_id, prd_price1 as price1, prd_price2 as price2, prd_coust as coust, prd_active as active FROM prd_product order by prd_description'
  return new Promise((res) => {
    db.all(qry, (_, rows: Product[]) => {
      res(rows)
    })
  })
}

export const getAllProductActiveTable = (): Promise<Product[]> => {
  const qry =
    'SELECT prd_id as id, prd_description as description, prd_shortdescription as shortDescription, prd_weightProduct as weightProduct, prd_ncm as ncm, prd_group_id as group_id, prd_origin_id as origin_id, prd_price1 as price1, prd_price2 as price2, prd_coust as coust, prd_active as active FROM prd_product order by prd_description where prd_active = true'
  return new Promise((res) => {
    db.all(qry, (_, rows: Product[]) => {
      res(rows)
    })
  })
}

export const getAllProductByNameTable = ({
  description,
}: getProductListTableDTO): Promise<Product[]> => {
  const qry = `SELECT prd_id as id, prd_description as description, prd_shortdescription as shortDescription, prd_weightProduct as weightProduct, prd_ncm as ncm, prd_group_id as group_id, prd_origin_id as origin_id, prd_price1 as price1, prd_price2 as price2, prd_coust as coust, prd_active as active FROM prd_product WHERE UPPER(prd_description) = UPPER('${description}') order by prd_description`
  return new Promise((res) => {
    db.all(qry, (_, rows: Product[]) => {
      res(rows)
    })
  })
}

export const getListProductTable = ({
  name,
  page,
  rows,
}: getListProductTableDTO): Promise<Product[]> => {
  const skip = Number(page * rows)
  const take = Number(rows)
  const searchName = name === '*' ? '' : String(name)
  const qry = `SELECT prd_id as id, prd_description as description, prd_shortdescription as shortDescription, prd_weightProduct as weightProduct, prd_ncm as ncm, prd_group_id as group_id, prd_origin_id as origin_id, prd_price1 as price1, prd_price2 as price2, prd_coust as coust, prd_active as active FROM prd_product WHERE prd_description LIKE '%${searchName}%' and prd_active = true ORDER BY prd_description LIMIT ${take} OFFSET ${skip}`
  return new Promise((res) => {
    db.all(qry, (_, rows: Product[]) => {
      res(rows)
    })
  })
}

export const getProductTable = ({
  id,
}: getProductByIdTableDTO): Promise<Product> => {
  const qry = `SELECT prd_id as id, prd_description as description, prd_shortdescription as shortDescription, prd_weightProduct as weightProduct, prd_ncm as ncm, prd_group_id as group_id, prd_origin_id as origin_id, prd_price1 as price1, prd_price2 as price2, prd_coust as coust, prd_active as active FROM prd_product WHERE prd_id = ${id}`
  return new Promise((res) => {
    db.all(qry, (_, rows: Product[]) => {
      res(rows[0])
    })
  })
}

export const deleteProductTable = ({
  id,
}: deleteProductTableDTO): Promise<void> => {
  const qry = `UPDATE prd_product SET prd_active = false WHERE prd_id = ${id}`
  return new Promise((res) => {
    db.all(qry, () => {
      res()
    })
  })
}

export const updateProductTable = ({
  description,
  group_id,
  id,
  origin_id,
  price1: prd_price1,
  shortDescription,
  active,
  coust: prd_coust,
  ncm,
  price2: prd_price2,
  weightProduct,
}: updateProductTableDTO): Promise<void> => {
  const price1 = Number(String(prd_price1).replaceAll(',', '.'))
  const price2 = Number(String(prd_price2).replaceAll(',', '.'))
  const coust = Number(String(prd_coust).replaceAll(',', '.'))
  const qry = `UPDATE prd_product SET prd_description = '${description}', prd_shortdescription = '${shortDescription}', prd_weightProduct = ${weightProduct}, prd_ncm = '${ncm}', prd_group_id = ${group_id}, prd_origin_id = ${origin_id}, prd_price1 = ${price1}, prd_price2 = ${price2}, prd_coust = ${coust}, prd_active = ${active} WHERE prd_id = ${id}`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

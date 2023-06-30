import {
  Taxe,
  getTaxeTableByNcmDTO,
  insertTaxeTableDTO,
  updateTaxeTableDTO,
} from '@shared/types/taxes'
import { db } from './dbmgr'

export const countTaxeTable = () => {
  const qry = 'SELECT count(*) FROM tax_taxes limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createTaxeTable = () => {
  const qry =
    'CREATE TABLE tax_taxes (tax_ncm VARCHAR PRIMARY KEY, tax_icmsnature VARCHAR, tax_icmspercentage VARCHAR, tax_icmsreduction VARCHAR, tax_ipicst VARCHAR, tax_ipipercentage VARCHAR, tax_piscofinscst VARCHAR, tax_pispercentage VARCHAR, tax_cofinspercentage VARCHAR, tax_fcppercentage VARCHAR)'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const insertTaxeTable = ({
  ncm,
  icmsNature,
  icmsPercentage,
  icmsReduction,
  ipiCst,
  ipiPercentage,
  pisCofinsCst,
  pisPercentage,
  cofinsPercentage,
  fcpPercentage,
}: insertTaxeTableDTO) => {
  const qry = `INSERT INTO tax_taxes (tax_ncm, tax_icmsnature, tax_icmspercentage, tax_icmsreduction, tax_ipicst, tax_ipipercentage, tax_piscofinscst, tax_pispercentage, tax_cofinspercentage, tax_fcppercentage) VALUES ('${ncm}', '${icmsNature}', '${icmsPercentage}', '${icmsReduction}', '${ipiCst}', '${ipiPercentage}', '${pisCofinsCst}', '${pisPercentage}', '${cofinsPercentage}', '${fcpPercentage}');`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const getAllTaxeTable = (): Promise<Taxe[]> => {
  const qry =
    'SELECT tax_ncm as ncm, tax_icmsnature as icmsNature, tax_icmspercentage as icmsPercentage, tax_icmsreduction as icmsReduction, tax_ipicst as ipiCst, tax_ipipercentage as ipiPercentage, tax_piscofinscst as pisCofinsCst, tax_pispercentage as pisPercentage, tax_cofinspercentage as cofinsPercentage, tax_fcppercentage as fcpPercentage FROM tax_taxes'
  return new Promise((res) => {
    db.all(qry, (_, rows: Taxe[]) => {
      res(rows)
    })
  })
}

export const getTaxeTableByNcm = ({
  ncm,
}: getTaxeTableByNcmDTO): Promise<Taxe> => {
  const qry = `SELECT tax_ncm as ncm, tax_icmsnature as icmsNature, tax_icmspercentage as icmsPercentage, tax_icmsreduction as icmsReduction, tax_ipicst as ipiCst, tax_ipipercentage as ipiPercentage, tax_piscofinscst as pisCofinsCst, tax_pispercentage as pisPercentage, tax_cofinspercentage as cofinsPercentage, tax_fcppercentage as fcpPercentage FROM tax_taxes WHERE tax_ncm = '${ncm}'`
  return new Promise((res) => {
    db.all(qry, (_, rows: Taxe[]) => {
      res(rows[0])
    })
  })
}

export const updateTaxeTable = ({
  ncm,
  icmsNature,
  icmsPercentage,
  icmsReduction,
  ipiCst,
  ipiPercentage,
  pisCofinsCst,
  pisPercentage,
  cofinsPercentage,
  fcpPercentage,
}: updateTaxeTableDTO): Promise<void> => {
  const qry = `UPDATE tax_taxes SET tax_icmsnature = '${icmsNature}', tax_icmspercentage = '${icmsPercentage}', tax_icmsreduction = '${icmsReduction}', tax_ipicst = '${ipiCst}', tax_ipipercentage = '${ipiPercentage}', tax_piscofinscst = '${pisCofinsCst}', tax_pispercentage = '${pisPercentage}', tax_cofinspercentage = '${cofinsPercentage}', tax_fcppercentage = '${fcpPercentage}' WHERE tax_ncm = ${ncm}`
  return new Promise((res) => {
    db.all(qry, () => {
      res()
    })
  })
}

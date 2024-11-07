import { City, GetCitiesRequest, SearchCityRequest } from '@shared/types/state'
import { db } from './dbmgr'

export const countCityTable = () => {
  const qry = 'SELECT count(*) FROM cit_cities limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createCityTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE cit_cities (cit_id INTEGER PRIMARY KEY, cit_codeuf VARCHAR, cit_nameuf VARCHAR, cit_codemun VARCHAR, cit_namemun VARCHAR);'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertCityTable = ({
  cit_codeMun,
  cit_codeUf,
  cit_nameMun,
  cit_nameUf,
}: {
  cit_codeUf: string
  cit_nameUf: string
  cit_codeMun: string
  cit_nameMun: string
}): Promise<void> => {
  const qry = `INSERT INTO cit_cities (cit_codeuf, cit_nameuf, cit_codemun, cit_namemun) VALUES ('${cit_codeUf}', '${cit_nameUf}', '${cit_codeMun}', '${cit_nameMun}');`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        console.log(
          'erro: ',
          `codeMun: ${cit_codeMun}, codeUf: ${cit_codeUf}, nameMun: ${cit_nameMun}, nameUf: ${cit_nameUf}`,
        )
        res()
        // rej(e)
      }
      res()
    })
  })
}

export const getCityTable = ({ uf }: GetCitiesRequest): Promise<City[]> => {
  const qry = `SELECT cit_id as id, cit_codeuf as codeUf, cit_nameuf as nameUf, cit_codemun as codeMun, cit_namemun as nameMun FROM cit_cities WHERE cit_nameuf = '${uf}' order by nameMun`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: City[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

export const searchCityTable = ({ city }: SearchCityRequest): Promise<City> => {
  const qry = `SELECT cit_id as id, cit_codeuf as codeUf, cit_nameuf as nameUf, cit_codemun as codeMun, cit_namemun as nameMun FROM cit_cities WHERE UPPER(cit_namemun) = UPPER('${city}') LIMIT 1`
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: City[]) => {
      if (e) {
        rej(e)
      }
      res(rows[0])
    })
  })
}

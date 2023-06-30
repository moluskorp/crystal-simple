import { Origin } from '@shared/types/orig'
import { db } from './dbmgr'

export const countOrigTable = () => {
  const qry = 'SELECT count(*) FROM orig_origin limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createOrigTable = () => {
  const qry =
    'CREATE TABLE orig_origin (id INTEGER PRIMARY KEY, description VARCHAR, code INTEGER);'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const seedOrigTable = (): Promise<void> => {
  const qry0 =
    "INSERT INTO orig_origin (description, code) VALUES ('Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8', 0);"
  const qry1 =
    "INSERT INTO orig_origin (description, code) VALUES ('Estrangeira - Importação direta, exceto a indicada no código 6', 1);"
  const qry2 =
    "INSERT INTO orig_origin (description, code) VALUES ('Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7', 2);"
  const qry3 =
    "INSERT INTO orig_origin (description, code) VALUES ('Nacional, com Conteúdo de Importação superior a 40% e inferior ou igual a 70%', 3);"
  const qry4 =
    "INSERT INTO orig_origin (description, code) VALUES ('Nacional, cuja produção tenha sido feita em conformidade com o PPB', 4);"
  const qry5 =
    "INSERT INTO orig_origin (description, code) VALUES ('Nacional, com Conteúdo de Importação inferior ou igual a 40%', 5);"
  const qry6 =
    "INSERT INTO orig_origin (description, code) VALUES ('Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX e gás natural', 6);"
  const qry7 =
    "INSERT INTO orig_origin (description, code) VALUES ('Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX e gás natural', 7);"
  const qry8 =
    "INSERT INTO orig_origin (description, code) VALUES ('Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%', 8);"
  return new Promise((res) => {
    db.all(qry0, () => {
      db.all(qry1, () => {
        db.all(qry2, () => {
          db.all(qry3, () => {
            db.all(qry4, () => {
              db.all(qry5, () => {
                db.all(qry6, () => {
                  db.all(qry7, () => {
                    db.all(qry8, () => {
                      res()
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

export const selectAllOrigTable = (): Promise<Origin[]> => {
  const qry = 'SELECT * FROM orig_origin order by code'
  return new Promise((res) => {
    db.all(qry, (_, rows: Origin[]) => {
      res(rows)
    })
  })
}

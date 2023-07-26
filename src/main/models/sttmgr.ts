import { State } from '@shared/types/state'
import { db } from './dbmgr'

export const countStateTable = () => {
  const qry = 'SELECT count(*) FROM stt_state limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createStateTable = (): Promise<void> => {
  const qry =
    'CREATE TABLE stt_state (stt_id INTEGER PRIMARY KEY, stt_uf VARCHAR);'
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const insertStateTable = ({
  stt_uf,
  stt_id,
}: {
  stt_uf: string
  stt_id: number
}): Promise<void> => {
  const qry = `INSERT INTO stt_state (stt_id, stt_uf) VALUES (${stt_id},'${stt_uf}')`
  return new Promise((res, rej) => {
    db.all(qry, (e) => {
      if (e) {
        rej(e)
      }
      res()
    })
  })
}

export const getAllStateTable = (): Promise<State[]> => {
  const qry = 'SELECT stt_id as id, stt_uf as uf FROM stt_state order by uf'
  return new Promise((res, rej) => {
    db.all(qry, (e, rows: State[]) => {
      if (e) {
        rej(e)
      }
      res(rows)
    })
  })
}

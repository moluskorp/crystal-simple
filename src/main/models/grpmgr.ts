import { db } from './dbmgr'

export interface insertGroupTableDTO {
  name: string
}

export interface getListGroupTableDTO {
  name: string
  page: number
  rows: number
}

export interface deleteGroupTableDTO {
  id: string
}

export interface updateGroupTableDTO {
  name: string
  id: string
  active: boolean
}

export const countGroupTable = () => {
  const qry = 'SELECT count(*) FROM grp_group limit 1'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const createGroupTable = () => {
  const qry =
    'CREATE TABLE grp_group (grp_id INTEGER PRIMARY KEY, grp_name VARCHAR, grp_active BOOLEAN);'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const insertGroupTable = ({ name }: insertGroupTableDTO) => {
  const qry = `INSERT INTO grp_group (grp_name, grp_active) VALUES ('${name}', true)`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const getAllGroupTable = () => {
  const qry = 'SELECT * FROM grp_group ORDER BY grp_name'
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const getListGroupTable = ({
  name,
  page,
  rows,
}: getListGroupTableDTO) => {
  const skip = Number(page * rows)
  const take = Number(rows)
  const searchName = name === '*' ? '' : String(name)
  const qry = `SELECT * FROM grp_group WHERE grp_name LIKE '${searchName}' ORDER BY grp_name LIMIT ${take} OFFSET ${skip}`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const deleteGroupTable = ({ id }: deleteGroupTableDTO) => {
  const qry = `UPDATE grp_group SET grp_active = false WHERE grp_id = '${id}'`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const updateGroupTable = ({ id, name, active }: updateGroupTableDTO) => {
  const qry = `UPDATE grp_group SET grp_active = ${active}, grp_name = '${name}' WHERE grp_id = '${id}'`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

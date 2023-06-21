import {
  GetGroupTableDTO,
  Group,
  deleteGroupTableDTO,
  getGroupTableByNameDTO,
  getListGroupTableDTO,
  insertGroupTableDTO,
  selectGroupByIdTableDTO,
  updateGroupTableDTO,
} from '@shared/types/group'
import { db } from './dbmgr'

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

export const getAllGroupTable = (): Promise<Group[]> => {
  const qry =
    'SELECT grp_id as id, grp_name as name, grp_active as active FROM grp_group ORDER BY grp_name'
  return new Promise((res) => {
    db.all(qry, (_, rows: Group[]) => {
      res(rows)
    })
  })
}

export const getGroupTableByName = ({
  name,
}: getGroupTableByNameDTO): Promise<Group> => {
  const qry = `SELECT grp_id as id, grp_name as name, grp_active as active FROM grp_group WHERE UPPER(grp_name) = UPPER('${name}')`
  return new Promise((res) => {
    db.all(qry, (_, rows: Group[]) => {
      res(rows[0])
    })
  })
}

export const getListGroupTable = ({
  name,
  page,
  rows,
}: getListGroupTableDTO): Promise<Group[]> => {
  const skip = Number(page * rows)
  const take = Number(rows)
  const searchName = name === '*' ? '' : String(name)
  const qry = `SELECT grp_id as id, grp_name as name, grp_active as active FROM grp_group WHERE grp_name LIKE '%${searchName}%' ORDER BY grp_name LIMIT ${take} OFFSET ${skip}`
  return new Promise((res) => {
    db.all(qry, (_, rows: Group[]) => {
      res(rows)
    })
  })
}

export const getGroupTable = ({ id }: GetGroupTableDTO): Promise<Group> => {
  const qry = `SELECT grp_id as id, grp_name as name, grp_active as active FROM grp_group WHERE grp_id = ${id}`
  return new Promise((res) => {
    db.all(qry, (_, rows: Group) => {
      res(rows)
    })
  })
}

export const deleteGroupTable = ({ id }: deleteGroupTableDTO) => {
  const qry = `UPDATE grp_group SET grp_active = false WHERE grp_id = ${id}`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const updateGroupTable = ({ id, name, active }: updateGroupTableDTO) => {
  const qry = `UPDATE grp_group SET grp_active = ${active}, grp_name = '${name}' WHERE grp_id = ${id}`
  return new Promise((res) => {
    db.all(qry, (_, rows) => {
      res(rows)
    })
  })
}

export const selectGroupByIdTable = ({
  id,
}: selectGroupByIdTableDTO): Promise<Group> => {
  const qry = `SELECT grp_id as id, grp_name as name, grp_active as active FROM grp_group WHERE grp_id = ${id}`
  return new Promise((res) => {
    db.all(qry, (_, rows: Group[]) => {
      res(rows[0])
    })
  })
}

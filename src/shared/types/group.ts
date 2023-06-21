export interface Group {
  id: number
  name: string
  active: boolean
}

export interface insertGroupTableDTO {
  name: string
}

export interface getListGroupTableDTO {
  name: string
  page: number
  rows: number
}

export interface getGroupTableByNameDTO {
  name: string
}

export interface GetGroupTableDTO {
  id: number
}

export interface deleteGroupTableDTO {
  id: number
}

export interface updateGroupTableDTO {
  name: string
  id: number
  active: boolean
}

export interface selectGroupByIdTableDTO {
  id: number
}

/*
  Responses
*/

export interface FetchGroupResponse {
  data: Group
}

export interface FetchAllGroupsResponse {
  data: Group[]
}

export interface FetchListGroupsResponse {
  data: Group[]
}

export interface CreateGroupResponse {
  type: 'error' | 'success'
  message?: string
}

export interface SelectGroupResponse {
  data: Group
}

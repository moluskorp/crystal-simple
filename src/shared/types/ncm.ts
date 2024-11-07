/**
 * Requests
 */

export interface Ncm {
  id: number
  ncm: string
  description: string
}

export interface InsertNcmTableDTO {
  ncm: string
  description: string
}

export interface GetListNcmTableDTO {
  description: string
  page: number
  rows: number
}

/**
 * Responses
 */

export interface GetchAllNcmsResponse {
  data: Ncm[]
}

export interface FetchListNcmResponse {
  data: Ncm[]
}

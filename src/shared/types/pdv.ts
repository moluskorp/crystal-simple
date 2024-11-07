import { ErrorResponse } from './error'

export interface Pdv {
  id: number
  number: number
  serial?: string
  active: boolean
}

/**
 * Requests
 */

export type InsertPdvTableDTO = Omit<Pdv, 'id' | 'active'>

export type UpdatePdvTableDTO = Pdv

export type DeletePdvTableDTO = { id: number }

export type GetPdvTableDTO = { id: number }

export type GetPdvByNumberTableDTO = { number: number }

/**
 * Responses
 */

export type CreatePdvResponse = ErrorResponse

export type FetchAllPdvResponse = ErrorResponse & {
  data?: Pdv[]
}

export type FetchPdvResponse = ErrorResponse & {
  data?: Pdv
}

export type UpdatePdvResponse = ErrorResponse

export type DeletePdvResponse = ErrorResponse

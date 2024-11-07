import { ErrorResponse } from './error'

export interface Sells {
  id: number
  pdv_id: number
  date: Date
  total: number
  grossValue: number
  discount: number
  add: number
}

export type InsertSellsTableDTO = Omit<Sells, 'id'>

export type UpdateSellsTableDTO = Sells

export type DeleteSellsTableDTO = { id: number }

/**
 * Responses
 */

export type CreateSellsREsponse = ErrorResponse

export type FetchListSellsResponse = ErrorResponse & {
  data?: Sells[]
}

export type FetchSellsResponse = ErrorResponse & {
  data?: Sells
}

export type UpdateSellsTableResponse = ErrorResponse

export type DeleteSellsTableResponse = ErrorResponse

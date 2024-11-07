import { ErrorResponse } from './error'

export interface SellFinisher {
  id: number
  sel_id: number
  fin_id: number
  amount: number
}

export type InsertSellFinisherTableDTO = Omit<SellFinisher, 'id'>

export type UpdateSellFinisherTableDTO = SellFinisher

export type DeleteSellFinisherTableDTO = { id: number }

/**
 * Responses
 */

export type CreateSellFinisherResponse = ErrorResponse

export type FetchSellFinisherResponse = ErrorResponse & {
  data?: SellFinisher
}

export type UpdateSellFinisherTableResponse = ErrorResponse

export type DeleteSellFinisherTableResponse = ErrorResponse

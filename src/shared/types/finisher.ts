import { ErrorResponse } from './error'

export interface Finisher {
  id: number
  description: string
  code: number
  active: boolean
}

export type InsertFinisherTableDTO = Omit<Finisher, 'id' | 'active'>

export type UpdateFinisherTableDTO = Finisher

export type DeleteFinisherTableDTO = { id: number }

export type GetFinisherTableDTO = { id: number }

export type FetchListFinisherDTO = { rowsPerPage: number; page: number }

export type GetFinisherByCodeTableDTO = { code: number }

/**
 * Responses
 */

export type CreateFinisherResponse = ErrorResponse

export type FetchListFinisherResponse = ErrorResponse & {
  data?: Finisher[]
}

export type FetchFinisherResponse = ErrorResponse & {
  data?: Finisher
}

export type UpdateFinisherResponse = ErrorResponse

export type DeleteFinisherResponse = ErrorResponse

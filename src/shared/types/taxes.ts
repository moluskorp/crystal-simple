import { ErrorResponse } from './error'

export interface Taxe {
  id: number
  ncm: string
  icmsNature: string
  icmsPercentage?: string
  icmsReduction?: string
  ipiCst: string
  ipiPercentage?: string
  pisCofinsCst: string
  pisPercentage?: string
  cofinsPercentage?: string
  fcpPercentage?: string
}

export type insertTaxeTableDTO = Omit<Taxe, 'id'>

export type getTaxeTableByNcmDTO = {
  ncm: string
}

export type updateTaxeTableDTO = Taxe

/**
 * Responses
 */

export type CreateTaxeResponse = ErrorResponse

export type FetchAllTaxesResponse = ErrorResponse & {
  data?: Taxe[]
}

export type FetchTaxeResponse = ErrorResponse & {
  data?: Taxe
}

export type UpdateTaxeRespone = ErrorResponse

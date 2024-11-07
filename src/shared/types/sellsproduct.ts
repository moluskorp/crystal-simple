import { ErrorResponse } from './error'

export interface SellsProduct {
  id: number
  productCode: number
  quantity: number
  priceUnity: number
  priceTotal: number
  sel_id: number
  date: Date
}

export type InsertSellsProductTableDTO = Omit<SellsProduct, 'id'>

export type UpdateSellsProductTableDTO = SellsProduct

export type DeleteSellsProductTableDTO = { id: number }

/**
 * Responnses
 */

export type CreateSellsProductResponse = ErrorResponse

export type FetchListSellsProductResponse = ErrorResponse & {
  data?: SellsProduct[]
}

export type FetchSellsProductResponse = ErrorResponse & {
  data?: SellsProduct
}

export type UpdateSellsProductTableResponse = ErrorResponse

export type DeleteSellsProductTableResponse = ErrorResponse

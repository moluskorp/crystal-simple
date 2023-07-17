import { ErrorResponse } from './error'

export interface ProductEan {
  pean_id: number
  pean_product_id: number
  pean_ean: string
  prd_id: number
  prd_description: string
  prd_shortdescription: string
  prd_weightProduct: boolean
  prd_ncm: string
  prd_group_id: number
  prd_origin_id: number
  prd_price1: number
  prd_price2: number
  prd_coust: number
  prd_active: boolean
}

export type insertProductEanTableDTO = {
  ean: string
  prd_id: number
  generated: boolean
  weightProduct: boolean
  generated_ean?: number
}

export type generateEanIPCDTO = {
  prd_id: number
  weightProduct: boolean
}

export type getProductEanByEanTableDTO = {
  ean: string
}

export type getLastGeneratedProductEanDTO = {
  weightProduct: boolean
}

export type getProductEanByProductIdTableDTO = {
  prd_id: number
}

export type updateProductEanTableDTO = {
  ean: string
  prd_id: number
  id: number
}

export type deleteProductEanTableDTO = { id: number }

export type deleteProductEanByProductIdTableDTO = { prd_id: number }

/**
 * Responses
 */

export type CreateProductEanResponse = ErrorResponse & {
  data?: {
    pean_id: number
    pean_ean: string
  }
}

export type FetchAllProductEanResponse = ErrorResponse & {
  data?: ProductEan[]
}

export type FetchProductEanResponse = ErrorResponse & {
  data?: ProductEan
}

export type UpdateProductEanResponse = ErrorResponse

export type DeleteProductEanResponse = ErrorResponse

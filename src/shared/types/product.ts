import { ErrorResponse } from './error'
import { Group } from './group'
import { Origin } from './orig'
import { ProductEan } from './productean'

export interface Product {
  id: number
  description: string
  shortDescription: string
  weightProduct?: boolean
  ncm?: string
  group_id: number
  origin_id: number
  group?: Group
  origin?: Origin
  price1: number
  price2?: number
  coust?: number
  active?: boolean
}

export type insertProductTableDTO = Omit<Product, 'id'> & {
  ean: string
}

export type getProductListTableDTO = {
  description: string
}

export type getListProductTableDTO = {
  name: string
  page: number
  rows: number
}

export type getProductByIdTableDTO = {
  id: number
}

export type updateProductTableDTO = Omit<Product, 'origin' | 'group'>

export type deleteProductTableDTO = { id: number }

/**
 * Responses
 */

export type CreateProductResponse = ErrorResponse & {
  data?: ProductEan
}

export type FetchAllProductsResponse = ErrorResponse & {
  data?: Product[]
}

export type FetchProductResponse = ErrorResponse & {
  data?: Product
}

export type UpdateProductResponse = ErrorResponse

export type DeleteProductResponse = ErrorResponse

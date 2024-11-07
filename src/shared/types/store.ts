import { ErrorResponse } from "./error"

export type Store = {
  id?: number
  name: string
  storeAlias: string
  cnpj: string
  street: string
  ie: string
  number: string
  district: string
  city: string
  state: string
  pis: number
  cofins: number
  postalcode: string
}

export type CreateStoreRequest = Omit<Store, 'id'>

export type UpdateStoreRequest = Omit<Store, 'id'> & {id: number}

export type CheckStoreExistsResponse = ErrorResponse & {
  exists?: boolean
}

export type CreateStoreResponse = ErrorResponse

export type GetStoreResponse = ErrorResponse & {
  data?: Store
 }

export type UpdateStoreResponse = ErrorResponse
import { ErrorResponse } from './error'

export interface Cep {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

export type FindCepDTO = { cep: string }

export type FindCepResponse = ErrorResponse & {
  data?: Cep
}

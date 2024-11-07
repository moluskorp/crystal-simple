import { ErrorResponse } from './error'

export type State = {
  id?: number
  uf: string
}

export type City = {
  id?: number
  codeUf: string
  nameUf: string
  codeMun: string
  nameMun: string
}

/**
 * Requests
 */

export type GetCitiesRequest = {
  uf: string
}

export type SearchCityRequest = {
  city: string
}

/**
 * Responses
 */

export type GetStatesTableResponse = ErrorResponse & {
  data?: State[]
}

export type GetCitiesResponse = ErrorResponse & {
  data?: City[]
}

export type SearchCityResponse = ErrorResponse & {
  data?: City
}
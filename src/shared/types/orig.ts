export interface Origin {
  id: number
  description: string
  code: number
}

/**
 * Responses
 */

export interface FetchAllOriginsResponse {
  data: Origin[]
}
